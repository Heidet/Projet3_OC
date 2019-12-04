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
                document.getElementById("containerCanvas").querySelector("strong").innerHTML = data.name; // ajout information stations à l'événement click du bouton reserver 

                document.getElementById("containerCanvas").querySelector("span").innerHTML = data.address; // ajout information adresse .  

                sessionStorage.setItem('station-canvas', data.name);

                document.getElementById("containerCanvas").style.display = "block"; // block du conteneur canvas à l'evenement click du bouton reserver 

                document.getElementById("decompte").querySelector("strong").innerHTML = data.name; // ajout information stations à l'événement click du bouton reserver 

                document.getElementById("decompte").querySelector("span").innerHTML = data.address; // ajout information stations à l'événement click du bouton reserver 

                //document.getElementById("containerCanvas").style.display = "block"; // block du conteneur canvas à l'evenement click du bouton reserver 
                //scroll page (x-coord,y-coord) pour scroll auto block signature 
                window.scrollTo(0, 1000);
            });
        });
    });
});

let compteur = new Compteur(); // on initialise un nouveau compteur JSON.parse(sessionStorage.getItem("ma donnée"))


 const boutonValider = new GenericButton(document.getElementById('boutonValider'), function () { // création variable bouton et attribution de son ID dans le DOM
  // on initialise un nouveau compteur JSON.parse(sessionStorage.getItem("ma donnée"))
    document.getElementById("decompte").style.display = "block"; // on affiche la section decompte &
    document.getElementById("nav_decompte").style.display = "block"; // on affiche la section decompte &
    compteur.demarrer(1200);
});


const annuler = new GenericButton(document.getElementById('annulerCompteur'), function () { // création variable bouton et attribution de son ID dans le DOM 
    //sLance la méthode d'annulation
    compteur.annulerCompteur();
    sessionStorage.clear();
});
