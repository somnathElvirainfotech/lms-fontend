import axios from 'axios';
import TokenHelper from './TokenHelper';

const REACT_APP_API_SERVICE_URL = process.env.REACT_APP_API_SERVICE_URL;

class ChapterService {

    create(payload) {
        return axios.post(REACT_APP_API_SERVICE_URL + '/chapter', payload, TokenHelper.getHeader());
    }

    getAllChapter() {
        return axios.get(REACT_APP_API_SERVICE_URL + '/chapter', TokenHelper.getHeader());
    }

    // get all by creator user id
    getAll() {
        var id = TokenHelper.getUserId();
        return axios.get(REACT_APP_API_SERVICE_URL + '/userchapter/' + id, TokenHelper.getHeader());
    }

    getOne(id) {
        return axios.get(REACT_APP_API_SERVICE_URL + '/chapter/' + id, TokenHelper.getHeader());
    }

    chapterShowByCourseid(id) {
        return axios.get(REACT_APP_API_SERVICE_URL + '/course-chapter/' + id, TokenHelper.getHeader());
    }

    delete(id) {
        return axios.delete(REACT_APP_API_SERVICE_URL + '/chapter/' + id, TokenHelper.getHeader());
    }

    update(payload) {
        return axios.put(REACT_APP_API_SERVICE_URL + '/chapter/', payload, TokenHelper.getHeader());
    }

    search(payload) {
        var data = {
            course_name: payload
        }
        return axios.post(REACT_APP_API_SERVICE_URL + '/chapter/search', data, TokenHelper.getHeader());
    }

}

export default new ChapterService();