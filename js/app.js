$(function(){  // window.onload = (function(){
var map = L.map('leaflet').setView([47.7475, 7.3375], 14);  /****coordonnée GPS Mulhouse + zoom*/
var osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { 
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19
        });
    
        map.addLayer(osmLayer);
    })

   