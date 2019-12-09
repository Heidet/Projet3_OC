class Compteur {
    constructor() {// objet compteur
        const reservationDate = sessionStorage.getItem('reservationDate', null) 
        this.seconds = 0;
        if (reservationDate){
            this.seconds = 20*60 - Math.floor((new Date - new Date(reservationDate) ) /1000)
                }
        
        this.station = null; //attribue station pour stockage 
        this.interval = setInterval(function () { // permet de décrémenter le temps restant
            if (this.seconds > 0) { // si objet seconde supérieur à 0 alors -->>>>
                this.seconds--; // décrémentation de 1 
                sessionStorage.setItem("compteur", this.seconds);
                this.show(JSON.parse(sessionStorage.getItem('reservation', '{}' ))); // lancement méthode show compteur 
            }
        }.bind(this), 1000); // pour permettre dans la fonction du setinterval d'accéder à l'attribut seconds depuis this
        this.show(JSON.parse(sessionStorage.getItem('reservation', '{}' )));
    }
    show(data = {} ) { // permet d'afficher en mode h:m:s les secondes restantes
    if(this.seconds === 0) return  // si seconds egale à 0 alors return 

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
        document.getElementById('decompte').style.display = 'block'; 
        document.getElementById("decompte").querySelector("strong").innerHTML = data.name; // ajout information stations à l'événement click du bouton reserver 
        document.getElementById("decompte").querySelector("span").innerHTML = data.address;
       
    } 

    demarrer(seconds) {  // Nouveau décompte
        this.seconds = seconds;
        document.getElementById("containerCanvas").style.display = "none";
    }
    stopCompteur() {
        // Arrêt du compte à rebours
        //clearInterval();
        this.seconds = 0;
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
        }, 8000); // au bout de 8 seconde section reservation display none
        // Lance la méthode de fin d'une réservation afin de supprimer les sessions storage et arrêter le compte à rebours
        this.stopCompteur();
    }
}

