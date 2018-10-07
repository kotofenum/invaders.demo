import GameObject from './GameObject'

import { consts } from '../consts'

export default class Bullet extends GameObject {

    private speed: number = consts.bullet.speed;
    private display: boolean = true;

    constructor(posX: number = 0, posY: number = 0, width: number = consts.bullet.w, height: number = consts.bullet.h, color: string = consts.bullet.color) {
        super(posX, posY, width, height, color);
    }

    public update() {
        this.move();
    }

    public isHidden() {
        return !this.display;
    }

    public hide() {
        this.display = false;
    }
    
    public draw(ctx: any, bullet: Bullet) {
        this.drawRect(ctx, bullet);
    }

    private move() {
        if (this.getPosX() > consts.bounds.top) this.incrPosY(-this.speed);
        else this.display = false;
    }

}