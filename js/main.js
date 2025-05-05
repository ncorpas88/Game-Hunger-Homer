// ELEMENTOS PRINCIPALES DEL DOM

// Pantalla
const splashScreenNode = document.querySelector("#splash-screen");
const gameScreenNode = document.querySelector("#game-screen");
const gameOverScreenNode = document.querySelector("#game-over.screen");
const gameBoxNode = document.querySelector("#game-box");
const scoreBoard = document.querySelector("#score");
const bgMusic = new Audio(`./sounds/music.mp3`)
bgMusic.loop = true;
bgMusic.volume = 0.5;

// Botones
const startBtnNode = document.querySelector("#start-btn");
// Game box

// VARIABLES GLOBALES DEL JUEGO
let homerObj = null;
let donutObjArr = [];
let frutaObjArr = [];
let gameIntervalId = null;
let donutIntervalId = null;
let frutaIntervalId = null;
let score = 3;
const juegoAncho = 400;
// FUNCIONES GLOBALES DEL JUEGO

function startGame() {
  // 1. Ocultar pantalla de inicio
  splashScreenNode.style.display = "none";

  // 2. mostrar la pantalla de juego
  gameScreenNode.style.display = "flex";

  // 3. añadimos elemento inicial del juego (Homer)

  homerObj = new Homer();
  // 4. iniciamos intervalo principal del juego
  gameIntervalId = setInterval(() => {
    gameLoop();
  }, Math.round(1000 / 60)); //60fps

  // 5. iniciamos otro intervalo del juego
  donutIntervalId = setInterval(() => {
    donutAppear();
  }, 2000); //los donuts aparecen cada dos segundos

  frutaIntervalId = setInterval(() => {
    frutaAppear();
  }, 1000);
}

function gameLoop() {
  donutObjArr.forEach((eachDonutObj) => {
    eachDonutObj.automaticMovement();
  });

  frutaObjArr.forEach((eachFrutaObj) => {
    eachFrutaObj.automaticMovement();
  });

  elementsDestoy();
  colisionHomerDonut();
  colisionHomerFruit();
}

function donutAppear() {
  let donutObj = new Donut(Math.random() * 370);
  donutObjArr.push(donutObj);
}

function frutaAppear() {
  let frutaObj1 = new Fruta("cereza", Math.random() * 370);
  frutaObjArr.push(frutaObj1);

  let frutaObj2 = new Fruta("fresa", Math.random() * 370);
  frutaObjArr.push(frutaObj2);
}

function elementsDestoy() {
  if (donutObjArr.length < 730 && donutObjArr[0].y + donutObjArr[0].h >= 730) {
    donutObjArr[0].node.remove();
    donutObjArr.shift();
  }

  if (frutaObjArr.length < 730 && frutaObjArr[0].y + frutaObjArr[0].h >= 730) {
    frutaObjArr[0].node.remove();
    frutaObjArr.shift();
  }
}

function colisionHomerDonut() {
  donutObjArr.forEach((eachDonutObj) => {
    if (
      homerObj.x < eachDonutObj.x + eachDonutObj.w &&
      homerObj.x + homerObj.w > eachDonutObj.x &&
      homerObj.y < eachDonutObj.y + eachDonutObj.h &&
      homerObj.h + homerObj.y > eachDonutObj.y
    ) {
      // ¡colisión detectada!
      score += 2;
      scoreBoard.textContent = `Score: ${score}`;
      donutObjArr[0].node.remove();
      donutObjArr.shift();
    }
  });
}

function colisionHomerFruit() {
  frutaObjArr.forEach((eachFrutaObj) => {
    if (
      homerObj.x < eachFrutaObj.x + eachFrutaObj.w &&
      homerObj.x + homerObj.w > eachFrutaObj.x &&
      homerObj.y < eachFrutaObj.y + eachFrutaObj.h &&
      homerObj.h + homerObj.y > eachFrutaObj.y
    ) {
      // ¡colisión detectada!
      score--;
      scoreBoard.textContent = `Score: ${score}`;
      if (score <= 0) {
        gameOver();
      }
      frutaObjArr[0].node.remove();
      frutaObjArr.shift();
      
    }
  });
}

function gameOver() {
  //1. detener el intervalo
  clearInterval(gameIntervalId);
  clearInterval(donutIntervalId);
  clearInterval(frutaIntervalId);
  //2. ocultar pantalla de juego
  gameScreenNode.style.display = "none";

  //3 mostrar pantalla final
  gameOverScreenNode.style.display = "flex";
}

// EVENT LISTENERS

startBtnNode.addEventListener("click", () => {
  startGame();
  bgMusic.play();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    homerObj.x -= homerObj.speed;
    homerObj.x = Math.max(0, homerObj.x);
    homerObj.node.style.left = `${homerObj.x}px`;
  } else if (event.key === "ArrowRight") {
    homerObj.x += homerObj.speed;
    homerObj.x = Math.min(juegoAncho - homerObj.w, homerObj.x);
    homerObj.node.style.left = `${homerObj.x}px`;
  }
});
