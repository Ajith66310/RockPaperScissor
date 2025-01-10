let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  Ties: 0,
};
//     if(score === null){
// score = {
//   wins:0,
//   losses:0,
//   Ties:0
// }
//     }
let intervalId;
let isAutoPlaying = false;
document.querySelector(".auto-play-button").addEventListener("click", () => {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = computerPlay();
      playerMoved(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
});

document.querySelector(".rock-btn").addEventListener("click", () => {
  playerMoved("rock");
});
document.querySelector(".paper-btn").addEventListener("click", () => {
  playerMoved("paper");
});
document.querySelector(".scissor-btn").addEventListener("click", () => {
  playerMoved("scissor");
});
document.querySelector(".reset-score-btn").addEventListener("click", () => {
  score.wins = 0;
  score.losses = 0;
  score.Ties = 0;
  localStorage.removeItem("score");
  updateScoreElement();
});

updateScoreElement();
function playerMoved(playerMove) {
  const computerMove = computerPlay();
  let result = "";
  if (playerMove === "scissor") {
    if (computerMove === "rock") {
      result = "You Lose";
    } else if (computerMove === "paper") {
      result = "You Win";
    } else if (computerMove === "scissor") {
      result = "Draw";
    }
  } else if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Draw";
    } else if (computerMove === "paper") {
      result = "You Lose";
    } else if (computerMove === "scissor") {
      result = "You Win";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You Win";
    } else if (computerMove === "paper") {
      result = "Draw";
    } else if (computerMove === "scissor") {
      result = "You Lose";
    }
  }
  if (result === "You Win") {
    score.wins += 1;
  } else if (result === "You Lose") {
    score.losses += 1;
  } else if (result === "Draw") {
    score.Ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));
  updateScoreElement();

  document.querySelector(".js-result").innerHTML = `${result}`;

  document.querySelector(".js-moves").innerHTML = `You
  <img src="${playerMove}-emoji.png" class="move-icon">  
  <img src="${computerMove}-emoji.png" class="move-icon">
  Computer`;
}
function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `<span style="color:green;">Wins:${score.wins}</span> Ties:${score.Ties} <span style="color:red;">Losses:${score.losses}</span> `;
}
function computerPlay() {
  let computerMove = "";
  const randomNum = Math.random();
  if (randomNum >= 0 && randomNum < 1 / 3) {
    computerMove = "rock";
  } else if (randomNum >= 1 / 3 && randomNum < 2 / 3) {
    computerMove = "paper";
  } else if (randomNum >= 2 / 3 && randomNum <= 1) {
    computerMove = "scissor";
  }
  return computerMove;
}
