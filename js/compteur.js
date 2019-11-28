class Compteur {
    constructor() {// objet compteur
        this.seconds = 0; // secondes du compteur
        this.station = null; //attribue station pour stockage 
    }
    show() { // permet d'afficher en mode h:m:s les secondes restantes
        let h = (Math.floor(this.seconds / 3600)).toString(); //La fonction Math.floor(x) renvoie le plus grand entier qui est inférieur ou égal à un nombre x

        if (h.length === 1) {
            h = '0' + h;
        }

        let m = (Math.floor((this.seconds % 3600) / 60)).toString(); //La fonction Math.floor(x) renvoie le plus grand entier qui est inférieur ou égal à un nombre x

        if (m.length === 1) {
            m = '0' + m;
        }

        let s = (this.seconds % 60).toString(); //

        if (s.length === 1) {
            s = '0' + s;
        }

        document.getElementById('compteur').innerText = h + ':' + m + ':' + s; //Formatage text h m s
    }

    interval = setInterval(function () { // permet de décrémenter le temps restant
        if (this.seconds > 0) { // si objet seconde supérieur à 0 alors -->>>>
            this.seconds--; // décrémentation de 1 
            sessionStorage.setItem("compteur", this.seconds);
            sessionStorage.setItem("station-name", JSON.stringify(compteur));
            this.show(); // lancement méthode show compteur 
        }
    }.bind(this), 1000);  // pour permettre dans la fonction du setinterval d'accéder à l'attribut seconds depuis this

    demarrer(seconds) {  // Nouveau décompte
        this.seconds = seconds;
        document.getElementById("containerCanvas").style.display = "none";
    }
    stopCompteur() {
        // Arrêt du compte à rebours
        clearInterval();
        // Supprimer toutes les données de sessionStorage
        sessionStorage.clear();
        // display none section inscription/canvas 
        document.getElementById("inscription").style.display = "none";
        // affichage section message annulation 
        document.getElementById("annulationReservation").querySelector("strong").style.display = "block";

        document.getElementById("annulationReservation").style.color = "red"; // style text rouge message annulation . 

    }
    annulerCompteur() {
        // Fait apparaître le message de confirmation de la suppression
        document.getElementById("annulationReservation").style.display = "block";
        // Le message disparaît au bout de  15 secondes
        setTimeout(function () {
            document.getElementById("annulationReservation").style.display = "none";
        }, 15000); // au bout de 15 seconde section reservation display none

        // Lance la méthode de fin d'une réservation afin de supprimer les sessions storage et arrêter le compte à rebours
        this.stopCompteur();
    }
    /*sessionStorage() {
        sessionStorage.setItem("compteur", this.seconds);
        //sessionStorage.setItem("station-name", JSON.stringify(this.station));
    }*/
}

let compteur = new Compteur();  // on initialise un nouveau compteur JSON.parse(sessionStorage.getItem("ma donnée"))

const boutonValider = new GenericButton(document.getElementById('boutonValider'), function () { // création variable bouton et attribution de son ID dans le DOM
    document.getElementById("decompte").style.display = "block"; // on affiche la section decompte &
    compteur.demarrer(1200); // on initialise un nouveau décompte 1200 seconde = 20 minute 
    //compteur.sessionStorage();

});

const annuler = new GenericButton(document.getElementById('annulerCompteur'), function () { // création variable bouton et attribution de son ID dans le DOM 
    // Lance la méthode d'annulation
    compteur.annulerCompteur();
});