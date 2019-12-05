const map = new Map(47.7475, 7.3375, 14)
const api = new ApiClient("b83d4fd83439b86791f32b1d4ee5e1c23a820009", "mulhouse");
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

            document.getElementById("bouttonReserver").querySelector("button").addEventListener("click", function () { // recupération button + add evenement click function 
                // Insertion du nom de la station
                document.getElementById("inscription").style.display = "block";
                document.getElementById("annulationReservation").style.display = "none";
                document.getElementById("decompte").style.display = "none";
                document.getElementById("containerCanvas").querySelector("strong").innerHTML = data.name; // ajout information stations à l'événement click du bouton reserver 
                document.getElementById("containerCanvas").querySelector("span").innerHTML = data.address; // ajout information adresse .  
                sessionStorage.setItem('station', data.name);
                document.getElementById("containerCanvas").style.display = "block"; // block du conteneur canvas à l'evenement click du bouton reserver 
                document.getElementById("decompte").querySelector("strong").innerHTML = data.name; // ajout information stations à l'événement click du bouton reserver 
                document.getElementById("decompte").querySelector("span").innerHTML = data.address; // ajout information stations à l'événement click du bouton reserver 
                window.scrollTo(0, 1000);//scroll page (x-coord,y-coord) pour scroll auto block signature  

            });
        });
    });
});

let compteur = new Compteur();

const boutonValider = new GenericButton(document.getElementById('boutonValider'), function () { // création variable bouton et attribution de son ID dans le DOM
    document.getElementById("decompte").style.display = "block"; // on affiche la section decompte &
    document.getElementById("nav_decompte").style.display = "block"; // on affiche la section decompte &
    compteur.demarrer(1200); // on initialise un nouveau décompte 1200 seconde = 20 minute 
    sessionStorage.setItem('prenom', document.getElementById("prenom_utilisateur").value);
    sessionStorage.setItem('nom', document.getElementById("nom_utilisateur").value);
});

const annuler = new GenericButton(document.getElementById('annulerCompteur'), function () { // création variable bouton et attribution de son ID dans le DOM 
    compteur.annulerCompteur(); // Lance la méthode d'annulation
    sessionStorage.clear(); // Supprimer toutes les données de sessionStorage
    obj.clearCanvas();
});

let obj = new Signature();
obj.evenements();


let effacer = new GenericButton(document.getElementById("boutonEffacer"), function () {
    obj.clearCanvas();
});