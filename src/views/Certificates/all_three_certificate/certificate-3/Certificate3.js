import React from "react";
import "./style.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useLocation, useNavigate } from "react-router-dom";

function Certificate3(props) {
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
      const imgData = canvas.toDataURL("image/png", 5.5);
      const pdf = new jsPDF("landscape", "px", [600, 463], false);
      pdf.addImage(imgData, "PNG", 95, 40, 450, 350);
      pdf.save(`${new Date().toISOString()}.pdf`);
    });
  };

  return (
    <>
      <div className="certificate3-bg" id="divToPrint">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-7 text-center">
              <img src="images/logo.png" />
              <h1>
                Sertifikat o završenoj obuci i <br />
                uspešno položenom testu za oblast
              </h1>
              <h2>{props.course_name}</h2>
              <h5>KOJI SE DODELJUJE na ime</h5>
              <h3>
              {props.firstname}
                <br />
                {props.lastname}
              </h3>
              <div className="sign3-sec">
                <div className="sign-sec-l">
                  <div className="sign-img">
                    <img src="images/signature.png" alt="signature" />
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

export default Certificate3;
