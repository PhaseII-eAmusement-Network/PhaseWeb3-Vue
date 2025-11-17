import sys
import os
import re
import json
import xml.etree.ElementTree as ET

args = sys.argv
if len(args) != 3:
    print('<title_parser> <achievement_info.xml> <title_parts_info.xml>\nWrites a resulting JSON file to the same path.')
    sys.exit()

achFilePath = args[1]
if not os.path.exists(achFilePath):
    print(f'The path {achFilePath} does not exist!')
    sys.exit()

partsFilePath = args[2]
if not os.path.exists(partsFilePath):
    print(f'The path {partsFilePath} does not exist!')
    sys.exit()

if not achFilePath.endswith('.xml'):
    print('You must supply an XML file.')
    sys.exit()

if not partsFilePath.endswith('.xml'):
    print('You must supply an XML file.')
    sys.exit()

def parseParts(xmlFile: str) -> dict:
    root = ET.fromstring(xmlFile)
    parts = {}
    for part in root.findall('body/data'):
        partId = part.find('parts_id')
        if not partId.text:
            continue

        partJIS = part.find('parts')
        if partJIS == None:
            continue

        partStr = bytes.fromhex(partJIS.text).decode('shift-jis')
        parts[int(partId.text)] = partStr
    return parts

def parseAch(xmlFile: str, parts: dict) -> list[dict]:
    root = ET.fromstring(xmlFile)
    titles = []
    for title in root.findall('body/data'):
        title_id = title.find('id', None)
        if not title_id.text:
            continue

        index = title.find('index').text
        if not index:
            continue

        partStr = ""
        part_id = 0
        is_need_parts = title.find('is_need_parts').text
        if int(is_need_parts):
            parts_id = title.find('parts_id')
            partStr = parts[int(parts_id.text)]
            part_id = int(parts_id.text)

        partJIS = title.find('template')
        if partJIS == None:
            continue
        titleStr = bytes.fromhex(partJIS.text).decode('shift-jis')
        titleStr = titleStr.replace('%s', partStr)

        conditionJIS = title.find('condition')
        if conditionJIS == None:
            continue
        conditionStr = bytes.fromhex(conditionJIS.text).decode('shift-jis')
        
        parsedData = {}
        parsedData['label'] = titleStr
        parsedData['condition'] = conditionStr
        parsedData['index'] = int(title_id.text)
        parsedData['part'] = int(part_id)
        parsedData['id'] = int(index)
        titles.append(parsedData)
    return titles

achData = []
with open(partsFilePath, 'r', encoding='utf-8') as inFile:
    parts = parseParts(inFile.read())

with open(achFilePath, 'r', encoding='utf-8') as inFile:
    achData = parseAch(inFile.read(), parts)

with open(achFilePath.replace('.xml', '.json'), 'w', encoding='utf-8') as outFile:
    outFile.write(json.dumps(achData, indent=4))

print(f'Converted {len(achData)} parts\nyippie!')