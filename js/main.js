// ELEMENTOS PRINCIPALES DEL DOM

// Pantalla
const splashScreenNode = document.querySelector("#splash-screen");
const gameScreenNode = document.querySelector("#game-screen");
const gameOverScreenNode = document.querySelector("#game-over-screen");
const gameBoxNode = document.querySelector("#game-box");
const scoreBoard = document.querySelector("#score");
const bgMusic = new Audio(`./sounds/music.mp3`);
bgMusic.loop = true;
bgMusic.volume = 0.5;
const musicGameOver = new Audio(`./sounds/gameover.mp3`);
musicGameOver.loop = true;
musicGameOver.volume = 0.5;
const soundHomer = new Audio(`./sounds/homer-d-oh_1.mp3`);
soundHomer.loop = false;
soundHomer.volume = 0.5;
const soundDisparo = new Audio(`./sounds/pew-pew-disparo.mp3`);
soundDisparo.loop = false;
soundDisparo.volume = 0.5;
const soundDona = new Audio(`./sounds/homer-woohoo.mp3`);
soundDona.loop = false;
soundDona.volume = 0.5;
const soundExplosion = new Audio(`./sounds/explosion-47821.mp3`);
soundExplosion.loop = false;
soundExplosion.volume = 0.5;
const soundMenu = new Audio(`./sounds/menu.mp3`);
soundMenu.loop = false;
soundMenu.volume = 0.5;

// Botones
const startBtnNode = document.querySelector("#start-btn");
const restartBtnNode = document.querySelector("#restart-btn");
const menuBtnNode = document.querySelector("#boton-menu"); // nodo boton abrir menu
const menuInstrucciones = document.querySelector(".pergamino");
const cerrarMenuNode = document.querySelector("#btn-X"); // nodo boton cerrar menu
const menuCerrarInstrucciones = document.querySelector(".pergamino");
// Game box

// VARIABLES GLOBALES DEL JUEGO
let homerObj = null;
let donutObjArr = [];
let beerDisparoArr = [];
let frutaObjArr = [];
let srBurnsObj = null;
let beerObj = null;
let gameIntervalId = null;
let donutIntervalId = null;
let frutaIntervalId = null;

let score = 3;
const juegoAncho = 800;
// FUNCIONES GLOBALES DEL JUEGO

function startGame() {
  // 1. Ocultar pantalla de inicio
  splashScreenNode.style.display = "none";

  // 2. mostrar la pantalla de juego
  gameScreenNode.style.display = "flex";

  // 3. añadimos elemento inicial del juego (Homer)

  homerObj = new Homer();
  srBurnsObj = new Burns();
  // 4. iniciamos intervalo principal del juego
  gameIntervalId = setInterval(() => {
    gameLoop();
  }, Math.round(1000 / 60)); //60fps

  // 5. iniciamos otro intervalo del juego
  donutIntervalId = setInterval(() => {
    donutAppear();
  }, 1200); //los donuts aparecen cada dos segundos

  frutaIntervalId = setInterval(() => {
    frutaAppear();
  }, 1200);
}

function gameLoop() {
  donutObjArr.forEach((eachDonutObj) => {
    eachDonutObj.automaticMovement();
  });

  frutaObjArr.forEach((eachFrutaObj) => {
    eachFrutaObj.automaticMovement();
  });

  beerDisparoArr.forEach((beerObj, index) => {
    beerObj.disparo();
    if (beerObj.y + beerObj.h < 0) {
      beerObj.node.remove();
      beerDisparoArr.splice(index, 1);
    }
  });

  elementsDestoy();
  colisionHomerDonut();
  colisionHomerFruit();
  moverSrBurns();
  colisionBurns();
  colisionBurnsHomer();
  colisionBurnsBeer();
  colisionFrutaDonut();
}

function donutAppear() {
  let nuevoDonut;
  let colisiona = true;

  while (colisiona) {
    const randomX = Math.random() * (gameBoxNode.offsetWidth - 40);
    nuevoDonut = new Donut(randomX);
    colisiona = false;

    for (let fruta of frutaObjArr) {
      if (hayColision(nuevoDonut, fruta)) {
        colisiona = true;
        nuevoDonut.node.remove();
        break;
      }
    }
  }

  donutObjArr.push(nuevoDonut);
}

function frutaAppear() {
  let fruta1, fruta2;
  let colisiona = true;

  while (colisiona) {
    const pos1 = Math.random() * (gameBoxNode.offsetWidth - 40);
    const pos2 = Math.random() * (gameBoxNode.offsetWidth - 40);

    fruta1 = new Fruta("cereza", pos1);
    fruta2 = new Fruta("fresa", pos2);

    colisiona = false;

    if (hayColision(fruta1, fruta2)) {
      colisiona = true;
    }

    for (let donut of donutObjArr) {
      if (hayColision(fruta1, donut) || hayColision(fruta2, donut)) {
        colisiona = true;
        break;
      }
    }

    if (colisiona) {
      fruta1.node.remove();
      fruta2.node.remove();
    }
  }

  frutaObjArr.push(fruta1, fruta2);
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
    ){
      // ¡colisión detectada!
      score++;
      scoreBoard.textContent = `Score: ${score}`;
      donutObjArr[0].node.remove();
      donutObjArr.shift();
      soundDona.play();
    }
  });
}

function colisionHomerFruit() {
  frutaObjArr.forEach((eachFrutaObj, index) => {
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
      frutaObjArr[index].node.remove();
      frutaObjArr.splice(index, 1);
      soundHomer.play();
    }
  });
}

