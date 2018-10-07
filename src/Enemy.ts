import GameObject from './GameObject'
import { boom } from './sounds'

import { state } from './test'

export default class Enemy extends GameObject {
    
    public direction: number = 1;
    public dying: boolean = false;
    public dead: boolean = false;
    public row: number = 1;
    public img1: any = new Image();
    public img2: any = new Image();
    public blow: Array<any> = [];
    // public img: any = new Image();

    constructor(posX: number = 70, posY: number = 20, width: number = 20, height: number = 20, color: string = "#0F0", row: number) {
        super(posX, posY, width, height, color);

        // console.log(test == '23s')
        this.row = row;
        if (row % 2 == 0) {
            this.img1.src = './alien1.png'
            this.img2.src = './alien2.png'
        } else {
            this.img2.src = './alien1.png'
            this.img1.src = './alien2.png'
        }
        this.img = this.img1;
        for (let i=1; i <= 8; i++) {
            this.blow[i] = new Image();
            this.blow[i].src = './blow' + i + '.png';
        }
    }

    public move() {
        // this.checkBundaries();
        if (!this.dying) this.img = this.img === this.img1 ? this.img2 : this.img1;
        this.posX += state.armySpeed * state.alienDirection;
        this.posY = state.armyStepSize * (state.armyHeight) + this.row * 30;
    }

    public update() {
        this.move();
    }

    public draw(ctx: any) {
        super.drawSprite(ctx, this);
    }

    public die() {
        state.score += Math.round(Math.random() * this.row * 5) * state.armyHeight * state.level;
        this.dying = true;
        boom.play();
        for (let i = 1; i <= 8; i++) {
            // console.log(img)
            setTimeout(() => this.img = this.blow[i], 100 * i);
        };
        setTimeout(() => {
            this.dead = true
            this.dying = false
        }, 2000)
    }
}