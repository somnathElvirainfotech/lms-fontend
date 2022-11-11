import axios from 'axios';
import TokenHelper from './TokenHelper';

const REACT_APP_API_SERVICE_URL = process.env.REACT_APP_API_SERVICE_URL;

class CourseTrackService {

    regularCourseTrack(payload) {
        return axios.post(REACT_APP_API_SERVICE_URL + '/regular/course/track', payload, TokenHelper.getHeader());
    }

    getTrackingLession(payload) {
        return axios.post(REACT_APP_API_SERVICE_URL + '/regular/course/lesson', payload, TokenHelper.getHeader());
    }

    getCurrentLession(payload) {
        return axios.post(REACT_APP_API_SERVICE_URL + '/regular/course/current/lesson', payload, TokenHelper.getHeader());
    } 

    lastLessonUpdate(payload)
    {
        return axios.post(REACT_APP_API_SERVICE_URL + '/last-lesson-update', payload, TokenHelper.getHeader());
    }

}

export default new CourseTrackService();