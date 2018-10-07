import Player from './game_objects/Player'
import EnemyArmy from './EnemyArmy'
import GameField from './GameField'

import { state } from './state'
import { consts } from './consts'

export default class Game {
    private canvas: any;
    private context: any;
    private gameField: any;

    constructor(canvas: any) {
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d")
    }
    
    public start() {

        this.resetState();
    
        let player = new Player();
        let army = new EnemyArmy();
    
        this.canvas.addEventListener('touchstart', (event: any) => this.touchControl(event, player));
    
        this.gameField = new GameField(this.canvas.offsetWidth, this.canvas.offsetHeight, this.context, player, army);
        this.run();
    }

    private run() {
        state.running = true;
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    private gameLoop() {
        console.log(this.gameField.army.getArmy().length)
        this.gameField.update();
        this.gameField.draw();
        if (state.running) requestAnimationFrame(this.gameLoop.bind(this));
        else {
            this.drawResult(this.levelOver());
            
            setTimeout(() => 
                this.start(), consts.timeBetweenRounds);
        }
    }

    private levelOver(): string {
        let message = consts.result.gameOver;
        if (state.win) {
            message = consts.result.nextLevel;
            state.level++;
        }
        return message;
    }

    private drawResult(message: string) {
        this.context.font = consts.result.font;
        this.context.fillStyle = consts.result.fillColor;
        this.context.strokeStyle = consts.result.strokeColor;
        this.context.textBaseline = consts.textBaseline;
        this.context.fillText(message, consts.result.posX, consts.result.posY);
        this.context.strokeText(message, consts.result.posX, consts.result.posY);
    }

    private resetState() {
        // тоже должно быть в state
        state.alienDirection = -1;
        state.armyHeight = 1;
        state.armySpeed = 10.2;
        state.armySpeedIncr = 180 + state.level * 20;
        state.armyStepSize = 18;
        state.timeBeforeSpeedIncreases = 1000;
        state.minSpeed = 40;
        state.maxIncr = 120;
    }

    private touchControl(event: any, player: any) {
        if (event.touches[0].clientX < 100) player.move(-player.speed * 10, 0);
        else if (event.touches[0].clientX > 400) player.move(player.speed * 10, 0);
        else player.shoot();
    }
}