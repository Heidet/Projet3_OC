//** objet stations toute valeurs API contructor *** /// 

///** Const liste station, recupération données appel ajax **/
class Station {
    constructor(name, address, status, available_bikes, available_bike_stands){
        this.nom = name;
        this.addresse = address;
        this.status = status;
        this.dispo = available_bikes;
        this.capacite = available_bike_stands;
    }
    showStation() {
        document.getElementById("station-name").innerHTML = this.nom;
        document.getElementById("adresse-station").innerHTML = this.addresse;
        document.getElementById("etat-station").innerHTML = this.status;
        document.getElementById("dispo").innerHTML = this.dispo;
        document.getElementById("capacity").innerHTML = this.capacite;
    }
};

