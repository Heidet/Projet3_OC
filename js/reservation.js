class Compteur { // objet compteur
    seconds = 0; // secondes du compteur

    show(){ // permet d'afficher en mode h:m:s les secondes restantes
        let h = (Math.floor(this.seconds / 3600)).toString(); //La fonction Math.floor(x) renvoie le plus grand entier qui est inférieur ou égal à un nombre x

        if(h.length === 1){ // si la longeur de h ne possède que 1 unité 
            h = '0' + h; // alors on rajoute un 0 avant h
        }

        let m = (Math.floor((this.seconds % 3600) / 60)).toString(); //La fonction Math.floor(x) renvoie le plus grand entier qui est inférieur ou égal à un nombre x

        if(m.length === 1){
            m = '0' + m;
        }

        let s = (this.seconds % 60).toString(); //

        if(s.length === 1){
            s = '0' + s;
        }

        document.getElementById('compteur').innerText = h + ':' + m + ':' + s; //Formatage text h m s
    }

    interval = setInterval(function(){ // permet de décrémenter le temps restant
        if(this.seconds > 0){ 
            this.seconds--; // décrémentation de 1 
            this.show(); // lancement méthode show. 
        }
    }.bind(this), 1000);  // pour permettre dans la fonction du setinterval d'accéder à l'attribut seconds depuis this

    start(seconds){  // Nouveau décompte
        this.seconds = seconds;
    }
}

let compteur = new Compteur();  // on initialise un nouveau compteur

document.getElementById('boutonValider').addEventListener('click', function(){  // au click sur le bouton
    compteur.start(1200); // on initialise un nouveau décompte
});
