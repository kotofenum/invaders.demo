import GameObject from './GameObject'
import Bullet from './Bullet'

import { shot } from '../util/sounds'
import { consts } from '../consts'

export default class Player extends GameObject {

    private bullets: Array<Bullet> = [];
    private speed: number = consts.player.speed;
    private keysPressed: any = {
        keys: []
    };
    private dX: number = 0;
    private dY: number = 0;

    constructor(posX: number = consts.player.x, posY: number = consts.player.y, width: number = consts.player.w, height: number = consts.player.h) {
        super(posX, posY, width, height);
        document.onkeydown = this.keyDown.bind(this);
        document.onkeyup = this.keyUp.bind(this);

        this.setImgSource('./cannon.png');
    }

    public getBullets() {
        return this.bullets;
    }

    public shoot() {
        let bullet = new Bullet(this.getPosX() + this.getWidth()/2, this.getPosY(), consts.bullet.w, consts.bullet.h);
        this.bullets.push(bullet);
        
        shot.play();
    }

    public update() {
        this.move();
        this.bullets.forEach((bullet, index, array) => {
            bullet.update();
            if (bullet.isHidden()) {
                array.splice(index, 1);
            }
        });
    }
    
    public draw(ctx: any) {
        super.drawSprite(ctx, this)
        this.bullets.forEach(bullet => {
            bullet.draw(ctx, bullet)
        });
    }

    private move(dX: number = this.dX, dY: number = this.dY) {
        if (this.getPosX() >= 0 && this.getPosX() + this.getWidth() <= 500 ) this.incrPosX(dX);
        if (this.getPosX() < 0) this.setPosX(0);
        if (this.getPosX() + this.getWidth() > 500) this.setPosX(500 - this.getWidth());
    }

    private keyDown(e: any) {
        e = e || window.event;
        this.keysPressed.keys[e.keyCode] = true;
        if (this.keysPressed.keys[37]) { // стрелка влево
            this.dX = -this.speed;
        }
        else if (this.keysPressed.keys[39]) { // стрелка вправо
            this.dX = this.speed;
        }
        if (this.keysPressed.keys[32]) { // пробел
            this.shoot();
        }
    }

    private keyUp(e: any) {
        e = e || window.event;
        this.keysPressed.keys[e.keyCode] = false;

        if (!this.keysPressed.keys[37] && !this.keysPressed.keys[39]) {
            this.dX = 0;
        }
        if ((!this.keysPressed.keys[37] || this.keysPressed.keys[37])  && this.keysPressed.keys[32]) {
            this.shoot();
        }
        if (!this.keysPressed.keys[38] && !this.keysPressed.keys[40]) {
            this.dY = 0;
        }
        if (!this.keysPressed.keys[32] && this.keysPressed.keys[39]) {
            this.dX = this.speed;
        }
        if (!this.keysPressed.keys[32] && this.keysPressed.keys[37]) {
            this.dX = -this.speed;
        }
    }
}