var grid = [], valura;
window.addEventListener('DOMContentLoaded', function() {
        var gameBoardClass = document.querySelector(".gameBoard");
        for(var i = 0; i < 9; ++i) {
            //grid[i] = [];
            for(var j = 0; j < 9; ++j) {
                    $(gameBoardClass).append(`<input type = "text" class = "boardBtn" id = "`+ i + " " + j + `">`);
                    //grid[i][j] = 0;
                    
            }
            $(gameBoardClass).append(`<br>`);
        }
       
});
