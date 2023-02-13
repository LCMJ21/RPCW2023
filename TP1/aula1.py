# Read a file in JSON

import json

with open('mapa.json') as f:
    data = json.load(f)

citys = data['cidades']
citys.sort(key=lambda x: x['nome'])

web_page = """
<!DOCTYPE html>
<html>
    <head>
        <title>Mapa Virtual</title>
        <meta charset="utf-8">
    </head>
    <body>
        <h1>Mapa Virtual</h1>
        <table>
            <tr>
                <td width="30%" valign="top">
                    <a name="top"/>
                    <h3>Indice</h3>
                    <!-- Lista com o indice -->
                    <ul>
"""

for city in citys:
    web_page += f"""
                        <li><a href="#{city['id']}">{city['nome']}</a></li>
"""

web_page += """                    </ul>
                </td>
                <td width="70%">
"""

for c in citys:
    web_page += f"""
                    <!-- Informação das cidades -->
                    <a name="{c['id']}"/>
                    <h3>{c['nome']}</h3>
                    <p><b>População</b> {c['população']}</p>
                    <p><b>Descrição</b> "{c['descrição']}"</p>
                    <p><b>Distrito</b> {c['distrito']}</p>
                    <a href="#top">Voltar ao topo</a>
                    <center>
                        <hr width="80%">
                    </center>
    """


web_page += """
                </td>
            </tr>
        </table>
    </body>
</html>
"""

connections = data['ligações']
print(web_page)