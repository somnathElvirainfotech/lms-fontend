import axios from 'axios';
import TokenHelper from './TokenHelper';

const REACT_APP_API_SERVICE_URL = process.env.REACT_APP_API_SERVICE_URL;

class CreatorService {


    getUserByRoleID() {
        var id = 4;
        return axios.get(REACT_APP_API_SERVICE_URL + '/users/role/' + id, TokenHelper.getHeader());
    }




}

export default new CreatorService();