import GameObject from './GameObject'
import Bullet from './Bullet'
import { shot } from './sounds'

export default class Player extends GameObject {

    public bullets: Array<Bullet> = [];
    public speed: number = 3;
    public keysPressed: any = {
        keys: []
    };
    // public img: any = new Image();
    public dX: number = 0;
    public dY: number = 0;

    constructor(posX: number = 230, posY: number = 430, width: number = 30, height: number = 40, color: string = "#F00") {
        super(posX, posY, width, height, color);
        document.onkeydown = this.keyDown.bind(this);
        // document.onkeypress = this.keyPressed.bind(this);
        document.onkeyup = this.keyUp.bind(this);

        this.img.src = './cannon.png'
    }

    public move(dX: number = this.dX, dY: number = this.dY) {
        if (this.posX >= 0 && this.posX + this.width <= 500 ) this.posX += dX;
        if (this.posX < 0) this.posX = 0;
        if (this.posX + this.width > 500) this.posX = 500 - this.width;
        // if(this.posY - this.width < 500 ) this.posY += dY;
        // console.log('player pos: x = ' + this.posX + ", y = " + this.posY)
    }

    public shoot() {
        // console.log('shoot')
        let bullet = new Bullet(this.posX + this.width/2, this.posY, 4, 10);
        // console.log(bullet)
        this.bullets.push(bullet);
        
        shot.play();
    }

    public update() {
        this.move();
        this.bullets.forEach((bullet, index, array) => {
            bullet.update();
            if (!bullet.display) {
                array.splice(index, 1);
            }
        });
    }
    
    public draw(ctx: any) {
        // ctx.fillStyle = this.color;
        // ctx.fillRect(this.posX, this.posY, this.width, this.height);

        // var img = new Image();
        // img.onload = () => ctx.drawImage(img,this.posX,this.posY);
        super.drawSprite(ctx, this)
        this.bullets.forEach(bullet => {
            bullet.drawRect(ctx, bullet)
        });
    }

    public keyDown(e: any) {
        e = e || window.event;
        this.keysPressed.keys[e.keyCode] = true;
        // console.log('нажали клавишу ' + e.keyCode)
        // console.log(this.keysPressed.keys[37],this.keysPressed.keys[39],this.keysPressed.keys[32])
        // if (this.keysPressed.keys[38]) {
        //     this.dY = -this.speed;
        // }
        // else if (this.keysPressed.keys[40]) {
        //     this.dY = this.speed;
        // }
        if (this.keysPressed.keys[37]) {
            this.dX = -this.speed;
            // console.log('left pressed')
        }
        else if (this.keysPressed.keys[39]) {
            this.dX = this.speed;
            // console.log('right pressed')
        }
        if (this.keysPressed.keys[32]) {
            this.shoot();
        }
    }

    public keyUp(e: any) {
        e = e || window.event;
        this.keysPressed.keys[e.keyCode] = false;

        // console.log('отпустили клавишу ' + e.keyCode)
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