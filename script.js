/*-------------------------------- Constants --------------------------------*/

const gridSize = 10 //change this to a let if I want to try to let player change grid size

// const carrier
// const battleship
// const destroyer
// const submarine
// const patrolBoat

// do I need separate ones for player and computer?

/*---------------------------- Variables (state) ----------------------------*/

let numShipsPlaced = 0 //when this becomes 5 exit setup stage and begin game

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

const playerTopGridEl = document.querySelector('#player-top-grid')
const playerBottomGridEl = document.querySelector('#player-bottom-grid')
const cpuTopGridEl = document.querySelector('#cpu-top-grid')
const cpuBottomGridEl = document.querySelector('#cpu-bottom-grid')
const carrierEl = document.querySelector('#carrier')
const battleshipEl = document.querySelector('#battleship')
const destroyerEl = document.querySelector('#destroyer')
const submarineEl = document.querySelector('#submarine')
const patrolBoatEl = document.querySelector('#patrol-boat')

/*-------------------------------- Functions --------------------------------*/

// starts game
const init = () => {
    let turn = 'player'
    let winner = false
    let playerShipCount = 5
    let computerShipCount = 5
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
            playerTopGridArray.push(new gridCell(i,j, playerTopGridEl))
            playerBottomGridArray.push(new gridCell(i,j,playerBottomGridEl))
            cpuTopGridArray.push(new gridCell(i,j,cpuTopGridEl))
            cpuBottomGridArray.push(new gridCell(i,j,cpuBottomGridEl))
            // const div = document.createElement('div')               //create divs in constructor instead?
            // topGridEl.appendChild(div)
        }
    }
}    

//const updateBoard = (?) => {} // updates board after each turn                                                      




// top grid cell object constructor
 function gridCell(row, col, element) {
    this.row = row
    this.col = col
    this.selected = false
    this.occupied = false
    this.hit = false
    this.ship = null
    const divEl = document.createElement('div')
    divEl.classList.add('clickable-square')
    divEl.dataset.row = row
    divEl.dataset.col = col
    element.appendChild(divEl)
    //divEl.addEventListener('click', testHandleClick)
    divEl.addEventListener('mouseover', changeBorderToWhite)
    divEl.addEventListener('mouseout', changeBorderToGray)   
    divEl.addEventListener('click', handleTopGridClick)              
}

const testHandleClick = (event) => {
    console.log(`${event.target.dataset.row}, ${event.target.dataset.col}`)
}

const changeBorderToWhite = (event) => {
    event.target.style.borderColor = 'white'
}

const changeBorderToGray = (event) => {
    event.target.style.borderColor = 'lightslategray'
}

// determines hit or miss when picking a square during your turn
const handleTopGridClick = (event) => {
    
    //console.log(event.target)
    getGridCell(event.target.dataset.row, event.target.dataset.col, playerTopGridArray)
    //console.log(targetCell.gridCell.hit)


}    
//     let row = event.target.dataset.row
//     let col = event.target.dataset.col
//     let cellObj = null
//     playerTopGridArray.forEach((cell) => {
//         if (cell.row === row && cell.col === col) {
//             cellObj = cell
//         } 
//     })
    
//     let targetCell = 
// }


// returns gridCell that corresponds to clicked div
const getGridCell = (row, col, array) => {
    array.forEach((gridCell) => {
        if (gridCell.row == row && gridCell.col == col) {
            console.log(gridCell)
            return gridCell
        } else {
            return
        }
    })
}


// player place ships
// const setup = () => {

// }

//player's first turn
// const run = () => {

// }




// // commented out bc I don't think I need a cell constructor for each board
// function bottomGridCell(row,col) {
//     this.row = row
//     this.col = col
//     this.selected = false
//     this.occupied = false
//     this.hit = false
//     this.ship = null
//     // what properties do the bottom grid cells need?
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

// const hitShip = (ship) => {
//     ship.hitCounter++
//     if (ship.hitCounter === ship.health && turn === 'player') {
//         playerShipCount--
//         checkForWinner()    
//     } else {
//         return
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
console.log(playerBottomGridArray[99])
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



PICKING A SQUARE PROCESS 

add different event listeners to top vs bottom player grids?

DONE Mouseover event (white border)

A square (div el) is clicked (handleClick)
    Get gridCell object with same row and col as clicked div (function that returns the gridCell object)

   
    Determine what to do with this gridCell (something function)








TO DO

How to place ships on board

Computer logic

*/