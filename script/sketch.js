//Variable Decelerations
const gridSize = 16;  //To be set with button later
const container = document.querySelector('.container');


createGrid(gridSize)



//Create an even grid of the provided size.
function createGrid(size) {
    for (i = 1; i <= gridSize; i++) {
        let row = document.createElement('div');
        row.className = 'gridRow';
        container.appendChild(row);
            for(j = 1; j <= gridSize; j++) {
                let grid = document.createElement('div');
                grid.id = j + "-" + i;
                grid.className = 'grid';
                row.append(grid);
            }
    }
}