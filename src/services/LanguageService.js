import axios from 'axios';
import TokenHelper from './TokenHelper';

const REACT_APP_API_SERVICE_URL = process.env.REACT_APP_API_SERVICE_URL;

class LanguageService {


    getAll() {
        return axios.get(REACT_APP_API_SERVICE_URL + '/language', TokenHelper.getHeader());
    }

    getOne(id) {
        return axios.get(REACT_APP_API_SERVICE_URL + '/language/' + id, TokenHelper.getHeader());
    }

    create(payload) {
        return axios.post(REACT_APP_API_SERVICE_URL + '/language', payload, TokenHelper.getHeader());
    }

    update(payload) {
        return axios.put(REACT_APP_API_SERVICE_URL + '/language', payload, TokenHelper.getHeader());
    }

    delete(id) {
        return axios.delete(REACT_APP_API_SERVICE_URL + '/language/' + id, TokenHelper.getHeader());
    }

    


}

export default new LanguageService();