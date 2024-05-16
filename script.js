/*-------------------------------- Constants --------------------------------*/

const gridSize = 10 //change this to a let if I want to try to let player change grid size

const playerShips = [
    {name: 'patrolBoat', size: 2, hitCounter: 0, orientation: 'horizontal', coordinates: []},
    {name: 'submarine', size: 3, hitCounter: 0, orientation: 'horizontal', coordinates: []},
    {name: 'destroyer', size: 3, hitCounter: 0, orientation: 'horizontal', coordinates: []},
    {name: 'battleship', size: 4, hitCounter: 0, orientation: 'horizontal',coordinates: []},
    {name: 'carrier', size: 5, hitCounter: 0, orientation: 'horizontal', coordinates: []}
]

const cpuShips = [
    {name: 'patrolBoat', size: 2, hitCounter: 0, orientation: 'horizontal', coordinates: []},
    {name: 'submarine', size: 3, hitCounter: 0, orientation: 'horizontal', coordinates: []},
    {name: 'destroyer', size: 3, hitCounter: 0, orientation: 'horizontal', coordinates: []},
    {name: 'battleship', size: 4, hitCounter: 0, orientation: 'horizontal', coordinates: []},
    {name: 'carrier', size: 5, hitCounter: 0, orientation: 'horizontal', coordinates: []}
]

/*---------------------------- Variables (state) ----------------------------*/

//stores coordinates targeted cell/div
let coordinates = [] 

//cell obj that player/cpu selected
let clickedCellObj = null

//corresponding cell (same coordinates) on cpu/player grid
let matchingCellObj = null

//stores total hits by cpu on player ships
let playerDamage = 0

//stores total hits by player on cpu ships
let cpuDamage = 0

//did the player/cpu hit a ship during their turn
let wasAShipHitThisTurn = false

//current turn
let turn = 'player'

//is there a winner
let winner = false

const playerTopGridArray = []
const playerBottomGridArray = []
const cpuTopGridArray = []
const cpuBottomGridArray = []
const arrayOfArrays = []

//stores ship as needed (not sure I need this yet)
//let currentShip = null

//let setup = true
//when this becomes 5 make setup = false and begin game
//let numShipsPlaced = 0 
//let selectedShip = null
// might not need these up here (have them in init)

//let playerShipCount = 5
// let cpuShipCount = 5

//let startGame = false



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
    generateBoard()
    //placeShips()
    //do something with matching cell
    //updateMatchingCell(matchingCellObj)
    //do something with clicked cell
    //updateClickedCell(clickedCellObj)
    //update div colors
    //check for winner
    //checkForWinner()
    //switch turn
    //switchPlayerTurn()
    
     
}

//generates 4 boards with x and y axis 1 through 10          
//create 4 boards- display all for testing- remove divs from cpu boards for final product
const generateBoard = () => {                                    
    for (let i=1; i<=gridSize; i++) {                           
        for (let j=1; j<=gridSize; j++) {
            playerTopGridArray.push(new Cell(i,j,playerTopGridEl))
            playerBottomGridArray.push(new Cell(i,j,playerBottomGridEl))
            cpuTopGridArray.push(new Cell(i,j,cpuTopGridEl))
            cpuBottomGridArray.push(new Cell(i,j,cpuBottomGridEl))
        }
    }
    cpuBottomGridArray[0].occupied = true
    arrayOfArrays.push(playerTopGridArray)
    arrayOfArrays.push(playerBottomGridArray)
    arrayOfArrays.push(cpuTopGridArray)
    arrayOfArrays.push(cpuBottomGridArray)

}

//runs after turn, updates div colors
const renderBoard = () => {

}

// grid cell object constructor
 function Cell(row, col, element) {
    // this.row = row
    // this.col = col
    this.xy = [row,col]
    this.board = element.id
    this.selected = false
    this.occupied = false
    this.hit = false
    this.ship = null
    this.backgroundColor = 'lightslategray'
    const divEl = document.createElement('div')
    divEl.classList.add('clickable-square')
    divEl.dataset.board = element.id
    divEl.dataset.row = row
    divEl.dataset.col = col
    switch(element) {
        case playerTopGridEl:
            divEl.addEventListener('mouseover', makeBorderGreen);
            divEl.addEventListener('mouseout', makeBorderGray); 
            divEl.addEventListener('click', getCoordinates)  
            break;
        case playerBottomGridEl:
            divEl.addEventListener('mouseover', makeBorderBlue);
            divEl.addEventListener('mouseout', makeBorderGray);
            break;
        default:
            break;   
       }
    element.appendChild(divEl)   
}

const placeShips = () => {
    for (let i=0; i<cpuBottomGridArray.length; i+=5) {
        cpuBottomGridArray[i].occupied = true
    }
}





// changes global turn variable
const switchPlayerTurn = (turn) => {
    if (turn === 'player') {
        turn = 'cpu'
    } else {
        turn = 'player'
    }
} 

