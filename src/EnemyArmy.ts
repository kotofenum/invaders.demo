import Enemy from './Enemy'

import { state } from './test'

export default class EnemyArmy {
    public army: Array<Enemy> = [];
    public direction: number = 1;

    constructor() {
        let rows = state.level >= 5 ? 5 : 1 + state.level;
        for (let i = 1; i <= rows; i++) {
            for (let j = 1; j <= 8; j++) {
                let alien = new Enemy(52*j, state.armyStepSize * (state.armyHeight) + i * 30, 42, 34, undefined, i);
                this.army.push(alien);
            }
        }
    }

    public getArmy(): Array<Enemy> {
        return this.army;
    }

    public setArmy(army: Array<Enemy>) {
        this.army = army;
    }

    public updateSpeed() {
        console.log(state.timeBeforeSpeedIncreases)
        window.clearInterval(state.intervalId);
        state.armySpeedIncr -= 15;
        if (state.armySpeedIncr <= 0) state.armySpeedIncr = 0;
        state.timeBeforeSpeedIncreases -= state.armySpeedIncr;
        if (state.timeBeforeSpeedIncreases < state.minSpeed) state.timeBeforeSpeedIncreases = state.minSpeed;
        state.intervalId = window.setInterval(() => this.update(), state.timeBeforeSpeedIncreases);
    }

    public checkBundaries() {
        this.getArmy().forEach(enemy => {
            if (!enemy.dying) {
                if (enemy.posX < 9) {
                    state.alienDirection = 1;
                    state.armyHeight++;
                    // setTimeout(() => armySpeed += armySpeedIncr, timeBeforeSpeedIncreases);
                    this.move();
                    this.updateSpeed();
                    return;
                }
                if (enemy.posX > 451) 
                {
                    state.alienDirection = -1;
                    state.armyHeight++;
                    this.move();
                    this.updateSpeed();
                    // setTimeout(() => armySpeed += armySpeedIncr, timeBeforeSpeedIncreases);
                    return;
                } 
            }
        });
    }
    public move() {
        this.getArmy().forEach(enemy => {
            enemy.update();
        });
    }


    public update() {
        // if (this.moveCountdown > 0) this.moveCountdown--
        // else {
        //     this.moveCountdown = defaultCountdown;
        this.move();
            this.checkBundaries();
        // }

    }
}