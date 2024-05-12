/*-------------------------------- Constants --------------------------------*/

// const carrier
// const battleship
// const destroyer
// const submarine
// const patrolBoat

// do I need separate ones for player and computer?

/*---------------------------- Variables (state) ----------------------------*/

let selectedShip = null

let turn = player
let winner = false
let playerShipCount = 5
let cpuShipCount = 5

/*------------------------ Cached Element References ------------------------*/

const carrierEl = document.querySelector('#carrier')
const battleshipEl = document.querySelector('#battleship')
const destroyerEl = document.querySelector('#destroyer')
const submarineEl = document.querySelector('#submarine')
const patrolBoatEl = document.querySelector('#patrol-boat')

/*-------------------------------- Functions --------------------------------*/

const selectShip = () => {}

const updateMessage = (?) =>

const handleClick = (event) => {                    // player picks a square
    if (event.target.selected === true) {           // square is already picked
        display pick another square                     // tell player to pick again
    } else {                                        // square is not already picked
        event.target.selected = true                    // mark square as selected
        if (event.target.occupied === false) {      // square is not occupied

        }                                           // square is occupied
    }                                       
    







    
    (event.target.occupied === false) {

    }
    
    
    if (cell is occupied) {
        //change board status
        change hit to true 
        //change ship status 
        find what ship is there
        add to hit counter

    } else {

    }
}

const hitShip = (ship) => {
    ship.hitCounter++
    if (ship.hitCounter === ship.health && turn === 'player') {
        playerShipCount--
        checkForWinner()    
    } else {
        return
    }

}

const checkIfSunk = (?) => { // might not need this if I have hitShip

const checkForWinner = () => {
    if (playerShipCount === 0) {
        winner = computer
        updateMessage()
    } else if (cpuShipCount === 0) {
        winner = player
        updateMessage()
    } else {
        return
    }


}    

}

/*----------------------------- Event Listeners -----------------------------*/

// for clicking on each ship at the start of the game to select and place them
carrierEl.addEventListener('click', selectShip)
battleshipEl.addEventListener('click', selectShip)
destroyerEl.addEventListener('click', selectShip)
submarineEl.addEventListener('click', selectShip)
patrolBoatEl.addEventListener('click', selectShip)



/* 

ship properties

name
location: []
hitCounter: starts at 0
health

cell properties
selected: boolean
occupied: boolean
hit: boolean



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


2 options

1. Each grid cell is an object and a div element

Row: string?
Column: number
Occupied: boolean
Hit: boolean

2. Each grid cell is a div element not an object



*/

