"use strict";

const MAP = L.map('map').setView([50.208568, 15.831504], 2);
 
const CARTO_URL = "https://cartodb-basemaps-{s}.global.ssl.fastly.net/" + "light_all/{z}/{x}/{y}.png";
const URL_OSM = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

const OSM = L.tileLayer(URL_OSM, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    maxZoom: 16,
    minZoom: 9
});
const CARTO = L.tileLayer(CARTO_URL, {
    maxZoom: 16,
    minZoom: 9
});

// const HK = L.marker([50.208568, 15.831504]);
// HK.bindPopup("Tady je Hradec");
// const CIRCLE = L.polyline([[50.203085, 15.822044], [50.20790846247731, 15.818724314811007], [50.215324304591455, 15.822315081095866], [50.21744085888751, 15.829658747939503], [50.215693252024046, 15.842282572025091], [50.21128511467276, 15.847411000548513], [50.205776354759806, 15.848206739218869], [50.20204066890915, 15.842112760370972], [50.20095903905872, 15.834553847280281], [50.203085, 15.822044]], {
//     color: '#0f3057',
//     weight: 5
// });

// const VECTOR = L.layerGroup([HK, CIRCLE])
// const overlays = {
//     'Vector': VECTOR,
// }

const Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    maxZoom: 15,
    minZoom: 9
});


const baseLayers = {
    'Carto': CARTO,
    'OpenStreetMap': OSM,
    'Satelitní': Esri_WorldImagery,
};

const LAYERS = L.control.layers(baseLayers);

// const WATER = 'https://zelda.sci.muni.cz/geoserver/webovka/ows?' +
// 'service=WFS&' + 
// 'version=2.0.0&' + 
// 'request=GetFeature&' +
// 'typeName=webovka%3ANadrze_HK_point&' +
// 'outputFormat=application/json&' +
// 'srsname=EPSG:4326&';

// fetch(WATER)
//     .then(response => response.json())
// 	.then(data => {
//         const WATER_LAYER = L.geoJSON(data);

//         const WATER_CLUSTER = L.markerClusterGroup();
//         WATER_CLUSTER
// 			.addLayer(WATER_LAYER)
// 			.bindPopup(MARKER => {
// 				let content = document.createElement('table');

// 				Object.entries(MARKER.feature.properties)
// 					.forEach(property => {
// 						let row = document.createElement('tr');
// 						row.innerHTML = property.map(val => `<td>${val}</td>`).join('');
// 						content.appendChild(row);
// 					});

//                 return content;
//             });
		
//         LAYERS.addOverlay(WATER_CLUSTER, "Vodní plochy - INFO");
//     });

const WATER_POLYGON = 'https://zelda.sci.muni.cz/geoserver/webovka/ows?' +
'service=WFS&' + 
'version=2.0.0&' + 
'request=GetFeature&' +
'typename=webovka%3ANadrze_selected_HK&' +
'outputFormat=application/json&' +
'srsname=EPSG:4326';

fetch(WATER_POLYGON)
.then(response => response.json())
.then(data => {
    const WATER_LAYER = L.geoJSON(data);

    const WATER_CLUSTER = L.markerClusterGroup();
    WATER_CLUSTER
        .addLayer(WATER_LAYER)
        .bindPopup(MARKER => {
            let content = document.createElement('table');

            Object.entries(MARKER.feature.properties)
                .forEach(property => {
                    let row = document.createElement('tr');
                    row.innerHTML = property.map(val => `<td>${val}</td>`).join('');
                    content.appendChild(row);
                });

            return content;
        });
    
    LAYERS.addOverlay(WATER_CLUSTER, "Vodní plochy");
});

MAP.addControl(LAYERS);

MAP.addLayer(Esri_WorldImagery);
// MAP.addLayer(HK);
// MAP.addLayer(CIRCLE);

