// Exécute un appel AJAX GET
// Prend en paramètres l'URL cible et la fonction callback appelée en cas de succès

class Request {
    constructor(callback, error){
        this.req = new XMLHttpRequest();
        this.req.addEventListener("load", function(data){
            callback(data.target.responseText)
        })
        this.req.addEventListener("error", function(data){
            error(data)
        })
    }
    get(url){
        this.req.open("GET",url)
        this.req.send(null)
    }
}