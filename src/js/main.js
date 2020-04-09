// var paywall = require("./lib/paywall");
// setTimeout(() => paywall(12345678), 5000);

require("component-responsive-frame/child");
require("component-leaflet-map");

var data = require("../../data/for_graphic.sheet.json"),
	map_el = document.querySelector("leaflet-map"),
	L = map_el.leaflet,
	map = map_el.map;

var formatNumber = function(s) {
  s = s + "";
  var start = s.indexOf(".");
  if (start == -1) start = s.length;
  for (var i = start - 3; i > 0; i -= 3) {
    s = s.slice(0, i) + "," + s.slice(i);
  }
  return s;
};

var formatDecimal = function(s) {
	s = Math.abs(s);
	s = Math.round(s * 10) / 10;
	s = s.toFixed(1);
	return s;
}

var months = ["Jan.", "Feb.", "March", "April", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];

var formatDate = function(s) {
	s = s.split("/")
	s = months[s[0] - 1] + " " + s[1] + ", 20" + s[2];
	return s;
}

data.forEach(function(d) {
	if (d.latitutde != 0 && d.purchase_amount != 0) {
		var circle = L.circle([d.latitude, d.longitude], {
				fillColor: d.purchase_amount_vs_assessment < 0 ? "#B73209" : "#333333",
				fillOpacity: 0.6,
				radius: 300,
				stroke: false
			})
			.addTo(map);

		var popup_content = "<p><strong>" + d.address + "</strong></p>";
		if (d.purchase_date) {
			popup_content = popup_content +
			"<p>Purchased " + formatDate(d.purchase_date) + ", at $" + formatNumber(d.purchase_amount) + "</p>";
		}
		if (d.assessed_value != 0) {
			if (d.purchase_amount_vs_assessment === 0) {
				popup_content = popup_content + "<p>(same as assessed value)</p>"
			} else {
				popup_content = popup_content +
				"<p>(" + formatDecimal(d.purchase_amount_vs_assessment) + (d.purchase_amount_vs_assessment > 0 ? "% more" : "% less") +
				 " than assessed value)" +
				"</p>";
			}
		}
		if (d.sale_date && d.sale_amount != 0) {
			popup_content = popup_content +
			"<p>Sold " + formatDate(d.sale_date) + ", for $" + formatNumber(d.sale_amount) + "</p>";
		}

		circle.bindPopup(popup_content).openPopup();
	}
})