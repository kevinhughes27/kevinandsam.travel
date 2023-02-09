#!/usr/bin/env python3

import json
from pathlib import Path
from collections import defaultdict


def country_name(location):
    return location["name"].split(", ")[1] if ", " in location["name"] else location["name"]


def load_year_trip():
    countries = set()
    data_path = Path(__file__).parent / "../data/yearTrip.json"

    with open(data_path, "r") as f:
        locations = json.load(f)

    locations.pop(0)  # remove starting ottawa

    for location in locations:
        name = country_name(location)

        if name not in ["Ottawa", "Calgary"]:
            countries.add(name)

    return countries


def load_trips(data_path, ignore=[]):
    countries = defaultdict(int)

    with open(data_path, "r") as f:
        trips = json.load(f)

    for trip in trips:
        for idx, location in enumerate(trip["locations"]):
            name = country_name(location)

            # only count a country once per trip
            if idx > 0:
                prev_country = country_name(trip["locations"][idx - 1])
                if name == prev_country:
                    continue

            if name not in ignore:
                countries[name] = countries[name] + 1

    return countries


if __name__ == "__main__":
    countries = defaultdict(int)

    for country in load_year_trip():
        countries[country] = 1

    for country in load_trips(Path(__file__).parent / "../data/trips.json", ignore=["Gros Morne"]):
        countries[country] += 1

    for country in load_trips(Path(__file__).parent / "../data/kevin.json", ignore=["Saskatoon", "Fort Nelson", "Whitehorse"]):
        countries[country] += 1

    print(f"{len(countries)} countries visited:\n")
    print(countries)