// stores coordinates in global variable
const getCoordinates = (event) => {
    let row = parseInt(event.target.dataset.row)
    let col = parseInt(event.target.dataset.col)
    coordinates = [row,col]
    console.log(coordinates)
    let testMatchingCell = getMatchingCellObj(coordinates)
    testMatchingCell = updateMatchingCell(testMatchingCell)

    let testClickedCell = getClickedCellObj(coordinates)
    testClickedCell = updateClickedCell(testClickedCell)
    //renderBoard()

    changeCellColor(testMatchingCell)

    changeCellColor(testClickedCell)
    //console.log(testClickedCell)

   
}

// stores corresponding opponent cell obj in global variable
const getMatchingCellObj = (coordinates) => {
    if (turn === 'player') {
        for (let i=0; i<cpuBottomGridArray.length; i++) {
            if (cpuBottomGridArray[i].xy = coordinates) {
                return matchingCellObj = cpuBottomGridArray[i]                
            } else {
                return
            }
        }
    } else {
        for (let i=0; i<playerBottomGridArray.length; i++) {
            if (playerBottomGridArray[i].xy = coordinates) {
                return matchingCellObj = playerBottomGridArray[i]
            } else {
                return
            }
        }
    }
}

// stores cell obj that player clicked or cpu selected in global variable
const getClickedCellObj = (coordinates) => {
    if (turn === 'player') {
        for (let i=0; i<playerTopGridArray.length; i++) {
            if (playerTopGridArray[i].xy = coordinates) {
                return clickedCellObj = playerTopGridArray[i]                  
            } else {
                return
            }
        }
    } else {
        for (let i=0; i<cpuTopGridArray.length; i++) {
            if (cpuTopGridArray[i].xy = coordinates) {
                return clickedCellObj = cpuTopGridArray[i]
            } else {
                return
            }
        }
    }
}

//updates the target cell object (not div) on other player's board
const updateMatchingCell = (cellObj) => {
    if (cellObj.selected === true) {    
        messageEl.innerHTML = 'Pick another square'
        console.log('pick another square')
    } else {
        cellObj.selected = true
        if (cellObj.occupied === false) {
            cellObj.hit = false
            cellObj.backgroundColor = 'white'
            wasAShipHitThisTurn = false
            messageEl.innerHTML = 'Miss!'
            console.log('miss')
        } else {
            cellObj.hit = true
            cellObj.backgroundColor = 'red'
            wasAShipHitThisTurn = true
            if (turn === 'player') {
                messageEl.innerHTML = 'Computer was hit!'
                console.log('computer was hit')
                cpuDamage++
            } else {
                messageEl.innerHTML = 'You were hit!'
                console.log('you were hit')
                playerDamage++
            }
        }
    }
    return cellObj
}

//updates the clicked cell obj (not div) on current player's board
const updateClickedCell = (cellObj) => {
    if (!cellObj.selected) {
        cellObj.selected = true
    }
    if (wasAShipHitThisTurn === true) {
        cellObj.backgroundColor = 'red'
    } else {
        cellObj.backgroundColor = 'white'
    }
    return cellObj
}

//returns the corresponding div
const getDiv = (cellObj) => {
    let row = cellObj.xy[0]
    let col = cellObj.xy[1]
    let board = cellObj.board
    let div = document.querySelector(`[data-board='${board}'][data-row='${row}'][data-col='${col}']`)
    return div

}


//changes color of div tied to cell object
const changeCellColor = (cellObj) => {
    let row = cellObj.xy[0]
    let col = cellObj.xy[1]
    let board = cellObj.board
    let matchingDiv = document.querySelector(`[data-board='${board}'][data-row='${row}'][data-col='${col}']`)
    matchingDiv.style.backgroundColor = cellObj.backgroundColor
    matchingDiv.style.borderColor = cellObj.backgroundColor
    // console.log(matchingDiv)
    // console.log(cellObj)

}


//const updateBoard = (?) => {} // updates board after each turn 

const generateRandomNumber = () => {
    let num = Math.random()    
    let integer = Math.floor(num * 10) + 1
    return integer
}

// hardcoding the ships
// const randomizeBoard = (array) => {
//     let num = generateRandomNumber()
//     if (array[num].col > 6) {}
// }



// Setup phase

// const setup = () => {
//     playerShips.forEach((ship) =>
//     {
//         messageEl.innerHTML = `Place your ${ship}`
//         placeShip(ship)
//         numShipsPlaced++
//     })
// }

// const placeShip = (ship) => {

// }

const makeBorderGreen = (event) => {
    event.target.style.borderColor = 'lime'
}

const makeBorderBlue = (event) => {
    event.target.style.borderColor = 'aqua'
}

const makeBorderGray = (event) => {
    event.target.style.borderColor = 'lightslategray'
}





