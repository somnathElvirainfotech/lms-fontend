import axios from 'axios';
import TokenHelper from './TokenHelper';

const REACT_APP_API_SERVICE_URL = process.env.REACT_APP_API_SERVICE_URL;

class ChapterService {

    create(payload) {
        return axios.post(REACT_APP_API_SERVICE_URL + '/assignment', payload, TokenHelper.getHeader());
    }

    getAllAssignment() {
        return axios.get(REACT_APP_API_SERVICE_URL + '/assignment', TokenHelper.getHeader());
    }

    // for creator
    getAll() {
        var id = TokenHelper.getUserId();
        return axios.get(REACT_APP_API_SERVICE_URL + '/assignment-creator/' + id, TokenHelper.getHeader());
    }

    getOne(id) {
        return axios.get(REACT_APP_API_SERVICE_URL + '/assignment/' + id, TokenHelper.getHeader());
    }


    delete(id) {
        return axios.delete(REACT_APP_API_SERVICE_URL + '/assignment/' + id, TokenHelper.getHeader());
    }

    update(payload) {
        return axios.put(REACT_APP_API_SERVICE_URL + '/assignment/', payload, TokenHelper.getHeader());
    }

}

export default new ChapterService();