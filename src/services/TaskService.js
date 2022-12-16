import axios from 'axios';
import TokenHelper from './TokenHelper';

const REACT_APP_API_SERVICE_URL = process.env.REACT_APP_API_SERVICE_URL;

class TaskService {


    getAll() {
        return axios.get(REACT_APP_API_SERVICE_URL + '/task', TokenHelper.getHeader());
    }

    getOne(id) {
        return axios.get(REACT_APP_API_SERVICE_URL + '/task/' + id, TokenHelper.getHeader());
    }

    create(payload) {
       // console.log(payload)
        return axios.post(REACT_APP_API_SERVICE_URL + '/task', payload, TokenHelper.getHeader());
    }

    update(payload) {
        return axios.put(REACT_APP_API_SERVICE_URL + '/task', payload, TokenHelper.getHeader());
    }

    delete(id) {
        return axios.delete(REACT_APP_API_SERVICE_URL + '/task/' + id, TokenHelper.getHeader());
    }

    search(payload) {
        return axios.post(REACT_APP_API_SERVICE_URL + '/task/search', payload, TokenHelper.getHeader());
    }

    download(id) {
        return axios.get(REACT_APP_API_SERVICE_URL + '/task-download/'+id, TokenHelper.getHeader());
    }


}

export default new TaskService();