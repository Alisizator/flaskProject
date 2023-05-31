class Barrier {

    constructor(ctx,startXBarrier, startYBarrier,width,height)
    {
        this.startX = startXBarrier;
        this.startY = startYBarrier;
        this.width = width;
        this.height = height;
        this.speedOnXAxis = 0;
        this.speedOnYAxis = 1;
        this.ctx = ctx;
        this.position = 0;
    }

    draw()
    {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(this.startX, this.startY, this.width, this.height);
    }
}