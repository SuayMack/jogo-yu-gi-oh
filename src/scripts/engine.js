const state = {
  score: {
    playerScore: 0,
    conputerScore: 0,
    scoreBox: document.getElementById("score_points"),
  },
  cardSprites: {
    avatar: document.getElementById("card_image"),
    name: document.getElementById("card_name"),
    type: document.getElementById("card_type"),
  },
  fieldCards:{
    player: document.getElementById("player-field-card"),
    computer: document.getElementById("computer-field-card"),
  },
  actions: {
    button: document.getElementById("next-duel"),
  },
};

const pathImages = "./src/assets/icons/";
const cardData = [
  {
    id:0,
    name: "Blue Eyes White Dragon",
    type: "Paper",
    img: `${pathImages}dragon.png`,
    WinOf: [],
    LoserOf: [],
  },
  {
    id:1,
    name: "Dark Magician",
    type: "Rock",
    img: `${pathImages}magician.png`,
    WinOf: [2],
    LoserOf: [0],
  },
  {
    id:2,
    name: "Exodia",
    type: "Sessors",
    img: `${pathImages}exodia.png`,
    WinOf: [0],
    LoserOf: [1],
  },
]

function init(){};

init();