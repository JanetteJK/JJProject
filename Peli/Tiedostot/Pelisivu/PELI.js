'use strict';


/* Pelin alustusfunktio, hakee ensimmäisen asiakkaan nimen ja kysymyksen sekä oikean vastauksen*/
async function getCustomer(person_id) {
  try {
    const response = await fetch(`http://127.0.0.1:3000/hae_nimi/${person_id}`);
    console.log('hei sinä');
    const data = await response.json();
    console.log(data);

    let nimi = document.querySelector('#asiakas-nimi');
    nimi.innerHTML = data.nimi;
  } catch (error) {
    console.error('Error fetching data', error);
  }
}

async function getQuestion(person_id, order_no) {
  try {
    const kys = await fetch(`http://127.0.0.1:3000/kysymys/${person_id}/${order_no}`);
    const vastaus = await kys.json();

    let kysymys = document.querySelector('#asiakas-kysymys');
    kysymys.innerHTML = vastaus.kysymys;
  } catch (error) {
    console.error('Error fetching data', error);
  }
}
getCustomer(1)
getQuestion(1,1)
/* Pääpeli, tarkistaa onko annettu vastaus oikea */

/*async function checkAnswer() {
  try {
    const response = await fetch ('http://127.0.0.1:3000/oikea_vastaus/1');
    const vastaus = await response.json();
    console.log(vastaus);
  } catch (error) {
    console.error('Error fetching data', error);
  }

/* polku sille mitä tapahtuu jos vastaus on oikein
*  - palkka +5e
*  - jos yrityksiä 0 niin palkka +15e */

/*let onButtonClick = function() {
  let person_id = 1;
  let order_no = 1;
  let tries = 0;
  let max_tries = 3;

}

  /* polku sille mitä tapahtuu kun vastaus väärin + tarkistaa että yrityksiä on alle 3 */

  /* jos yrityksiä 3 häviö ruutu */

  /* loppuruutu kun asiakas 10 vastattu oikein */
