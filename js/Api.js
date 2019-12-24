class ApiClient {
    constructor(apiKey, contractName){
        this.apiKey = apiKey;
        this.contractName = contractName;
    }
    getStations(callback){
        new Request(callback).get(`https://api.jcdecaux.com/vls/v1/stations?contract=${this.contractName}&apiKey=${this.apiKey}`)
    }
}
