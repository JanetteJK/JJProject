'use strict';

/* hakee ensimmäisen asiakkaan nimen */
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

/*hakee asiakkaan kysymyksen id ja order_no perusteella*/
async function getQuestion(person_id, order_no) {
  try {
    const kys = await fetch(
        `http://127.0.0.1:3000/kysymys/${person_id}/${order_no}`);
    const vastaus = await kys.json();

    let kysymys = document.querySelector('#asiakas-kysymys');
    kysymys.innerHTML = vastaus.kysymys;
  } catch (error) {
    console.error('Error fetching data', error);
  }
}

/*hakee oikean vastauksen tietokannasta*/
async function getAnswer(person_id) {
  try {
    const answ = await fetch(`http://127.0.0.1:3000/oikea_vastaus/${person_id}`);
    const vastaus = await answ.json();
    console.log(vastaus)
    return vastaus;
  }
  catch (error) {
    console.error('Error fetching data', error);
  }
}

/* Palkan lisäys funktio */

function addMoney(rahat) {
  const palkka = 5;
  const palauta = rahat + palkka;
  return palauta;
}

/* Tipin lisäys funktio */

function addTip(rahat) {
  const tippi = 15;
  const palauta = rahat + tippi;
  return palauta;
}

let rahat = 0;
let person_id = 1;
let order_no = 1;
let tries = 0;
let max_tries = 3;


/* Pääpeli, tarkistaa onko annettu vastaus oikea */


window.onload = function() {
  document.getElementById('rahat').innerHTML = rahat + '€';

};

const onButtonClick = function() {
  getCustomer(person_id)
  getQuestion(order_no)
  let country = document.getElementById("countries").value;
  const oikea = getAnswer({person_id});
  while (tries < max_tries) {
    if (country === oikea) {
      if (tries === 0) {
        addMoney();
        addTip();
        person_id += 1;
        order_no === 1;
        tries === 0;
      } else {
        addMoney();
        person_id += 1;
        order_no === 1;
        tries === 0;
      }
    } else {
      tries += 1;
      order_no += 1;
    }
  }
  if (tries === 3) {

}
}
;
window.onload = function() {
  const button = document.querySelector('#button');
  button.addEventListener('click', onButtonClick);
}

/* polku sille mitä tapahtuu jos vastaus on oikein
*  - palkka +5e
*  - jos yrityksiä 0 niin palkka +15e */

/* polku sille mitä tapahtuu kun vastaus väärin + tarkistaa että yrityksiä on alle 3 */

/* jos yrityksiä 3 häviö ruutu */

/* loppuruutu kun asiakas 10 vastattu oikein */
