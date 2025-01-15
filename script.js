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
function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = computerPlay();
      playerMoved(playerMove);
    }, 1000);
    isAutoPlaying = true;
    document.querySelector(".auto-play-button").innerHTML = "Stop Playing";
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector(".auto-play-button").innerHTML = "Auto Play";
  }
}
document.querySelector(".auto-play-button").addEventListener("click", () => {
  autoPlay();
});
document.querySelector(".reset-score-btn").addEventListener("click", () => {
  confirmationMessage();
});
document.querySelector(".rock-btn").addEventListener("click", () => {
  playerMoved("Rock");
});
document.querySelector(".paper-btn").addEventListener("click", () => {
  playerMoved("Paper");
});
document.querySelector(".scissor-btn").addEventListener("click", () => {
  playerMoved("Scissor");
});
function resetBtn() {
  confirmationMessage();
  score.wins = 0;
  score.losses = 0;
  score.Ties = 0;
  localStorage.removeItem("score");
  updateScoreElement();
}
function confirmationMessage() {
  document.querySelector(
    ".confirm-msg"
  ).innerHTML = `Are you sure you want to reset the score ? <button class="yesBtn js-yesBtn">Yes</button><button class="noBtn js-noBtn">No</button>`;
  document.querySelector(".js-yesBtn").addEventListener("click", () => {
    resetBtn();
    resetMsg();
  });
  document.querySelector(".js-noBtn").addEventListener("click", () => {
    resetMsg();
  });
}
function resetMsg() {
  document.querySelector(".confirm-msg").innerHTML = "";
}
document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    playerMoved("rock");
  } else if (event.key === "p") {
    playerMoved("paper");
  } else if (event.key === "s") {
    playerMoved("scissor");
  } else if (event.key === "a") {
    autoPlay();
  } else if (event.key === "Backspace") {
    confirmationMessage();
  }
});
updateScoreElement();
function playerMoved(playerMove) {
  const computerMove = computerPlay();
  let result = "";
  if (playerMove === "Scissor") {
    if (computerMove === "Rock") {
      result = "You Lose";
    } else if (computerMove === "Paper") {
      result = "You Win";
    } else if (computerMove === "Scissor") {
      result = "Draw";
    }
  } else if (playerMove === "Rock") {
    if (computerMove === "Rock") {
      result = "Draw";
    } else if (computerMove === "Paper") {
      result = "You Lose";
    } else if (computerMove === "Scissor") {
      result = "You Win";
    }
  } else if (playerMove === "Paper") {
    if (computerMove === "Rock") {
      result = "You Win";
    } else if (computerMove === "Paper") {
      result = "Draw";
    } else if (computerMove === "Scissor") {
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
  <img src="images/${playerMove}-emoji.png" class="move-icon">  
  <img src="images/${computerMove}-emoji.png" class="move-icon">
  Computer`;
}
function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `<span style="color:green;">Wins:${score.wins}</span> Ties:${score.Ties} <span style="color:red;">Loses:${score.losses}</span> `;
}
function computerPlay() {
  let computerMove = "";
  const randomNum = Math.random();
  if (randomNum >= 0 && randomNum < 1 / 3) {
    computerMove = "Rock";
  } else if (randomNum >= 1 / 3 && randomNum < 2 / 3) {
    computerMove = "Paper";
  } else if (randomNum >= 2 / 3 && randomNum <= 1) {
    computerMove = "Scissor";
  }
  return computerMove;
}
