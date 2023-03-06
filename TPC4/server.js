// alunos_server.js
// RPCW2023: 2023-03-05
// by jcr

var http = require('http')
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

var id = 0
var tarefas_realizar = []
var tarefas_feitas = []

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
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.end(templates.homepage(d, tarefas_realizar, tarefas_feitas))
                }
                else{
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write("<p>" + req.method + " unsupported in this server.</p>")
                    res.end()
                }

                break
            case "POST":
                if(req.url == '/'){
                    collectRequestBodyData(req, result => {
                        if(result){
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            if (result.id == undefined){
                                result["id"] = id++
                                tarefas_realizar.push(result)
                            }
                            else {
                                var get_tarefa = tarefas_realizar.find(t => t.id == result.id)
                                if (get_tarefa != undefined){
                                    tarefas_feitas.push(get_tarefa)
                                    tarefas_realizar = tarefas_realizar.filter(t => t.id != result.id)
                                }
                            }
                            res.write(templates.homepage(d, tarefas_realizar, tarefas_feitas))
                            res.end()
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



