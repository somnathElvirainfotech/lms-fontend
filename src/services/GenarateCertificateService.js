import axios from 'axios';
import TokenHelper from './TokenHelper';

const REACT_APP_API_SERVICE_URL = process.env.REACT_APP_API_SERVICE_URL;

class GenarateCertificateService {

    create(payload) {
        return axios.post(REACT_APP_API_SERVICE_URL + '/course-certificate', payload, TokenHelper.getHeader());
    }


}

export default new GenarateCertificateService();