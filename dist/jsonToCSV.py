import json
import csv
fileNames = ['universities','universities-pretty','universities_with_mua']
jsonKeys = ('university','thCode','enCode')
for fileName in fileNames:
    with open(fileName+'.json', 'r') as jsonFilePtr:
        universityData = json.load(jsonFilePtr)
        with open(fileName+'.csv', 'w') as csvFilePtr:
            csvWriter = csv.DictWriter(csvFilePtr,jsonKeys)
            csvWriter.writeheader()
            csvWriter.writerows(universityData)
print('Finish !')