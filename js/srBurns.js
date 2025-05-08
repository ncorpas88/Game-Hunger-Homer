class Burns {
    constructor() {

        this.node = document.createElement("img"); // representacion visual de Homer
        this.node.src = "./images/burnsfas.gif"; // apariencia visual de Homer

        gameBoxNode.append(this.node); // coge el nodo de la imagen y lo inserta en el juego

        this.x = -173;
        this.y = -198;
        this.w = 50;
        this.h = 60;
        this.speed = 3
        this.isMovingRigt = true;
        this.isMovingDown = true;
        

        // definimos dimensiones iniciales
        this.node.style.width = `${this.w}px`;
        this.node.style.height= `${this.h}px`,


        // definimos posiciones iniciales
        this.node.style.position = "absolute";

        this.node.style.top = `${this.y}px`;
        this.node.style.left = `${this.x}px`;

    }
}