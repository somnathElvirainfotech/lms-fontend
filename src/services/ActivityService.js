import axios from 'axios';
import TokenHelper from './TokenHelper';

const REACT_APP_API_SERVICE_URL = process.env.REACT_APP_API_SERVICE_URL;

class ActivityService {




    search(payload) {
        return axios.post(REACT_APP_API_SERVICE_URL + '/activity/search', payload, TokenHelper.getHeader());
    }




}

export default new ActivityService();