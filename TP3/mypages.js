exports.pessoasPage = function (lista) {
    var pagHTLM = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <title>About people ...</title>
            <link rel="stylesheet" href="w3.css">
        </head>
        <body>
            <div class="w3-card-4">

                <header class="w3-container w3-teal">
                    <h1 class="w3-left">Lista de pessoas</h1>
                    <a href="../" class="w3-btn w3-white w3-border w3-border-teal w3-round-xlarge w3-right w3-center-elem">Homepage</a>
                </header>

                <div class="w3-container">
                    <table class="w3-table-all w3-section w3-round-xlarge">
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Idade</th>
                            <th>Sexo</th>
                            <th>Cidade</th>
                        </tr>
`

    for (let i = 0; i < lista.length; i++) {
        pagHTLM += `
                        <tr>
                            <td><a href="/pessoas/${lista[i].id}">${lista[i].id}<a></td>
                            <td>${lista[i].nome}</td>
                            <td>${lista[i].idade}</td>
                            <td>${lista[i].sexo}</td>
                            <td>${lista[i].morada.cidade}</td>
                        </tr>
`
    }


    pagHTLM += `
                    </table>
                    
                </div>
    
                <footer class="w3-container w3-teal">
                    <h5>RPCW2023</h5>
                </footer>
            </div>
        </body>
    </html>
`
    return pagHTLM;
}

exports.pessoaPage = function (pessoa) {
    var pagHTLM = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <title>${pessoa.id}</title>
            <link rel="stylesheet" href="../w3.css">
        </head>
        <body>
            <div class="w3-card-4">

                <header class="w3-container w3-teal">
                    <h1 class="w3-left">${pessoa.nome}</h1>
                    <a href="../pessoas" class="w3-btn w3-white w3-border w3-border-teal w3-round-xlarge w3-right w3-center-elem">Listagem de Pessoas</a>
                </header>

                <div class="w3-container w3-margin w3-round-xlarge w3-blue-grey">
                    <ul class="w3-ul">
                    
`
        console.log(pessoa)
        Object.entries(pessoa).forEach(([key, value]) => {
            if (value instanceof Object && !(value instanceof Array)) {
                pagHTLM += `
                <li class="w3-bar no-padding w3-hover-teal">
                    <div class="w3-bar-item w3-round-large">
                        <span class="w3-tag w3-padding w3-round-large w3-teal w3-center">${key}</span>
                            <ul class="w3-ul w3-margin-left">
`
                Object.entries(value).forEach(([key2, value2]) => {
                    pagHTLM += `
                                <li class="w3-bar no-padding">
                                    <div class="w3-bar-item w3-round-large">
                                        <span class="w3-tag w3-padding w3-round-large w3-teal w3-center">${key2}</span>
                                        <span class="w3-margin-left">${value2}</span>
                                    </div>
                                </li>
`
                })

                pagHTLM += `
                            </ul>
                    </div>
                </li>
`
            }
            else {
                pagHTLM += `
                                <li class="w3-bar no-padding w3-hover-teal">
                                    <div class="w3-bar-item w3-round-large">
                                        <span class="w3-tag w3-padding w3-round-large w3-teal w3-center">${key}</span>
                                        <span class="w3-margin-left">${value}</span>
                                    </div>
                                </li>
        `
            }
        })

    pagHTLM += `
                    </ul>
                </div>
    
                <footer class="w3-container w3-teal">
                    <h5>RPCW2023</h5>
                </footer>
            </div>
        </body>
    </html>
`
    return pagHTLM;
}

function generate_distrib(obj) {
    var pagHTLM = `
    <div class="w3-container w3-blue-grey w3-padding-small">
    `
    obj.forEach((list) => { 
        pagHTLM += `
        <p><a href="/pessoas?sexo=${list[0]}">${list[0]}</a></p>
        <div class="w3-white w3-round-xlarge w3-large">
                <div class="w3-container w3-teal w3-round-xlarge w3-center" style="width:${list[1]}%">${list[1].toFixed(1)}%</div>
        </div>
        `
    })

    pagHTLM += `
    </div>
    `
    return pagHTLM;
}

function generate_distrib_bars(obj) {
    var pagHTLM = `
    <div class="w3-container w3-blue-grey w3-padding-small">
        <div class="w3-bar">
    `
    obj.forEach((list) => {
        pagHTLM += `
        <div class="w3-bar-item w3-fix-size"><a href="/pessoas?q=${list[0]}">${list[0]}</a> <span class="w3-badge w3-teal">${list[1].toFixed(1)}%</span></div>
        `
    })

    pagHTLM += `
    </div>
    </div>
    `
    return pagHTLM;
}

function generate_distrib_bars_collum(obj) {
    var pagHTLM = `
    <div class="w3-container w3-blue-grey w3-padding-small">
        <div class="w3-bar-block">
    `
    obj.forEach((list) => {
        pagHTLM += `
        <div class="w3-bar-item"><a href="/pessoas?profissao=${list[0]}">${list[0]}</a> <span class="w3-badge w3-teal">${list[1].toFixed(1)}%</span></div>
        `
    })

    pagHTLM += `
    </div>
    </div>
    `
    return pagHTLM;
}

exports.homepage = function (distrib) {
    var pagHTLM = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <title>About people ...</title>
            <link rel="stylesheet" href="w3.css">
        </head>
        <body>
            <div class="w3-card-4">

                <header class="w3-container w3-teal">
                    <h1 class="w3-left">Homepage</h1>
                    <a href="/pessoas" class="w3-btn w3-white w3-border w3-border-teal w3-round-xlarge w3-right w3-center-elem">See all</a>
                </header>

                <div class="w3-container w3-section">
                    <div class="w3-row">
                        <div class="w3-col m8 l9">
                            <div class=" w3-margin">
                                <header class="w3-container w3-teal">
                                    <h2>Distribuição por desporto</h2>
                                </header>
                                ${generate_distrib_bars(distrib["desportos"])}
                            </div>
                        </div>
                        <div class="w3-col m4 l3">
                            <div class=" w3-margin">
                                <header class="w3-container w3-teal">
                                    <h2>Distribuição por sexo</h2>
                                </header>
                                ${generate_distrib(distrib["sexo"])}
                            </div>
                            <div class=" w3-margin">
                                <header class="w3-container w3-teal">
                                    <h2>Top 10 profissões</h2>
                                </header>
                                ${generate_distrib_bars_collum(distrib["profissao"])}
                            </div>
                        </div>
                    </div>
                </div>
    
                <footer class="w3-container w3-teal">
                    <h5>RPCW2023</h5>
                </footer>
            </div>
        </body>
    </html>
`
    return pagHTLM;
}