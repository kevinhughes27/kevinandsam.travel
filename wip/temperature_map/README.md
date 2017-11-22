## Temperate Map

A map of average temperature by time of year. A slider lets the user adjust the month and view the average temperature map.

Data is fetched from the World Bank climat api and saved to JSON using a python script. Note that this data is fairly complex - I had to choose a future scenario and modelling technique.

## Development

run `python -m SimpleHTTPServer 8000`
then access [http://localhost:8000/temperature_map/index.html](http://localhost:8000/temperature_map/index.html)

## Related work
* [https://news.ycombinator.com/item?id=15074526](https://news.ycombinator.com/item?id=15074526) is a very similar tool. I like my presentation better since its more informative to see the gradients but I think their data is better.

## Useful examples
* [click-to-zoom via transform](https://bl.ocks.org/mbostock/2206590)
There is a whole series on map manipulation
* weather over time for the UK only [example](http://kyrandale.com/viz/uk-weather-stations.html), [github](https://github.com/Kyrand/uk-weather-stations)
* [with latitude and longtitude (although I'm not sure why that is special)](http://bl.ocks.org/lokesh005/7640d9b562bf59b561d6)
* world map [example](https://vida.io/gists/TWNbJrHvRcR3DeAZq), [github](https://gist.github.com/dnprock/bb5a48a004949c7c8c60)
* [map with slider](http://bl.ocks.org/tomschulze/961d57bd1bbd2a9ef993f2e8645cb8d2)
