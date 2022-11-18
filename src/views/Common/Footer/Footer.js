import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { LangContext } from "../../../routes/routes";
// languages
import English from "../../ConverLanguages/English";
import SerbianCyrilic from "../../ConverLanguages/SerbianCyrilic";
import SerbianLatin from "../../ConverLanguages/SerbianLatin";
// end languages

export default function Footer() {
  const { languageList, xapi_result } = useContext(LangContext);
  const [langObj, setLangObj] = useState({});

  useEffect(() => {
    if (languageList.language_name === "1") {
      setLangObj(English);
    } else if (languageList.language_name === "2") {
      setLangObj(SerbianCyrilic);
    } else if (languageList.language_name === "3") {
      setLangObj(SerbianLatin);
    }
  }, [languageList.language_name]);

  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="row">


          <div className=" col-md-3 col-sm-12"></div>
            <div className=" col-md-3 col-sm-12">
              <div className="ft-box">
                <h3>Copyright © 2022 </h3>
                <ul>
                  <li>
                    <p>{langObj.copyright_item1}{" "}</p>
                  </li>
                  <li>
                    <p> {langObj.copyright_item2}{" "} </p>
                  </li>
                  <li>
                    <a href="#"><span style={{ color: "#023e86" }}>www.domain.com</span>{" "}</a>
                  </li>
                </ul>
              </div>
              </div>


              <div className="  col-md-3 col-sm-12">
              <div className="ft-box">
                <h3>{langObj.support_text}</h3>
                <ul>
                  <li>
                    <p><span style={{ color: "#023e86" }} className="ml-2">
                    <img style={{ width: "30px" }} src="/images/team.png" />
                    {" "}abcd@email.com{" "}
                  </span></p>
                  </li>
                  <li>
                    <p> <span style={{ color: "#023e86" }} className="ml-2">
                    <img style={{ width: "30px" }} src="/images/email.png" />
                    {" "}support@email.com
                  </span> </p>
                  </li>
                   
                </ul>
              </div>
              </div>
              <div className=" col-md-3 col-sm-12"></div>

              
               

              
            </div>
          </div>
        
      </footer>
    </>
  );
}
