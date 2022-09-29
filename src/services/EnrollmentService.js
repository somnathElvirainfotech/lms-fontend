import axios from 'axios';
import TokenHelper from './TokenHelper';

const REACT_APP_API_SERVICE_URL = process.env.REACT_APP_API_SERVICE_URL;

class ChapterService {

    // all search by courseid,date
    getAll(payload) {
        return axios.post(REACT_APP_API_SERVICE_URL + '/enrollment-search/', payload, TokenHelper.getHeader());
    }


    // for creator , enrolment user list
    getCreatorEnrollList() {
        var id = TokenHelper.getUserId();
        return axios.get(REACT_APP_API_SERVICE_URL + '/enrollmentlist/' + id, TokenHelper.getHeader());
    }


    // for user enrollment list
    getUserEnrollmentList() {
        var id = TokenHelper.getUserId();
        var payload = {
            user_id: id,
            course_id: ""
        };
        return axios.post(REACT_APP_API_SERVICE_URL + '/enrollment-user-course/', payload, TokenHelper.getHeader());
    }

    //status update
    enrollmentStatusUpdate(payload) {
        return axios.put(REACT_APP_API_SERVICE_URL + '/enrollment', payload, TokenHelper.getHeader());
    }



}

export default new ChapterService();