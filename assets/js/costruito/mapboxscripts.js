// Basemap switch
map.on('style.load', function() {
	addMarkers();
	addSource();
	addLayer();
});
function switchLayer(layer) {
	var layerId = layer.target.id;
	map.setStyle('mapbox://styles/guercusguo/' + layerId);
};
for (var i = 0; i < inputs.length; i++) {
	inputs[i].onclick = switchLayer; }
	// still incomplete
	// End of Basemap switch
	map.addControl(new mapboxgl.NavigationControl());

	// START of popup on click for pointal features
	map.on('load', function () {
		map.on('click', 'infernot', function (e) {
			var coordinates = e.features[0].geometry.coordinates.slice();
			var description = e.features[0].properties.Denominaz;

			// Ensure that if the map is zoomed out such that multiple
			// copies of the feature are visible, the popup appears
			// over the copy being pointed to.
			while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
				coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
			}

			new mapboxgl.Popup()
			.setLngLat(coordinates)
			.setHTML(description)
			.addTo(map);
		});

		// Change the cursor to a pointer when the mouse is over the places layer.
		map.on('mouseenter', 'infernot', function () {
			map.getCanvas().style.cursor = 'pointer';
		});

		// Change it back to a pointer when it leaves.
		map.on('mouseleave', 'infernot', function () {
			map.getCanvas().style.cursor = '';
		});
	});
	// END of popup on click for pointal features

	// Return to map extent
	document.getElementById('fit').addEventListener('click', function () {
		map.fitBounds([
			[7.798595, 44.523151], // southwestern corner of the bounds
			[8.571995, 45.121761] // northeastern corner of the bounds
		]);
	});
	// END of Return to map extent
