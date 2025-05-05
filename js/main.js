// ELEMENTOS PRINCIPALES DEL DOM

// Pantalla
const splashScreenNode = document.querySelector("#splash-screen");
const gameScreenNode = document.querySelector("#game-screen");
const gameOverScreenNode = document.querySelector("#game-over.screen");
const gameBoxNode = document.querySelector("#game-box");

// Botones
const startBtnNode = document.querySelector("#start-btn");

// Game box


// VARIABLES GLOBALES DEL JUEGO
let homerObj = null;
let donutObjArr = [];
let frutaObjArr = [];

// FUNCIONES GLOBALES DEL JUEGO

function startGame() {

  // 1. Ocultar pantalla de inicio
  splashScreenNode.style.display = "none";

  // 2. mostrar la pantalla de juego
  gameScreenNode.style.display = "flex";

  // 3. añadimos elemento inicial del juego (Homer)
  
  homerObj = new Homer();
  // 4. iniciamos intervalo principal del juego
  setInterval(() => {
    gameLoop();
  }, Math.round(1000 / 60)); //60fps

  // 5. iniciamos otro intervalo del juego
  setInterval(() => {
    donutAppear();
  },2000) //los donuts aparecen cada dos segundos

  setInterval(() => {
    frutaAppear();
  }, 1000)
}

function gameLoop() {
  donutObjArr.forEach((eachDonutObj) => {
    eachDonutObj.automaticMovement();
  });

  frutaObjArr.forEach((eachFrutaObj) => {
    eachFrutaObj.automaticMovement();
  });

  elementsDestoy();

}

function donutAppear(){
  let donutObj = new Donut(Math.random() * 370);
  donutObjArr.push(donutObj);
}

function frutaAppear(){
  let frutaObj1 = new Fruta("cereza", Math.random() * 370);
  frutaObjArr.push(frutaObj1);

  let frutaObj2 = new Fruta("fresa", Math.random() * 370);
  frutaObjArr.push(frutaObj2);
}

function elementsDestoy(){

  if(donutObjArr.length < 730 && (donutObjArr[0].y + donutObjArr[0].h) >= 730){
    donutObjArr[0].node.remove();
    donutObjArr.shift();
  }

  if(frutaObjArr.length < 730 && (frutaObjArr[0].y + frutaObjArr[0].h) >= 730){
    frutaObjArr[0].node.remove();
    frutaObjArr.shift();
  }

}

// EVENT LISTENERS

startBtnNode.addEventListener("click", () => {
  startGame();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    homerObj.x -= homerObj.speed;
    homerObj.node.style.left = `${homerObj.x}px`;
  } else if (event.key === "ArrowRight") {
    homerObj.x += homerObj.speed;
    homerObj.node.style.left = `${homerObj.x}px`;
  }
});
