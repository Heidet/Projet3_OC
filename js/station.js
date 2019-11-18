//** objet stations toute valeurs API contructor *** /// 

///** Const liste station, recupération données appel ajax **/
class Formulaire {
    constructor(name, address, status, available_bikes, available_bike_stands, icon){
        this.nom = name;
        this.addresse = address;
        this.status = status;
        this.dispo = available_bikes;
        this.capacite = available_bike_stands;
        this.icon = icon; 
    }
    showStation() {
        document.getElementById("station-name").innerHTML = this.nom;
        document.getElementById("adresse-station").innerHTML = this.addresse;
        document.getElementById("etat-station").innerHTML = this.status;
        document.getElementById("dispo").innerHTML = this.dispo;
        document.getElementById("capacity").innerHTML = this.capacite;
    }
    iconMarqueur () {
        if(data.status === "OPEN") {
            this.icon = "css/images/marker-icon.png"; // Stations Ouvertes => Marqueur vert
        } else if(data.status === "CLOSED") {
            this.icon = "css/images/marker-icon-rouge.png"; // Stations Fermer => Marqueur rouge
        }
        if(data.available_bike =< "4") {
            this.icon = "css/images/marker-icon-jaune.png"; // Stations -4 velos => Marqueur jaune
        }
    }
};