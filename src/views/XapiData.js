import React from 'react';
import { useEffect } from 'react';
import XapiService from '../services/XapiService';

function XapiData() {

    var getXapiData = async () => {
        var responce = await XapiService.getXapiStatements();

        console.log("xapi data", responce.data)
    }

    useEffect(() => {
        getXapiData();
    })

    return (
        <div>XapiData</div>
    )
}

export default XapiData