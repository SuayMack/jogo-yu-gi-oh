const pathImages = "./src/assets/icons/";

// Estado da aplicação
const state = {
  score: {
    playerScore: 0,
    computerScore: 0,
    scoreBox: document.getElementById("score_points"),
  },
  cardSprites: {
    avatar: document.getElementById("card-image"),
    name: document.getElementById("card-name"),
    type: document.getElementById("card-type"),
  },
  fieldCards: {
    player: document.getElementById("player-field-card"),
    computer: document.getElementById("computer-field-card"),
  },
  playerSides: {
    player1: "player-cards",
    player1Box: document.querySelector("#player-cards"),
    computer: "computer-cards",
    computer1Box: document.querySelector("#computer-cards"),
  },
  actions: {
    button: document.getElementById("next-duel"),
  },
};

const playerSides = {
  player1: "player-cards",
  computer: "computer-cards",
};

const cardData = [
  {
    id:0,
    name: "Blue Eyes White Dragon",
    type: "Paper",
    img: `${pathImages}dragon.png`,
    WinOf: [1],
    LoserOf: [2],
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

// Função para ID aleatório
async function getRandomId() {
  const randomIndex = Math.floor(Math.random() * cardData.length);
  return cardData[randomIndex].id;
}

//criar ID aleatório
async function createCardImage(idCard, fieldSide) {
  const cardImage = document.createElement("img");
  cardImage.setAttribute("height", "100%");
  cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
  cardImage.setAttribute("data-id", idCard);
  cardImage.classList.add("card");

  // add evento de clique apenas para o lado do jogador
  if (fieldSide === playerSides.player1) {
    // add evento de mouseover para destacar a carta
    cardImage.addEventListener("mouseover", () => {
      drawSelectCard(idCard);
    });
    // add evento de mouseout para esconder a carta
    cardImage.addEventListener("click", () => {
      setCardsField(cardImage.getAttribute("data-id"));
    });
  }
  return cardImage;
}

//setar cartas no campo
async function setCardsField(cardId) {
  //remove todas as cartas
  await removeAllCardsImages();
  //sorteia carta aleatória para o computador
  let computerCardId = await getRandomId();

  state.fieldCards.player.style.display = "block";
  state.fieldCards.computer.style.display = "block";

  state.fieldCards.player.setAttribute("src", cardData[cardId].img);
  state.fieldCards.computer.setAttribute("src", cardData[computerCardId].img);

  //setar resultado
  let duelResults = await checkDuelResults(cardId, computerCardId);

  await updateScore();
  await drawButton(duelResults);
}

async function drawButton(text) {
  state.actions.button.innerText = text.toUpperCase();
  state.actions.button.style.display = "block";
}

async function updateScore() {
  state.score.scoreBox.innerText = `Win: ${state.score.playerScore} : Lose: ${state.score.computerScore}`;
  state.score.scoreBox.style.display = "block";

}

async function checkDuelResults(playerCardId, computerCardId) {
  let duelResults = "DRAW";

  let playerCard = cardData[playerCardId];
  let computerCard = cardData[computerCardId];

  if (playerCard.WinOf.includes(computerCard.id)) {
    duelResults = "WIN";    
    state.score.playerScore++;
  } else if (playerCard.LoserOf.includes(computerCard.id)) {
    duelResults = "LOSE";
    state.score.computerScore++;
  } else {
    duelResults = "DRAW";
  }
  await playAudio(duelResults);
  return duelResults;
}

//remover as outras cartas depois de selecionar
async function removeAllCardsImages() {
  let { computer1Box, player1Box } = state.playerSides;

  let imgElements = computer1Box.querySelectorAll("img");
  imgElements.forEach((img) => {img.remove();});
  
  imgElements = player1Box.querySelectorAll("img");
  imgElements.forEach((img) => {img.remove();});
}

//atualiza as informações e a imagem da carta selecionada
//param = number (index- índice da carta selecionada)
async function drawSelectCard(index) {
  // atualiza imagem do avatar no estado com a imagem da carta selecionada
  state.cardSprites.avatar.src = cardData[index].img;
  // atualiza nome da carta no estado
  state.cardSprites.name.innerText = cardData[index].name; 
  // atualiza tipo da carta no estado, addo atributo
  state.cardSprites.type.innerText = "Attribute: " + cardData[index].type;
}

//colocar cartas na tela
async function drawCards(cardNumbers, fieldSide) {
  for (let i = 0; i < cardNumbers; i++) {
    const randomIdCard = await getRandomId();
    const cardImage = await createCardImage(randomIdCard, fieldSide);

    document.getElementById(fieldSide).appendChild(cardImage);
  }
}

async function resetDuel() {
  state.cardSprites.avatar.src = "";
  state.actions.button.style.display = "none";
  state.fieldCards.player.style.display = "none";
  state.fieldCards.computer.style.display = "none";
 
  init();
}

async function playAudio(status) {
  const audio = new Audio(`./src/assets/audios/${status}.wav`);

  try {
    await audio.play();
  } catch (error) {
    console.log(error);
  }
}

function init(){
  state.fieldCards.player.style.display = "none";
  state.fieldCards.computer.style.display = "none";

  //quantas cartas a sacar
  drawCards(5, playerSides.player1);
  drawCards(5, playerSides.computer);

  const bgm = document.getElementById("bgm")
  bgm.play();
};

init();