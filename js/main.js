window.onload = (function(){  // Exécute une fonction anonyme au chargement de la page (en gros le code dont ont à besoin)
    const diapo = { // objet diapo 
        playing: true,
        slides: function(){
            return document.getElementsByClassName('slide'); // retour les éléments class slide du DOM
        },
        length: function(){
            return this.slides().length; // retour nombre de slide '3'
        },
        index: function(){
            for (let i = 0; i < this.length(); i++) { // boucle for incrémention de 1 tant que longeur non atteinte
                let slide = this.slides()[i]; // indice slide diapo 
                if (slide.classList.contains('active')) { // si slide contient la class active 
                    return i;
                }
            }
        },
        next: function(){
            let current = this.index(); // on récupère l'index actuel
            let next = current + 1; // on définis le nouveau (next) comme étant l'actuel + 1
            if (next > this.length() - 1) { // si next est supérieur à la taille de la liste -1 (en gros le numéro max)
                next = 0; // on à atteind la fin du diapo (vu qu'on est dans la condition) donc on remet au début
            }
            this.slides()[current].classList.remove('active'); // on supprime la classe active
            this.slides()[next].classList.add('active'); // on ajoute la classe active
        },
        previous: function(){
            let current = this.index();  // appel de la méthode index dans mon objet diapo, attribution dans variable current 
            let previous = current - 1;
            if (previous < 0) { // si prévious inférieur à 0 = fin de diapo 
                previous = this.length() - 1; // alors définition de previous fin de diapo
            }
            this.slides()[current].classList.remove('active');
            this.slides()[previous].classList.add('active');
        },
        autoplay: function(){ // méthode autoplay réutilisation méthode next. 
            let diapo = this;
            setInterval (function(){
                if(diapo.playing){ // si playing vrai alors utilisation méthode next 
                    diapo.next()
                }
            }, 5000); // setTime 5 secondes 
        }   
    };

    const key = document.addEventListener("keydown", function(e){
        if(e.keyCode === 37){
            diapo.next(); //fonction diapo et méthode next au keycode 37 
        }
        else if(e.keyCode === 39){
            diapo.previous(); //fonction diapo et méthode previous au keycode 39
        }
    });

    diapo.autoplay(); // appel objet et méthode autoplay 

    const left_button = new GenericButton(document.getElementById('cmd-left'), function () { // création variable bouton et attribution de son ID dans le DOM
       diapo.previous(); 
    });

    const right_button = new GenericButton(document.getElementById('cmd-right'), function () { // création variable bouton et attribution de son ID dans le DOM
        diapo.next();
    });
    const pause_button = new PauseButton(document.getElementById('cmd-pause'), function () {
        diapo.playing = !diapo.playing; // Toogle la valeur = négation de la valeur ( false=true  true=false)
        if(diapo.playing){  // si playing vrai alors pause
            this.setClass("pause"); 
        }
        else {
            this.setClass("play");
        }
    });
});


const map = new Map (47.7475, 7.3375, 14)
const api = new ApiClient("b83d4fd83439b86791f32b1d4ee5e1c23a820009", "mulhouse");
    api.getStations(function(datas){
    datas = JSON.parse(datas); // transformer le JSON en objet
    datas.forEach(function(data){ // parcourir objet appel function callback data 

        let position = data['position']; // position callback 
        map.addMarker(position, () => {  //ajout marker
            // Insertion des données dans l'objet "station"
            let station = new Formulaire (
                data.name, data.address, data.status, data.available_bikes, data.available_bike_stands 
            );
            // afficher le block contenant les infos et le bouton réserver. 
            document.getElementById("station").style.display = "block";

            // Insertion des données dans le bloc
            station.showStation(); 

            document.getElementById("bouttonReserver").querySelector("button").addEventListener("click", function(){ // recupération button + add evenement click function 
                // Insertion du nom de la station
                document.getElementById("containerCanvas").querySelector("strong").innerHTML = data.name; // ajout information stations à l'événement click du bouton reserver 
                
                document.getElementById("containerCanvas").querySelector("span").innerHTML = data.address; // ajout information adresse .  

                document.getElementById("containerCanvas").style.display = "block"; // block du conteneur canvas à l'evenement click du bouton reserver 
                
                document.getElementById("decompte").querySelector("strong").innerHTML = data.name; // ajout information stations à l'événement click du bouton reserver 

                document.getElementById("decompte").querySelector("span").innerHTML = data.address; // ajout information stations à l'événement click du bouton reserver 

                //document.getElementById("containerCanvas").style.display = "block"; // block du conteneur canvas à l'evenement click du bouton reserver 
                sessionStorage
                //scroll page (x-coord,y-coord) pour scroll auto block signature 
                window.scrollTo(0,1000);
            });
        });
    });
});


