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
            for (let i = 0; i < this.length(); i++) { // boucle for incrémention de 1 tant que longeur 
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
            }, 5000); // setTime
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