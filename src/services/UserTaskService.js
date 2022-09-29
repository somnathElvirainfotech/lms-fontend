import axios from 'axios';
import TokenHelper from './TokenHelper';

const REACT_APP_API_SERVICE_URL = process.env.REACT_APP_API_SERVICE_URL;

class UserTaskService {

    create(payload) {
        return axios.post(REACT_APP_API_SERVICE_URL + '/user/task', payload, TokenHelper.getHeader());
    }




}

export default new UserTaskService();