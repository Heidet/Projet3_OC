const map = new Map(47.7475, 7.3375, 14)
const api = new ApiClient("b83d4fd83439b86791f32b1d4ee5e1c23a820009", "mulhouse");
let compteur = new Compteur();

let current_station = null;

api.getStations(function (datas) {
    datas = JSON.parse(datas); // transformer le JSON en objet
    datas.forEach(function (data) { // parcourir objet appel function callback data 

        let position = data['position']; // position callback 
        map.addMarker(position, () => {  //ajout marker
            // afficher le block contenant les infos et le bouton réserver. 
            $('#station').show();
            $('#message_selection').hide();
            // Insertion des données dans l'objet "station"
            let station = new Formulaire(
                data.name, data.address, data.status, data.available_bikes, data.available_bike_stands
            );

            // Insertion des données dans le bloc
            station.showStation();
            // Méthode booléen pour dispo vélo 
            station.dispoVelo();

            document.getElementById("bouttonReserver").querySelector("button").addEventListener("click", () => { // recupération button + add evenement click function 
                station.affichageSection(); // affichage diverse section avec methode affichage dans station . 
                document.getElementById("containerCanvas").querySelector("strong").innerHTML = data.name; // ajout information stations à l'événement click du bouton reserver 
                document.getElementById("containerCanvas").querySelector("span").innerHTML = data.address; // ajout information adresse .  
                document.getElementById("containerCanvas").querySelector("span").style.color = '#c40404';
                document.getElementById('prenom_utilisateur').value = localStorage.getItem('prenom');
                document.getElementById('nom_utilisateur').value = localStorage.getItem('nom');
                current_station = data;
                document.getElementById('section_reservation').style.display = 'block';
                window.scrollTo(0, 1000);
            });
        });
    });
});

const key = document.addEventListener("keydown", function (e) {
    if (e.keyCode === 37) {
        diapo.next(); //fonction diapo et méthode next au keycode 37 
    }
    else if (e.keyCode === 39) {
        diapo.previous(); //fonction diapo et méthode previous au keycode 39
    }
});

const left_button = new GenericButton(document.getElementById('cmd-left'), function () { // création variable bouton et attribution de son ID dans le DOM
    diapo.previous();
});

const right_button = new GenericButton(document.getElementById('cmd-right'), function () { // création variable bouton et attribution de son ID dans le DOM
    diapo.next();
});
const pause_button = new PauseButton(document.getElementById('cmd-pause'), function () {
    diapo.playing = !diapo.playing; // Toogle la valeur = négation de la valeur ( false=true  true=false)
    if (diapo.playing) {  // si playing vrai alors pause
        this.setClass("pause");
    }
    else {
        this.setClass("play");
    }
});

const diapo = new Diapo();  // appel objet et méthode autoplay 
diapo.autoplay();


let signature = new Signature();
signature.evenements();

const boutonValider = new GenericButton(document.getElementById('boutonValider'), function () { // création variable bouton et attribution de son ID dans le DOM
    //condition si valeurs non entrée dans input
    if (document.getElementById('prenom_utilisateur').value === "") {
        //alert("Veuillez entrer votre prénom !");
        return false;
    }

    if (document.getElementById('nom_utilisateur').value === "") {
        //alert("Veuillez entrer votre nom !");
        return false;
    }
    localStorage.setItem('prenom', document.getElementById("prenom_utilisateur").value);
    localStorage.setItem('nom', document.getElementById("nom_utilisateur").value);
    document.getElementById("decompte").style.display = "block"; // on affiche la section decompte &
    sessionStorage.setItem('reservationDate', new Date);
    sessionStorage.setItem('station', current_station.name);
    sessionStorage.setItem('reservation', JSON.stringify(current_station));
    compteur.show(current_station);

    compteur.demarrer(10); // on initialise un nouveau décompte 1200 seconde = 20 minute 
});

const annuler = new GenericButton(document.getElementById('annulerCompteur'), function () { // création variable bouton et attribution de son ID dans le DOM 
    document.getElementById("annulationReservation").style.display = "block";
    compteur.annulerCompteur(); // Lance la méthode d'annulation
    sessionStorage.clear(); // Supprimer toutes les données de sessionStorage
    signature.clearCanvas();

});

let effacer = new GenericButton(document.getElementById("boutonEffacer"), function () {
    signature.clearCanvas();
});