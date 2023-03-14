//-----------------Single Page-----------------
exports.homepage = function(d, tarefas, tarefa_id){
    var page = `
    <html>
    <head>
        <title>Tarefas</title>
        <meta charset="utf-8"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body >
        <div class="w3-card-4">
            <header class="w3-container w3-blue-grey">
                <h1>Tarefas</h1>
            </header>

            <div class="w3-container">

                <form class="w3-container w3-section w3-row" method="POST">
                    <header class="w3-container w3-blue-grey">
                        <h3>Nova Tarefa</h3>
                    </header>
                    <fieldset>
                        <input type="hidden" name="type" value="NEW">
                        <label>Descrição</label>
                        <input class="w3-input w3-round" type="text" name="description">
                        <label>Dono da tarefa</label>
                        <input class="w3-input w3-round" type="text" name="owner">
                        <label>Date Limite</label>
                        <input class="w3-input w3-round" type="text" name="date">
                    </fieldset>

                    <button class="w3-btn w3-blue-grey w3-section" type="submit">Adicionar</button>
                </form>

                <div class="w3-row">
                    <div class="w3-col m6">
                        <div class="w3-margin">
                            <header class="w3-container w3-blue-grey">
                                <h3>Tarefas a realizar</h3>
                            </header>

                            <table class="w3-table-all">
                                <tr>
                                    <th>Descrição</th>
                                    <th>Dono da tarefa</th>
                                    <th>Date Limite</th>
                                    <th></th>
                                </tr>
`
    for (i in tarefas){
        if (tarefas[i].completed == false){
            page += `
            <tr>
                <th>${tarefas[i].description}</th>
                <th>${tarefas[i].owner}</th>
                <th>${tarefas[i].date}</th>
                <th class="w3-row">
                    <form class="w3-col m4" method="POST">
                        <input type="hidden" name="type" value="COMPLETED">
                        <input type="hidden" name="id" value="${tarefas[i].id}">
                        <button class="w3-circle w3-light-green w3-tiny" type="submit">✓</button>
                    </form>
                    <form class="w3-col m4" action="/#editar" method="POST">
                        <input type="hidden" name="type" value="EDIT">
                        <input type="hidden" name="id" value="${tarefas[i].id}">
                        <button class="w3-circle w3-yellow w3-tiny" type="submit">✎</button>
                    </form>
                    <form class="w3-col m4" method="POST">
                        <input type="hidden" name="type" value="REMOVE">
                        <input type="hidden" name="id" value="${tarefas[i].id}">
                        <button class="w3-circle w3-red w3-tiny" type="submit">✗</button>
                    </form>
                </th>
            </tr>
`
}
        }

    page +=`
                            </table>
                        </div>    
                    </div>

                    <div class="w3-col m6">
                        <div class="w3-margin">
                            <header class="w3-container w3-blue-grey">
                                <h3>Tarefas terminadas</h3>
                            </header>
                            <table class="w3-table-all">
                                <tr>
                                    <th>Descrição</th>
                                    <th>Dono da tarefa</th>
                                    <th>Date Limite</th>
                                </tr>
`
    for (i in tarefas){
        if (tarefas[i].completed == true){
        page += `
                                <tr>
                                    <th>${tarefas[i].description}</th>
                                    <th>${tarefas[i].owner}</th>
                                    <th>${tarefas[i].date}</th>
                                    <th class="w3-row">
                                        <form class="w3-col m4" method="POST">
                                            <input type="hidden" name="type" value="COMPLETED">
                                            <input type="hidden" name="id" value="${tarefas[i].id}">
                                            <button class="w3-circle w3-light-green w3-tiny" type="submit"><</button>
                                        </form>
                                        <form class="w3-col m4" action="/#editar" method="POST">
                                            <input type="hidden" name="type" value="EDIT">
                                            <input type="hidden" name="id" value="${tarefas[i].id}">
                                            <button class="w3-circle w3-yellow w3-tiny" type="submit">...</button>
                                        </form>
                                        <form class="w3-col m4" method="POST">
                                            <input type="hidden" name="type" value="REMOVE">
                                            <input type="hidden" name="id" value="${tarefas[i].id}">
                                            <button class="w3-circle w3-red w3-tiny" type="submit">x</button>
                                        </form>
                                    </th>
                                </tr>
        `
    }
}

    page +=`
                            </table>
                        </div>
                    </div>
                    `
    if (tarefa_id != undefined){
        tarefa_atual = tarefas.find(tarefa => tarefa.id == tarefa_id)
        page += `
        <form action=".." class="w3-container w3-section w3-row" id="editar" method="POST">
            <header class="w3-container w3-blue-grey">
                <h3>Editar Tarefa</h3>
            </header>
            <fieldset>
                <input type="hidden" name="type" value="CHANGE">
                <input type="hidden" name="id" value="${tarefa_atual.id}">
                <input type="hidden" name="completed" value="${tarefa_atual.completed}">
                <label>Descrição</label>
                <input class="w3-input w3-round" type="text" value="${tarefa_atual.description}" name="description">
                <label>Dono da tarefa</label>
                <input class="w3-input w3-round" type="text" value="${tarefa_atual.owner}" name="owner">
                <label>Date Limite</label>
                <input class="w3-input w3-round" type="text" value="${tarefa_atual.date}" name="date">
            </fieldset>

            <button class="w3-btn w3-blue-grey w3-section" type="submit">Alterar</button>
        </form>
`
    }


    page += `
                </div>

            </div>

            <footer class="w3-container w3-blue-grey">
                <address>Gerado por pg50506::RPCW2022 em ${d} - [<a href="/">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `
    return page;
}