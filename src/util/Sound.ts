export default class Sound {
    private sound: any;

    constructor(src: string, loop: boolean = false) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        if (loop) this.sound.setAttribute("loop", "true");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
    }

    public play() {
        this.sound.play();
    }
    
    public stop() {
        this.sound.pause();
    }
}