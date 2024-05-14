/*-------------------------------- Constants --------------------------------*/

const gridSize = 10 //change this to a let if I want to try to let player change grid size

const playerShips = [
    {name: 'patrolBoat', size: 2, hitCounter: 0, coordinates: []},
    {name: 'submarine', size: 3, hitCounter: 0, coordinates: []},
    {name: 'destroyer', size: 3, hitCounter: 0, coordinates: []},
    {name: 'battleship', size: 4, hitCounter: 0, coordinates: []},
    {name: 'carrier', size: 5, hitCounter: 0, coordinates: []}
]

const cpuShips = [
    {name: 'patrolBoat', size: 2, hitCounter: 0, coordinates: []},
    {name: 'submarine', size: 3, hitCounter: 0, coordinates: []},
    {name: 'destroyer', size: 3, hitCounter: 0, coordinates: []},
    {name: 'battleship', size: 4, hitCounter: 0, coordinates: []},
    {name: 'carrier', size: 5, hitCounter: 0, coordinates: []}
]

/*---------------------------- Variables (state) ----------------------------*/

let setup = true
//when this becomes 5 make setup = false and begin game

//stores coordinates for current cell
let currentCell= []

let numShipsPlaced = 0 

let selectedShip = null

// might not need these up here (have them in init)
let turn = 'player'
let winner = false
let playerShipCount = 5
let cpuShipCount = 5
const playerTopGridArray = []
const playerBottomGridArray = []
const cpuTopGridArray = []
const cpuBottomGridArray = []

/*------------------------ Cached Element References ------------------------*/

const messageEl = document.querySelector('.message')

const playerTopGridEl = document.querySelector('#player-top-grid')
const playerBottomGridEl = document.querySelector('#player-bottom-grid')
const cpuTopGridEl = document.querySelector('#cpu-top-grid')
const cpuBottomGridEl = document.querySelector('#cpu-bottom-grid')

// for if I want ships that you can click on
// const carrierEl = document.querySelector('#carrier')
// const battleshipEl = document.querySelector('#battleship')
// const destroyerEl = document.querySelector('#destroyer')
// const submarineEl = document.querySelector('#submarine')
// const patrolBoatEl = document.querySelector('#patrol-boat')

/*-------------------------------- Functions --------------------------------*/

// starts game
const init = () => {
    let turn = 'player'
    let winner = false
    let playerShipCount = 5
    let cpuShipCount = 5
    const playerTopGridArray = []
    const playerBottomGridArray = []
    const cpuTopGridArray = []
    const cpuBottomGridArray = []
    renderBoard()
}

//generates 4 boards with x and y axis 1 through 10          
//create 4 boards- display all for testing- remove divs from cpu boards for final product
const renderBoard = () => {                                    
    for (let i=1; i<=gridSize; i++) {                           
        for (let j=1; j<=gridSize; j++) {
            playerTopGridArray.push(new Cell(i,j,playerTopGridEl))
            playerBottomGridArray.push(new Cell(i,j,playerBottomGridEl))
            cpuTopGridArray.push(new Cell(i,j,cpuTopGridEl))
            cpuBottomGridArray.push(new Cell(i,j,cpuBottomGridEl))
        }
    }
} 

//const updateBoard = (?) => {} // updates board after each turn                                                      

// grid cell object constructor
 function Cell(row, col, element) {
    this.row = row
    this.col = col
    this.xy = [row,col]
    this.board = element.id
    this.selected = false
    this.occupied = false
    this.hit = false
    this.ship = null
    this.color = null
    const divEl = document.createElement('div')
    divEl.classList.add('clickable-square')
    divEl.dataset.board = element.id
    divEl.dataset.row = row
    divEl.dataset.col = col
    switch(element) {
        case playerTopGridEl:
            divEl.addEventListener('mouseover', changeBorderToGreen);
            divEl.addEventListener('mouseout', changeBorderBack);   
            divEl.addEventListener('click', handleTopGridClick);
            break;
        case playerBottomGridEl:
            //mouseover
            // divEl.addEventListener('mouseover', changeTwoCellsToGreen);
            // divEl.addEventListener('mouseout', changeBorderBack);
            divEl.addEventListener('click', divToCell)
            //divEl.addEventListener('click', getDiv);
            //divEl.addEventListener('mouseover', showOutline())
            //click
            //doubleclick
            break;
        default:
            break;   
       }
    element.appendChild(divEl)   
}

