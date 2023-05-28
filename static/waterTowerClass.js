class WaterTowerClass{

    constructor(ctx,startX,startY,widthWall,width,height)
    {
        this.startX = startX;
        this.startY = startY;
        this.widthWall = widthWall;
        this.width = width;
        this.height = height;
        this.ctx = ctx;
    }

    draw()
    {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(this.startX, this.startY, this.width, this.height);
        this.ctx.fillStyle = "blue";
        this.ctx.fillRect(this.startX+this.widthWall, this.startY, this.width-this.widthWall*2, this.height-this.widthWall);
    }
}
