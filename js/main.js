const map = new Map(47.7475, 7.3375, 14)
const api = new ApiClient("b83d4fd83439b86791f32b1d4ee5e1c23a820009", "mulhouse");
let compteur = new Compteur();
api.getStations(function (datas) {
    datas = JSON.parse(datas); // transformer le JSON en objet
    datas.forEach(function (data) { // parcourir objet appel function callback data 

        let position = data['position']; // position callback 
        map.addMarker(position, () => {  //ajout marker
            // afficher le block contenant les infos et le bouton réserver. 
            if ((data.available_bikes === 0) || (data.status != "OPEN")) {
                icon = "css/images/marker-icon-rouge.png";
            } else if ((data.available_bikes > 0) && (data.available_bikes < 4)) {
                icon = "css/images/marker-icon-jaune.png";
            } else {
                icon = "css/images/marker-icon.png";
            };
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

            document.getElementById("bouttonReserver").querySelector("button").addEventListener("click", function () { // recupération button + add evenement click function 
                // Insertion du nom de la station
                compteur.show(data);
                station.affichageSection(); // affichage diverse section avec methode affichage dans station . 
                sessionStorage.setItem('reservationDate', new Date);
                sessionStorage.setItem('station', data.name);
                sessionStorage.setItem('reservation', JSON.stringify(data));
                document.getElementById("containerCanvas").querySelector("strong").innerHTML = data.name; // ajout information stations à l'événement click du bouton reserver 
                document.getElementById("containerCanvas").querySelector("span").innerHTML = data.address; // ajout information adresse .  
                document.getElementById("containerCanvas").querySelector("span").style.color = '#c40404'; 
                document.getElementById('prenom_utilisateur').value = localStorage.getItem('prenom');
                document.getElementById('nom_utilisateur').value = localStorage.getItem('nom');
            });
        });
    });
});

let signature = new Signature();
signature.evenements();

const boutonValider = new GenericButton(document.getElementById('boutonValider'), function () { // création variable bouton et attribution de son ID dans le DOM
    //condition si valeurs non entrée dans input
    if (document.getElementById('prenom_utilisateur').value === "") {
        alert("Veuillez entrer votre prénom !");
        return false;
    };
    if (document.getElementById('nom_utilisateur').value === "") {
        alert("Veuillez entrer votre nom !");
        return false;
    };
    if (document.getElementById('signature').value === '') {
        alert("Veuillez entrer votre nom !");// Message en cas de canvas vide
    } 
    
    
    localStorage.setItem('prenom', document.getElementById("prenom_utilisateur").value);
    localStorage.setItem('nom', document.getElementById("nom_utilisateur").value)
    document.getElementById("decompte").style.display = "block"; // on affiche la section decompte &
    //document.getElementById("nav_decompte").style.display = "block"; // on affiche la section decompte &
    compteur.demarrer(1200); // on initialise un nouveau décompte 1200 seconde = 20 minute 
});

const annuler = new GenericButton(document.getElementById('annulerCompteur'), function () { // création variable bouton et attribution de son ID dans le DOM 
    compteur.annulerCompteur(); // Lance la méthode d'annulation
    sessionStorage.clear(); // Supprimer toutes les données de sessionStorage
    signature.clearCanvas();
});

let effacer = new GenericButton(document.getElementById("boutonEffacer"), function () {
    signature.clearCanvas();
});