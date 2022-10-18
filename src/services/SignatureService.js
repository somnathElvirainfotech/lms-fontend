import axios from 'axios';
import TokenHelper from './TokenHelper';

const REACT_APP_API_SERVICE_URL = process.env.REACT_APP_API_SERVICE_URL;

class SignatureService {


    getAll() {
        return axios.get(REACT_APP_API_SERVICE_URL + '/signature', TokenHelper.getHeader());
    }

    getOne(id) {
        return axios.get(REACT_APP_API_SERVICE_URL + '/signature/' + id, TokenHelper.getHeader());
    }

    create(payload) {
        return axios.post(REACT_APP_API_SERVICE_URL + '/signature', payload, TokenHelper.getHeader());
    }

    update(payload) {
        return axios.put(REACT_APP_API_SERVICE_URL + '/signature', payload, TokenHelper.getHeader());
    }

    delete(id) {
        return axios.delete(REACT_APP_API_SERVICE_URL + '/signature/' + id, TokenHelper.getHeader());
    }

    


}

export default new SignatureService();