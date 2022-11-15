//Variable Decelerations
const STEP_BASIS = 20;
const MAX_PRESSURE = 7;

const gridSize = 32;  //To be set with button later
const gridContainer = document.querySelector('.gridContainer');
let colorStepAmount = -38;



createGrid(gridSize)

document.querySelectorAll('.grid').forEach(cell => {
    cell.addEventListener('mouseover', event => {
        activateGridCell(cell) }
    )});

document.querySelector('#decreaseStep').addEventListener('click', function() { changeStepAmount(-1); });
document.querySelector('#increaseStep').addEventListener('click', function() { changeStepAmount(1); });
document.querySelector('#clearButton').addEventListener('click', function() { clearGrid(); });


//Create an even grid of the provided size.
function createGrid(size) {
    for (i = 1; i <= gridSize; i++) {
        let row = document.createElement('div');
        row.className = 'gridRow';
        gridContainer.appendChild(row);
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

    if (!gridElement.style.backgroundColor ) {
        gridElement.style.backgroundColor = 'rgb(255, 255, 255)';
    } 
    gridElement.style.backgroundColor = stepColor(gridElement.style.backgroundColor, colorStepAmount);
    
}

//Determine the next step of shade to color the cell
function stepColor(rgbString, stepAmount) {
    let hue = Number(rgbString.slice(4,rgbString.indexOf(","))); //get 'r' value from rgb color
    //console.log(`pre hue: "${hue}"`);
    console.log(`pre mouseover rgb(${hue},${hue},${hue})`);
    console.log(stepAmount);
    hue += stepAmount;

    if (hue <= 0 ? hue = 0 : hue); //prevent hue from going below 0
    if (hue >= 255 ? hue = 255 : hue); //prevent hue from going above 255

    //console.log(`post hue: "${hue}"`);
    console.log(`post mouseover rgb(${hue},${hue},${hue})`);
    return `rgb(${hue},${hue},${hue})`
}

function changeStepAmount(amt) {
    let stepAmount = document.querySelector('.stepAmount').textContent;
    if (stepAmount === "MAX") { stepAmount = MAX_PRESSURE } //UI reads MAX when fully changing square. Convert this to 6 for processing.
    stepAmount = Number(stepAmount);
    stepAmount += amt;
    if (stepAmount >=1 && stepAmount <= MAX_PRESSURE) {
        if (stepAmount != MAX_PRESSURE) {
            document.querySelector('.stepAmount').textContent = stepAmount;
            //colorStep = stepAmount * -1;
            colorStepAmount = Math.round((256 / STEP_BASIS) * stepAmount * -1);
            console.log(colorStepAmount);
        } else {
            document.querySelector('.stepAmount').textContent = "MAX"
            colorStepAmount = -255;
        }
    }
}

function clearGrid() {
    document.querySelectorAll('.grid').forEach(cell => {
        cell.style.backgroundColor = 'rgb(255,255,255)'
        });
}