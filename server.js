const http = require("http");
const express = require("express")
const app = express()
const fs = require("fs")
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
app.use(cookieParser('secret key'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

const setOptions = (response) => {
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    response.header('Access-Control-Allow-Credentials', true);
    response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    return response
}
// определяем обработчик для маршрута "/"
app.get("/messages", function(request, response){
    setOptions(response)
    console.log(request.cookies)
    // response.cookie('token', '1234')
    // отправляем ответ
    response.sendFile(__dirname + `/src/DataBase/messages${request.query.method}.json`);
});

app.options('*', (req, res) => {
    setOptions(res)
    res.send('ok');
});

app.post("/messages", function(request, response){
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
            senderFrstName: "Kirill",
            senderScndName: "Dubov",
            msgText: request.body.text,
            isEdited: false,
            addedAt: new Date().toDateString(),
            senderAva: "some string"
        }
        msgs.data.push(msg)
        fs.writeFile(__dirname + `/src/DataBase/messages${request.body.method}.json`, JSON.stringify(msgs), function (err) {
            if (err) throw err
            response.sendFile(__dirname + `/src/DataBase/messages${request.body.method}.json`);
        })

    })
});
// начинаем прослушивать подключения на 3000 порту
app.listen(3001);
