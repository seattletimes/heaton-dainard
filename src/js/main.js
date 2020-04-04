// var paywall = require("./lib/paywall");
// setTimeout(() => paywall(12345678), 5000);

require("component-responsive-frame/child");
require("component-leaflet-map");

var data = require("../../data/data_for_map.sheet.json"),
	map_el = document.querySelector("leaflet-map"),
	L = map_el.leaflet,
	map = map_el.map;

console.log(data);
console.log(map);

data.forEach(function(d) {
	if (d.latitutde != 0) {
		L.circle([d.latitude, d.longitude]).addTo(map);
	}
})