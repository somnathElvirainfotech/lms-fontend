import axios from 'axios';
import TokenHelper from './TokenHelper';

const REACT_APP_API_SERVICE_URL = process.env.REACT_APP_API_SERVICE_URL;

class ChapterService {

    create(payload) {
        return axios.post(REACT_APP_API_SERVICE_URL + '/lesson', payload, TokenHelper.getHeader());
    }

    getAllLesson() {
        return axios.get(REACT_APP_API_SERVICE_URL + '/lesson', TokenHelper.getHeader());
    }

    // for creator
    getAll() {
        var id = TokenHelper.getUserId();
        return axios.get(REACT_APP_API_SERVICE_URL + '/userlesson/' + id, TokenHelper.getHeader());
    }

    getOne(id) {
        return axios.get(REACT_APP_API_SERVICE_URL + '/lesson/' + id, TokenHelper.getHeader());
    }


    delete(id) {
        return axios.delete(REACT_APP_API_SERVICE_URL + '/lesson/' + id, TokenHelper.getHeader());
    }

    update(payload) {
        return axios.put(REACT_APP_API_SERVICE_URL + '/lesson/', payload, TokenHelper.getHeader());
    }

    search(payload) {
        var data = {
            course_name: payload
        }
        return axios.post(REACT_APP_API_SERVICE_URL + '/lesson/search', data, TokenHelper.getHeader());
    }


}

export default new ChapterService();