var grid = [], colors = [];
colors[0] = "#962d2d"; colors[1] = "#f6f5f5";

window.addEventListener('DOMContentLoaded', function() {
        var gameBoardClass = document.querySelector(".gameBoard");
        for(var i = 0; i < 9; ++i) {
                grid[i] = [];
                for(var j = 0; j < 9; ++j) {
                    $(gameBoardClass).append(`<input type = "text" class = "boardBtn" id = "`+ i + " " + j + `" oninput = "autoCorrection(id);" />`);
                     grid[i][j] = 0;
            }
            $(gameBoardClass).append(`<br>`);
        }
          
});


function autoCorrection(id) {
        this.id = id;

        var pos = (verifier(id) == 1) ? 1 : 0;
      
        return document.getElementById(id).style.background = colors[pos];
  
}

function verifier(id) {
        var value = document.getElementById(id).value;
        var row = parseInt(id.charAt(0)), col = parseInt(id.charAt(2));
        
        grid[row][col] = value;
        if(checkRowCol(row, col) == 1 && checkBox(row, col) == 1)
                return 1;
        
        grid[row][col] = 0;
        return 0;
}

function checkRowCol(row, col) {
        var check = 0;
        for(var i = 0; i < 9; ++i)
                if(grid[row][i] == grid[row][col] && col != i) {
                        return 0;
                }
          
        for(var i = 0; i < 9; ++i)
                if(grid[i][col] == grid[row][col] && row != i) {
                        return 0;
                }
     
        return 1;
   
}

function checkBox(row, col) {   
        var startRow = 0, startCol = 0;
        if(row >= 2) {
                startRow = row - 2;
        } else if(row == 1) {
                startRow = row - 1;
        }
          
        if(col >= 2) {
                startCol = col - 2;
        } else if(col == 1) {
                startCol = col - 1;
        }

        for(var i = startRow; i <= startRow + 2; ++i) {
                for(var j = startCol; j <= startCol + 2; ++j)
                       if(grid[i][j] == grid[row][col] && (row != i && col != j)) {
                                        return 0;
                       }                             
        }

        return 1;
}
