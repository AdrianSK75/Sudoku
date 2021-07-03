let grid = [];
let subGrid = ["#293b5f", "#fb9300"];

window.addEventListener('DOMContentLoaded', function() {
                const gameBoard = document.querySelector(".gameBoard");

                for (let row = 0; row < 9; ++row) {
                        grid[row] = [];
                        
                        if(row >= 3 && row < 6) {
                                subGrid[0] = "#fb9300";
                                subGrid[1] = "#293b5f";
                        } else {
                                subGrid[0] = "#293b5f";
                                subGrid[1] = "#fb9300";
                        }
                        
                        for (let col = 0; col < 9; ++col) {
                                $(gameBoard).append(`<input class = "boardBtn" id = "`+ row + " " + col + `" oninput = "is_valid(id);" maxlength = 1/>`);
                                grid[row][col] = 0;

                                if (col >= 3 && col < 6) {
                                        document.getElementById(row + " " + col).style.border = "2px solid" + subGrid[0];
                                } else {
                                        document.getElementById(row + " " + col).style.border = "2px solid" + subGrid[1];
                                }
                                
                        }
                        $(gameBoard).append(`<br>`);
                }
                insert_on_table();
});

function insert_on_table() {               
                for (let row = 0; row < 9; ++row) {
                        let subCount = 0;

                        for(var t = 1; t <= 3; ++t, subCount += 3) {
                                const number = {col: randomizer(subCount, 3), value: randomizer(1, 8),}
                                let id = (row + " " + number.col.toString());
                                
                                grid[row][number.col] = number.value;
                                        
                                if (checkValue(row, number.col) == 1) {              
                                        document.getElementById(id).value = grid[row][number.col];
                                        document.getElementById(id).disabled = true;
                                                
                                } else {
                                        document.getElementById(id).value = " ";
                                        grid[row][number.col] = 0;
                                }       
                        }                   
                }
}

function randomizer(item1, item2) {
        return item1 + Math.floor(Math.random() * item2);
}

function is_valid(id) {        
                let value = document.getElementById(id).value;
                let row = parseInt(id.charAt(0)), col = parseInt(id.charAt(2));
                
                grid[row][col] = parseInt(value);
                if (checkValue(row, col) == 1)
                        return document.getElementById(id).style.background = "#f8eded";
                
                grid[row][col] = 0;
                return document.getElementById(id).style.background = "#962d2d";
}

function checkValue(row, col) {
        if((checkRow(row, col) == 1 && checkCol(row, col) == 1 && checkBox(row, col) == 1))
                return 1;

        return 0;
}

function checkRow(row, col) {
                for (let i = 0; i < 9; ++i) {
                        if(grid[row][i] === grid[row][col] && col != i) {
                                return 0;                               
                        }
                }               
                return 1;
}

function checkCol(row, col) {            
                for (let i = 0; i < 9; ++i) {
                        if(grid[i][col] === grid[row][col] && row != i) {
                                return 0;                        
                        }
                }             
                return 1;   
}

function checkBox(row, col) {   
                let beginRow = getCoordinates(row);
                let beginCol = getCoordinates(col);

                for (let i = beginRow; i <= beginRow + 2; ++i) {
                                for (let j = beginCol; j <= beginCol + 2; ++j) {
                                         if(grid[i][j] === grid[row][col] && (i !== row && j !== col)) {
                                                return 0;
                                        }
                                }
                }
                return 1;      
}

function getCoordinates(xy) {
        xy = xy - (xy % 3);
        if(xy % 3 != 0)
                ++xy;
        return xy;
}
