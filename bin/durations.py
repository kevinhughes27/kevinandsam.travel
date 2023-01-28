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


def load_year_trip():
    data_path = Path(__file__).parent / "../src/data/yearTrip.json"

    with open(data_path, "r") as f:
        locations = json.load(f)

    locations.pop(0)  # remove starting ottawa

    # sort by date because sometimes I took some creative liberty with the ordering in the json file
    # so the map would draw nicer lines
    locations = sorted(locations, key=lambda location: datetime.strptime(location["date"], "%Y-%m-%d"))

    # create a list of countries only
    countries = []

    for location in locations:
        country_name = location["name"].split(", ")[1] if ", " in location["name"] else location["name"]

        if len(countries) == 0 or country_name != countries[-1]["name"]:
            countries.append({
                "name": country_name,
                "date": location["date"],
            })

    return locations, countries


if __name__ == "__main__":
    locations, countries = load_year_trip()

    if "all" not in sys.argv:
        locations = countries

    last_location = locations[0]

    for location in locations:
        start = datetime.strptime(last_location["date"], "%Y-%m-%d")
        end = datetime.strptime(location["date"], "%Y-%m-%d")
        duration = (end - start).days

        if duration == 0:
            continue

        if "dates" in sys.argv:
            print(f"{last_location['name']} {start.strftime('%b %d')} to {end.strftime('%b %d')}")
        else:
            print(f"{last_location['name']} {duration} days")

        last_location = location
