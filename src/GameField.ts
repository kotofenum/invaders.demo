import Player from './game_objects/Player'
import EnemyArmy from './EnemyArmy'
import Enemy from './game_objects/Enemy'

import { state } from './state'
import { consts } from './consts'

import { song, won, lose } from './util/sounds'

export default class GameField {
    private width: number;
    private height: number;
    private context: any
    private player: Player
    private army: EnemyArmy

    private background: any = new Image()

    constructor(width: number, height: number, context: any, player: Player, army: EnemyArmy) {
        this.width = width;
        this.height = height;
        this.context = context;
        this.player = player;
        this.army = army
        this.background.src = './bg.png'
    }

    public update() {
        this.player.update()
        this.army.setArmy(this.army.getArmy().filter((enemy) => !enemy.isDead()))
        if (this.army.getArmy().length) {
            this.army.getArmy().forEach((enemy: Enemy, index: number, array: Array<Enemy>) => {
                if (!enemy.isDying()) {
                    setTimeout(() => {
                        this.player.getBullets().forEach(bullet => {
                            if (bullet.getPosX() <= enemy.getPosY() + enemy.getHeight()) {
                                if (bullet.getPosX() + bullet.getWidth() >= enemy.getPosX() 
                                    && bullet.getPosX() <= enemy.getPosX() + enemy.getWidth()) {
                                    if (bullet.getPosY() >= enemy.getPosY()) {
                                        enemy.die()
                                        bullet.hide();
                                        return;
                                    }
                                }
                            }
                    })}, 0)
                    if (enemy.getPosY() > consts.player.y) {
                        this.gameOver();
                    }
                }
            });
        } else {
            this.nextLevel();
        }
    }

    public draw() {
        this.drawBackground();
        this.army.getArmy().forEach((enemy: Enemy) => {
            enemy.draw(this.context)
        });
        this.player.draw(this.context);
        this.drawStats();
    }

    private gameOver() {
        song.stop()
        lose.play()
        song.play()
        state.running = false;
        state.win = false;
        state.score = 0;
        state.level = 1;
    }

    private nextLevel() {
        won.play()
        state.win = true;
        state.running = false;
    }

    private drawStats() {
        this.context.font = consts.stats.font;
        this.context.fillStyle = consts.stats.color;
        this.context.textBaseline = consts.textBaseline;
        this.context.fillText(consts.stats.score.text + state.score, consts.stats.score.posX, consts.stats.posY);
        this.context.fillText(consts.stats.level.text + state.level, consts.stats.level.posX, consts.stats.posY);
    }

    private drawBackground() {
        this.context.drawImage(this.background,0,0);
    }
}