// Functions for dealing with grid coordinates

const logCellObj = () => {
    console.log()
}



//don't need this anymore -> just use cell.xy
//returns coords of cell as ARRAY
// const getCellXY = (cell) => {
//     let coordinates = [cell.row, cell.col]
//     return coordinates
// }

// returns coords of div as ARRAY
const getDivXY = (divEl) => {
    let coordinates = [parseInt(divEl.dataset.row), parseInt(divEl.dataset.col)]
    return coordinates
}

// input cell object -> return div element
const getDiv = (cell) => {
    console.log(cell)
    //let matchingDiv = document.querySelector(`[id='${cell.board}'][data-row='${cell.row}'][data-col='${cell.col}']`)
    //matchingDiv.style.borderColor = 'lime'
    //return matchingDiv
}

// input div -> return cell object
const getCell = (divEl) => {
    let coords = getDivXY(divEl)
}




//input div, output cell obj
const divToCell = (event) => {
    let board = event.target.dataset.board
    let row = parseInt(event.target.dataset.row)
    let col = parseInt(event.target.dataset.col)
    //console.log(board)

    //how do I tell it which array to loop through to find the matching cell object?
}    






// other functions

const testHandleClick = (event) => {
    console.log(`${event.target.dataset.row}, ${event.target.dataset.col}`)
}

const changeBorderToGreen = (event) => {
    event.target.style.borderColor = 'lime'
}

//trying to get mouseover cell and adjacent cell to turn green
const changeTwoCellsToGreen = (event) => {
    //changes mouseover cell to green
    event.target.style.borderColor = 'lime'
    //coords is an array [row,col]
    let coords = getDivXY(event.target)
    let nextCellCoords = [coords[0], coords[1]+1]
    //need to go from coords to div and change that div
    let nextCellEl = getDiv(nextCellCoords)
    nextCellEl.style.borderColor = 'lime'

    console.log(nextCellCoords)
    
}







const changeBorderBack = (event) => {
    event.target.style.borderColor = getCellObj(event.target.dataset.row, event.target.dataset.col, playerTopGridArray).color
}

//shows ship outline -> if valid outline is green if invalid outline is red
const showOutline = (event) => {

}

// determines hit or miss when picking a square during your turn
const handleTopGridClick = (event) => {
    let targetCell = getCellObj(event.target.dataset.row, event.target.dataset.col, playerTopGridArray)
    handleCell(targetCell)
    event.target.style.backgroundColor = targetCell.color
    console.log(targetCell)

    //handleDiv(targetCell)
}   

// returns gridCell object that corresponds to clicked div
const getCellObj = (row, col, array) => {
    for (let i=0; i<array.length; i++) {
        if (array[i].row == row && array[i].col == col) {
            return array[i]
        } 
    }
}

// updates cell obj properties
const handleCell = (cell) => {
    if (cell.selected === true) {                               // square is already picked 
        messageEl.innerHTML = 'Pick another square'
        console.log('pick another square')                      // tell player to pick again
    } else {                                                    // square is not already picked
        cell.selected = true
        cell.color = 'white'                                    // mark square as selected
        if (cell.occupied === false) {                          // square does not have a ship
            messageEl.innerHTML = 'Miss!'
            console.log('miss')                                 // tell player it was a miss
            cell.hit = false                                    // mark square as miss                           
        } else {                                                // square has a ship
            cell.hit = true
            cell.color = 'red'
            hitShip(cell.ship)                                     // mark square as hit
        }                                                  //change board to display miss
    }
}

// prob don't need this (change color in handleCell and handleTopGridClick)
// updates div color
// const handleDiv = (cell) => {}

//marks ship as hit
const hitShip = (ship) => {
    ship.hitCounter++
    if (ship.hitCounter === ship.health && turn === 'player') {
        playerShipCount--
        checkForWinner()    
    } else {
        return
    }

}


