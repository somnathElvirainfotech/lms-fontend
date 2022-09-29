import axios from 'axios';
import TokenHelper from './TokenHelper';

const REACT_APP_API_SERVICE_URL = process.env.REACT_APP_API_SERVICE_URL;

class ChapterService {

    getAll() {
        return axios.get(REACT_APP_API_SERVICE_URL + '/course', TokenHelper.getHeader());
    }

    statusChange(payload) {
        return axios.post(REACT_APP_API_SERVICE_URL + '/course-approve', payload, TokenHelper.getHeader());
    }

    courseSearch(payload) {
        return axios.post(REACT_APP_API_SERVICE_URL + '/course/search', payload, TokenHelper.getHeader());
    }



}

export default new ChapterService();