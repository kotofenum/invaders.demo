export default class GameObject {
    private width: number;
    private height: number;
    private posX: number;
    private posY: number;
    private color: string;
    private img: any = new Image();

    constructor(posX: number = 0, posY: number = 0, width: number = 0, height: number = 0, color: string = "#111", imgSource: String = '') {
        this.width = width;
        this.height = height;
        this.posX = posX;
        this.posY = posY;
        this.color = color;
        this.img.src = imgSource;
    }

    public getWidth() {
        return this.width;
    }

    public getHeight() {
        return this.height;
    }

    public getPosX() {
        return this.posX;
    }

    public getPosY() {
        return this.posY;
    }

    public setPosX(x: number) {
        this.posX = x;
    }

    public setPosY(y: number) {
        this.posX = y;
    }

    public incrPosX(delta: number) {
        this.posX += delta;
    }

    public incrPosY(delta: number) {
        this.posY += delta;
    }

    public getImg() {
        return this.img;
    }

    public setImg(img: any) {
        this.img = img;
    }

    public setImgSource(uri: string) {
        this.img.src(uri);
    }

    protected drawSprite(ctx: any, object: GameObject = this) {
        ctx.drawImage(object.img,object.posX,object.posY);
    }

    protected drawRect(ctx: any, object: GameObject = this) {
        ctx.fillStyle = object.color;
        ctx.fillRect(object.posX, object.posY, object.width, object.height);
    }
}