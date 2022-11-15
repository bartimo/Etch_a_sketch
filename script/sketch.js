//Variable Decelerations
const gridSize = 16;  //To be set with button later
const container = document.querySelector('.container');


createGrid(gridSize)

document.querySelectorAll('.grid').forEach(cell => {
    cell.addEventListener('mouseover', event => {
        activateGridCell(cell) }
    )});


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

function activateGridCell(cell) {
    console.log(cell.id);
    let gridElement = document.getElementById(cell.id);
    let gridColor
    gridElement.style.backgroundColor = 'rgb(0, 0, 0)';
    console.log(gridElement.style.backgroundColor)
    //item.classList.add('black');
}