// gets player and cpu ships on game board
// const setup = () => {
//     playerPlaceShips()
//     cpuPlaceShips()
// }


// loops through player ships array
const playerPlaceShips = () => {
    playerShips.forEach((ship) => {
        messageEl.innerHTML = `Place your ${ship.name}`

    })
}

// ship placement algorithm
// first ship -> carrier
// message -> place your carrier on the bottom board, click to place, double click to rotate

// event listeners
// mouseover -> shows ship outline (green if valid, red if invalid)
//      run location checker
//          loop through current ship coordinates
//          find cell at those coordinates
//          if cell.occupied === true then invalid location
//              display red border
//          if click display message choose another location

// click -> place -> assign location to ship, assign ship to cells
// double click -> rotate -> orientation variable: horizontal or vertical (toggle)


// position checker returns boolean
//const checkPosition = ()

//player's first turn
// const run = () => {

// }







// const selectShip = () => {}

// const updateMessage = (?) => {}

// const changeTurn = (turn) => {}
 

// // what needs to change on the top board?
// // what need to change on the bottom board?
// // player is clicking on the html div NOT the js array cell
// const handleClick = (event) => {                                // player picks a square
//     if (event.target.selected === true) {                       // square is already picked
//         updateMessage(?) 'pick another square'                  // tell player to pick again
//     } else {                                                    // square is not already picked
//         event.target.selected = true                            // mark square as selected
//         if (event.target.occupied === false) {                  // square does not have a ship
//             updateMessage(?) 'miss'                             // tell player it was a miss
//             event.target.hit = false  
//             //change board to display miss                           // mark square as miss                           
//         } else {                                                // square has a ship
//             event.target.hit = true                             // mark square as hit
//             //change board to display miss
//             run hitShip
           
            
            
//         } 
//         turn = ('player') ? turn = 'computer' : turn = 'player' // changes turn
                                           
//     }                                        
    
// }



// const checkIfSunk = (?) => {} // might not need this if I have hitShip

// const checkForWinner = () => {
//     if (playerShipCount === 0) {
//         winner = computer
//         updateMessage()
//     } else if (cpuShipCount === 0) {
//         winner = player
//         updateMessage()
//     } else {
//         return
//     }


// }    



// /*----------------------------- Event Listeners -----------------------------*/

// // for clicking on each ship at the start of the game to select and place them
// carrierEl.addEventListener('click', selectShip)
// battleshipEl.addEventListener('click', selectShip)
// destroyerEl.addEventListener('click', selectShip)
// submarineEl.addEventListener('click', selectShip)
// patrolBoatEl.addEventListener('click', selectShip)






/*--------------------------- This runs the game ----------------------------*/

init() // starts game
console.log(cpuBottomGridArray[99])
//setup()

// setup() // player places ships
// run() // starts the part where player and cpu select squares

// playerTopGridArray.forEach((cell) => {
//     console.log(`${cell.row}, ${cell.col}`)
// })



/*


const handleClick = (event) => {
    findCell
    - match event target row and col to corresponding gridCell
    updateCell
    - change cell properties with if else
    - change event target (div) color
   
    
}


player clicks on div 
each div needs an event listener
    - on click -> find matching cell
        - check cell properties
        - update cell properties
        - change div color based on cell properties


function to match div id to corresponding array value (row, col)

                                                    
- if already selected
    - return
- if not selected
    - change to selected
    - 




ship properties

? name
? location: [] 
hitCounter: starts at 0
health

cell properties
selected: boolean
occupied: boolean
hit: boolean
ship: string ex: 'destroyer'



/*

Start 

Click to play

Select ship

Place ship

Repeat until no ships left

Player 1's turn

Select square

onClick check: hit or miss

If hit

    Check if sunk

        If sunk

            Check if still have ships

                If false

                    Computer wins



Repeat for computer's turn



PLAYER PICKING A TOP SQUARE PROCESS 

add different event listeners to top vs bottom player grids?

DONE Mouseover event (white border)

DONE A square (div el) is clicked (handleClick)
DONE Get Cell object with same row and col as clicked div (function returns the Cell object)

   
    Determine what to do with this Cell (something function)


*/