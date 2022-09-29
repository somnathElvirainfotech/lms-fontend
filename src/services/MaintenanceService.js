import axios from 'axios';
import TokenHelper from './TokenHelper';

const REACT_APP_API_SERVICE_URL = process.env.REACT_APP_API_SERVICE_URL;

class MaintenanceService {


    getAll() {
        return axios.get(REACT_APP_API_SERVICE_URL + '/maintenance', TokenHelper.getHeader());

    }


}

export default new MaintenanceService();