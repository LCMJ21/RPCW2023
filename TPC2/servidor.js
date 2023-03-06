var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

http.createServer(function (req, res) {
    var numPag = url.parse(req.url, true).pathname.substring(1);
    if (numPag == '') {
        page_name = 'TP2/index.html';
    }
    else var page_name = 'TP2/ARQ_FILES/arq' + numPag + '.html';
    fs.readFile(page_name, function(err, data) {
        if (err) {
            res.writeHead(404);
            res.write('Erro! ' + err);
        }
        else {
            res.writeHead(200, {'Content-Type': 'text/html'}); 
            res.write(data);
        }
        res.end();
    })
}).listen(7777);

console.log('Servidor à escuta na porta 7777...');