import React, { useEffect, useState } from "react";
import "./style.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useLocation, useNavigate } from "react-router-dom";
import SignatureService from "../../../../services/SignatureService";

function Certificate2(props) {
  var navigate = useNavigate();
  var previousPage = () => {
    navigate(-1);
  };



  const printPDF = () => {
    const domElement = document.getElementById("divToPrint");
    html2canvas(domElement, {
      onclone: (document) => {
        document.getElementById("print").style.visibility = "hidden";
      },
    }).then((canvas) => {
      console.log(canvas);
      const imgData = canvas.toDataURL("image/png",5.5);
      const pdf = new jsPDF("landscape", "px", [520, 432], false);
      pdf.addImage(imgData, "PNG", 0, 0, 520, 432);
      pdf.save(`${new Date().toISOString()}.pdf`);
    });
  };

  

  return (
    <>
      <div className="certificate2-bg" id="divToPrint">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12 text-center">
              <img src="images/logo.png" />
              <h1>
                Sertifikat o završenoj obuci i uspešno položenom testu za oblast
              </h1>
              <h2>{props.course_name.toUpperCase()}</h2>
              <h5>KOJI SE DODELJUJE na ime</h5>
              <h3>{props.user_name.toUpperCase()}</h3>
              
              <div className="sign2-sec">
                <div className="sign-sec-l">
                  <div className="sign-img">
                    <img src={props.signature} alt="signature" />
                  </div>
                  <div className="sign-text">Direktor</div>
                </div>
                <div className="sign-sec-r">
                  <div className="date">{new Date(props.date).toLocaleDateString()}</div>
                  <div className="date-text">Datum</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginLeft: "40%" }}>
        <div className="mt-3">
          <button
            type="button"
            id="print"
            className="btn btn-primary"
            onClick={printPDF}
          >
            Export To PDF
          </button>
          <button
            type="button"
            className="btn btn-success ml-2"
            onClick={previousPage}
          >
            Back
          </button>
        </div>
      </div>
    </>
  );
}

export default Certificate2;
