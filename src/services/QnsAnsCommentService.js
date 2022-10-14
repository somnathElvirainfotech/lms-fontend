import axios from 'axios';
import TokenHelper from './TokenHelper';

const REACT_APP_API_SERVICE_URL = process.env.REACT_APP_API_SERVICE_URL;

class QnsAnsCommentService {


    search(payload) {
        return axios.post(REACT_APP_API_SERVICE_URL + '/qns-ans-comment-search',payload, TokenHelper.getHeader());
    }

    create(payload) {
        return axios.post(REACT_APP_API_SERVICE_URL + '/qns-ans-comment', payload, TokenHelper.getHeader());
    }

    update(payload,id) {
        return axios.put(REACT_APP_API_SERVICE_URL + '/qns-ans-comment/'+id, payload, TokenHelper.getHeader());
    }

    delete(id) {
        return axios.delete(REACT_APP_API_SERVICE_URL + '/qns-ans-comment/' + id, TokenHelper.getHeader());
    }

    


}

export default new QnsAnsCommentService();