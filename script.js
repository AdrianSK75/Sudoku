var grid = [], colors = [], idLen = 0;
colors[0] = "#962d2d"; colors[1] = "#a7bbc7";
var beginSub = new Map();
var subMatrix = new Map();
 
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
        setSubGrids();
        insert();
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
        if((checkRowCol(row, col) == 1 && checkBox(row, col) == 1)|| grid[row][col] == 0)
                return 1;
        
        grid[row][col] = 0;
        return 0;
}

function checkRowCol(row, col) {
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
        var ids = (row + " " + col.toString()), beginID;
        // I take the beginning of the submatrix of which this element is part
        for(var i = 1; i <= 9; ++i) {
                if(subMatrix[ids] == i) {
                        beginID = beginSub[i];
                        break;
                }
        }
        
        var r = parseInt(beginID[0]), c = parseInt(beginID[2]);
        for(var i = r; i < r + 2; ++i) {
                for(var j = c; j < c + 2; ++j) 
                        if(grid[i][j] == grid[row][col] && (i != row && j != col))
                                return 0;
        }

        return 1;      
}

function setSubGrids() {
                var bln = 0, fln = 3, gridcolor = [], pos, bol = false, beg = 1;
                gridcolor[0] = "#232323"; gridcolor[1] = "#91091e";            
                for(var i = fln; i <= 9; i += 3, bln += 3) {
                        var fcol = 3, bcol = 0;
                        for(var j = fcol; j <= 9; j += 3, bcol += 3) {
                                pos = (bol == true) ? 1 : 0;
                                beginSub[beg] = (bln + " " + bcol.toString());

                                for(var n = bln; n < i; ++n) {
                                        for(var m = bcol; m < j; ++m) {
                                                var ids = (n + " " + m.toString());
                                                document.getElementById(ids).style.borderColor = gridcolor[pos];
                                                subMatrix[ids] = beg;
                                        }
                                }
                                bol = !bol;
                                ++beg;
                        }                
                }

}

function insert() {
        var impoort = [0,0,4,0,6,0,0,0,0,0,0,0,9,4,0,6,0,0,0,6,3,7,0,0,5,0,4,9,0,0,0,3,6,4,0,7,0,3,0,8,2,0,0,0,6,0,0,6,4,0,0,3,0,0,6,1,0,3,0,0,0,0,0,3,0,5,0,0,4,8,0,0,0,4,8,0,0,0,0,0,0];
        var n = 0;
        for(var i = 0; i < 9; ++i) {
                for(var j = 0; j < 9; ++j, ++n) {
                        var ids = (i + " " + j.toString());
                        if(impoort[n] != 0) {
                                grid[i][j] = impoort[n];
                                document.getElementById(ids).value = impoort[n];
                                document.getElementById(ids).disabled = true;
                        }
                }

        } 
}
