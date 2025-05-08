class Beer {

constructor(x, y){

    this.node = document.createElement("img");
    this.node.src = "./images/beer.png"

    gameBoxNode.append(this.node);

    this.x = x;
    this.y = y;
    this.w = 15;
    this.h = 22;
    this.speed = 6;

    // defino dimensiones iniciales
    this.node.style.width = `${this.w}px`;
    this.node.style.height = `${this.h}px`;

    //defino posiciones iniciales
    this.node.style.position = "absolute";

    this.node.style.left = `${this.x}px`;
    this.node.style.top = `${this.y}px`;
}

    //metodos

    disparo(){
        this.y -= this.speed;
        this.node.style.top = `${this.y}px`;
    }
}