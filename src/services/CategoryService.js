import axios from 'axios';
import TokenHelper from './TokenHelper';

const REACT_APP_API_SERVICE_URL = process.env.REACT_APP_API_SERVICE_URL;

class CategoryService {


    getAll() {
        return axios.get(REACT_APP_API_SERVICE_URL + '/category', TokenHelper.getHeader());
    }

    getOne(id) {
        return axios.get(REACT_APP_API_SERVICE_URL + '/category/' + id, TokenHelper.getHeader());
    }

    create(payload) {
        return axios.post(REACT_APP_API_SERVICE_URL + '/category', payload, TokenHelper.getHeader());
    }

    update(payload) {
        return axios.put(REACT_APP_API_SERVICE_URL + '/category', payload, TokenHelper.getHeader());
    }

    delete(id) {
        return axios.delete(REACT_APP_API_SERVICE_URL + '/category/' + id, TokenHelper.getHeader());
    }

    getParentSubCategory() {
        return axios.get(REACT_APP_API_SERVICE_URL + '/parent-sub-category', TokenHelper.getHeader());
    }


}

export default new CategoryService();