// turn off top grid event listeners when setup = true
// player is asked to place carrier (first ship in array)
// bottom grid event listeners are active when setup = true
    //mouseover - show outline of ship
        //need to know div coords and ship.size and orientation
        //find cells that ship would occupy and update corresponding divs
    //mouseout - return divs to original state    
    //click - place ship  
    //doubleclick - rotate ship  








// Functions for dealing with grid coordinates

// Doesn't work
// const divToCell = (div) => {
//     let board = div.dataset.board
//     let row = parseInt(div.dataset.row)
//     let col = parseInt(div.dataset.col)
//     let matchingCell = {}
//     arrayOfArrays.forEach((array) => {
//         for (let i=0; i<array.length; i++) {
//             if (array[i].board === board && array[i].row === row && array[i].col === col) {
//                 matchingCell = array[i]
//             }
//         }
//     })
//     console.log(typeof matchingCell)
//     //making sure it returns an object
// }


// THIS WORKS, KEEPING SO I DON'T BREAK IT
// THIS LINKS THE CLICKED DIV WITH ITS CORRESPONDING CELL OBJECT
// input div, output cell obj
const divToCell = (event) => {
    let board = event.target.dataset.board
    let row = parseInt(event.target.dataset.row)
    let col = parseInt(event.target.dataset.col)
    let matchingCell = {}
    arrayOfArrays.forEach((array) => {
        for (let i=0; i<array.length; i++) {
            if (array[i].board === board && array[i].row === row && array[i].col === col) {
                matchingCell = array[i]
            }
        }
    })
    //console.log(typeof matchingCell)
    //making sure it returns an object
}

// THIS LINKS A CELL OBJ TO THE DIV THAT REPRESENTS IT
// input cell obj, output div
const celltoDiv = (cell) => {
    let matchingDiv = document.querySelector(`[data-board='${cell.board}'][data-row='${cell.row}'][data-col='${cell.col}']`)
    return matchingDiv
}

// other functions

const testHandleClick = (event) => {
    console.log(`${event.target.dataset.row}, ${event.target.dataset.col}`)
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
    event.target.style.borderColor = divToCell().color
}

//shows ship outline -> if valid outline is green if invalid outline is red
// const showOutline = (event) => {

// }


// updates cell obj properties
// const handleCell = (cell) => {
//     if (cell.selected === true) {                               // square is already picked 
//         messageEl.innerHTML = 'Pick another square'
//         console.log('pick another square')                      // tell player to pick again
//     } else {                                                    // square is not already picked
//         cell.selected = true
//         cell.color = 'white'                                    // mark square as selected
//         if (cell.occupied === false) {                          // square does not have a ship
//             messageEl.innerHTML = 'Miss!'
//             console.log('miss')                                 // tell player it was a miss
//             cell.hit = false                                    // mark square as miss                           
//         } else {                                                // square has a ship
//             cell.hit = true
//             cell.color = 'red'
//             hitShip(cell.ship)                                     // mark square as hit
//         }                                                  //change board to display miss
//     }
// }

// prob don't need this (change color in handleCell and handleTopGridClick)
// updates div color
// const handleDiv = (cell) => {}

//marks ship as hit
// const hitShip = (ship) => {
//     ship.hitCounter++
//     if (ship.hitCounter === ship.health && turn === 'player') {
//         playerShipCount--
//         checkForWinner()    
//     } else {
//         return
//     }

// }

// gets player and cpu ships on game board
// const setup = () => {
//     playerPlaceShips()
//     cpuPlaceShips()
// }

// loops through player ships array
// const playerPlaceShips = () => {
//     playerShips.forEach((ship) => {
//         messageEl.innerHTML = `Place your ${ship.name}`

//     })
// }

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


//console.log(matchingCell)

// hardcoding a carrier on the cpu board
// cpuBottomGridArray[0].occupied = true //row 1 col 1
// cpuBottomGridArray[1].occupied = true //row 1 col 2
// cpuBottomGridArray[2].occupied = true
// cpuBottomGridArray[3].occupied = true
// cpuBottomGridArray[4].occupied = true
// cpuBottomGridArray[0].ship = 'carrier'
// cpuBottomGridArray[1].ship = 'carrier'
// cpuBottomGridArray[2].ship = 'carrier'
// cpuBottomGridArray[3].ship = 'carrier'
// cpuBottomGridArray[4].ship = 'carrier'

// console.log(cpuBottomGridArray[4])
// this.row = row
// this.col = col
// this.xy = [row,col]
// this.board = element.id
// this.selected = false
// this.occupied = false
// this.hit = false
// this.ship = null
// this.color = null


//randomizeBoard(playerBottomGridArray)
//console.log(celltoDiv(playerTopGridArray[0]))


//console.log(cpuBottomGridArray[99])
//setup()

// setup() // player places ships
// run() // starts the part where player and cpu select squares





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

