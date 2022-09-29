import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import MaintenanceService from '../services/MaintenanceService';

import TokenHelper from '../services/TokenHelper'
import { setCookie, getCookie, removeCookie } from '../middleware/CookieSetup';

function MaintenanceMode() {




  var location = useLocation();
  console.log(location);
  var { maintenance_text, date, status, created_at } = location.state.data;

  console.log(date);

  useEffect(() => {
    (async () => {
      var responce = await MaintenanceService.getAll();
      //console.log(responce.data);
      if (responce.data.data[0].status == "deactive") {
        window.location.replace("/")
      }
      else {
        TokenHelper.Logout();
        removeCookie("user_info")
      }
    })()
  }, [])

  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  function formatDate(date) {
    return (
      [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
      ].join('-') +
      ' ' +
      [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
        // padTo2Digits(date.getSeconds()),  // 👈️ can also add seconds
      ].join(':')
    );
  }




  return (
    <div className='container' >
      <div className='row' >

        <div className='col-sm-12 text-center m-4  align-items-center' style={{ heigth: "100vh", top: "50%" }}>
          <h1>{maintenance_text}</h1>

          <p>END ON:  <span>{formatDate(new Date(date))}</span>   </p>

        </div>

      </div>
    </div>
  )
}

export default MaintenanceMode