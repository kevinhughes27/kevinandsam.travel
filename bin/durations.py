#!/usr/bin/python3

import demjson
from datetime import datetime

file = open("src/data/route.js")
javascript_code = file.read()

target = "export const locations ="
start = javascript_code.find(target) + len(target)
locations_json = javascript_code[start:]

allLocations = demjson.decode(locations_json)
locations = [l for l in allLocations[1:] if l.get('visit') != False or l.get('name') == 'Ottawa' ]

last_location = locations[0]

for location in locations[1:]:

    start = datetime.strptime(location['date'], '%Y-%m-%d')
    end = datetime.strptime(last_location['date'], '%Y-%m-%d')
    duration = start - end

    output = last_location['name'] + ' ' + str(duration.days) + ' days'
    print(output)

    last_location = location

output = 'Vietnam 18 days'
print(output)
