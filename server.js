var fs = require('fs'); 
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var statData = [];

if (fs.existsSync("public/data.json")) {
    //կարդում ենք ֆայլից և անմիջապես դարձնում օբյեկտ 
    var statData = require("./public/data.json");
}

app.use(express.static("public"));

app.use('/socket', express.static(__dirname + '/node_modules/socket.io-client/dist/'));
app.use('/p5', express.static(__dirname + '/node_modules/p5/lib/'));

app.get('/', function (req, res) {
    res.redirect('index.html');
});

server.listen(4444);

io.on('connection', function (socket) {
    socket.on("send data", function (data) {
        statData.push(data); //ավելացնում ենք նոր տվյալը զանգվածում
        fs.writeFile('public/data.json', JSON.stringify(statData)); //գրում ենք ստատսիտկայի տվյալները ֆայլի մեջ
    })

    socket.on("get stats", function () { //երբ կլիենտը ուղարկում է "get stats" 
        //կարդում ենք ստատիստիկայի ֆայլը
        fs.readFile('public/data.json', "utf8", function(err, statisticsFromFile) {
            //և ուղարկում ենք այն "send stats" պիտակով
            socket.emit("send stats",statisticsFromFile);    
        });
        
    });
});