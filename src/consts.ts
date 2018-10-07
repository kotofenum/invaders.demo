export const consts: any = {
    textBaseline: "hanging",
    stats: {
        font: "16px serif",
        color: "#963",
        score: {
            text: "Total score: ",
            posX: 20
        },
        level: {
            text: "Level: ",
            posX: 420,
        },
        posY: 4
    },
    result: {
        font: "48px serif",
        fillColor: "#f63",
        strokeColor: "#222",
        posX: 96,
        posY: 180,
        gameOver: "GAME OVER!",
        nextLevel: "LEVEL CLEAR!"
    },
    maxRows: 5,
    bounds: {
        left: 9,
        right: 451,
        top: -10,
        bottom: 500
    },
    enemy: {
        w: 42,
        h: 34,
        gapBetween: 52
    },
    player: {
        w: 30,
        h: 40,
        x: 230,
        y: 430,
        speed: 3
    },
    bullet: {
        w: 4,
        h: 10,
        speed: 10,
        color: "#111"
    },
    rowGap: 30,
    rowSize: 8,
    timeBetweenRounds: 2000
}