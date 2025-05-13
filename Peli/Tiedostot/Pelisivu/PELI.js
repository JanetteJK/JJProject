'use strict'

/* Pelin alustusfunktio, hakee ensimmäisen asiakkaan nimen ja kysymyksen sekä oikean vastauksen*/
async function prepGame() {
  try {
    const response = await fetch('http://127.0.0.1:3000/hae_nimi/1');
    console.log(response)
    const data = await response.json();
    console.log(data)

    let nimi = document.querySelector("#asiakas-nimi")
    nimi.innerHTML = data.nimi

    const kys = await fetch('http://127.0.0.1:3000/hae_kysymys/1/1')
    console.log(kys)
    const vastaus = await response.json();
    console.log(vastaus)

    let kysymys = document.querySelector("#asiakas-kysymys")
    kysymys.innerHTML = vastaus.kysymys
  }


  catch (error) {
    console.error('Error fetching data', error)
  }
}

/* Pääpeli, tarkistaa onko annettu vastaus oikea */

/* polku sille mitä tapahtuu jos vastaus on oikein
*  - palkka +5e
*  - jos yrityksiä 0 niin palkka +15e */

/* polku sille mitä tapahtuu kun vastaus väärin + tarkistaa että yrityksiä on alle 3 */

/* jos yrityksiä 3 häviö ruutu */

/* loppuruutu kun asiakas 10 vastattu oikein */

