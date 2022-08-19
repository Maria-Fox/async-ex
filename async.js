// alert("js here");
let jsonKey = `?json`;

let favNum = 8;
let numAPI = "http://numbersapi.com";
// 1.
async function numberFact(favNum) {
  try {
    let res = await $.getJSON(`${numAPI}/${favNum}${jsonKey}`);
    console.log(res);
  } catch (e) {
    console.log("something went wrong-1");
  }
}

numberFact(favNum);

//2. Otherwise, you can create an array of nums, put in arguments, loop thru,etc.

async function mulNumFacts() {
  try {
    let facts = await Promise.all([
      $.getJSON(`${numAPI}/9${jsonKey}`),
      $.getJSON(`${numAPI}/10${jsonKey}`),
      $.getJSON(`${numAPI}/11${jsonKey}`),
    ]);

    // console.log(facts);

    for (let i = 0; i <= facts.length; i++) {
      $("#facts").append(`<li>${facts[i].text}</li>`);
    }
  } catch (e) {
    ("something went wrong-2");
  }
}

mulNumFacts();

//3.

async function favNumFacts(favNum) {
  let facts = await Promise.all(
    Array.from({ length: 4 }, () => $.getJSON(`${numAPI}/${favNum}${jsonKey}`))
  );
  facts.forEach((resp) => {
    $("#fav-facts").append(`<li>${resp.text}</li>`);
  });
}
// fav-facts

favNumFacts(favNum);

// Part 2
// 1.

let deckAPI = "http://deckofcardsapi.com/api/deck";

async function getDeckAndCard() {
  let card = await $.getJSON(`${deckAPI}/new/draw/?count=1`);
  console.log(`${card.cards[0].value} of ${card.cards[0].suit}`);
}

getDeckAndCard();

//2.
let deckId = null;
async function singleCard() {
  let req = await $.getJSON(`${deckAPI}/new/draw/?count=1`);
  console.log(req);

  console.log(`${req.cards[0].value} of ${req.cards[0].suit}`);
  let deckId = req.deck_id;
  console.log(deckId);

  let secReq = await $.getJSON(`${deckAPI}/${deckId}/draw/?count=1`);
  console.log(`${secReq.cards[0].value} of ${secReq.cards[0].suit}`);
}

singleCard();

//3.
let gameDeck = null;
let eCounter = 0;

async function loadDeck() {
  let deck = await $.getJSON(`${deckAPI}/new/shuffle/?deck_count=1`);
  console.log(deck);

  gameDeck = deck.deck_id;
  console.log(deckId);
}

loadDeck();

async function showCard(e) {
  e.preventDefault();
  eCounter += 1;
  let res = await $.getJSON(`${deckAPI}/${gameDeck}/draw?count=1`);

  let card = res.cards[0].image;

  $("#card-list").append(
    `<img src="${card}" alt="${card.value} of ${card.suit}">`
  );

  if (eCounter == 53) {
    $("#game-button").remove();
    alert("You're outta cards!");
  }
}

$("#game-button").on("click", showCard);
