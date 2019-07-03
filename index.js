console.log("A*")
const width = 600
const height = 600
const grid = 10

const cols = Math.floor(width / grid)
const rows = Math.floor(height / grid)

const c = new Canvas(width,height)
document.body.appendChild(c.getCanvas())

const tiles = []

class Tile {
    constructor(x,y){
        this.x = x
        this.y = y
        this.f = Infinity
        this.h = 0
        this.g = Infinity
        this.parent = null
        this.neighbours = []
    }

    index = (x,y) => {
        return y * cols + x
    }

    getNeighbours = (tiles) => {
        const {x,y,index,neighbours} = this
        let id
        //left
        if(x > 0 ){
            id = index(x - 1,y)
            neighbours.push(tiles[id])
        }
            
        //left top
        if(x > 0 && y > 0){
            id = index(x - 1,y - 1)
            neighbours.push(tiles[id])
        }

        //top
        if(y > 0){
            id = index(x,y - 1)
            neighbours.push(tiles[id])
        }

        //right top
        if(y > 0 && x < cols -1){
            id = index(x + 1,y - 1)
            neighbours.push(tiles[id])
        }

        //right
        if(x < cols - 1){
            id = index(x + 1,y)
            neighbours.push(tiles[id])
        }

        //right bottom
        if(x < cols - 1 && y < rows - 1){
            id = index(x + 1,y + 1)
            neighbours.push(tiles[id])
        }

        //bottom
        if(y < rows - 1){
            id = index(x,y + 1)
            neighbours.push(tiles[id])
        }

        //left bottom
        if(x > 0 && y < rows -1){
            id = index(x - 1,y + 1)
            neighbours.push(tiles[id])
        }
    }

    draw(color){
        c.fill(this.x,this.y,grid,color)
    }

}

for (let i = 0; i < rows ; i++){
    for (let j = 0; j < cols ; j++){
        let tile = new Tile(j,i)
        tiles.push(tile)
    }
}

tiles.forEach(tile => tile.getNeighbours(tiles))

const closedSet = []
const openSet = []

const start = tiles[0]
const goal = tiles[(rows-1)*cols -2]

const blocked = tiles.filter(tile => {
    if(Math.random() > 0.6 && goal != tile)
        return tile
})

const path = []

////    functions   //////////////

findLowestF = (list) => {
    list.sort((a,b) => b.f - a.f)
    return list.pop()
}

heuristic = (a,b) => {
    const {max,abs} = Math
    return max(abs(a.x - b.x),abs(a.y - b.y))
}

setPath = (p) => {
    let temp = p
    while(temp.parent != null){
        path.push(temp)
        temp = temp.parent
    }
}

//////////////////////////////////
start.g = 0
start.f = heuristic(start,goal)

//push start node to openSet
openSet.push(start)

//if openSet.length > 0
aStar = () => {
    //current = openSet lowest f element
    let current = findLowestF(openSet)

    // if current === goal return path
    if(current === goal){
        console.log('found')
        openSet.length = 0
        setPath(current)
        return 
    }
    
    //openSet remove current    //done before in findLowestF

    //closedSet push current
    closedSet.push(current)

    //for neighbour of current
    current.neighbours.forEach(neighbour => {
        //if neighbour in clossedSet return
        if(closedSet.includes(neighbour)) return

        let g = current.g + 1

        //if neighbour not in openSet then openSet.push(neighbour)
        if(!openSet.includes(neighbour)) {

            if(!blocked.includes(neighbour))
                openSet.push(neighbour)
        }
        else if (g >= neighbour.g) return 

        neighbour.parent = current
        neighbour.g = g
        neighbour.f = g + heuristic(neighbour,goal)
    
    })

}

setInterval(()=>{
    if(openSet.length > 0) aStar()

    closedSet.forEach(c => c.draw('#4287f5'))
    openSet.forEach(o => o.draw('#8f35de'))
    blocked.forEach(b => b.draw('#2f3c52'))
    path.forEach(b => b.draw('#bff542'))

    start.draw('#1ad6ba')
    goal.draw('#fc3a6b')

    c.grid(grid)
},1)

