import React from "react";

export default function Story() {
  return (
    <>
      <div className="our-story">
        <div className="container">
          <div className="row">
            <div className="col-md-5 col-sm-12">
              <div className="img-block">
                <div className="tham-img">
                  <img src="images/story-img.jpg" alt="" />
                </div>
              </div>
            </div>
            <div className="col-md-7 col-sm-12">
              <div className="text-block">
                <h3>Our story</h3>
                <p>
                  <h4>Sistem za obuku i stručno usavršavanje</h4>
                  <br />
                  Sistem za obuku je nastao kao inicijativa IKT sektora i centra
                  kompetencija da se svim zaposlenima preduzeća obezbedi
                  savremena platforma za obuku i upoznavanje sa alatima koje
                  koristimo u poslovanju, uputstvima, projektima, propisima,
                  politikama i procedurama kojih se pridržavamo. Sistem je na
                  raspolaganju za korišćenje sa svih lokacija i putem savremenih
                  (smart) komunikacionih uređaja uz primenu standardnih
                  sigurnosnih procedura koje koristimo.
                  <br />
                  <br />
                  <h4>Najčešće postavljana pitanja</h4>
                  <br />
                  <strong>#1 Kako da pokrenem kurs? </strong>
                  <br />
                  Kurs se pokreće tako što se odabere kartica sa početne
                  stranice ili iz kataloga (Svi, Finansije itd.) kako bi se
                  prešlo na stranicu gde je kurikulum, povezani materijali i
                  sadržaj kursa. Klikom na “Pokreni kurs” se prijavljuje na kurs
                  i pristupa svim sadržajima.
                  <br />
                  <strong>
                    #2 Da li mi je potreban VPN da bih pristupio kursu od kuće?<br/>
                  </strong>
                  Pristup putem VPN nije neophodan ali se na sistem mora
                  logovati standardnim korisničkim imenom i šifrom koja se
                  koristi i za elektronsku poštu.
                  <br />
                  <strong>
                    #3 Kako da dobijem pristup obuci i dokumentaciji koja mi je
                    potrebna?<br/>
                  </strong>
                  Pristup obuci se inicijalno dodeljuje službama kojima je to
                  neophodno. Ukoliko verujete da Vam je potreban pristup nekom
                  od materijala obratite se podršci.
                  <br />
                  <strong>#4 Gde mogu da preuzmem serti kat o obuci? <br/> </strong>
                  Neki od kurseva sa ove platforme imaju pridružene serti kate.
                  Serti kati se dobijaju po završetku obuke na stranici moji
                  kursevi. Pored kursa za koji želite da preuzmete sertifikat
                  (ukoliko se dobija) kliknite da dugme „download“ koje će vas
                  odvesti na stranicu sa sertifikatom. Klikom na print, vađ
                  računar će preuzeti sertifikat.
                  <br />
                  <strong>
                    #5 Da li mogu sa telefona da pristupim sistemu?<br/>
                  </strong>
                  Sa telefona se može pristupiti iz mobiling pretaživača unosom
                  web adrese sistema za obuku ili na link kursa, ukoliko Vam je
                  poslat putem elektronske pošte. Obavezni kursevi su
                  prilagođeni i pristupu sa smart uređaja ali je raspored
                  sadržaja na stranici nešto drugačiji.
                </p>
                {/**   <div className="watch-video" data-toggle="modal" data-target="#exampleModalCenter">
                                    <strong><i className="fa fa-play"></i></strong> <span>Watch Video</span>
                                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/** modal */}

      <div
        className="modal fade"
        id="exampleModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Modal title
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">...</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
