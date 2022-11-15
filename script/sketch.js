//Variable Decelerations
const gridSize = 16;  //To be set with button later
const container = document.querySelector('.container');
const colorStep = -10;


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
    let colorStepAmount = Math.round(256/colorStep);
    //console.log(colorStepAmount);
    let gridElement = document.getElementById(cell.id);

    if (!gridElement.style.backgroundColor ) {
        gridElement.style.backgroundColor = 'rgb(255, 255, 255)';
    } 
    gridElement.style.backgroundColor = stepColor(gridElement.style.backgroundColor, colorStepAmount);
    
}

//Determine the next step of shade to color the cell
function stepColor(rgbString, stepAmount) {
    let hue = Number(rgbString.slice(4,rgbString.indexOf(","))); //get 'r' value from rgb color
    //console.log(`pre hue: "${hue}"`);
    hue += stepAmount;

    if (hue <= 0 ? hue = 0 : hue); //prevent hue from going below 0
    if (hue >= 255 ? hue = 255 : hue); //prevent hue from going above 255

    //console.log(`post hue: "${hue}"`);
    console.log(`rgb(${hue},${hue},${hue})`);
    return `rgb(${hue},${hue},${hue})`
}