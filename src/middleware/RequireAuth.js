import TokenHelper from '../services/TokenHelper';
import { Navigate, useLocation } from 'react-router-dom';
import React from 'react'
import MaintenanceService from '../services/MaintenanceService';

export const RequireAuth = ({ children }) => {
    const token = TokenHelper.getToken();
    const location = useLocation();

    console.log("hjgj", location.pathname)

    if (!token) {
        return <Navigate to="/"
            state={
                { path: location.pathname }
            }
        />
    }   

    return children;
}

export const RequireAuthLogout = ({ children }) => {
    const token = TokenHelper.getToken();
    const location = useLocation();

    if ( location.pathname=='/' && token) {
        return <Navigate to="/courses"
            state={
                { path: location.pathname }
            }
        />
    }
    return children;
}


export const CheckENV = ({ children }) => {
    const token = TokenHelper.getToken();
    const user = process.env.REACT_APP_PUBLIC_UNAUTHORIZED_USER;

    if (user == "true" && token != '') {
        return <Navigate to="/" />
    }
    return children;
}

export const ActiveMaintenance = ({ children, data }) => {

    console.log(data);

    if (data.status == "active") {
        return <Navigate to="/maintenance" state={{ data: data }} />
    }

    return children;

}


export const DisableMaintenance = ({ children, data }) => {


    if (data.status == "deactive") {
        return children
    }

}



