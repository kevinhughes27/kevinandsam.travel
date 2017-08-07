#!/usr/bin/env python3

"""
get_temperature_data.py

Purpose: fetch and build my dataset of temperature
         estimate for time of year grouped by country.

         The countries should be saved that makes them
         easy to match against the countries from topojson.

Note: requires python3 for the country_converter package

Other possible data sources:
http://berkeleyearth.org/data/
https://opendata.stackexchange.com/questions/4629/how-can-i-get-temperature-data-for-each-country-annual
"""

import country_converter as coco
import requests
import json

# get list of countries in the topo json
def countries():
    countries = []

    response = requests.get('https://s3-us-west-2.amazonaws.com/vida-public/geo/world-topo-min.json')
    data = response.json()

    for object in data['objects']['countries']['geometries']:
        countries.append(object['properties']['name'])

    return countries

# http://climatedataapi.worldbank.org
# https://datahelpdesk.worldbank.org/knowledgebase/articles/902061-climate-data-api
def worldbank_api():
    country_temperatures = {}

    for country in countries():
        country_iso3 = coco.convert(names=[country], to='ISO3')

        # host = 'http://climatedataapi.worldbank.org/climateweb/rest/v1/country'
        # type = 'mavg'
        # # I should pick this more carefully or average all the models potentially
        # # I could email API help with this question they might have a suggestion.
        # gcm = 'bccr_bcm2_0'
        # # I am going to chose the 'b1' model for predicted temperatures
        # # http://www.ipcc.ch/ipccreports/sres/emission/index.php?idp=3 for more details
        # sres = 'b1'
        # var = 'tas'
        # start = '2020'
        # end = '2039'
        # url = '/'.join([host, type, gcm, sres, var, start, end, country_iso3]) + '.json'

        host = 'http://climatedataapi.worldbank.org/climateweb/rest/v1/country'
        type = 'mavg'
        var = 'tas'
        start = '1980'
        end = '1999'
        url = '/'.join([host, type, var, start, end, country_iso3]) + '.json'

        try:
            response = requests.get(url)
            data = response.json()
            country_temperatures[country] = data[0]['monthVals']
        except Exception as e:
            if (response.text == 'Invalid country code. Three letters are required'):
                print('Missing data country=', country, ' ISO3=', country_iso3)
            else:
                print('Error country=', country, ' ISO3=', country_iso3)

    return country_temperatures

if __name__ == "__main__":
    output = worldbank_api()

    with open('country_temperatures.json', 'w') as outfile:
        json.dump(output, outfile, indent=2)
