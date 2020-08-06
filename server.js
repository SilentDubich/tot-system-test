const http = require("http");
const express = require("express")
const app = express()
const fs = require("fs")
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const crypto = require('crypto');
app.use(cookieParser('secret key'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

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

app.post("/auth/login", function (request, response) {
    setOptions(response)
    let email = setCrypt(request.body.email)
    let password = setCrypt(request.body.password)
    fs.readFile(__dirname + '/src/DataBase/registrInfo.json', 'utf-8', function (err, data) {
        if (err) throw err
        let users = JSON.parse(data)
        let result = users.data.filter(el => el.emailCode === email && el.passwordCode === password && el)
        if (result.length > 0) {
            response.cookie('email', email, {maxAge: 3600 * 24 * 7})
            response.cookie('password', password, {maxAge: 3600 * 24 * 7})
            console.log(result)
            const sendData = {
                userId: result[0].userId,
                email: result[0].email,
                isLogged: true
            }
            sendTempFile(sendData, response)
        }
    })
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
        registUsers.data.push(newRegistUser)
        fs.writeFile(__dirname + `/src/DataBase/registrInfo.json`, JSON.stringify(registUsers), function (err) {
            if (err) throw err
        })
        sendTempFile(resData, response)
    })

})
// начинаем прослушивать подключения на 3000 порту
app.listen(3001);
