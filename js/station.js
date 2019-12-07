
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
};