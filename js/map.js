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

// Objet Station
const Station = {
    nom : null, 
    addresse : null, 
    status : null, 
    dispo : null, 
    capacite : null, 
    emplacementDonnees : document.getElementById("infostation").querySelectorAll("span"),

    dataStation : function(formulaire) {
        this.nom = formulaire.name;
        this.addresse = formulaire.address;
        this.status = formulaire.status;
        this.dispo = formulaire.available_bikes;
        this.capacite = formulaire.available_bike_stands;
    },
    showStation : function() {
        document.getElementById("station-name").innerHTML = this.nom;
        document.getElementById("adresse-station").innerHTML = this.addresse;
        document.getElementById("etat-station").innerHTML = this.status;
        document.getElementById("dispo").innerHTML = this.dispo;
        document.getElementById("capacity").innerHTML = this.capacite;
    },
};
const map = new Map (47.7475, 7.3375, 14)
const api = new ApiClient("b83d4fd83439b86791f32b1d4ee5e1c23a820009", "mulhouse");
    api.getStations(function(datas){
    datas = JSON.parse(datas); // transformer le JSON en objet
    datas.forEach(function(data){ // parcourir objet appel function callback data 
        let position = data['position']; // position callback 
        map.addMarker(position, () => {

            // Insertion des données dans l'objet "station"
            Station.dataStation(data);
        
            // Apparition du bloc contenant les infos de la station sélectionnée
            document.getElementById("infostation").style.display = "block";

            // Insertion des données dans le bloc
            Station.showStation();

        });
    });
});
