#!/usr/bin/env python3

import json
from pathlib import Path

countries = set()


def country_name(location):
    return location["name"].split(", ")[1] if ", " in location["name"] else location["name"]


def add_year_trip():
    data_path = Path(__file__).parent / "../src/data/yearTrip.json"

    with open(data_path, "r") as f:
        locations = json.load(f)

    locations.pop(0)  # remove starting ottawa

    for location in locations:
        name = country_name(location)

        if name not in ["Ottawa", "Calgary"]:
            countries.add(name)


# kevin and sam trips + kevin, sam and miles trips
def add_family_trips():
    data_path = Path(__file__).parent / "../src/data/trips.json"

    with open(data_path, "r") as f:
        trips = json.load(f)

    for trip in trips:
        for location in trip["locations"]:
            name = country_name(location)

            if name not in ["Gros Morne"]:
                countries.add(name)


# add solo and childhood family trips
def add_solo_trips():
    data_path = Path(__file__).parent / "../src/data/kevin.json"

    with open(data_path, "r") as f:
        trips = json.load(f)

    for trip in trips:
        for location in trip["locations"]:
            name = country_name(location)

            if name not in ["Saskatoon", "Fort Nelson", "Whitehorse"]:
                countries.add(name)


if __name__ == "__main__":
    add_year_trip()
    add_family_trips()
    add_solo_trips()

    print(f"{len(countries)} countries visited:\n")
    print(countries)
