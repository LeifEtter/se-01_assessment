//Require Library to be able to accept inputs throug cmd line
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })

//Initial game grid
game_grid = [
    ['R', 'R', 'R', 'R', 'R'],
    ['R', 'R', 'R', 'R', 'R'],
    ['R', 'R', 'R', 'R', 'R'],
    ['R', 'R', 'R', 'R', 'R'],
    ['R', 'R', 'R', 'R', 'R'],
]

//Function that toggles at specific location
function toggleAt(y, x, grid) {
    //Toggle according to color
    switch(grid[y][x]) {
        case "R":
            grid[y][x] = "G"
            return grid
        case "G":
            grid[y][x] = "B"
            return grid
        case "B":
            grid[y][x] = "O"
            return grid
        case "O":
            grid[y][x] = "R"
            return grid
        default:
            return grid
    }
}

//Function that toggles selected location and nbeighbours
function toggle(position, grid) {
    y = parseInt(position[0])
    x = parseInt(position[1])

    //Toggle selected location
    grid = toggleAt(y, x, grid)

    //Toggle Neighbours if in bounds
    if((y + 1) <= grid.length-1) {
        grid = toggleAt(y+1, x, grid)
    }
    if((x + 1) <= grid.length-1) {
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
            if(field != "O") {
                return false
            }
        }
    }
    return true
}

function displayGrid(grid) {
    //Display Grid with numbers for orientation
    console.log("    0  1  2  3  4 x")
    console.log("    -------------------")
    x = 0
    for(row of grid) {
        console.log(`${x} | ${row[0]}  ${row[1]}  ${row[2]}  ${row[3]}  ${row[4]}`)
        x++;
    }
}

function playGame(grid) {
    console.log("This is the new Grid:")

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