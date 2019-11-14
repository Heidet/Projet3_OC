class Map {
    constructor(longitude, latitude, zoom){
        this.instance = L.map('leaflet').setView([longitude, latitude], zoom);  /****coordonnée GPS Mulhouse + zoom*/
        let osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19
        });
        this.instance.addLayer(osmLayer);
    }
    addMarker(position, onClick){
        let marker = L.marker([position['lat'], position['lng']]); // intégration lat + lng sur maps . 
        marker.on('click', onClick, this);
        marker.addTo(this.instance);
   }
}

