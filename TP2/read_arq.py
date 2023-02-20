# Import BeautifulSoup
import re
from bs4 import BeautifulSoup as bs
content = []
# Read the XML file
with open("TP2/arq.xml", "r") as file:
    # Read each line in the file, readlines() returns a list of lines
    content = file.readlines()
# Combine the lines in the list into a string
content = "".join(content)
bs_content = bs(content, "lxml")

def add_to_html(entry, key):
    data = entry.find_all(key)
    if len(data) == 1:
        content = data[0].text
    elif len(data) > 1:
        content = ""
        for d in data:
            content += f"""
            <li>{d.text}</li>
"""
    else:
        content = None
    return f"""
    <dt><b>{key.capitalize()}</b></dt>
    <dd>{content}</dd>
""" if content else ""

def tohtml(entry, cc):
    html = f"""
<!DOCTYPE html>
<html>
    <head>
        <title>Arq {cc}: {entry.find("identi").text}</title>
        <meta charset="utf-8">
    </head>
    <body>
        <h1>Arq {cc}: {entry.find("identi").text}</h1>
        <dl>
"""
    tags = list(dict.fromkeys(map(lambda x: x.name, entry.find_all_next(re.compile("^(?!liga).+$"), recursive=False))))
    print(tags)
    for tag in tags:
        html += add_to_html(entry, tag)

    html += f"""
        </dl>
        <a href="http://localhost:7777">back to index</a>
    </body>
</html>
"""
    return html


index_file = """
<!DOCTYPE html>
<html>
    <head>
        <title>Arq Index</title>
        <meta charset="utf-8">
    </head>
    <body>
        <h1>Arq Index</h1>
            <ul>
"""

cc = 1
for entry in bs_content.find_all("arqelem"):
    #write the entry to a file
    with open("TP2/ARQ_FILES/arq" + str(cc) + ".xml", "w") as file:
        file.write("""<?xml version="1.0" encoding="iso-8859-1"?>\n""")
        file.write(str(entry.prettify()))
        index_file += f"""
                        <li><a href="/{cc}">{entry.find("identi").text}</a></li>
"""
    
    with open("TP2/ARQ_FILES/arq" + str(cc) + ".html", "w") as file:
        file.write(tohtml(entry, cc))
    cc+=1

index_file += """
            </ul>
    </body>
</html>
"""

with open("TP2/index.html", "w") as file:
    file.write(index_file)