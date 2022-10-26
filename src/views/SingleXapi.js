import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { setCookie, getCookie, removeCookie } from '../middleware/CookieSetup';
// loader 
import Loader from "./Loader";
// import { useBeforeunload } from 'react-beforeunload';
import { LangContext } from "../routes/routes";
import EnrollmentService from "../services/EnrollmentService";




function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function SingleXapi() {

    let query = useQuery();
    // loader
    const [showLoader, setShowLoader] = useState(false);
    const { xapi_result } = useContext(LangContext);
    var location = useLocation();

    let [link, setLink] = useState(atob(query.get('link')));
    

    // useBeforeunload(() => "Are you sure to close this tab?")

   


   

    return <>

    {/** loader */}
    {showLoader && <Loader />}

        <iframe src={link}
            width="100%"
            height="700rem"
        ></iframe>
    </>
}

