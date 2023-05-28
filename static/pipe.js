class Pipe{
    constructor(ctx,startX,startY,widthWall,pipeLen,heightPipe,widthWaterTower,heightWaterTower)
    {
        this.startX = startX;
        this.startY = startY;
        this.widthWall = widthWall;
        this.pipeLen = pipeLen;
        this.heightPipe = heightPipe;
        this.heightWaterTower = heightWaterTower;
        this.widthWaterTower = widthWaterTower;
        this.ctx = ctx;
    }
    draw()
    {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(this.startX+this.widthWaterTower, this.startY+this.heightWaterTower-this.heightPipe, this.pipeLen, this.heightPipe)
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(this.startX+this.widthWaterTower-this.widthWall, this.startY+this.heightWaterTower-this.heightPipe+this.widthWall,this.pipeLen+this.widthWall, this.heightPipe-this.widthWall*2)
    }
}