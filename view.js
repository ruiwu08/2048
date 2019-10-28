import Game from "./engine/game.js";

let game = new Game(4);
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

function updateGrid(game) {
    $('#grid0').text(game.board[0]);
    $('#grid0').css('background-color', updateSingleColor(game.board[0]));
    $('#grid1').text(game.board[1]);
    $('#grid1').css('background-color', updateSingleColor(game.board[1]));
    $('#grid2').text(game.board[2]);
    $('#grid2').css('background-color', updateSingleColor(game.board[2]));
    $('#grid3').text(game.board[3]);
    $('#grid3').css('background-color', updateSingleColor(game.board[3]));
    $('#grid4').text(game.board[4]);
    $('#grid4').css('background-color', updateSingleColor(game.board[4]));
    $('#grid5').text(game.board[5]);
    $('#grid5').css('background-color', updateSingleColor(game.board[5]));
    $('#grid6').text(game.board[6]);
    $('#grid6').css('background-color', updateSingleColor(game.board[6]));
    $('#grid7').text(game.board[7]);
    $('#grid7').css('background-color', updateSingleColor(game.board[7]));
    $('#grid8').text(game.board[8]);
    $('#grid8').css('background-color', updateSingleColor(game.board[8]));
    $('#grid9').text(game.board[9]);
    $('#grid9').css('background-color', updateSingleColor(game.board[9]));
    $('#grid10').text(game.board[10]);
    $('#grid10').css('background-color', updateSingleColor(game.board[10]));
    $('#grid11').text(game.board[11]);
    $('#grid11').css('background-color', updateSingleColor(game.board[11]));
    $('#grid12').text(game.board[12]);
    $('#grid12').css('background-color', updateSingleColor(game.board[12]));
    $('#grid13').text(game.board[13]);
    $('#grid13').css('background-color', updateSingleColor(game.board[13]));
    $('#grid14').text(game.board[14]);
    $('#grid14').css('background-color', updateSingleColor(game.board[14]));
    $('#grid15').text(game.board[15]);
    $('#grid15').css('background-color', updateSingleColor(game.board[15]));
}

function updateSingleColor(num){
    switch (num) {
        case 0: return '#ffffff';
        case 2: return '#e8f013';
        case 4: return '#ffd000';
        case 8: return '#ffaa00';
        case 16: return '#ff7b00';
        case 32: return '#ff4400';
        case 64: return '#ff0d00';
        case 128: return '#00b3ff';
        case 256: return '#0073ff';
        case 512: return '#0008ff';
        case 1024: return '#bf00ff';
        case 2048: return '#ff00f7';
        case 4096: return '#ff0044';
    }
}

function updateScore(game) {
    $('#score').text("Score: " + game.score);
}

function restart() {
    game.setupNewGame();
    updateGrid(game);
    updateScore(game);
    $('#win').text('');
    $('#lose').text('');


}

function updateWinLose(game) {
    if (game.won) {
        $('#win').text('You have gotten 2048 and won!!');
    }
    if (game.over) {
        $('#lose').text('The game is over!! Your score is: ' + game.score);
    }
}

$('#restart').click(restart);

$(document).keydown(function (keyPressed) {
    if (keyPressed.keyCode == 37) {
        game.move('left');
    }
    if (keyPressed.keyCode == 38) {
        game.move('up');
    }
    if (keyPressed.keyCode == 39) {
        game.move('right');
    }
    if (keyPressed.keyCode == 40) {
        game.move('down');
    }
    updateGrid(game);
    updateScore(game);
    updateWinLose(game);
});

updateGrid(game);
