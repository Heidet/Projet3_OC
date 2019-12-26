class Diapo {
    constructor () {  // Exécute une fonction anonyme au chargement de la page (en gros le code dont ont à besoin) 
        this.playing =  true }
        slides () {
            return document.getElementsByClassName('slide') // retour les éléments class slide du DOM
        }
        length () {
            return this.slides().length; // retour nombre de slide '3'
        }
        index () {
            for (let i = 0; i < this.length(); i++) { // boucle for incrémention de 1 tant que longeur non atteinte
                let slide = this.slides()[i]; // indice slide diapo 
                if (slide.classList.contains('active')) { // si slide contient la class active 
                    return i;
                }
            }
        }
        next () {
            let current = this.index(); // on récupère l'index actuel
            let next = current + 1; // on définis le nouveau (next) comme étant l'actuel + 1
            if (next > this.length() - 1) { // si next est supérieur à la taille de la liste -1 (en gros le numéro max)
                next = 0; // on à atteind la fin du diapo (vu qu'on est dans la condition) donc on remet au début
            }
            this.slides()[current].classList.remove('active'); // on supprime la classe active
            this.slides()[next].classList.add('active'); // on ajoute la classe active
        }
        previous () {
            let current = this.index();  // appel de la méthode index dans mon objet diapo, attribution dans variable current 
            let previous = current - 1;
            if (previous < 0) { // si prévious inférieur à 0 = fin de diapo 
                previous = this.length() - 1; // alors définition de previous fin de diapo
            }
            this.slides()[current].classList.remove('active');
            this.slides()[previous].classList.add('active');
        }
        autoplay() { // méthode autoplay réutilisation méthode next. 
            let diapo = this;
            setInterval(function () {
                if (diapo.playing) { // si playing vrai alors utilisation méthode next 
                    diapo.next()
                }
            }, 5000); // setTime 5 secondes 
        }
    }
