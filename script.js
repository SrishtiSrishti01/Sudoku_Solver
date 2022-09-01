var arr = [[], [], [], [], [], [], [], [], [], [], []]
var temp = [[], [], [], [], [], [], [], [], [], [], []]

for(var i = 0; i < 9; i++) {
    for(var j = 0; j < 9; j++) {
        arr[i][j] = document.getElementById(i*9 + j);
    }
}

function initializeTemp(temp) {

    for(var i = 0; i < 9; i++) {
        for(var j = 0; j < 9; j++) {
            temp[i][j] = false;
        }
    }

}

function setTemp(board, temp) {
    for(var i = 0; i < 9; i++) {
        for(var j = 0; j < 9; j++) {
            if(board[i][j]!=0) {
                temp[i][j] = true;
            }
        }
    }
}

function setColor(temp) {
    for(var i = 0; i < 9; i++) {
        for(var j = 0; j < 9; j++) {
            if(temp[i][j]) {
                arr[i][j].style.color = "pink";

            }
        }
    }
}

function resetColor() {
    for(var i = 0; i < 9; i++) {
        for(var j = 0; j < 9; j++) {
            
                arr[i][j].style.color = "green";

            
        }
    }
}

var board = [[], [], [], [], [], [], [], [], []]

let button = document.getElementById('generate-sudoku');
let solve = document.getElementById('solve')

console.log(arr)

function changeBoard(board) {
    for(var i = 0; i < 9; i++) {
        for(var j = 0; j < 9; j++) {
            if(board[i][j]!=0) {
                console.log("init")
                arr[i][j].innerText = board[i][j]
            }
            else {
                arr[i][j].innerText = ''
            }
        }
    }
}
console.log(button)
button.onclick = function() {
    var xhrRequest = new XMLHttpRequest()
    xhrRequest.onload = function() {
        console.log(xhrRequest.response)
        var response = JSON.parse(xhrRequest.response);
        console.log(response)
        initializeTemp(temp)
        resetColor()

        board = response.board
        setTemp(board, temp)
        setColor(temp)
        changeBoard(board)

    }
    xhrRequest.open('get', 'https://sugoku.herokuapp.com/board?difficulty=easy')
    xhrRequest.send()
}

function isSafe(board, sr, sc, val) {
    for(var i = 0; i < 9; i++) {
        if(board[i][sc] == val || board[sr][i] == val) {
            return false;
        }
        console.log([3*Math.floor(sr/3)+Math.floor(i/3)]+""+[3*Math.floor(sc/3)+(i%3)])
        if(board[3*Math.floor(sr/3)+Math.floor(i/3)][3*Math.floor(sc/3)+(i%3)] == val) {
            return false;
        }
        
    }
    return true;
} 

function solveSudokuHelper(board, sr, sc) {
    console.log(123) 
    if(sr == 9) {
        console.log("in sr==9")
        changeBoard(board)
        return
    }

    if(sc == 9) {
        console.log("in sc==9")
        solveSudokuHelper(board, sr+1, 0)
        return 
    }

    if(board[sr][sc]!=0) {
        console.log("in sr sc!=0")
        solveSudokuHelper(board, sr, sc+1)
        return
    }

    for(var i = 1; i <= 9; i++) {
        if(isSafe(board, sr, sc, i)) {
            board[sr][sc] = i;
            // arr[sr][sc].innerText = board[sr][sc]
            solveSudokuHelper(board, sr, sc+1)
            // arr[sr][sc].innerText =''
            board[sr][sc] = 0;
        }
    }
}

function solveSudoku(board) {
    solveSudokuHelper(board, 0, 0)
}

solve.onclick = function() {
    solveSudoku(board)
}