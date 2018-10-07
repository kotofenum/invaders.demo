import Game from './Game'

import { song } from './util/sounds' 

document.write("<canvas id='myCanvas' width='500', height='500' tabindex='1'></canvas>");
let canvas = <HTMLCanvasElement> document.getElementById("myCanvas");
let game = new Game(canvas);
song.play()
game.start();