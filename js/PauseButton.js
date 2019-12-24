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
    }
}