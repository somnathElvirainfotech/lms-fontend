import axios from 'axios';
import TokenHelper from './TokenHelper';

const REACT_APP_XAPI_URL = process.env.REACT_APP_XAPI_URL;
const REACT_APP_API_SERVICE_URL = process.env.REACT_APP_API_SERVICE_URL;

class XapiService {

    getXapiStatements(payload) {

        //  console.log(payload);
        if (payload.activity) {

            if (payload.verb) {
                return axios.get(REACT_APP_XAPI_URL + `/statements?agent=${payload.agent}&verb=${payload.verb}&activity=${payload.activity}`, TokenHelper.getXapiHeader(), TokenHelper.getXapiAuth());
            } else {
                return axios.get(REACT_APP_XAPI_URL + `/statements?agent=${payload.agent}&activity=${payload.activity}`, TokenHelper.getXapiHeader(), TokenHelper.getXapiAuth());
            }


        } else {

            if (payload.verb) {
                return axios.get(REACT_APP_XAPI_URL + `/statements?agent=${payload.agent}&verb=${payload.verb}`, TokenHelper.getXapiHeader(), TokenHelper.getXapiAuth());
            } else {
                return axios.get(REACT_APP_XAPI_URL + `/statements?agent=${payload.agent}`, TokenHelper.getXapiHeader(), TokenHelper.getXapiAuth());
            }
        }
    }


    readQuestionAndAns(payload) {
        return axios.post(REACT_APP_API_SERVICE_URL + `/xapi/question-answer`, payload, TokenHelper.getHeader());
    }

    saveResult(payload){
        return axios.post(REACT_APP_API_SERVICE_URL + `/xapi/result-save`, payload, TokenHelper.getHeader());
    }


}




export default new XapiService();