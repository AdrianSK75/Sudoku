var grid = [], colors = [], idLen = 0;
colors[0] = "#962d2d"; colors[1] = "#f8eded";
 
window.addEventListener('DOMContentLoaded', function() {
        var gameBoardClass = document.querySelector(".gameBoard");
        for(var i = 0; i < 9; ++i) {
                grid[i] = [];
                for(var j = 0; j < 9; ++j) {
                    $(gameBoardClass).append(`<input type = "text" class = "boardBtn" id = "`+ i + " " + j + `" oninput = "autoCorrection(id);"  maxlength = 1/>`);
                     grid[i][j] = 0;
            }
            $(gameBoardClass).append(`<br>`);
        }
        $(gameBoardClass).append(`<br>`);
        $(gameBoardClass).append(`<button class = "restart" onclick = "location.reload();">New Board</button>`);

        setSubGrids();
        randomInsert();
});

function autoCorrection(id) {
        this.id = id;

        var pos = (verifier(id) == 1) ? 1 : 0;

      
        return document.getElementById(id).style.background = colors[pos];
       
}

function verifier(id) {        
        var value = document.getElementById(id).value;
        var row = parseInt(id.charAt(0)), col = parseInt(id.charAt(2));
        
        grid[row][col] = parseInt(value);
        if((checkRowCol(row, col) == 1 && checkBox(row, col) == 1))
                return 1;
        
        grid[row][col] = 0;
        return 0;
}

function checkRowCol(row, col) {
        for(var i = 0; i < 9; ++i)
                if(grid[row][i] === grid[row][col] && col != i) {
                        return 0;
                        
                }

          
        for(var i = 0; i < 9; ++i)
                if(grid[i][col] === grid[row][col] && row != i) {
                        return 0;
                       
                }
     
        return 1;   
}

function findTheCorner(ids) {
        var row = parseInt(ids[0]), col = parseInt(ids[2]);
        var beginRow = row - (row % 3), beginCol = col - (col % 3);

        if(beginRow % 3 != 0)
                ++beginRow;

        if(beginCol % 3 != 0)
                ++beginCol;
        
        return (beginRow + " " + beginCol.toString());
}

function checkBox(row, col) {   
        var ids = (row + " " + col.toString());
        var beginID = findTheCorner(ids);

        var r = parseInt(beginID[0]), c = parseInt(beginID[2]);
        
        for(var i = r; i <= r + 2; ++i) {
                for(var j = c; j <= c + 2; ++j) {
                        if(grid[i][j] === grid[row][col] && (i !== row && j !== col))
                                return 0;
                }
        }

        return 1;      
}

function setSubGrids() {
                var bln = 0, fln = 3, gridcolor = [], pos, bol = false, beg = 1;
                gridcolor[0] = "#232323"; gridcolor[1] = "#185adb";            
                for(var i = fln; i <= 9; i += 3, bln += 3) {
                        var fcol = 3, bcol = 0;
                        for(var j = fcol; j <= 9; j += 3, bcol += 3) {
                                pos = (bol == true) ? 1 : 0;

                                for(var n = bln; n < i; ++n) {
                                        for(var m = bcol; m < j; ++m) {
                                                var ids = (n + " " + m.toString());
                                                document.getElementById(ids).style.borderColor = gridcolor[pos];
                                        }
                                }
                                bol = !bol;
                                ++beg;
                        }                
                }

}

function randomInsert() {               
                for(var row = 0; row < 9; ++row) {
                        var subCount = 0;                                             
                        for(var i = 0; i < 3; ++i) {
                                var col = Math.floor(Math.random() * 3) + subCount;
                                var val = (Math.floor(Math.random() * 9) + 1) % 10;
                                var ids = (row + " " + col.toString());
                                grid[row][col] = val;
                                
                                if(checkRowCol(row, col) == 1 && checkBox(row, col) == 1) {
                                        
                                        document.getElementById(ids).value = grid[row][col];
                                        document.getElementById(ids).disabled = true;
                                        
                                } else {
                                        document.getElementById(ids).value = " ";
                                        grid[row][col] = 0;
                                }
                                subCount+=3;                         
                        }                   
                }
}
