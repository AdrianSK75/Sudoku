let grid = [];
let subGrid = ["#293b5f", "#fb9300"];

window.addEventListener('DOMContentLoaded', function() {
                const gameBoardClass = document.querySelector(".gameBoard");

                for(let row = 0; row < 9; ++row) {
                        grid[row] = [];
                        for(let col = 0; col < 9; ++col) {
                                let pos = (col >= 3 && col < 6) || (row >= 3 && row < 6) ? 1 : 0;
                                $(gameBoardClass).append(`<input class = "boardBtn" id = "`+ row + " " + col + `" oninput = "verifier(id);" maxlength = 1/>`);
                                document.getElementById(row + " " + col).style.border = "1px solid" + subGrid[pos];
                        }
                        
                
                        $(gameBoardClass).append(`<br>`);
                }
                randomInsert();
                $(gameBoardClass).append(`<br>`);
                $(gameBoardClass).append(`<button class = "restart" onclick = "location.reload();">New Board</button>`);

});


function randomInsert() {               
                for(let row = 0; row < 9; ++row) {
                        let subCount = 0, trys = 4;
                        while(--trys) {
                                const number = {
                                        col: randomizer(subCount, 3),
                                        value: randomizer(1, 8) % 10,
                                }
                                let ids = (row + " " + number.col.toString());
                                grid[row][number.col] = number.value;
                                        
                                if(checkRowCol(row, number.col) == 1 && checkBox(row, number.col) == 1) {
                                                
                                        document.getElementById(ids).value = grid[row][number.col];
                                        document.getElementById(ids).disabled = true;
                                                
                                } else {
                                        document.getElementById(ids).value = " ";
                                                grid[row][number.col] = 0;
                                }
                                subCount += 3;
                                
                        }                   
                }
}


function verifier(id) {        
                let value = document.getElementById(id).value;
                let row = parseInt(id.charAt(0)), col = parseInt(id.charAt(2));
                
                grid[row][col] = parseInt(value);
                console.log(row, col, grid[row][col]);
                if((checkRowCol(row, col) == 1 && checkBox(row, col) == 1))
                        return document.getElementById(id).style.background = "#f8eded";
                
                grid[row][col] = 0;
                return document.getElementById(id).style.background = "#962d2d";
}

function checkRowCol(row, col) {
                for(let i = 0; i < 9; ++i)
                        if(grid[row][i] === grid[row][col] && col != i) {
                                return 0;
                                
                        }

                
                for(let i = 0; i < 9; ++i)
                        if(grid[i][col] === grid[row][col] && row != i) {
                                return 0;
                        
                        }
        
                return 1;   
}

function checkBox(row, col) {   
                let beginRow = row - (row % 3);
                let beginCol = col - (col % 3);

                beginRow += (beginRow % 3 != 0) ? 1 : 0;
                beginCol += (beginCol % 3 != 0) ? 1 : 0;  

                for(let i = beginRow; i <= beginRow + 2; ++i) {
                                for(let j = beginCol; j <= beginCol + 2; ++j) {
                                         if(grid[i][j] === grid[row][col] && (i !== row && j !== col)) {
                                                return 0;
                                        }
                                  }
                }
                return 1;      
}

function randomizer(item1, item2) {
                return item1 + Math.floor(Math.random() * item2);
}
