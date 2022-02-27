const API_BASE_ADDRESS = 'http://192.168.50.101:8000';

export default class Api {
    static getUsers() {
        const uri = API_BASE_ADDRESS + "/users";

        return fetch(uri, {
            method: 'GET'
        });
    }
}
