class Donut {
    constructor(positionX){
      
        this.node = document.createElement("img"); // representacion visual de donuts
        this.node.src = "./images/donut.png"; // apariencia visual de donuts

        gameBoxNode.append(this.node); // coge el nodo de la imagen y lo inserta en el juego

        this.x = positionX;
        this.y = 0;
        this.w = 40;
        this.h = 40;
        this.speed = 2

        // definimos dimensiones iniciales
        this.node.style.width = `${this.w}px`;
        this.node.style.height= `${this.h}px`,


        // definimos posiciones iniciales
        this.node.style.position = "absolute";

        this.node.style.top = `${this.y}px`;
        this.node.style.left = `${this.x}px`;



    }

    //metodos

    automaticMovement(){
        this.y += this.speed;
        this.node.style.top = `${this.y}px`;

    }


}

