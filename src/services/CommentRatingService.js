import axios from 'axios';
import TokenHelper from './TokenHelper';

const REACT_APP_API_SERVICE_URL = process.env.REACT_APP_API_SERVICE_URL;

class CommentRatingService {

    // course -------------------------------------------

    getAll() {
        return axios.get(REACT_APP_API_SERVICE_URL + '/comment/rating', TokenHelper.getHeader());
    }

    getByCourseId(id, user_id, limit) {
        var data = {
            course_id: id,
            user_id: user_id,
            limit: limit
        }
        return axios.post(REACT_APP_API_SERVICE_URL + '/comment/rating/course', data, TokenHelper.getHeader());
    }

    create(payload) {
        return axios.post(REACT_APP_API_SERVICE_URL + '/comment/rating', payload, TokenHelper.getHeader());
    }

    status(payload) {
        return axios.post(REACT_APP_API_SERVICE_URL + '/comment/status', payload, TokenHelper.getHeader());
    }


    // task ----------------------------------------

    getAllTask() {
        return axios.get(REACT_APP_API_SERVICE_URL + '/task/comment/rating', TokenHelper.getHeader());
    }

    getByCourseIdTask(id, limit) {
        var data = {
            task_id: id,
            limit: limit
        }
        return axios.post(REACT_APP_API_SERVICE_URL + '/task/comment/rating/course', data, TokenHelper.getHeader());
    }

    createTask(payload) {
        return axios.post(REACT_APP_API_SERVICE_URL + '/task/comment/rating', payload, TokenHelper.getHeader());
    }

    statusTask(payload) {
        return axios.post(REACT_APP_API_SERVICE_URL + '/task/comment/status', payload, TokenHelper.getHeader());
    }

    delete(id) {
        return axios.delete(REACT_APP_API_SERVICE_URL + '/task/comment/rating/' + id, TokenHelper.getHeader());
    }

    update(data) {
        return axios.put(REACT_APP_API_SERVICE_URL + '/task/comment/rating/',data, TokenHelper.getHeader());
    }




}

export default new CommentRatingService();