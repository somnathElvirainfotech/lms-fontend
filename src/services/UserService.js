import axios from 'axios';
import TokenHelper from './TokenHelper';

const REACT_APP_API_SERVICE_URL = process.env.REACT_APP_API_SERVICE_URL;

class UserService {

    Login(payload) {
        return axios.post(REACT_APP_API_SERVICE_URL + '/login', payload, TokenHelper.getHeader());
    }

    LoginStatus(payload) {
        return axios.post(REACT_APP_API_SERVICE_URL + '/login-status', payload, TokenHelper.getHeader());
    }



    CreatorLogin(payload) {
        return axios.post(REACT_APP_API_SERVICE_URL + '/creator-login', payload, TokenHelper.getHeader());
    }

    // test(payload, params, header) {
    //   return axios.post(REACT_APP_API_SERVICE_URL + '?mode=' + params.mode + '&target=' + params.target, payload, TokenHelper.getHeader(header));
    // }

    // test2(header) {
    //   return axios.get(REACT_APP_API_SERVICE_URL + '/summary', TokenHelper.getHeader(header))
    // }

    ForgetPassword(payload) {
        return axios.post(REACT_APP_API_SERVICE_URL + '/forgetpassword', payload, TokenHelper.getHeader());
    }

    getProfileData(payload) {
        return axios.post(REACT_APP_API_SERVICE_URL + '/profile', payload, TokenHelper.getHeader());
    }


    updateUserProfile(payload) {
        return axios.put(REACT_APP_API_SERVICE_URL + '/profile', payload, TokenHelper.getHeader());
    }


    changePassword(payload) {
        return axios.post(REACT_APP_API_SERVICE_URL + '/password-change', payload, TokenHelper.getHeader());
    }

    updatePassword(payload) {
        return axios.post(REACT_APP_API_SERVICE_URL + '/update-password', payload, TokenHelper.getHeader());
    }

    updateUserProfileImage(payload) {
        return axios.post(REACT_APP_API_SERVICE_URL + '/user-image', payload, TokenHelper.getHeader());
    }


    languages() {
        return axios.get(REACT_APP_API_SERVICE_URL + '/language', TokenHelper.getHeader());
    }

    qualification() {
        return axios.get(REACT_APP_API_SERVICE_URL + '/qualification', TokenHelper.getHeader());
    }

    category() {
        return axios.get(REACT_APP_API_SERVICE_URL + '/parent-category', TokenHelper.getHeader());
    }

    subcategory(id) {
        return axios.get(REACT_APP_API_SERVICE_URL + '/sub-category/' + id, TokenHelper.getHeader());
    }
    course(subcat) {
        return axios.post(REACT_APP_API_SERVICE_URL + '/category-wise-course', subcat, TokenHelper.getHeader());
    }
    coursedetails() {
        return axios.get(REACT_APP_API_SERVICE_URL + '/web-course', TokenHelper.getHeader());
    }
    coursedetails2(payload) {
        return axios.get(REACT_APP_API_SERVICE_URL + '/category-wise-course/' + payload, TokenHelper.getHeader());
    }

    singlecourse(course) {
        return axios.get(REACT_APP_API_SERVICE_URL + '/web-course/' + course, TokenHelper.getHeader());
    }

    singlecourseByName(course) {
        return axios.get(REACT_APP_API_SERVICE_URL + '/web-course-name/' + course, TokenHelper.getHeader());
    }

    assignment(user_id) {

        return axios.get(REACT_APP_API_SERVICE_URL + '/assignment-user/' + user_id, TokenHelper.getHeader());
    }

    enrollment(user_id, course) {
        var user = {
            course_id: course,
            user_id: user_id
        }
        return axios.post(REACT_APP_API_SERVICE_URL + '/enrollment', user, TokenHelper.getHeader());
    }


    assignmentcourse(user_id, course) {
        var user = {
            course_id: course,
            user_id: user_id
        }

        console.log(user)
        return axios.post(REACT_APP_API_SERVICE_URL + '/assignment-course', user, TokenHelper.getHeader());

    }




    enrollmentcourse(user_id, course) {
        var user = {
            course_id: course,
            user_id: user_id
        }
        return axios.post(REACT_APP_API_SERVICE_URL + '/enrollment-user-course', user, TokenHelper.getHeader());
    }


    getGroupList() {
        return axios.get(REACT_APP_API_SERVICE_URL + '/group', TokenHelper.getHeader());
    }

    getAllCategory() {
        return axios.get(REACT_APP_API_SERVICE_URL + '/parent-sub-category', TokenHelper.getHeader());
    }

    // course------------------
    createCourse(payload) {
        return axios.post(REACT_APP_API_SERVICE_URL + '/course', payload, TokenHelper.getHeader());
    }

    // for creaTOR
    allCourses() {
        var id = TokenHelper.getUserId();
        return axios.get(REACT_APP_API_SERVICE_URL + '/course-show-user/' + id, TokenHelper.getHeader());
    }



    // single course get
    singleCourseGet(id) {

        return axios.get(REACT_APP_API_SERVICE_URL + '/course/' + id, TokenHelper.getHeader());
    }

    // couerse update
    courseUpdate(payload) {
        return axios.put(REACT_APP_API_SERVICE_URL + '/course/', payload, TokenHelper.getHeader());
    }

    // course delete
    courseDelete(id) {
        return axios.delete(REACT_APP_API_SERVICE_URL + '/course/' + id, TokenHelper.getHeader());
    }


    // course certificate count
    courseCertificateCount() {
        var id = TokenHelper.getUserId();
        return axios.get(REACT_APP_API_SERVICE_URL + '/course/certificate/count/' + id, TokenHelper.getHeader());

    }


    // user search
    userSearch(name, email, hr_number) {
        var payload = {
            name: name,
            email: email,
            hr_number: hr_number
        }
        return axios.post(REACT_APP_API_SERVICE_URL + '/user/search', payload, TokenHelper.getHeader());
    }

    // bluk upload 
    userCsvUpload(payload) {
        return axios.post(REACT_APP_API_SERVICE_URL + '/admin/usercsv', payload, TokenHelper.getHeader());
    }

    // mail send 
    generatePassword(payload) {
        return axios.post(REACT_APP_API_SERVICE_URL + '/user/password/generate', payload, TokenHelper.getHeader());
    }

    loginType(payload) {
        return axios.post(REACT_APP_API_SERVICE_URL + '/login-type', payload, TokenHelper.getHeader());
    }

}

export default new UserService();