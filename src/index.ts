// import _ from 'lodash'
// import './style.css'
import GameObject from './GameObject'
import Bullet from './Bullet'
import Sound from './Sound'
import Player from './Player'
import Enemy from './Enemy'
import EnemyArmy from './EnemyArmy'

import { song, won, lose, boom } from './sounds' 
import { state } from './test'



var gameField;



class Game {
    public canvas: any;
    constructor(canvas: any) {
        this.canvas = canvas;
    }

}

class GameField extends Game {
    public width: number;
    public height: number;
    public gameObjects: Array<Enemy>
    public context: any
    public running: boolean = false
    public player: Player
    public moveCountdown: number = 30
    public army: EnemyArmy
    public background: any = new Image()

    constructor(width: number, height: number, canvas: any, gameObjects: Array<Enemy>, player: Player, army: EnemyArmy) {
        super(canvas);
        this.width = width;
        this.height = height;
        this.context = canvas.getContext("2d");
        this.gameObjects = gameObjects;
        this.player = player;
        this.army = army
        this.background.src = './bg.png'
        // document.onkeypress = this.keyPressed.bind(this);
    }

    public drawGameObjects() {
        this.context.drawImage(this.background,0,0);
        this.army.getArmy().forEach((obj: Enemy) => {
            obj.draw(this.context)
        });
        this.player.draw(this.context);
        
        this.context.font = "16px serif";
        this.context.fillStyle = "#963";
        this.context.textBaseline = "hanging";
        this.context.fillText("Total score: " + state.score, 20, 4);
        this.context.fillText("Level: " + state.level, 420, 4);
    }


    public updateGameObjects() {
        this.player.update()
        this.army.setArmy(this.army.getArmy().filter((obj) => !obj.dead))
        if (this.army.getArmy().length) {
        this.army.getArmy().forEach((obj: Enemy, index: number, array: Array<Enemy>) => {
            if (!obj.dying) {
                setTimeout(() => {
                    // let objectTerminated = false; // важно, потому что у forEach нет break, иначе, если дать плотный 
                                                // поток пуль, array.splice удалит еще несколько объектов
                    
                    this.player.bullets.forEach(bullet => {
                        if (bullet.posY <= obj.posY + obj.height) {
                            if (bullet.posX + bullet.width >= obj.posX && bullet.posX <= obj.posX + obj.width) {
                                if (bullet.posY >= obj.posY) {
                                    // if (!objectTerminated) {
                                        // array.splice(index, 1);
                                        obj.die()
                                    bullet.display = false;
                                    return;  
                                }
                            }
                        }
                })}, 0)
                if (obj.posY > 420) {
                    song.stop()
                    lose.play()
                    song.play()
                    this.running = false;
                    state.win = false;
                    state.score = 0;
                    state.level = 1;
                }
            }
            // obj.update();
        });
        // this.army.update();
        } else {
            won.play()
            state.win = true;
            this.running = false;
        }
    }

    public run() {
        this.running = true;
        console.log('run started: ' + this.running)
        this.army.updateSpeed();
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    public gameLoop() {
        this.updateGameObjects();
        this.drawGameObjects();
        // console.log("iteration ended")
        if (this.running) requestAnimationFrame(this.gameLoop.bind(this));
        else {
            let message = "GAME OVER!";
            if (state.win) {
                message = "LEVEL CLEAR!";
                state.level++;
            }
            this.context.font = "48px serif";
            this.context.fillStyle = "#f63";
            this.context.strokeStyle = "#222";
            this.context.textBaseline = "hanging";
            this.context.fillText(message, 96, 180);
            this.context.strokeText(message, 96, 180);

            setTimeout(() => start(), 4000);
            return;
        }
    }

    public togglePause() {
        if (this.running) this.running = false;
        else {
            this.running = true;
            requestAnimationFrame(this.gameLoop.bind(this));
        } 
        console.log(this.running)
    }
}






var start = (() => {

    state.alienDirection = -1;
    state.armyHeight = 1;
    state.armySpeed = 10.2;
    state.armySpeedIncr = 180 + state.level * 20;
    state.armyStepSize = 18;
    state.timeBeforeSpeedIncreases = 1000;
    state.minSpeed = 40;
    state.maxIncr = 120;

    let gameObjects: Array<Enemy> = [];
    let player = new Player();
    let army = new EnemyArmy();

    let canvas = document.getElementById("myCanvas");
    canvas.addEventListener('touchstart', (ev) => {
        if (ev.touches[0].clientX < 100) player.move(-player.speed * 10, 0);
        else if (ev.touches[0].clientX > 400) player.move(player.speed * 10, 0);
        else player.shoot()
    })
    // boom = new Sound("./boom.wav");
    // shot = new Sound("./shot.wav");
    // won = new Sound("./win.wav");
    // lose = new Sound("./lose.wav");
    // gameObjects.push(player);
    // gameObjects.push(enemy, enemy2);
    gameObjects = army.getArmy();
    gameField = new GameField(canvas.offsetWidth, canvas.offsetHeight, canvas, gameObjects, player, army);
    console.log('вот-вот запущу run')
    gameField.run();
})

document.write("<canvas id='myCanvas' width='500', height='500' tabindex='1'></canvas>");
// song = new Sound("./song.mp3", true);
song.play()
start();