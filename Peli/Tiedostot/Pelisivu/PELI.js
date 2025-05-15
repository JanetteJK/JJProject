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
    const answ = await fetch(
        `http://127.0.0.1:3000/oikea_vastaus/${person_id}`);
    const vastaus = await answ.json();
    const oikea = vastaus.oikea;
    console.log(oikea);
    return oikea;
  } catch (error) {
    console.error('Error fetching data', error);
  }
}

console.log(getAnswer(1));

/* Palkan lisäys funktio */

function addMoney() {
  rahat += 5
  document.getElementById('rahat').innerHTML = rahat + '€';
}

/* Tipin lisäys funktio */

function addTip() {
  rahat += 15;
  document.getElementById('rahat').innerHTML = rahat + '€';
}


/* Pääpeli, tarkistaa onko annettu vastaus oikea */

  let rahat = 0;
  let person_id = 1;
  let order_no = 1;
  let tries = 0;
  let max_tries = 3;

async function mainGame(value) {
  let country = value;
  let answer = await getAnswer(person_id);
  if (answer.includes(country)) {
    if (tries === 0) {
      addMoney();
      addTip();
      person_id += 1;
      order_no = 1;
      tries = 0;
      getCustomer(person_id);
      getQuestion(person_id, order_no);
    } else if (tries <= max_tries) {
      addMoney();
      person_id += 1;
      order_no = 1;
      tries = 0;
      getCustomer(person_id);
      getQuestion(person_id, order_no);
    } else if (tries < 3) {
      tries = tries + 1;
      order_no += 1;
      getQuestion(person_id, order_no);
    } else if (tries === 3) {
      getQuestion(person_id, 4);
    }
  } else {
    tries = tries += 1;
    max_tries = max_tries -= 1;
    order_no += 1;
    getQuestion(order_no);
  }
}


  function onButtonClick() {
  let value = document.getElementById("countries").value
   mainGame(value)
  }

window.onload = function() { /*alustaa pelin sivun latauskerralla*/
  document.getElementById('rahat').innerHTML = rahat + '€';
  getCustomer(1);
  getQuestion(1, 1);
  const button = document.querySelector('#button');
  button.addEventListener('click', onButtonClick);
}



/* polku sille mitä tapahtuu jos vastaus on oikein
*  - palkka +5e
*  - jos yrityksiä 0 niin palkka +15e */

/* polku sille mitä tapahtuu kun vastaus väärin + tarkistaa että yrityksiä on alle 3 */

/* jos yrityksiä 3 häviö ruutu */

/* loppuruutu kun asiakas 10 vastattu oikein */






