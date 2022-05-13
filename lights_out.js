//Require Library to be able to accept inputs throug cmd line
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })

//Initial game grid
game_grid = [
    ['X', 'X', 'X'],
    ['X', 'X', 'X'],
    ['X', 'X', 'X'],
]

//Function that toggles at specific location
function toggleAt(y, x, grid) {
    console.log(`This is y: ${y}, this is x: ${x}`)
    grid[y][x] == 'X' ? grid[y][x] = 'O' : grid[y][x] = 'X';
    return grid
}

//Function that toggles selected location and nbeighbours
function toggle(position, grid) {
    y = parseInt(position[0])
    x = parseInt(position[1])

    //Toggle selected location
    grid = toggleAt(y, x, grid)

    //Toggle Neighbours if in bounds
    if((y + 1) <= 2) {
        grid = toggleAt(y+1, x, grid)
    }
    if((x + 1) <= 2) {
        grid = toggleAt(y, x+1, grid)
    }
    if((y - 1) >= 0) {
        grid = toggleAt(y-1, x, grid)
    }
    if((x - 1) >= 0) {
        grid = toggleAt(y, x-1, grid)
    }
    return grid
}

function checkWin(grid) {
    //Iterate through all fields, return false if one field isn't off
    for(row of grid) {
        for(field of row) {
            if(field == "X") {
                return false
            }
        }
    }
    return true
}

function displayGrid(grid) {
    //Display Grid with numbers for orientation
    console.log("    0  1  2  x")
    console.log("    -------")
    x = 0
    for(row of grid) {
        console.log(`${x} | ${row[0]}  ${row[1]}  ${row[2]}`)
        x++;
    }
    console.log("y")
}

function playGame(grid) {
    console.log("This isn the new Grid:")

    //Check For Win
    if (checkWin(grid)) {
        console.log("Congrats! You have Won!")
    } else {
        displayGrid(grid)
        console.log("")
        
        //Ask user for location
        readline.question('Which field to toggle? First number is y-axis, second x-axis:', field => {
            newGrid = toggle(field.split(''), grid)
            playGame(newGrid)
        })
    }
}

playGame(game_grid)