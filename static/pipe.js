class Pipe{
    constructor(ctx,startX,startY,widthWall,pipeLen,heightPipe,widthWaterTower,heightWaterTower,absoluteFake)
    {
        this.startX = startX;
        this.startY = startY;
        this.widthWall = widthWall;
        this.pipeLen = pipeLen;
        this.heightPipe = heightPipe;
        this.heightWaterTower = heightWaterTower;
        this.widthWaterTower = widthWaterTower;
        this.ctx = ctx;
        this.fieldPipe = 0;
        this.absoluteFake = absoluteFake;
    }
    draw()
    {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(this.startX+this.widthWaterTower, this.startY+this.heightWaterTower-this.heightPipe, this.pipeLen, this.heightPipe)
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(this.startX+this.widthWaterTower-this.widthWall, this.startY+this.heightWaterTower-this.heightPipe+this.widthWall,this.pipeLen+this.widthWall, this.heightPipe-this.widthWall*2)
        this.ctx.fillStyle = "blue";
        this.ctx.fillRect(this.startX+this.widthWaterTower-this.widthWall, this.startY+this.heightWaterTower-this.heightPipe+this.widthWall,this.fieldPipe, this.heightPipe-this.widthWall*2)
    }
    drawDefPipe()
    {
        this.ctx.fillStyle = "red";
        this.ctx.beginPath();
        this.ctx.moveTo(this.startX+this.widthWaterTower, this.startY+this.heightWaterTower-this.heightPipe);
        this.ctx.lineTo(this.startY+this.widthWaterTower+this.widthWall, this.startY+this.heightWaterTower-this.heightPipe-this.absoluteFake);
        this.ctx.lineTo(this.startY+this.widthWaterTower+this.widthWall, this.startY+this.heightWaterTower-this.heightPipe);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.moveTo(this.startX+this.widthWaterTower+this.pipeLen, this.startY+this.heightWaterTower-this.heightPipe);
        this.ctx.lineTo(this.startY+this.widthWaterTower-this.widthWall+this.pipeLen, this.startY+this.heightWaterTower-this.heightPipe-this.absoluteFake);
        this.ctx.lineTo(this.startY+this.widthWaterTower-this.widthWall+this.pipeLen, this.startY+this.heightWaterTower-this.heightPipe);
        this.ctx.fill();
        this.ctx.fillRect(this.startY+this.widthWaterTower+this.widthWall, this.startY+this.heightWaterTower-this.heightPipe-this.absoluteFake,this.pipeLen-this.widthWall*2,this.absoluteFake)

        this.ctx.beginPath();
        this.ctx.moveTo(this.startX+this.widthWaterTower, this.startY+this.heightWaterTower);
        this.ctx.lineTo(this.startY+this.widthWaterTower+this.widthWall, this.startY+this.heightWaterTower+this.absoluteFake);
        this.ctx.lineTo(this.startY+this.widthWaterTower+this.widthWall, this.startY+this.heightWaterTower);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.moveTo(this.startX+this.widthWaterTower+this.pipeLen, this.startY+this.heightWaterTower);
        this.ctx.lineTo(this.startY+this.widthWaterTower-this.widthWall+this.pipeLen, this.startY+this.heightWaterTower+this.absoluteFake);
        this.ctx.lineTo(this.startY+this.widthWaterTower-this.widthWall+this.pipeLen, this.startY+this.heightWaterTower);
        this.ctx.fill();
        this.ctx.fillRect(this.startY+this.widthWaterTower+this.widthWall, this.startY+this.heightWaterTower,this.pipeLen-this.widthWall*2,this.absoluteFake)
    }
}