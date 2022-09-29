import axios from 'axios';
import TokenHelper from './TokenHelper';

const REACT_APP_API_SERVICE_URL = process.env.REACT_APP_API_SERVICE_URL;

class Qualification {

    getAll() {
        return axios.get(REACT_APP_API_SERVICE_URL + '/qualification', TokenHelper.getHeader());
    }

    getOne(id) {
        return axios.get(REACT_APP_API_SERVICE_URL + '/qualification/' + id, TokenHelper.getHeader());
    }

    create(payload) {
        return axios.post(REACT_APP_API_SERVICE_URL + '/qualification', payload, TokenHelper.getHeader());
    }

    update(payload) {
        return axios.put(REACT_APP_API_SERVICE_URL + '/qualification', payload, TokenHelper.getHeader());
    }

    delete(id) {
        return axios.delete(REACT_APP_API_SERVICE_URL + '/qualification/' + id, TokenHelper.getHeader());
    }

}

export default new Qualification();