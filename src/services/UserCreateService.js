import axios from 'axios';
import TokenHelper from './TokenHelper';

const REACT_APP_API_SERVICE_URL = process.env.REACT_APP_API_SERVICE_URL;

class UserCreateService {

    create(payload) {
        return axios.post(REACT_APP_API_SERVICE_URL + '/registration', payload, TokenHelper.getHeader());
    }

    getAllUser() {
        return axios.get(REACT_APP_API_SERVICE_URL + '/users', TokenHelper.getHeader());
    }

    getUser(id) {
        return axios.get(REACT_APP_API_SERVICE_URL + '/users/' + id, TokenHelper.getHeader());
    }

    statusChange(payload) {
        return axios.post(REACT_APP_API_SERVICE_URL + '/users/status', payload, TokenHelper.getHeader());
    }

    updateUser(payload) {
        return axios.put(REACT_APP_API_SERVICE_URL + '/users', payload, TokenHelper.getHeader());
    }




}

export default new UserCreateService();