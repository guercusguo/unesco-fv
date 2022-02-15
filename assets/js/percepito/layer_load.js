//Load of GeoJSON data
var geojson;
function addSource() {
	map.addSource('vitivinicoli_aree', {
		'type': 'geojson',
		'data': '/../assets/json/areas.geojson'
	});
	map.addSource('musei', {
		'type': 'geojson',
		'data': '/../assets/json/musei_tradizione_vinicola.geojson'
	});
	// Mapbox default DEM source
	map.addSource('mapbox-dem', {
		'type': 'raster-dem',
		'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
		'tileSize': 512,
		'maxzoom': 14
	});
} //END of addSource

// List of added layers; rendering and symbology of GeoJSON data.
function addLayer() {
	map.addLayer({
		'id': 'fill_area',
		'type': 'fill',
		'source': 'vitivinicoli_aree', // reference the data source
		'layout': {
			// Make the layer visible by default.
			'visibility': 'visible'
		},
		'paint': {
			'fill-color': [
				'match',
				['get', 'TIPO'],
				'Buffer zone',
				'#feebe2',
				'Core zone',
				'#f768a1',
				'#ccc'
			],
			//'fill-color': '#0080ff', // blue color fill
			'fill-opacity': 0.3
		}
	});
	// Add a black outline around the polygon.
	map.addLayer({
		'id': 'outline_area',
		'type': 'line',
		'source': 'vitivinicoli_aree',
		'layout': {
			// Make the layer visible by default.
			'visibility': 'visible'
		},
		'paint': {
			'line-color': '#000',
			'line-width': 1
		}
	});
	map.addLayer({
		'id': 'musei',
		'type': 'symbol',
		'layout': {
			// Make the layer visible by default.
			'icon-image': 'musei-marker',
			'visibility': 'visible'
	},
	'source': 'musei',
});
map.addLayer({
	'id': 'sky',
	'type': 'sky',
	'paint': {
		'sky-type': 'atmosphere',
		'sky-atmosphere-sun': [0.0, 0.0],
		'sky-atmosphere-sun-intensity': 15
	}
});
// 3D properties
map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.2 });
// END of 3D properties
}
//END of addLayer

// Markers load and render
function addMarkers () {
	map.on('load', function () {
		// Add an image to use as a custom marker
		map.loadImage(
			'/../assets/markers/musei-marker.png',
			function (error, image) {
				if (error) throw error;
				map.addImage('musei-marker', image);
			}
		);
	});
	// loadImage is async -> images are not rendered when style changes, hence custom markers.
	// Still has problems with certain zooms
	map.on('styleimagemissing', function (e) {
		map.loadImage(fallbackImageUrl, function(err, data) {
			if (!err) {
				if (!map.hasImage(e.id)) {
					map.addImage(e.id, data);
				}
			}
		});
	});
}
// Fallback for sprites / markers not loading when changing styles

// END of Markers load and render