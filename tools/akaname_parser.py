import sys
import os
import re
import json
import xml.etree.ElementTree as ET

args = sys.argv
if len(args) != 2:
    print('<akaname_parser> <akaname_parts.xml path>\nWrites a resulting JSON file to the same path.')
    sys.exit()

inFilePath = args[1]
if not os.path.exists(inFilePath):
    print(f'The path {inFilePath} does not exist!')
    sys.exit()

if not inFilePath.endswith('.xml'):
    print('You must supply an XML file.')
    sys.exit()

def parseXML(xmlFile: str) -> list[dict]:
    root = ET.fromstring(xmlFile)
    parts = []
    for part in root.findall('part'):
        partId = part.attrib.get('id', None)
        if not partId:
            continue

        wordFormat = part.find('word')
        if wordFormat.text == None:
            continue
        
        parsedData = {}
        if wordFormat.text.startswith('['):
            pattern = re.findall(r"\[([a-z]+):([^\]]+)\]", wordFormat.text)
            parsedData = {key: value.split(',') if ',' in value else value for key, value in pattern}
            contentMatch = re.search(r"\[c:[^\]]+\](.*?)\[/c\]", wordFormat.text)
            parsedData['label'] = contentMatch.group(1) if contentMatch else ""
        else:
            parsedData['label'] = wordFormat.text
        parsedData['id'] = int(partId)
        parts.append(parsedData)
    return parts

akanameData = []
with open(inFilePath, 'r', encoding='shift-jis') as inFile:
    akanameData = parseXML(inFile.read())

with open(inFilePath.replace('.xml', '.json'), 'w', encoding='utf-8') as outFile:
    outFile.write(json.dumps(akanameData, indent=4))

print(f'Converted {len(akanameData)} akaname parts\nyippie!')