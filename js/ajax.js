// Exécute un appel AJAX GET
// Prend en paramètres l'URL cible et la fonction callback appelée en cas de succès
function ajaxGet(url, callback) {
    var req = new XMLHttpRequest();
    req.open("GET", url);
    req.addEventListener("load", function () {
        if (req.status >= 200 && req.status < 400) {
            // Appelle la fonction callback en lui passant la réponse de la requête
            callback(req.responseText);
        } else {
            console.error(req.status + " " + req.statusText + " " + url);
        }
    });
    req.addEventListener("error", function () {
        console.error("Erreur réseau avec l'URL " + url);
    });
    req.send(null);
}

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

class ApiClient {
    constructor(apiKey, contractName){
        this.apiKey = apiKey;
        this.contractName = contractName;
    }
    getStations(callback){
        new Request(callback).get(`https://api.jcdecaux.com/vls/v1/stations?contract=${this.contractName}&apiKey=${this.apiKey}`)
    }
}
