import Enemy from './game_objects/Enemy'

import { state } from './state'
import { consts } from './consts'

export default class EnemyArmy {
    private army: Array<Enemy> = [];

    constructor() {
        let rows = +state.level >= +consts.maxRows ? +consts.maxRows : 1 + state.level;
        for (let i = 1; i <= rows; i++) {
            for (let j = 1; j <= consts.rowSize; j++) {
                let alien = new Enemy(consts.enemy.gapBetween*j, state.armyStepSize * (state.armyHeight) + i * consts.rowGap, consts.enemy.w, consts.enemy.h, i);
                this.army.push(alien);
            }
        }
        console.log(this.army.length)
        this.updateSpeed()
    }

    public getArmy(): Array<Enemy> {
        return this.army;
    }

    public setArmy(army: Array<Enemy>) {
        this.army = army;
    }

    public update() {
        this.updateEach();
        this.checkBundaries();
    }

    private updateSpeed() {
        // это все должно делаться в state вообще. наверное
        window.clearInterval(state.intervalId);
        state.armySpeedIncr -= 15;
        if (state.armySpeedIncr <= 0) state.armySpeedIncr = 0;
        state.timeBeforeSpeedIncreases -= state.armySpeedIncr;
        if (state.timeBeforeSpeedIncreases < state.minSpeed) state.timeBeforeSpeedIncreases = state.minSpeed;
        state.intervalId = window.setInterval(() => this.update(), state.timeBeforeSpeedIncreases);
    }

    private checkBundaries() {
        this.getArmy().forEach(enemy => {
            if (!enemy.isDying()) {
                if (enemy.getPosX() < consts.bounds.left) this.changeDirection(1);
                if (enemy.getPosX() > consts.bounds.right) this.changeDirection(-1);
                return;
            }
        });
    }

    private changeDirection(direction: number) {
        state.alienDirection = direction;
        state.armyHeight++;
        this.updateEach();
        this.updateSpeed();
    }

    private updateEach() {
        this.getArmy().forEach(enemy => {
            enemy.update();
        });
    }
}