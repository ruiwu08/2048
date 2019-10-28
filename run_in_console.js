import keypress from 'keypress';
import Game from "./engine/game";

keypress(process.stdin);


/**
 * The code in this file is used to run your game in the console. Use it
 * to help develop your game engine.
 *
 */

let game = new Game(4);
console.log(game.toString());

let winningGameState = {board : [0,0,0,0,0,0,0,0,0,0,0,0,256,256,512,1024],
                        score : 0,
                        won : false,
                        over : false}
let testingGameState = {board : [0,0,0,0,0,0,0,0,0,0,0,0,2,2,4,2],
                        score : 0,
                        won : false,
                        over : false}
let losingGameState = {board : [0,2,4,8,16,32,64,128,2,4,8,16,32,64,128,256],
                        score : 0,
                        won : false,
                        over : false}
// game.loadGame(losingGameState);
// console.log(game.toString());


game.onMove(gameState => {
    console.log(game.toString());
    // console.log(game.gameState);
});

game.onWin(gameState => {
    console.log('You won with a gameState of...', gameState)
});

game.onLose(gameState => {
    console.log('You lost! :(', gameState)
    console.log(`Your score was ${gameState.score}`);
});

process.stdin.on('keypress', function (ch, key) {
    switch (key.name) {
        case 'right':
            game.move('right');
            break;
        case 'left':
            game.move('left');

            break;
        case 'down':
            game.move('down');

            break;
        case 'up':
            game.move('up');
            break;
    }
    if (key && key.ctrl && key.name == 'c') {
        process.stdin.pause();
    }
});


process.stdin.setRawMode(true);
process.stdin.resume();

