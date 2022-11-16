//Variable Decelerations
const STEP_BASIS = 20;
const MAX_PRESSURE = 7;
const gridContainer = document.querySelector('.gridContainer');


let gridSize = 20;  //To be set with button later
let colorStepAmount = -38;
let stepDirection = 1; // stepDirection 1 darkens image, stepDirection -1 lightens image. 
let penActive = true; //set to false to allow mouse to move on grid without activating cells.


//Initialize Screen
createGrid(gridSize);
setPencil();
setGridListeners();


document.querySelector('#decreaseStep').addEventListener('click', function() { changeStepAmount(-1); });
document.querySelector('#increaseStep').addEventListener('click', function() { changeStepAmount(1); });
document.querySelector('#decreaseSize').addEventListener('click', function() { changeSizeAmount(-1); });
document.querySelector('#increaseSize').addEventListener('click', function() { changeSizeAmount(1); });
document.querySelector('#clearButton').addEventListener('click', function() { clearGrid(); });
document.querySelector('#pencilButton').addEventListener('click', function() { setPencil(); });
document.querySelector('#eraserButton').addEventListener('click', function() { setEraser(); });

//Listen for space bar to toggle if Pen is up or down. if Pen is up it will not interact with grid.
document.addEventListener('keydown', function(event) {
    if(event.key == ' ') {
        let pen =document.querySelector('#pen'); 
        if (penActive) {
            penActive = false;
            pen.classList.remove('penDown');
            pen.classList.add('penUp');
            pen.textContent = 'Pen Up'

        } else {
            penActive = true;
            pen.classList.remove('penUp');
            pen.classList.add('penDown');
            pen.textContent = 'Pen Down'
        }
    }
});

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

function setGridListeners() {
    document.querySelectorAll('.grid').forEach(cell => {
        cell.addEventListener('mouseover', event => {
            activateGridCell(cell,drawMode) }
        )});
}

function activateGridCell(cell) {
    //console.log(cell.id);
    if(penActive) {
        let gridElement = document.getElementById(cell.id);

        if (!gridElement.style.backgroundColor ) {
            gridElement.style.backgroundColor = 'rgb(255, 255, 255)';
        } 
        gridElement.style.backgroundColor = stepColor(gridElement.style.backgroundColor, colorStepAmount);
    } 
    
}

//Determine the next step of shade to color the cell
function stepColor(rgbString, stepAmount) {
    let hue = Number(rgbString.slice(4,rgbString.indexOf(","))); //get 'r' value from rgb color
    console.log(`pre mouseover rgb(${hue},${hue},${hue})`);
    console.log(stepAmount);
    hue += stepAmount * stepDirection;

    if (hue <= 0 ? hue = 0 : hue); //prevent hue from going below 0
    if (hue >= 255 ? hue = 255 : hue); //prevent hue from going above 255

    //console.log(`post hue: "${hue}"`);
    console.log(`post mouseover rgb(${hue},${hue},${hue})`);
    return `rgb(${hue},${hue},${hue})`
}

function changeStepAmount(amt) {
    let stepAmount = document.querySelector('#pressureAmount').textContent;
    if (stepAmount === "MAX") { stepAmount = MAX_PRESSURE } //UI reads MAX when fully changing square. Convert this to 6 for processing.
    stepAmount = Number(stepAmount);
    stepAmount += amt;
    if (stepAmount >=1 && stepAmount <= MAX_PRESSURE) {
        if (stepAmount != MAX_PRESSURE) {
            document.querySelector('#pressureAmount').textContent = stepAmount;
            //colorStep = stepAmount * -1;
            colorStepAmount = Math.round((256 / STEP_BASIS) * stepAmount * -1);
            console.log(colorStepAmount);
        } else {
            document.querySelector('#pressureAmount').textContent = "MAX"
            colorStepAmount = -255;
        }
    }
}

function changeSizeAmount(step) {
    gridSize += step;
    document.querySelector('#gridSize').textContent = gridSize;
}

function setPencil() {
    document.querySelector('#pencilButton').classList.add('toolButtonActive');
    document.querySelector('#eraserButton').classList.remove('toolButtonActive');
    drawMode = "PENCIL";
    stepDirection = 1;
}

function setEraser() {
    document.querySelector('#eraserButton').classList.add('toolButtonActive');
    document.querySelector('#pencilButton').classList.remove('toolButtonActive');
    drawMode = "ERASER";
    stepDirection = -1;
}

function clearGrid() {
        var div = document.querySelector('.gridContainer');
        while(div.firstChild) {
            div.removeChild(div.firstChild);
        }
        createGrid(gridSize);
        setGridListeners();
    }
    
