class Donuts {
    constructor(){
      
        this.node = document.createElement("img"); // representacion visual de donuts
        this.node.src = "./images/donut.png"; // apariencia visual de donuts

        gameBoxNode.append(this.node); // coge el nodo de la imagen y lo inserta en el juego

        this.x = 50;
        this.y = 50;
        this.w = 30;
        this.h = 30;
        this.speed = 5

        // definimos dimensiones iniciales
        this.node.style.width = `${this.w}px`;
        this.node.style.height= `${this.h}px`,


        // definimos posiciones iniciales
        this.node.style.position = "absolute";

        this.node.style.top = `${this.y}px`;
        this.node.style.left = `${this.x}px`;


    }

    //metodos
}