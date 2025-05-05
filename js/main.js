// ELEMENTOS PRINCIPALES DEL DOM

// Pantalla
const splashScreenNode = document.querySelector("#splash-screen");
const gameScreenNode = document.querySelector("#game-screen");
const gameOverScreenNode = document.querySelector("#game-over.screen");
const gameBoxNode = document.querySelector("#game-box");
const homerNode = document.createElement("div");
homerNode.id = "homer";
gameBoxNode.append(homerNode);

// Botones
const startBtnNode = document.querySelector("#start-btn");

// Game box


// VARIABLES GLOBALES DEL JUEGO

// FUNCIONES GLOBALES DEL JUEGO

function startGame() {
  console.log("inicio juego");
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
}

function gameLoop() {}

// EVENT LISTENERS

startBtnNode.addEventListener("click", () => {
  startGame();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    homerObj.x -= homerObj.speed;
    homerNode.style.left = `${homerObj.x}px`;
  } else if (event.key === "ArrowRight") {
    homerObj.y += homerObj.speed;
    homerNode.style.rigth = `${homerObj.y}px`;
  }
});
