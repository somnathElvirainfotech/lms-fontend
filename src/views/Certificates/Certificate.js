import React, { useEffect, useState } from "react";
import pdfMake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import htmlToPdfmake from "html-to-pdfmake";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";



import { useLocation, useNavigate } from "react-router-dom";
import Certificate1 from "./all_three_certificate/certificate-1/Certificate1";
import Certificate2 from "./all_three_certificate/certificate-2/Certificate2";
import Certificate3 from "./all_three_certificate/certificate-3/Certificate3";
import SignatureService from "../../services/SignatureService";

// import imageCertificate from "./all_three_certificate/ImageCertificate/certifiate";

function Certificate() {
  var location = useLocation();
  var {
    user_name,
    email,
    course_name,
    date,
    certificate_id,
    firstname,
    lastname,
  } = location.state;

  var navigate = useNavigate();
  var previousPage = () => {
    navigate(-1);
  };

  var [signature,setSignature]=useState('');

  useEffect(()=>{

    (async()=>{
     var responce=await SignatureService.getAll();
       if(responce.data.status){
         setSignature(responce.data.data[0].signature_name);
       }else{
         setSignature("/images/signature.png")
       }
    })();
 
   },[])

  const printPDF = () => {
    const domElement = document.getElementById("divToPrint");
    html2canvas(domElement, {
      onclone: (document) => {
        document.getElementById("print").style.visibility = "hidden";
      },
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png", 1.0);
      const pdf = new jsPDF("p", "mm", [880, 880], true);
      pdf.addImage({
        imageData: imgData,
        format: "JPEG",
        x: 0,
        y: 0,
        w: 880,
        h: 880,
      });
      pdf.save(`${new Date().toISOString()}.pdf`);
    });
  };

  return (
    <>



      {certificate_id == 1 && (
       <Certificate1
          user_name={user_name}
          email={email}
          course_name={course_name}
          date={date}
          certificate_id={certificate_id}
          signature={signature}
        />
      )}

      {certificate_id == 2 && (
        <Certificate2
          user_name={user_name}
          email={email}
          course_name={course_name}
          date={date}
          certificate_id={certificate_id}
          signature={signature}
        />
      )}

      {certificate_id == 3 && (
        <Certificate3
          user_name={user_name}
          email={email}
          course_name={course_name}
          date={date}
          certificate_id={certificate_id}
          firstname={firstname}
          lastname={lastname}
          signature={signature}
        />
      )}

      {/** 

        <div className='container m-4 text-center'>
            <div className='row'>
                <div className='col-sm-2' />
                <div className='col-sm-8' >

                    <div id='divToPrint'
                        style={{
                            width: "800px",
                            height: "600px",
                            padding: "20px",
                            textAlign: "center",
                            border: "10px solid #787878"
                        }}
                    >
                        <div
                            style={{
                                width: "750px",
                                height: "550px",
                                padding: "20px",
                                textAlign: "center",
                                border: "5px solid #787878"
                            }}
                        >
                            <span style={{ fontSize: "50px", fontWeight: "bold" }}>
                                Certificate of Completion
                            </span>
                            <br />
                            <br />
                            <span style={{ fontSize: "25px" }}>
                                <i>This is to certify that</i>
                            </span>
                            <br />
                            <br />
                            <span style={{ fontSize: "30px" }}>
                                <b>{user_name} </b>
                            </span>
                            <br />
                            <span style={{ fontSize: "20px" }}>{email}</span>
                            <br />
                            <br />
                            <br />
                            <span style={{ fontSize: "25px" }}>
                                <i>has completed the course</i>
                            </span>
                            <br />
                            <br />
                            <span style={{ fontSize: "30px" }}>{course_name}</span> <br />
                            <br />
                            <span style={{ fontSize: "20px" }}>
                                with score of <b>70%</b>
                            </span>{" "}
                            <br />
                            <br />

                            <span style={{ fontSize: "25px" }}>
                                <i>dated: {new Date(date).toDateString()}</i>
                            </span>
                            <br />

                        </div>
                    </div>



                    <div className='mt-3'>
                        <button type='button' id='print' className="btn btn-primary" onClick={printPDF}>Export To PDF</button>
                        <button type='button' className='btn btn-success ml-2' onClick={previousPage}>Back</button>
                    </div>
                </div>
                <div className='col-sm-2' />
            </div>
        </div>

    */}
    </>
  );
}

export default Certificate;
