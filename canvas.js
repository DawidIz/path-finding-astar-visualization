class Canvas {
    constructor(width,height){
        this.width = width
        this.height = height

        this.canvas = document.createElement('canvas')
        this.canvas.setAttribute('height',this.height)
        this.canvas.setAttribute('width',this.width)

        this.ctx = this.canvas.getContext('2d')

    }

    getCanvas(){
        return this.canvas
    }

    clear(){
        const {ctx, width, height} = this

        ctx.clearRect(0,0,width,height)
    }

    line(x,y,x2,y2){
        const {ctx} = this

        ctx.beginPath()
        ctx.moveTo(x,y)
        ctx.lineTo(x2,y2)
        ctx.stroke()
    }

    grid(grid=0){
        const {floor} = Math
        const {width, height} = this
        const cols = floor(width / grid)
        const rows = floor(height / grid)

        for (let i = 0; i < cols; i++){
            let x = i * grid
            this.line(x,0,x,height)
        }

        for (let i = 0; i < rows; i++){
            let y = i * grid
            this.line(0,y,width,y)
        }
    }

    fill(x,y,grid = 1,fill = '#4287f5'){
        const {ctx} = this
        x = x * grid
        y = y * grid

        ctx.beginPath()
        ctx.rect(x,y,grid,grid)
        ctx.fillStyle = fill
        ctx.fill()
    }

}
