
///** Const liste station, recupération données appel ajax **/
class Formulaire {
    constructor(name, address, status, available_bikes, available_bike_stands) {
        this.nom = name;
        this.addresse = address;
        this.status = status;
        this.dispo = available_bikes;
        this.capacite = available_bike_stands;
    }
    showStation() {
        if (this.status === "OPEN") {
            $('#station-name').text(this.nom);
            $('#adresse-station').text(this.addresse);
            $('#etat-station').text(this.status);
            $('#dispo').text(this.dispo);
            $('#capacity').text(this.capacite);
            $('#etat-station').css("color", "#40ca3c");

        } else if (this.status === "CLOSED") {
            $('#etat-station').text("Station fermée !!");
            $('#etat-station').color("red");
            $('#station-name').text(this.nom);
            $('#adresse-station').text(this.addresse);
            $('#dispo').text("0");
            $('#capacity').text("0");
        }
    }
    dispoVelo() {
        if (this.dispo > 0) {
            $('#station').show();
        } else if (this.dispo = 0) {
            $('#station').hide();
            $('#error > p ').show();
            $('#error > p ').css("color", "red");
        }

        if (this.dispo > 4) {
            $('#dispo').css("color", "#40ca3c");
        } else if (this.dispo <= 4) {
            $('#dispo').css("color", "#FF8C00");
        }
    }
    affichageSection(){
                document.getElementById("inscription").style.display = "block";
                document.getElementById("annulationReservation").style.display = "none";
                document.getElementById("decompte").style.display = "none";
                document.getElementById("containerCanvas").querySelector("strong").style.color = '#c40404';
                //document.getElementById("containerCanvas").querySelector("span").style.color = '#c40404';  
                document.getElementById("containerCanvas").style.display = "block"; // block du conteneur canvas à l'evenement click du bouton reserver 
                window.scrollTo(0, 1100);//scroll page (x-coord,y-coord) pour scroll auto block signature  
    }
};