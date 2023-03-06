// pessoas_server.js
// RPCW2023, 2020-10-23
// By Lcmj

var http = require('http');
var url = require('url');
var axios = require('axios');
var mypages = require('./mypages.js');
const fs = require('fs');

function get_distrib(pessoas) {
    var total = pessoas.length;
    var total_desportos = 0;
    var distrib = {"sexo": {}, "desportos": {}, "profissao": {}}
    for (var i = 0; i < total; i++) {
        let sexo = pessoas[i].sexo;
        if (sexo != undefined) {
            if (distrib["sexo"][sexo] == undefined) distrib["sexo"][sexo] = 1;
            else distrib["sexo"][sexo] += 1;
        }

        let desportos = pessoas[i].desportos;
        if (desportos != undefined) {
            for (var j = 0; j < desportos.length; j++) {
                if (distrib["desportos"][desportos[j]] == undefined) distrib["desportos"][desportos[j]] = 1;
                else distrib["desportos"][desportos[j]] += 1;
                total_desportos += 1;
            }
        }

        let profissao = pessoas[i].profissao;
        if (profissao != undefined) {
            if (distrib["profissao"][profissao] == undefined) distrib["profissao"][profissao] = 1;
            else distrib["profissao"][profissao] += 1;
        }
    }

    for (let att in distrib) {
        distrib[att] = Object.entries(distrib[att]).sort((a, b) => b[1] - a[1]);
    }

    distrib["profissao"] = distrib["profissao"].slice(0, 10);

    for(let item in distrib["sexo"]) {
        distrib["sexo"][item][1] /= (total/100);
    }

    for(let item in distrib["desportos"]) {
        distrib["desportos"][item][1] /= (total/100);
    }
    for(let item in distrib["profissao"]) {
        distrib["profissao"][item][1] /= (total/100);
    }
    return distrib;
};


var server = http.createServer(function (req, res) {
    var c = new Date().toISOString().substring(0, 16);
    console.log("Request: " + req.method + " " + req.url + " " + c);
    var dictURL = url.parse(req.url, true);
    var people_query = dictURL.pathname.match(/\/pessoas\/(p\d+)/);

    if (dictURL.pathname == '/pessoas') {
        var get_url = 'http://localhost:3000/pessoas';
        if (dictURL.search != null) get_url += dictURL.search

        axios.get(get_url)
            .then(function (response) {
                var pessoas = response.data;
                var html = mypages.pessoasPage(pessoas);
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.write(html);
                res.end();
            }
            )
            .catch(function (error) {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.write("Error " + error);
            }
            )
    }
    else if (dictURL.pathname == '/ordenada') {
        axios.get('http://localhost:3000/pessoas?_sort=nome&_order=asc')
            .then(function (response) {
                var pessoas = response.data;
                var html = mypages.pessoasPage(pessoas);
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.write(html);
                res.end();
            }
            )
            .catch(function (error) {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.write("Error " + error);
            }
            )
    }
    else if (dictURL.pathname == '/ordenada2') {
        axios.get('http://localhost:3000/pessoas')
            .then(function (response) {
                var pessoas = response.data;
                pessoas.sort(function (a, b) {
                    if (a.nome < b.nome) { return -1; }
                    if (a.nome > b.nome) { return 1; }
                    return 0;
                })
                var html = mypages.pessoasPage(pessoas);
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.write(html);
                res.end();
            }
            )
            .catch(function (error) {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.write("Error " + error);
            }
            )
    }
    else if (dictURL.pathname == '/w3.css') {
        fs.readFile('w3.css', function (err, data) {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                res.write("Error " + err);
                res.end();
            }
            else {
                res.writeHead(200, { 'Content-Type': 'text/css' });
                res.write(data);
                res.end();
            }
        })
    }
    else if (people_query) {
        axios.get(`http://localhost:3000/pessoas/${people_query[1]}`)
            .then(function (response) {
                var pessoa = response.data;
                var html = mypages.pessoaPage(pessoa);
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.write(html);
                res.end();
            }
            )
            .catch(function (error) {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.write("Error " + error);
            }
            )
    }
    else if (dictURL.pathname == '/') {
        axios.get(`http://localhost:3000/pessoas/`)
            .then(function (response) {
                var pessoas = response.data;
                var distrib = get_distrib(pessoas);
                var html = mypages.homepage(distrib);
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.write(html);
                res.end();
            }
            )
            .catch(function (error) {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.write("Error " + error);
            }
            )
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.write("Operation not supported: " + dictURL.pathname);
        res.end();
    }

})

server.listen(7777);
console.log('Server running at http://localhost:7777/');