// alunos_server.js
// RPCW2023: 2023-03-05
// by jcr

var http = require('http');
var axios = require('axios');
var templates = require('./templates')
var static = require('./static.js')
const { parse } = require('querystring');

// Aux function to process body

function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

function getHomepage(d, res, tarefa_id){
    var url = 'http://localhost:3000/tarefas';
    axios.get(url)
    .then(function (response) {
        var tarefas = response.data;
        var html = templates.homepage(d, tarefas, tarefa_id);
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

// Server creation

var alunosServer = http.createServer(function (req, res) {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
                if(req.url == '/'){
                    getHomepage(d, res)
                }
                else{
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write("<p>" + req.method + " unsupported in this server.</p>")
                    res.end()
                }

                break
            case "POST":
                if(req.url == '/'){
                    var url = 'http://localhost:3000/tarefas';
                    collectRequestBodyData(req, result => {
                        if(result){
                            console.log(result)
                            switch(result.type){
                                case "NEW":
                                    var new_tarefa = {
                                        "description": result.description,
                                        "owner": result.owner,
                                        "date": result.date,
                                        "completed": false
                                    }
                                    axios.post(url, new_tarefa).then(function (response) {
                                        getHomepage(d, res)
                                    })
                                    break
                                case "CHANGE":
                                    var changed_tarefa = {
                                        "id": result.id,
                                        "description": result.description,
                                        "owner": result.owner,
                                        "date": result.date,
                                        "completed": (result.completed === "true") 
                                    }
                                    axios.put(url + "/" + result.id, changed_tarefa).then(function (response) {
                                        getHomepage(d, res)
                                    })
                                    break
                                case "COMPLETED":
                                        axios.get(url+"/"+result.id)
                                        .then(function (response) {
                                            var tarefa = response.data;
                                            tarefa.completed = !tarefa.completed
                                            axios.put(url + "/" + result.id, tarefa).then(function (response) {
                                                getHomepage(d, res)
                                            })
                                        }
                                        )
                                        break
                                case "EDIT":
                                    console.log(result.id)
                                    getHomepage(d, res, result.id)
                                    break
                                case "REMOVE":
                                    axios.delete(url + "/" + result.id).then(function (response) {
                                        getHomepage(d, res)
                                    })
                                    break
                                default:
                                    break
                            }
                        }
                        else{
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    });
                }
                else{
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write('<p>Unsupported POST request: ' + req.url + '</p>')
                    res.write('<p><a href="/">Return</a></p>')
                    res.end()
                }
                break
            default: 
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.method + " unsupported in this server.</p>")
                res.end()
        }
    }
    
})

alunosServer.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
})



