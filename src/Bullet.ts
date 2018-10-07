import GameObject from './GameObject'

// import test from './test'

export default class Bullet extends GameObject {

    public speed: number = 10;
    public display: boolean = true;

    constructor(posX: number = 70, posY: number = 20, width: number = 1, height: number = 6, color: string = "#111") {
        super(posX, posY, width, height, color);
    }

    public move() {
        if (this.posY > -10) this.posY -= this.speed;
        else this.display = false;
        // console.log(test)
    }

    public update() {
        this.move();
    }
}