function gameOver() {
  //1. detener el intervalo
  clearInterval(gameIntervalId);
  clearInterval(donutIntervalId);
  clearInterval(frutaIntervalId);
  bgMusic.pause();
  musicGameOver.play();
  //2. ocultar pantalla de juego
  gameScreenNode.style.display = "none";

  //3 mostrar pantalla final
  gameOverScreenNode.style.display = "flex";

  //puntaje final
  const scoreFinalNode = document.querySelector("#score-fin");
  scoreFinalNode.textContent = `Puntaje total: ${score}`;
}

function resetGame() {
  donutObjArr.forEach((eachDonut) => eachDonut.node.remove());
  frutaObjArr.forEach((eachFruta) => eachFruta.node.remove());
  homerObj.node.remove();
  srBurnsObj.node.remove();

  donutObjArr = [];
  frutaObjArr = [];

  score = 3;
  scoreBoard.textContent = `Score: ${score}`;

  homerObj = null;
  srBurnsObj = null;

  bgMusic.currentTime = 0;
}

function moverSrBurns() {
  if (srBurnsObj.isMovingRight === true) {
    srBurnsObj.x += srBurnsObj.speed;
    srBurnsObj.node.style.left = `${srBurnsObj.x}px`;
  } else {
    srBurnsObj.x -= srBurnsObj.speed;
    srBurnsObj.node.style.left = `${srBurnsObj.x}px`;
  }

  if (srBurnsObj.isMovingDown === true) {
    srBurnsObj.y += srBurnsObj.speed;
    srBurnsObj.node.style.top = `${srBurnsObj.y}px`;
  } else {
    srBurnsObj.y -= srBurnsObj.speed;
    srBurnsObj.node.style.top = `${srBurnsObj.y}px`;
  }
}

function colisionBurns() {
  if (srBurnsObj.x > gameBoxNode.offsetWidth - srBurnsObj.w) {
    srBurnsObj.isMovingRight = false;
  }

  if (srBurnsObj.y > gameBoxNode.offsetHeight - srBurnsObj.h) {
    srBurnsObj.isMovingDown = false;
  }

  if (srBurnsObj.x <= 0) {
    srBurnsObj.isMovingRight = true;
  }

  if (srBurnsObj.y <= 0) {
    srBurnsObj.isMovingDown = true;
  }
}

function colisionBurnsHomer() {
  if (
    homerObj.x < srBurnsObj.x + srBurnsObj.w &&
    homerObj.x + homerObj.w > srBurnsObj.x &&
    homerObj.y < srBurnsObj.y + srBurnsObj.h &&
    homerObj.h + homerObj.y > srBurnsObj.y
  ) {
    gameOver();
  }
}

function disparoHomer() {
  const x = homerObj.x + homerObj.w / 2 - 5;
  const y = homerObj.y;
  const newBeer = new Beer(x, y);
  beerDisparoArr.push(newBeer);
  soundDisparo.play();
}

function colisionBurnsBeer() {
  beerDisparoArr.forEach((eachBeerObj, index) => {
    if (
      eachBeerObj.x < srBurnsObj.x + srBurnsObj.w &&
      eachBeerObj.x + eachBeerObj.w > srBurnsObj.x &&
      eachBeerObj.y < srBurnsObj.y + srBurnsObj.h &&
      eachBeerObj.y + eachBeerObj.h > srBurnsObj.y
    ) {
      eachBeerObj.node.remove();
      beerDisparoArr.splice(index, 1);

      srBurnsObj.node.remove();
      srBurnsObj = null;

      score += 2;
      scoreBoard.textContent = `Score: ${score}`;
      soundExplosion.play();

      setTimeout(() => {
        const randomX = Math.random() * (gameBoxNode.offsetWidth - 34);
        const randomY = Math.random() * (gameBoxNode.offsetHeight - 186);

        srBurnsObj = new Burns();

        srBurnsObj.x = randomX;
        srBurnsObj.y = randomY;
        srBurnsObj.node.style.left = `${srBurnsObj.x}px`;
        srBurnsObj.node.style.top = `${srBurnsObj.y}px`;
      }, 5000);
    }
  });
}

function hayColision(objA, objB) {
  return (
    objA.x < objB.x + objB.w &&
    objA.x + objA.w > objB.x &&
    objA.y < objB.y + objB.h &&
    objA.h + objA.y > objB.y
  );
}

function colisionFrutaDonut() {
  frutaObjArr.forEach((fruta, frutaIndex) => {
    donutObjArr.forEach((donut, donutIndex) => {
      if (hayColision(fruta, donut)) {
        fruta.node.remove();
        donut.node.remove();

        frutaObjArr.splice(frutaIndex, 1);
        donutObjArr.splice(donutIndex, 1);
      }
    });
  });
}

function mostrarMenu() {
  menuInstrucciones.style.display = "block";
}

function cerrarMenu() {
  menuInstrucciones.style.display = "none";
}

// EVENT LISTENERS

startBtnNode.addEventListener("click", () => {
  startGame();
  bgMusic.play();
  soundMenu.play();
});

restartBtnNode.addEventListener("click", () => {
  resetGame();
  startGame();
  bgMusic.play();
  musicGameOver.pause();
  soundMenu.play();
  gameOverScreenNode.style.display = "none";
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
  } else if (event.key === "ArrowUp") {
    disparoHomer();
  }
});
menuBtnNode.addEventListener("click", () => {
  mostrarMenu();
  menuBtnNode.style.display = "none";
  soundMenu.play();
});

cerrarMenuNode.addEventListener("click", () => {
  cerrarMenu();
  menuBtnNode.style.display = "block";
  soundMenu.play();
});
