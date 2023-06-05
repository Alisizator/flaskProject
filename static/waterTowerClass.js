class WaterTowerClass{

    constructor(ctx,startX,startY,widthWall,width,height,colorMetal,colorLiquid)
    {
        this.startX = startX;
        this.startY = startY;
        this.widthWall = widthWall;
        this.width = width;
        this.height = height;
        this.ctx = ctx;
        this.colorMetal = colorMetal;
        this.colorLiquid = colorLiquid;
    }

    draw()
    {
        //grad
        const gradMetal = this.ctx.createLinearGradient(0,0,500,500);
        gradMetal.addColorStop('0',bright(this.colorMetal,50));
        gradMetal.addColorStop('.50',bright(this.colorMetal,-50));
        this.ctx.fillStyle = gradMetal;
        this.ctx.fillRect(this.startX, this.startY, this.width, this.height);

        const gradLiquid = this.ctx.createLinearGradient(0,0,0,500);
        gradLiquid.addColorStop('0',this.colorLiquid);
        gradLiquid.addColorStop('.50',bright(this.colorLiquid,50));
        //
        this.ctx.fillStyle = this.colorLiquid;
        this.ctx.fillRect(this.startX+this.widthWall, this.startY, this.width-this.widthWall*2, this.height-this.widthWall);
    }
}
