class Barrier {

    constructor(ctx,startXBarrier, startYBarrier,width,height)
    {
        this.startX = startXBarrier;
        this.startY = startYBarrier;
        this.width = width;
        this.height = height;
        this.speedOnXAxis = 0;
        this.speedOnYAxis = 0.5;
        this.ctx = ctx;
        this.position = 0;
    }

    draw()
    {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(this.startX, this.startY, this.width, this.height);
    }
    drawPip()
    {
        this.ctx.fillStyle = 'gray';
        this.ctx.fillRect(this.startX+this.width, this.startY+this.height/4,this.width*2, this.height/2);
    }
    drawLowPip()
    {
        this.ctx.fillStyle = 'gray';
        this.ctx.fillRect(this.startX+this.width*3, this.startY+this.height*(3/8),this.width*2, this.height/5)
    }
}