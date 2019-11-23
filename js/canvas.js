class Signature {
    constructor() { //Paramètres du canvas
        this.canvas = document.getElementById("signature"); 
        this.ctx = this.canvas.getContext('2d');
        this.ctx.strokeStyle = '#000000';
        this.ctx.lineWidth = 3;
        this.draw = false;
        this.mousePosition = {
            x: 0,
            y: 0
        };
        this.lastPosition = this.mousePosition;
        this.boutonEffacer = document.getElementById("boutonEffacer");
        }

    //Gestion des événements 
    evenements() {
        let self = this ;
        //Souris
        this.canvas.addEventListener("mousedown", function (e) {
            self.draw = true;
            self.lastPosition = self.getMposition(e);
        });

        this.canvas.addEventListener("mousemove", function (e) {
            self.mousePosition = self.getMposition(e);
            self.canvasResult()
        });
        
        document.addEventListener("mouseup", function (e) {
            self.draw = false;
        });


        // Stop scrolling (touch)
        document.body.addEventListener("touchstart", function (e) {
            if (e.target == self.canvas) {
                e.preventDefault();
            }
        });

        document.body.addEventListener("touchend", function (e) {
            if (e.target == self.canvas) {
                e.preventDefault();
            }
        });

        document.body.addEventListener("touchmove", function (e) {
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
            self.clearCanvas()
        });
    }

    // Renvoie les coordonnées de la souris 
    getMposition(mouseEvent) {
        if (this.draw) {
            let oRect = this.canvas.getBoundingClientRect();
            return {
                x: mouseEvent.clientX - oRect.left,
                y: mouseEvent.clientY - oRect.top
            };
        }
    }

    // Renvoie les coordonnées du pad 
    getTposition(touchEvent) {
        let oRect = this.canvas.getBoundingClientRect();
        return {
            x: touchEvent.touches[0].clientX - oRect.left,
            y: touchEvent.touches[0].clientY - oRect.top
        };
    }

    // Dessin du canvas
    canvasResult() {
        if (this.draw) {
            this.ctx.beginPath(); //Crée un nouveau trajet. Une fois créé, les fonctions de dessin ultérieures seront dirigées vers le trajet et utilisées pour le construire.
            this.ctx.moveTo(this.lastPosition.x, this.lastPosition.y);
            this.ctx.lineTo(this.mousePosition.x, this.mousePosition.y);
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
let obj = new Signature();
obj.evenements();

let effacer = new GenericButton(document.getElementById("boutonEffacer"), function () {
    obj.clearCanvas();
});