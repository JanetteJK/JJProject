// haluun jo kesälomalle tää ei oo hauskaa enää

'use strict';

let money = 0;
let person_id = 1;
let order_no = 1;
let tries = 0;
const max_tries = 3;
const max_person = 10;
let correctAnswer = "";
const countriesDropdown = document.getElementById("countries");

// === API Calls ===

async function getCustomer(id) {
  try {
    const res = await fetch(`http://127.0.0.1:3000/hae_nimi/${id}`);
    const data = await res.json();
    document.querySelector('#asiakas-nimi').innerHTML = data.nimi;
  } catch (error) {
    console.error("Customer fetch error:", error);
  }
}

async function getQuestion(id, order) {
  try {
    const res = await fetch(`http://127.0.0.1:3000/kysymys/${id}/${order}`);
    const data = await res.json();
    document.querySelector('#asiakas-kysymys').innerHTML = data.kysymys;
  } catch (error) {
    console.error("Question fetch error:", error);
  }
}

async function getCorrectAnswer(id) {
  try {
    const res = await fetch(`http://127.0.0.1:3000/oikea_vastaus/${id}`);
    const data = await res.json();
    correctAnswer = data.oikea[0];  // Stored for checking later
  } catch (error) {
    console.error("Answer fetch error:", error);
  }
}

async function getCountries() {
  // Placeholder: Replace with real API to get 9 random countries + correct one
  // Here using static options for testing
  const exampleCountries = [
    "Finland", "Sweden", "Germany", "Italy", "France",
    "Norway", "Greece", "Japan", "Canada"
  ];
  exampleCountries.push(correctAnswer); // Ensure correct one is included

  const shuffled = exampleCountries.sort(() => 0.5 - Math.random()).slice(0, 10);
  countriesDropdown.innerHTML = "";

  shuffled.forEach(c => {
    const option = document.createElement("option");
    option.value = c;
    option.innerText = c;
    countriesDropdown.appendChild(option);
  });
}

// === Game State Updates ===

function updateMoneyDisplay() {
  document.getElementById("rahat").innerText = money + "€";
}

function addMoney(amount) {
  money += amount;
  updateMoneyDisplay();
}

async function loadNextPerson() {
  if (person_id > max_person) {
    window.location.href = "voitto.html"; // tää tekis et joka tyypin jälkee sais sellasen jipii hyvä screenin
    return;
  }

  await getCustomer(person_id);
  await getQuestion(person_id, order_no = 1);
  await getCorrectAnswer(person_id);
  await getCountries();

  tries = 0;
  updateMoneyDisplay();
}

async function handleWrongAnswer() {
  tries++;
  order_no++;

  if (tries >= max_tries) {
    // Show final dialogue
    await getQuestion(person_id, 4);
    setTimeout(() => {
      window.location.href = "GAMEOVER.html"; // häviööö
    }, 3000);
  } else {
    await getQuestion(person_id, order_no);
  }
}

async function handleRightAnswer() {
  if (tries === 0) {
    addMoney(15); // tippi + palkka
  } else {
    addMoney(5);
  }

  person_id++;
  await loadNextPerson();
}

// === Game Init and Event ===

async function startGame() {
  await loadNextPerson();

  document.getElementById("button").addEventListener("click", async () => {
    const selected = countriesDropdown.value;
    if (selected === correctAnswer) {
      await handleRightAnswer();
    } else {
      await handleWrongAnswer();
    }
  });
}

window.onload = startGame;