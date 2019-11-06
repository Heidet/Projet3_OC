$(function(){  // window.onload = (function(){
var map = L.map('leaflet').setView([47.7475, 7.3375], 14);  /****coordonnée GPS Mulhouse + zoom*/
var osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { 
             attribution: '© OpenStreetMap contributors',
            maxZoom: 19
        });
    
        map.addLayer(osmLayer);
    }) 

    var map = L.map('cluster').setView([46.90296, 1.90925], 6);

    var stamenToner = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
        attribution: 'Map tiles by Stamen Design, CC BY 3.0 — Map data © OpenStreetMap',
        subdomains: 'abcd',
        minZoom: 0,
        maxZoom: 20,
        ext: 'png'
    });
    
    map.addLayer(stamenToner);

    var markersCluster = new L.MarkerClusterGroup();

var cities = getCities();
    for (var i = 0; i < cities.length; i++) {
        var latLng = new L.LatLng(cities[i][1], cities[i][2]);
        var marker = new L.Marker(latLng, {title: cities[i][0]});
        markersCluster.addLayer(marker);
    }

map.addLayer(markersCluster);

var markersClusterCustom = new L.MarkerClusterGroup({
    iconCreateFunction: function(cluster) {
        return L.divIcon({ 
            html: cluster.getChildCount(), 
            className: 'mycluster', 
            iconSize: null 
        });
    }
});

var markersClusterCustomPlus = new L.MarkerClusterGroup({
    iconCreateFunction: function(cluster) {
        var digits = (cluster.getChildCount()+'').length;
        return L.divIcon({ 
            html: cluster.getChildCount(), 
            className: 'cluster digits-'+digits,
            iconSize: null 
        });
    }
});