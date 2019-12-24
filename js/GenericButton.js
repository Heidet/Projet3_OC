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