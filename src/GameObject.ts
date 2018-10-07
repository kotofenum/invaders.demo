export default class GameObject {
    public width: number;
    public height: number;
    public posX: number;
    public posY: number;
    public color: string;
    public img: any = new Image();

    constructor(posX: number = 0, posY: number = 0, width: number = 10, height: number = 10, color: string = "#111", imgSource: String = './default.png') {
        this.width = width;
        this.height = height;
        this.posX = posX;
        this.posY = posY;
        this.color = color;
        this.img.src = imgSource;
    }

    public drawSprite(ctx: any, object: GameObject = this) {
        // ctx.fillStyle = this.color;
        // ctx.fillRect(this.posX, this.posY, this.width, this.height);
        ctx.drawImage(object.img,object.posX,object.posY);
    }

    public drawRect(ctx: any, object: GameObject = this) {
        ctx.fillStyle = object.color;
        ctx.fillRect(object.posX, object.posY, object.width, object.height);
        // ctx.drawImage(object.img,object.posX,object.posY);
    }

    public update() {

    }
}