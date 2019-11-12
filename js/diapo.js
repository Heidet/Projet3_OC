class GenericButton {
    constructor(elt, onClick){
        this.elt = elt;
        this._onClick = onClick;
        this.elt.addEventListener('click', this.onClick.bind(this));
        //La méthode addEventListener prend en paramètre le type d'évenement ('click') ainsi qu'une fonction anonyme (aka "callback")
        //on lui passe donc this.onClick tout en "bindant" this à l'intérieur pour qu'il soit utiliseable comme si la fonction anonyme avait été définie dans la classe.
        //sinon les appels à this n'auraient pas la bonne référence (à l'intérieur)
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
    }
    setText(content){
        this.elt.textContent = content; // element . contenu text = contenu 
    }
    setClass(content){ // methode changement class pour bouton 
        this.elt.classList.forEach(function(c){ 
            if(c.startsWith('fa-')){ // commence bien part fa- 
                this.elt.classList.remove(c); // remove class 
            }
            this.elt.classList.add('fa-' + content); // add class fa plus contenu 
        }.bind(this)); // call back this soit objet 
        /*
        while (this.elt.classList.length > 0){
            this.elt.classList.remove(this.elt.classList.item(0));
        }
        this.elt.classList.add('fa').add('fa-' + content);
        */
    }
}


