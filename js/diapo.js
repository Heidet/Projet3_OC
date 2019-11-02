class GenericButton {
    constructor(elt, onClick){
        /*
        onClick = function(){
            diapo.next();
        }
        */
        this.elt = elt;
        this._onClick = onClick;
        /*
        this._onClick = function(){
        this.
            diapo.next();
        }
        */
        this.elt.addEventListener('click', this.onClick.bind(this));
        /*
        La méthode addEventListener prend en paramètre le type d'évenement ('click') ainsi qu'une fonction anonyme (aka "callback")
        on lui passe donc this.onClick tout en "bindant" this à l'intérieur pour qu'il soit utiliseable comme si la fonction anonyme avait été définie dans la classe.
        sinon les appels à this n'auraient pas la bonne référence (à l'intérieur)


        * */
    }
    onClick(){
        if(this._onClick){
            this._onClick();
        }
    }
}

class PauseButton extends GenericButton {
    constructor(elt, onClick){
        super(elt, onClick)
        /*
        onClick = function(){
            diapo.pause(); <-- ne marche pas #fake

            this.setText("pause"); <- ce this ne marcherai sans le .bind(this)
        }
        */
    }

    setText(content){
        this.elt.textContent = content;
    }
}


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
    diapo.autoplay(); // appel objet et méthode autoplay 

    const left_button = new GenericButton(document.getElementById('cmd-left'), function () {
       diapo.previous();
    });

    const right_button = new GenericButton(document.getElementById('cmd-right'), function () {
        diapo.next();
    });

    const pause_button = new PauseButton(document.getElementById('cmd-pause'), function () {
        diapo.playing = !diapo.playing; // Toogle la valeur = négation de la valeur ( false=true  true=false)
        if(diapo.playing){  // si playing vrai alors pause
            this.setText('pause');
        }
        else {
            this.setText('play'); // si playing faux alors play
        }
    });
});