from dataclasses import dataclass
import json

with open('mapa.json') as f:
    data = json.load(f)

citys = data['cidades']
citys.sort(key=lambda x: x['nome'])
connections = data['ligações']

@dataclass
class City:
    id: int
    nome: str
    população: int
    descrição: str
    distrito: str
    ligacoes: list

city_list = {}

for c in citys:
    city_list[c['id']] = City(c['id'], c['nome'], c['população'], c['descrição'], c['distrito'], [])
    for l in connections:
        if l['origem'] == c['id']:
            city_list[c['id']].ligacoes.append((l['destino'],l['distância']))

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

for city in city_list.items():
    web_page += f"""
                        <li><a href="#{city[0]}">{city[1].nome}</a></li>
"""

web_page += """                    </ul>
                </td>
                <td width="70%">
"""

for city in city_list.items():
    web_page += f"""
                    <!-- Informação das cidades -->
                    <a name="{city[0]}"/>
                    <h3>{city[1].nome}</h3>
                    <p><b>População</b> {city[1].população}</p>
                    <p><b>Descrição</b> "{city[1].descrição}"</p>
                    <p><b>Distrito</b> {city[1].distrito}</p>
    """

    if city[1].ligacoes:
        web_page += f"""
                    <h4>Ligações</h4>
                    <ul>
        """
        for l in city[1].ligacoes:
            web_page += f"""
                        <li><a href="#{l[0]}">{city_list[l[0]].nome}</a> ({l[1]} km)</li>
            """
        web_page += """
                    </ul>
        """

    web_page += f"""
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

print(web_page)