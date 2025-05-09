class Fruta {
  constructor(type, positionX) {
    this.type = type;
    this.node = document.createElement("img"); // representacion visual de frutas
    if (this.type === "cereza") {
      this.node.src = "./images/cereza.png"; // apariencia visual de frutas
    } else if (this.type === "fresa") {
      this.node.src = "./images/fresa.png"; // apariencia visual de frutas
    }

    gameBoxNode.append(this.node); // coge el nodo de la imagen y lo inserta en el juego

    this.x = positionX;
    this.y = 0;
    this.w = 40;
    this.h = 40;
    this.speed = 2;

    // definimos dimensiones iniciales
    this.node.style.width = `${this.w}px`;
    (this.node.style.height = `${this.h}px`),
      // definimos posiciones iniciales
      (this.node.style.position = "absolute");

    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;
  }

  //metodos

  automaticMovement() {
    this.y += this.speed;
    this.node.style.top = `${this.y}px`;
  }
}
