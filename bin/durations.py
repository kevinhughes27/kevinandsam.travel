#!/usr/bin/env python3

# Usage:
#
#  ./bin/durations.py        prints country durations
#  ./bin/durations.py all    prints detailed durations
#  ./bin/durations.py dates  prints start and end instead of duration. can be used along with `all`

import sys
import json
from pathlib import Path
from datetime import datetime

data_path = Path(__file__).parent / "../src/data/yearTrip.json"

with open(data_path, "r") as f:
    locations = json.load(f)

countries = []

for location in locations:
    country_name = location["name"].split(", ")[1] if ", " in location["name"] else location["name"]

    if country_name not in ["Ottawa", "Calgary"]:
        country_index = next((index for index, country in enumerate(countries) if country["name"] == country_name), None)

        if country_index is None:
            countries.append({
                "name": country_name,
                "date": location["date"],
                "airport": location.get("airport", None)
            })
        else:
            # add missing airport if needed. sometimes our first location in
            # a country didn't have an airport if we arrived some other way
            if not countries[country_index]["airport"] and "airport" in location:
                countries[country_index]["airport"] = location["airport"]

if 'all' not in sys.argv:
    locations = countries
else:
    locations.pop(0)  # remove ottawa

last_location = locations[0]

for location in locations:
    start = datetime.strptime(last_location["date"], '%Y-%m-%d')
    end = datetime.strptime(location["date"], '%Y-%m-%d')
    duration = (end - start).days

    if duration == 0:
        continue

    if "dates" in sys.argv:
        print(f"{last_location['name']} {start.strftime('%b %d')} to {end.strftime('%b %d')}")
    else:
        print(f"{last_location['name']} {duration} days")

    last_location = location
