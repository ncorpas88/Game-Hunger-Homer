class Homer {
  constructor() {
    this.node = document.createElement("img"); // representacion visual de Homer
    this.node.src = "./images/runner.gif"; // apariencia visual de Homer

    gameBoxNode.append(this.node); // coge el nodo de la imagen y lo inserta en el juego

    this.x = 50;
    this.y = 328;
    this.w = 95;
    this.h = 118;
    this.speed = 18;

    // definimos dimensiones iniciales
    this.node.style.width = `${this.w}px`;
    (this.node.style.height = `${this.h}px`),
      // definimos posiciones iniciales
      (this.node.style.position = "absolute");

    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;
  }
}
