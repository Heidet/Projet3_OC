class Signature {
    constructor() { //Paramètres du canvas
        this.canvas = document.getElementById("signature");
        this.ctx = this.canvas.getContext('2d');
        this.ctx.strokeStyle = '#000000'; //     Définit le style pour les contours des formes.
        this.ctx.lineWidth = 3; // épaisseur du tracer du canvas. 
        this.draw = false; // Click valeur faux 
        this.mousePosition = { // Valeur de base position souris
            x: 0,
            y: 0
        };
        this.lastPosition = this.mousePosition; 
        this.boutonEffacer = document.getElementById("boutonEffacer");
    }

    //Gestion des événements 
    evenements() {
        let self = this;
        //Souris
        this.canvas.addEventListener("mousedown", function (e) { //click de la souris 
            self.draw = true; // si click alors true 
            self.lastPosition = self.getMposition(e); // position click tracer 
        });

        this.canvas.addEventListener("mousemove", function (e) { // déplacement de la souris
            self.mousePosition = self.getMposition(e);
            self.canvasResult()
        });

        document.addEventListener("mouseup", function (e) { // relachement pointage souris
            self.draw = false;
        });


        // Touch tactile
        document.body.addEventListener("touchstart", function (e) { // point de contact surface tactile
            if (e.target == self.canvas) {
                e.preventDefault();
            }
        });

        document.body.addEventListener("touchend", function (e) { // enlevement point contact
            if (e.target == self.canvas) {
                e.preventDefault();
            }
        });

        document.body.addEventListener("touchmove", function (e) { // déplacement sur la surface tactile 
            if (e.target == self.canvas) {
                e.preventDefault();
            }
        });


        // Touchpad
        this.canvas.addEventListener("touchstart", function (e) {
            self.mousePosition = self.getTposition(e);
            let touch = e.touches[0];
            let mouseEvent = new MouseEvent("mousedown", {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            self.canvas.dispatchEvent(mouseEvent); 
        });

        this.canvas.addEventListener("touchmove", function (e) {
            let touch = e.touches[0];
            let mouseEvent = new MouseEvent("mousemove", {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            self.canvas.dispatchEvent(mouseEvent);
        });

        this.canvas.addEventListener("touchend", function (e) {
            let mouseEvent = new MouseEvent("mouseup", {});
            self.canvas.dispatchEvent(mouseEvent);
        });


        //Effacer
        this.boutonEffacer.addEventListener("click", function (e) {
            self.clearCanvas() // efface le canvas
        });
    }

    // Detection de la souris et renvoi position 
    getMposition(mouseEvent) {
        if (this.draw) { // si click et faux  alors >> 
            let oRect = this.canvas.getBoundingClientRect(); // renvoi la taille de l'element sur la zone d'affichage (viewport)
            return {
                x: mouseEvent.clientX - oRect.left,
                y: mouseEvent.clientY - oRect.top
            };
        }
    }

    // Detection du pad et renvoi position  
    getTposition(touchEvent) {
        let oRect = this.canvas.getBoundingClientRect(); // renvoi la taille de l'element sur la zone d'affichage (viewport)
        return {
            x: touchEvent.touches[0].clientX - oRect.left,
            y: touchEvent.touches[0].clientY - oRect.top
        };
    }

    // Dessin du canvas
    canvasResult() {
        if (this.draw) { 
            this.ctx.beginPath(); //Crée un nouveau trajet. Une fois créé, les fonctions de dessin ultérieures seront dirigées vers le trajet et utilisées pour le construire.
            this.ctx.moveTo(this.lastPosition.x, this.lastPosition.y); // changement coordonner de depart 
            this.ctx.lineTo(this.mousePosition.x, this.mousePosition.y); //Dessine une ligne depuis la position de dessin courante jusqu à la position spécifiée 
            this.ctx.stroke();  // Dessine la forme en traçant son contour.
            this.lastPosition = this.mousePosition; 
        }
    };

    // Vide le dessin du canvas
    clearCanvas() {
        this.canvas.width = this.canvas.width;
        this.ctx.lineWidth = 3;
    }
}
