
///** Const liste station, recupération données appel ajax **/
class Formulaire {
    constructor(name, address, status, available_bikes, available_bike_stands){
        this.nom = name;
        this.addresse = address;
        this.status = status;
        this.dispo = available_bikes;
        this.capacite = available_bike_stands;
    }
    showStation ()  {
        if (this.status === "OPEN") {
            document.getElementById("station-name").innerHTML = this.nom;
            document.getElementById("adresse-station").innerHTML = this.addresse;
            document.getElementById("etat-station").innerHTML = this.status;
            document.getElementById("dispo").innerHTML = this.dispo;
            document.getElementById("capacity").innerHTML = this.capacite;

        } else if (this.status === "CLOSED") {
            document.getElementById("etat-station").innerHTML = "Station fermée !!";
            document.getElementById("etat-station").style.color = "red";
            document.getElementById("station-name").innerHTML = this.nom;
            document.getElementById("adresse-station").innerHTML = this.addresse;
            document.getElementById("dispo").innerHTML = 0;
            document.getElementById("capacity").innerHTML = 0;

        }
    }
};