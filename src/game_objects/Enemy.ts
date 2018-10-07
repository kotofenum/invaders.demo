import GameObject from './GameObject'
import { boom } from '../util/sounds'

import { state } from '../state'
import { consts } from '../consts'

export default class Enemy extends GameObject {
    
    private dying: boolean = false;
    private dead: boolean = false;
    private row: number;

    private img1: any = new Image();
    private img2: any = new Image();
    private blow: Array<any> = [];

    constructor(posX: number = 0, posY: number = 0, width: number = consts.enemy.w, height: number = consts.enemy.h, row: number) {
        super(posX, posY, width, height);

        this.row = row;
        if (row % 2 == 0) {
            this.img1.src = './alien1.png'
            this.img2.src = './alien2.png'
        } else {
            this.img2.src = './alien1.png'
            this.img1.src = './alien2.png'
        }
        this.setImg(this.img1);
        for (let i=1; i <= consts.rowSize; i++) {
            this.blow[i] = new Image();
            this.blow[i].src = './blow' + i + '.png';
        }
    }

    public update() {
        this.move();
    }

    public draw(ctx: any) {
        super.drawSprite(ctx, this);
    }

    public isDying() {
        return this.dying;
    }
    public isDead() {
        return this.dead;
    }

    public die() {
        state.score += Math.round(Math.random() * this.row * 5) * state.armyHeight * state.level;
        this.dying = true;
        boom.play();
        for (let i = 1; i <= consts.rowSize; i++) {
            setTimeout(() => this.setImg(this.blow[i]), 100 * i);
        };
        setTimeout(() => {
            this.dead = true
            this.dying = false
        }, 2000)
    }

    private move() {
        if (!this.dying) this.setImg(this.getImg() === this.img1 ? this.img2 : this.img1);
        this.incrPosX(state.armySpeed * state.alienDirection);
        this.setPosY(state.armyStepSize * (state.armyHeight) + this.row * consts.rowGap);
    }
}