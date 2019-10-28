/*
Add your code for Game here
 */
export default class Game {
    constructor(size) {
        this.board = new Array(size * size).fill(0);
        this.addNum();
        this.addNum();
        this.score = 0;
        this.won = false;
        this.over = false;
        this.size = size;
        this.onMoveListener = [];
        this.onLoseListener = [];
        this.onWinListener = [];
        this.gameState = {
            board : this.board,
            score : this.score,
            won : this.won,
            over : this.over
        }
    }

    move(direction) {
        let oldBoard = this.board.slice(0);
        let shiftedBoard = [];
        switch(direction) {
            case 'right':
                shiftedBoard = this.reverseHorizontal(this.board);
                shiftedBoard = this.oneDMovement(shiftedBoard);
                shiftedBoard = this.reverseHorizontal(shiftedBoard);
                this.board = shiftedBoard;
                break;
            case 'left':
                shiftedBoard = this.board;
                shiftedBoard = this.oneDMovement(shiftedBoard);
                this.board = shiftedBoard;
                break;
            case 'up':
                shiftedBoard = this.transpose(this.board);
                shiftedBoard = this.oneDMovement(shiftedBoard);
                shiftedBoard = this.transpose(shiftedBoard);
                this.board = shiftedBoard;
                break;
            case 'down':
                shiftedBoard = this.transpose(this.board);
                shiftedBoard = this.reverseHorizontal(shiftedBoard);
                shiftedBoard = this.oneDMovement(shiftedBoard);
                shiftedBoard = this.reverseHorizontal(shiftedBoard);
                shiftedBoard = this.transpose(shiftedBoard);
                this.board = shiftedBoard;
                break;
        }
        if (!this.arraysEqual(oldBoard, this.board)) {
            this.addNum();
        }
        this.runFunctions(this.onMoveListener);
        this.isWin();
        this.isLoss();
        this.updateGameState();
    }
    
    updateGameState() {
        this.gameState = {
            board : this.board,
            score : this.score,
            won : this.won,
            over : this.over
        }
    }

    arraysEqual(a, b) {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length != b.length) return false;
        for (var i = 0; i < a.length; ++i) {
          if (a[i] !== b[i]) return false;
        }
        return true;
      }

    reverseHorizontal(board) {
        let newBoard = [];
        for (let i = 0; i < board.length; i = i + this.size) {
            let row = board.slice(i, i + this.size);
            let reversed = row.reverse();
            newBoard = newBoard.concat(reversed);
        }
        return newBoard;
    }

    transpose(board) {
        let newBoard = [];
        for (let i = 0; i < this.size; i++) {
            let newArr = [];
            for (let j = 0; j < this.size; j++) {
                newArr = newArr.concat(board.slice(j * this.size + i, j * this.size + i + 1));
            }
            newBoard = newBoard.concat(newArr);
        }
        return newBoard;
    }

    oneDMovement(board) {
        let theBoard = board;
        for (let i = 0; i < theBoard.length; i += this.size) {
            let row = theBoard.splice(i, this.size);
            let newRow = this.slide(row);
            newRow = this.combine(newRow);
            theBoard.splice(i, 0, ...newRow);
        }
        return theBoard;
    }

    addNum() {
        let empty = [];
        for (let i = 0; i < this.board.length; i++) {
            if (this.board[i] == 0) {
                empty.push(i);
            }
        }
        if (empty.length > 0) {
            let spot = empty[Math.floor(Math.random() * empty.length)];
            let randNum = Math.random(1);
            if (randNum > 0.1) {
                this.board[spot] = 2;
            } else {
                this.board[spot] = 4;
            }
        }
    }

    slide(row) {
        let newRow = row.filter(x => x);
        let numMissing = this.size - newRow.length;
        let zeros = new Array(numMissing).fill(0);
        return newRow.concat(zeros);
    }

    combine(row) {
        let returnArr = [];
        let justCombined = false;
        for (let i = 0; i < row.length; i++) {
            if ((i == row.length - 1) && !justCombined) {
                returnArr.push(row[i]);
                justCombined = false;
                break;
            } 
            if (!justCombined && row[i] == row[i+1]) {
                let sum = row[i] + row[i + 1];
                returnArr.push(sum);
                this.score += sum;
                justCombined = true;
            } else if (justCombined) {
                justCombined = false;
            } else {
                returnArr.push(row[i]);
                justCombined = false;
            }
        }
        let numMissing = this.size - returnArr.length;
        let zeros = new Array(numMissing).fill(0);
        return returnArr.concat(zeros);
    }

    isWin() {
        for (let i = 0; i < this.board.length; i++) {
            if (this.board[i] == 2048) {
                if (!this.won) {
                    this.won = true;
                    this.runFunctions(this.onWinListener);
                }
            }
        }
    }

    isLoss() {
        let lossBoard = this.board.slice(0);
        if (this.full(lossBoard)) {
            for (let i = 0; i < lossBoard.length; i += this.size) {
                let row = lossBoard.slice(i, i + this.size);
                if (this.mergeable(row)) {
                    return false;
                }
            }
            lossBoard = this.transpose(lossBoard);
            for (let i = 0; i < lossBoard.length; i += this.size) {
                let row = lossBoard.slice(i, i + this.size);
                if (this.mergeable(row)) {
                    return false;
                }
            }
            if (!this.over){
                this.over = true;
                this.runFunctions(this.onLoseListener);
                return true;
            }
            return true;
        }
        return false;
    }

    full(board) {
        for (let i = 0; i < board.length; i++) {
            if (board[i] == 0) {
                return false;
            }
        }
        return true;
    }

    mergeable(row) {
        for (let i = 0; i < row.length - 1; i++) {
            if (row[i] == row[i + 1]) {
                return true;
            }
        }
         return false;
    }

    onMove(callback) {
        this.onMoveListener.push(callback);
    }

    onLose(callback) {
        this.onLoseListener.push(callback);
    }

    onWin(callback) {
        this.onWinListener.push(callback);
    }

    runFunctions(arr) {
        for (let i = 0; i < arr.length; i++) {
            arr[i](this.gameState);
        }
    }
    
    loadGame(gameState) {
        this.board = gameState.board;
        this.score = gameState.score;
        this.won = gameState.won;
        this.over = gameState.over;
        this.gameState = gameState;
    }

    getGameState() {
        return this.gameState;
    }

    setupNewGame() {
        this.board = new Array(this.size * this.size).fill(0);
        this.addNum();
        this.addNum();
        this.score = 0;
        this.won = false;
        this.over = false;
        this.size = this.size;
        this.gameState = {
            board : this.board,
            score : this.score,
            won : this.won,
            over : this.over
        }
    }

    toString() {
        let theStr = '';
        for (let i = 0; i < this.size; i++) {
            theStr = theStr + this.toStringOneRow(this.board.slice(i * this.size, i * this.size + this.size));
        }
        return theStr;
    }

    toStringOneRow(arr) {
        let str = '';
        for (let i = 0; i < arr.length; i++) {
            str = str + '[' + arr[i] + '] '
        }
        return str + '\n';
    }
}