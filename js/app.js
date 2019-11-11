let map = L.map('leaflet').setView([47.7475, 7.3375], 14);  /****coordonnée GPS Mulhouse + zoom*/
let osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
});
map.addLayer(osmLayer);


/**var markersCluster = new L.MarkerClusterGroup();
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
*/
