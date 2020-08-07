const http = require("http");
const express = require("express")
const app = express()
const fs = require("fs")
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")
const crypto = require("crypto");
const multer = require("multer")
app.use(cookieParser('secret key'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(express.static(__dirname));
app.use(multer({dest:"src/DataBase/imgs"}).single("filedata"));

const sendTempFile = (resData, response) => {
    fs.writeFile(__dirname + "/src/DataBase/temp.json", JSON.stringify(resData), function (err) {
        if (err) throw err
        response.sendFile(__dirname + "/src/DataBase/temp.json", 'utf-8', function (err) {
            if (err) throw err
            fs.unlink(__dirname + "/src/DataBase/temp.json", function (err) {
                if (err) throw err
            })
        })
    })
}


const setCrypt = (param) => {
    const iv = Buffer.alloc(16, 0); //генерация вектора инициализации
    const key = crypto.scryptSync(param, 'salt', 32); //генерация ключа
    const encyptedData = crypto.createCipheriv('aes-256-cbc', key, iv).final('hex');
    return encyptedData
}

const setOptions = (response) => {
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    response.header('Access-Control-Allow-Credentials', true);
    response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    return response
}

app.get("/messages", function (request, response) {
    setOptions(response)
    response.sendFile(__dirname + `/src/DataBase/messages${request.query.method}.json`);
});

app.options('*', (req, res) => {
    setOptions(res)
    res.send('ok');
});

app.post("/messages", function (request, response) {
    setOptions(response)
    let msgs = fs.readFile(__dirname + `/src/DataBase/messages${request.body.method}.json`, 'utf-8', function (err, data) {
        if (err) throw err
        msgs = JSON.parse(data)
        let max = msgs.data.reduce((prev, cur) => {
            if (prev.msgId > cur.msgId) {
                return prev
            }
            return cur
        })
        const msg = {
            msgId: max.msgId + 1,
            senderId: request.body.senderId,
            senderFrstName: request.body.fn,
            senderScndName: request.body.sn,
            msgText: request.body.text,
            isEdited: false,
            addedAt: new Date().toDateString(),
            senderAva: request.body.ava
        }
        msgs.data.push(msg)
        fs.writeFile(__dirname + `/src/DataBase/messages${request.body.method}.json`, JSON.stringify(msgs), function (err) {
            if (err) throw err
            response.sendFile(__dirname + `/src/DataBase/messages${request.body.method}.json`);
        })
    })
});

app.put("/messages", function (request, response) {
    setOptions(response)
    let msgs = fs.readFile(__dirname + `/src/DataBase/messages${request.body.method}.json`, 'utf-8', function (err, data) {
        if (err) throw err
        msgs = JSON.parse(data)
        msgs = msgs.data.map(el => el.msgId === request.body.msgId ? {
            msgId: el.msgId, senderId: el.senderId, senderFrstName: el.senderFrstName,
            senderScndName: el.senderScndName, msgText: request.body.text, isEdited: true,
            addedAt: el.addedAt, senderAva: el.senderAva
        } : el)
        const newMsgs = {data: msgs}
        fs.writeFile(__dirname + `/src/DataBase/messages${request.body.method}.json`, JSON.stringify(newMsgs), function (err) {
            if (err) throw err
            response.sendFile(__dirname + `/src/DataBase/messages${request.body.method}.json`);
        })
    })

})

app.delete('/messages', function (request, response) {
    setOptions(response)
    let msgs = fs.readFile(__dirname + `/src/DataBase/messages${request.body.method}.json`, 'utf-8', function (err, data) {
        if (err) throw err
        msgs = JSON.parse(data)
        msgs = msgs.data.filter(el => el.msgId !== request.body.msgId)
        const newMsgs = {data: msgs}
        fs.writeFile(__dirname + `/src/DataBase/messages${request.body.method}.json`, JSON.stringify(newMsgs), function (err) {
            if (err) throw err
            response.sendFile(__dirname + `/src/DataBase/messages${request.body.method}.json`);
        })
    })

})

app.post("/auth/login", function (request, response) {
    setOptions(response)
    let email = setCrypt(request.body.email)
    let password = setCrypt(request.body.password)
    fs.readFile(__dirname + '/src/DataBase/registrInfo.json', 'utf-8', function (err, data) {
        if (err) throw err
        let users = JSON.parse(data)
        let result = users.data.filter(el => el.emailCode === email && el.passwordCode === password && el)
        if (result.length > 0) {
            let time = (3600 * 24 * 7) * 2000 // время жизни куки, выставлено 14 дней
            response.cookie('email', email, {maxAge: time})
            response.cookie('password', password, {maxAge: time})
            const sendData = {
                data: {
                    userId: result[0].userId,
                    email: result[0].email,
                    isLogged: true
                },
                resultCode: 0
            }
            sendTempFile(sendData, response)
        } else {
            const errResData = {
                error: ['Почта или пароль введен неверно !'],
                resultCode: 1
            }
            sendTempFile(errResData, response)
        }
    })
})

app.delete('/auth/login', function (request, response) {
    setOptions(response)
    response.cookie('email', '')
    response.cookie('password', '')
    const resData = {
        userId: null,
        email: null,
        isLogged: false
    }
    sendTempFile(resData, response)
})

app.post('/auth/register', function (request, response) {
    setOptions(response)
    let email = setCrypt(request.body.email)
    let password = setCrypt(request.body.password)
    let registUsers = fs.readFile(__dirname + '/src/DataBase/registrInfo.json', 'utf-8', function (err, data) {
        if (err) throw err
        registUsers = JSON.parse(data)
        let max = registUsers.data.reduce((prev, cur) => {
            if (prev.userId > cur.userId) {
                return prev
            }
            return cur
        })
        const newRegistUser = {
            emailCode: email,
            passwordCode: password,
            userId: max.userId + 1,
            email: request.body.email,
            login: "some"
        }
        const resData = {
            userId: max.userId + 1,
            email: request.body.email,
            isLogged: true
        }
        const newUser = {
            userId: max.userId + 1,
            firstName: "New",
            secondName: "User",
            status: null,
            avatar: null
        }
        registUsers.data.push(newRegistUser)
        fs.writeFile(__dirname + `/src/DataBase/registrInfo.json`, JSON.stringify(registUsers), function (err) {
            if (err) throw err
        })
        fs.readFile(__dirname + `/src/DataBase/users.json`, 'utf-8', function (err, data) {
            if (err) throw err
            let users = JSON.parse(data)
            users.data.push(newUser)
            fs.writeFile(__dirname + `/src/DataBase/users.json`, JSON.stringify(users), function (err) {
                if (err) throw err
            })
        })
        response.cookie('email', email, {maxAge: 3600 * 24 * 7})
        response.cookie('password', password, {maxAge: 3600 * 24 * 7})
        sendTempFile(resData, response)
    })
})

app.get("/auth/me", function (request, response) {
    setOptions(response)
    let email = request.cookies.email
    let password = request.cookies.password
    fs.readFile(__dirname + '/src/DataBase/registrInfo.json', 'utf-8', function (err, data) {
        let result = JSON.parse(data)
        result = result.data.filter( el => el.emailCode === email && el.passwordCode === password)
        if (result.length > 0) {
            const resData = {
                userId: result[0].userId,
                email: result[0].email,
                isLogged: true
            }
            sendTempFile(resData, response)
        } else {
            const resData = {
                userId: null,
                email: null,
                isLogged: false
            }
            sendTempFile(resData, response)
        }
    })
})

app.get('/profile', function (request, response) {
    setOptions(response)
    fs.readFile(__dirname + '/src/DataBase/users.json', 'utf-8', function (err, data) {
        if (err) throw err
        let users = JSON.parse(data)
        users = users.data.filter(el => el.userId === +request.query.userId)
        const resData = {data: users[0], resultCode: 0}
        if (users.length > 0) {
            sendTempFile(resData, response)
        } else {
            const errResData = {data: {errors: ['You not authorizated !'], resultCode: 1}}
            sendTempFile(errResData, response)
        }
    })
})

app.put('/profile', function (request, response) {
    setOptions(response)
    fs.readFile(__dirname + '/src/DataBase/users.json', 'utf-8', function (err, data) {
        if (err) throw err
        let users = JSON.parse(data)
        let me = users.data.filter(el => el.userId === request.body.userId)
        // console.log(me)
        me[0].firstName = request.body.fn
        me[0].secondName = request.body.sn
        me[0].status = request.body.status
        console.log(me)
        users.data.map(el => el.userId === request.body.userId ? me : el)
        fs.writeFile(__dirname + `/src/DataBase/users.json`, JSON.stringify(users), function (err) {
            if (err) throw err
            sendTempFile(me, response)
        })

    })
})

// app.put('/profile/photo', function (request, response) {
//     setOptions(response)
//     console.log('photo')
//     console.log(request)
//     console.log(request.file)
//
// })

// начинаем прослушивать подключения на 3000 порту
app.listen(3001);
