var grid = [];
 
window.addEventListener('DOMContentLoaded', function() {
        var gameBoardClass = document.querySelector(".gameBoard");
        for(var i = 0; i < 9; ++i) {
                grid[i] = [];
                for(var j = 0; j < 9; ++j) {
                    $(gameBoardClass).append(`<input type = "text" class = "boardBtn" id = "`+ i + " " + j + `" oninput = "verifier(id);"  maxlength = 1/>`);
                     grid[i][j] = 0;
            }
            $(gameBoardClass).append(`<br>`);
        }
        $(gameBoardClass).append(`<br>`);
        $(gameBoardClass).append(`<button class = "restart" onclick = "location.reload();">New Board</button>`);

        setSubGrids();
        randomInsert();
});

function verifier(id) {        
        let value = document.getElementById(id).value;
        let row = parseInt(id.charAt(0)), col = parseInt(id.charAt(2));
        
        grid[row][col] = parseInt(value);
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

function setSubGrids() {
                let bln = 0, fln = 3, gridcolor = [], pos, bol = false, beg = 1;
                gridcolor[0] = "#232323"; gridcolor[1] = "#185adb";            
                for(let i = fln; i <= 9; i += 3, bln += 3) {
                        let fcol = 3, bcol = 0;
                        for(let j = fcol; j <= 9; j += 3, bcol += 3) {
                                pos = (bol == true) ? 1 : 0;
                                
                                for(let n = bln; n < i; ++n) {
                                        for(let m = bcol; m < j; ++m) {
                                                let ids = (n + " " + m.toString());
                                                document.getElementById(ids).style.borderColor = gridcolor[pos];
                                        }
                                }
                                bol = !bol;
                                ++beg;
                        }                
                }

}

function randomInsert() {               
                for(let row = 0; row < 9; ++row) {
                        let subCount = 0;                                             
                        for(let i = 0; i < 3; ++i) {
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
