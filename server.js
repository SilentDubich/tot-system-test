const http = require("http");
http.createServer(function(request,response){

    response.end("Hello NodeJS!");

}).listen(3001, "127.0.0.1",function(){
    console.log("Сервер начал прослушивание запросов на порту 3001");
});
