//-----------------Single Page-----------------
exports.homepage = function(d, tarefas_realizar, tarefas_feitas){
    var page = `
    <html>
    <head>
        <title>Tarefas</title>
        <meta charset="utf-8"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-red">
                <h1>Tarefas</h1>
            </header>

            <div class="w3-container">

                <form class="w3-container w3-section w3-row" method="POST">
                    <header class="w3-container w3-red">
                        <h3>Nova Tarefa</h3>
                    </header>
                    <fieldset>
                        <label>Descrição</label>
                        <input class="w3-input w3-round" type="text" name="description">
                        <label>Dono da tarefa</label>
                        <input class="w3-input w3-round" type="text" name="owner">
                        <label>Date Limite</label>
                        <input class="w3-input w3-round" type="text" name="date">
                    </fieldset>

                    <button class="w3-btn w3-red w3-section" type="submit">Adicionar</button>
                </form>

                <div class="w3-row">
                    <div class="w3-col m6">
                        <div class="w3-margin">
                            <header class="w3-container w3-red">
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
    for (i in tarefas_realizar){
        page += `
                                <tr>
                                    <th>${tarefas_realizar[i].description}</th>
                                    <th>${tarefas_realizar[i].owner}</th>
                                    <th>${tarefas_realizar[i].date}</th>
                                    <th>
                                        <form method="POST">
                                            <input type="hidden" name="id" value="${tarefas_realizar[i].id}">
                                            <button class="w3-circle w3-red w3-tiny" type="submit">✓</button>
                                        </form>
                                    </th>
                                </tr>
        `
    }

    page +=`
                            </table>
                        </div>    
                    </div>

                    <div class="w3-col m6">
                        <div class="w3-margin">
                            <header class="w3-container w3-red">
                                <h3>Tarefas terminadas</h3>
                            </header>
                            <table class="w3-table-all">
                                <tr>
                                    <th>Descrição</th>
                                    <th>Dono da tarefa</th>
                                    <th>Date Limite</th>
                                </tr>
`
    for (i in tarefas_feitas){
        page += `
                                <tr>
                                    <th>${tarefas_feitas[i].description}</th>
                                    <th>${tarefas_feitas[i].owner}</th>
                                    <th>${tarefas_feitas[i].date}</th>
                                </tr>
        `
    }

    page +=`
                            </table>
                        </div>
                    </div>
                </div>

            </div>

            <footer class="w3-container w3-red">
                <address>Gerado por pg50506::RPCW2022 em ${d} - [<a href="/">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `
    return page;
}