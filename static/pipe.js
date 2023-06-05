class Pipe{
    constructor(ctx,startX,startY,widthWall,pipeLen,heightPipe,widthWaterTower,heightWaterTower,absoluteFake,colorMetal,colorLiquid)
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
        this.pressureCoefficient = 0;
        this.pressureCoefficientBack = 0;
        this.pressureCoefficientAgain = 0;
        this.pressureCoefficientRestart = 0;
        this.colorMetal = colorMetal;
        this.colorLiquid = colorLiquid;
    }
    draw()
    {
        //Metal
        const gradMetal = this.ctx.createLinearGradient(0,0,500,500);
        gradMetal.addColorStop("0",bright(this.colorMetal,-50));
        gradMetal.addColorStop(".50",bright(this.colorMetal,50));
        //
        this.ctx.fillStyle = gradMetal;
        this.ctx.fillRect(this.startX, this.startY, this.width, this.height);
        //Liquid
        const gradLiquid = this.ctx.createLinearGradient(0,0,0,500);
        gradLiquid.addColorStop('0',this.colorLiquid);
        gradLiquid.addColorStop('.50',bright(this.colorLiquid,50));
        //
        this.ctx.fillStyle = bright(this.colorMetal,-50);
        this.ctx.fillRect(this.startX+this.widthWaterTower, this.startY+this.heightWaterTower-this.heightPipe, this.pipeLen, this.heightPipe)

        this.ctx.fillStyle = "white";
        this.ctx.fillRect(this.startX+this.widthWaterTower-this.widthWall, this.startY+this.heightWaterTower-this.heightPipe+this.widthWall,this.pipeLen+this.widthWall, this.heightPipe-this.widthWall*2)
        this.ctx.fillStyle = this.colorLiquid;
        this.ctx.fillRect(this.startX+this.widthWaterTower-this.widthWall, this.startY+this.heightWaterTower-this.heightPipe+this.widthWall,this.fieldPipe, this.heightPipe-this.widthWall*2)
    }
    drawPipePressure()
    {
        //this.ctx.fillStyle = this.colorLiquid
        //this.ctx.fillRect(this.startX+this.pipeLen+this.widthWaterTower,this.startY+this.heightWaterTower,-this.pressureCoefficient+1, -this.heightPipe);
        this.ctx.fillStyle = bright(this.colorMetal,30) //цвет

        this.ctx.fillRect(this.startX+this.pipeLen+this.widthWaterTower, this.startY+this.heightWaterTower-this.heightPipe-this.widthWall*2,-this.widthWall-this.pressureCoefficient,this.widthWall);
        this.ctx.beginPath();
        this.ctx.moveTo(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall-this.pressureCoefficient,this.startY+this.heightWaterTower-this.heightPipe-this.widthWall*2);
        this.ctx.lineTo(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall*2-this.widthWall/2-this.pressureCoefficient,this.startY+this.heightWaterTower-this.heightPipe);
        this.ctx.lineTo(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall*2-this.widthWall/2-this.pressureCoefficient,this.startY+this.heightWaterTower-this.heightPipe+this.widthWall);
        this.ctx.lineTo(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall-this.pressureCoefficient,this.startY+this.heightWaterTower-this.heightPipe-this.widthWall);
        this.ctx.closePath();
        this.ctx.fill();
        //bot
        this.ctx.fillRect(this.startX+this.pipeLen+this.widthWaterTower, this.startY+this.heightWaterTower+this.widthWall*2,-this.widthWall-this.pressureCoefficient,-this.widthWall);
        this.ctx.beginPath();

        this.ctx.moveTo(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall-this.pressureCoefficient,this.startY+this.heightWaterTower+this.widthWall*2);
        this.ctx.lineTo(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall*2-this.widthWall/2-this.pressureCoefficient,this.startY+this.heightWaterTower);
        this.ctx.lineTo(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall*2-this.widthWall/2-this.pressureCoefficient,this.startY+this.heightWaterTower-this.widthWall);
        this.ctx.lineTo(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall-this.pressureCoefficient,this.startY+this.heightWaterTower+this.widthWall);
        this.ctx.closePath();
        this.ctx.fill();
        //water
        this.ctx.beginPath();
        this.ctx.fillStyle = bright(this.colorLiquid,30);
        this.ctx.moveTo(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall*2-this.widthWall/2-this.pressureCoefficient,this.startY+this.heightWaterTower-this.heightPipe+this.widthWall);
        this.ctx.lineTo(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall*2-this.widthWall/2-this.pressureCoefficient,this.startY+this.heightWaterTower-this.widthWall)
        this.ctx.lineTo(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall-this.pressureCoefficient,this.startY+this.heightWaterTower+this.widthWall);
        this.ctx.lineTo(this.startX+this.pipeLen+this.widthWaterTower, this.startY+this.heightWaterTower+this.widthWall);
        this.ctx.lineTo(this.startX+this.pipeLen+this.widthWaterTower, this.startY+this.heightWaterTower-this.heightPipe-this.widthWall);
        this.ctx.lineTo(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall-this.pressureCoefficient,this.startY+this.heightWaterTower-this.heightPipe-this.widthWall);
        this.ctx.closePath();
        this.ctx.fill();
        //TOP this.ctx.fillRect(this.startX+this.pipeLen+this.widthWaterTower, this.startY+this.heightWaterTower-this.heightPipe, -this.pressureCoefficient+1, -this.widthWall);
        //BOT this.ctx.fillRect(this.startX+this.pipeLen+this.widthWaterTower, this.startY+this.heightWaterTower, -this.pressureCoefficient+1, this.widthWall);
    }
    drawPipePressureBack()
    {
        //border
        this.ctx.fillStyle = bright(this.colorMetal,-50);
        this.ctx.fillRect(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall*2-this.widthWall/2-this.pressureCoefficient, this.startY+this.heightWaterTower-this.heightPipe, this.pressureCoefficientBack, this.widthWall);
        this.ctx.fillRect(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall*2-this.widthWall/2-this.pressureCoefficient, this.startY+this.heightWaterTower, this.pressureCoefficientBack, -this.widthWall);

        //water
        this.ctx.fillStyle = this.colorLiquid;
        this.ctx.fillRect(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall*2-this.widthWall/2-this.pressureCoefficient, this.startY+this.heightWaterTower-this.heightPipe+this.widthWall,this.pressureCoefficientBack, this.heightPipe-this.widthWall*2);
        //top
        this.ctx.beginPath();
        this.ctx.fillStyle = bright(this.colorMetal,30); //цвет
        this.ctx.moveTo(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall-this.pressureCoefficient+this.pressureCoefficientBack,this.startY+this.heightWaterTower-this.heightPipe-this.widthWall*2);
        this.ctx.lineTo(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall*2-this.widthWall/2-this.pressureCoefficient+this.pressureCoefficientBack,this.startY+this.heightWaterTower-this.heightPipe);
        this.ctx.lineTo(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall*2-this.widthWall/2-this.pressureCoefficient+this.pressureCoefficientBack,this.startY+this.heightWaterTower-this.heightPipe+this.widthWall);
        this.ctx.lineTo(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall-this.pressureCoefficient+this.pressureCoefficientBack,this.startY+this.heightWaterTower-this.heightPipe-this.widthWall);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall*2-this.widthWall/2-this.pressureCoefficient+1,this.startY+this.heightWaterTower-this.heightPipe,this.pressureCoefficientBack,-this.widthWall*2)
        this.ctx.beginPath();
        this.ctx.moveTo(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall*2-this.widthWall/2-this.pressureCoefficient+1+this.pressureCoefficientBack,this.startY+this.heightWaterTower-this.heightPipe);
        this.ctx.lineTo(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall*2-this.widthWall/2-this.pressureCoefficient+1+this.pressureCoefficientBack,this.startY+this.heightWaterTower-this.heightPipe-this.widthWall*3.5);
        this.ctx.lineTo(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall-this.pressureCoefficient+1+this.pressureCoefficientBack+this.widthWall,this.startY+this.heightWaterTower-this.heightPipe-this.widthWall*3.5);
        this.ctx.closePath();
        this.ctx.fill();
        //this.ctx.fillRect(this.startX+this.pipeLen+this.widthWaterTower-this.pressureCoefficient, this.startY+this.heightWaterTower-this.heightPipe-this.widthWall*2,-this.widthWall+this.pressureCoefficientBack,this.widthWall);
        //bot
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.fillStyle = bright(this.colorMetal,30);//цвет
        this.ctx.moveTo(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall-this.pressureCoefficient+this.pressureCoefficientBack,this.startY+this.heightWaterTower+this.widthWall*2+this.startY);
        this.ctx.lineTo(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall*2-this.widthWall/2-this.pressureCoefficient+this.pressureCoefficientBack,this.startY+this.heightWaterTower);
        this.ctx.lineTo(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall*2-this.widthWall/2-this.pressureCoefficient+this.pressureCoefficientBack,this.startY+this.heightWaterTower-this.widthWall);
        this.ctx.lineTo(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall-this.pressureCoefficient+this.pressureCoefficientBack,this.startY+this.heightWaterTower+this.widthWall);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall*2-this.widthWall/2-this.pressureCoefficient+1,this.startY+this.heightWaterTower,this.pressureCoefficientBack,this.widthWall*2)
        this.ctx.beginPath();
        this.ctx.moveTo(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall*2-this.widthWall/2-this.pressureCoefficient+1+this.pressureCoefficientBack,this.startY+this.heightWaterTower);
        this.ctx.lineTo(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall*2-this.widthWall/2-this.pressureCoefficient+1+this.pressureCoefficientBack,this.startY+this.heightWaterTower+this.widthWall*3.5);
        this.ctx.lineTo(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall-this.pressureCoefficient+1+this.pressureCoefficientBack+this.widthWall,this.startY+this.heightWaterTower+this.widthWall*3.5);
        this.ctx.closePath();
        this.ctx.fill();

        //this.ctx.fillRect(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall-this.pressureCoefficient+this.pressureCoefficientBack, this.startY+this.heightWaterTower-this.heightPipe-this.widthWall*2,-this.widthWall+this.pressureCoefficientBack,this.widthWall);

        /*
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(this.startX+this.pipeLen+this.widthWaterTower-this.pressureCoefficient+0.8, this.startY+this.heightWaterTower-this.heightPipe, this.pressureCoefficientBack, -this.widthWall);
        this.ctx.fillRect(this.startX+this.pipeLen+this.widthWaterTower-this.pressureCoefficient, this.startY+this.heightWaterTower, this.pressureCoefficientBack, this.widthWall*2);

        this.ctx.fillStyle = this.colorLiquid;
        this.ctx.fillRect(this.startX+this.pipeLen+this.widthWaterTower-this.pressureCoefficient, this.startY+this.heightWaterTower-this.heightPipe+this.widthWall,this.pressureCoefficientBack, this.heightPipe-this.widthWall*2);
        this.ctx.fillRect(this.startX+this.pipeLen+this.widthWaterTower-this.pressureCoefficient-1, this.startY+this.heightWaterTower-this.heightPipe+this.widthWall,this.pressureCoefficientBack, this.heightPipe-this.widthWall*2);
    */
    }
    drawPipePressureAgain()
    {
        //this.ctx.fillStyle = bright(this.colorMetal,30) //цвет

        //this.ctx.fillRect(this.startX+this.pipeLen+this.widthWaterTower, this.startY+this.heightWaterTower-this.heightPipe-this.widthWall*2,-this.widthWall-this.pressureCoefficient,this.widthWall);
        //top
        this.ctx.fillStyle = bright(this.colorMetal,30);//цвет
        this.ctx.beginPath();
        this.ctx.moveTo(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall*2-this.widthWall/2-this.pressureCoefficientAgain,this.startY+this.heightWaterTower-this.heightPipe+this.widthWall);
        this.ctx.lineTo(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall*2-this.widthWall/2-this.pressureCoefficientAgain,this.startY+this.heightWaterTower-this.heightPipe);
        this.ctx.lineTo(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall-this.pressureCoefficientAgain,this.startY+this.heightWaterTower-this.heightPipe+this.widthWall);
        this.ctx.lineTo(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall-this.pressureCoefficientAgain,this.startY+this.heightWaterTower-this.heightPipe+this.widthWall*2);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.fillRect(this.startX+this.pipeLen+this.widthWaterTower, this.startY+this.heightWaterTower-this.heightPipe+this.widthWall,-this.widthWall-this.pressureCoefficientAgain,this.widthWall);
        this.ctx.fillStyle = "white";
        this.ctx.beginPath();
        this.ctx.moveTo(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall*2-this.widthWall/2-this.pressureCoefficientAgain,this.startY+this.heightWaterTower-this.heightPipe);
        this.ctx.lineTo(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall-this.pressureCoefficientAgain,this.startY+this.heightWaterTower-this.heightPipe+this.widthWall);
        this.ctx.lineTo(this.startX+this.pipeLen+this.widthWaterTower,this.startY+this.heightWaterTower-this.heightPipe+this.widthWall);
        this.ctx.lineTo(this.startX+this.pipeLen+this.widthWaterTower,this.startY+this.heightWaterTower-this.heightPipe*2);
        this.ctx.lineTo(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall*2-this.widthWall/2-this.pressureCoefficientAgain,this.startY+this.heightWaterTower-this.heightPipe*2);
        this.ctx.closePath();
        this.ctx.fill();
        //bot
        this.ctx.fillStyle = bright(this.colorMetal,30);//цвет
        this.ctx.beginPath();
        this.ctx.moveTo(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall*2-this.widthWall/2-this.pressureCoefficientAgain,this.startY+this.heightWaterTower-this.widthWall);
        this.ctx.lineTo(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall*2-this.widthWall/2-this.pressureCoefficientAgain,this.startY+this.heightWaterTower);
        this.ctx.lineTo(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall-this.pressureCoefficientAgain,this.startY+this.heightWaterTower-this.widthWall);
        this.ctx.lineTo(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall-this.pressureCoefficientAgain,this.startY+this.heightWaterTower-this.widthWall*2);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.fillRect(this.startX+this.pipeLen+this.widthWaterTower, this.startY+this.heightWaterTower-this.widthWall,-this.widthWall-this.pressureCoefficientAgain,-this.widthWall);
        this.ctx.fillStyle = "white";
        this.ctx.beginPath();
        this.ctx.moveTo(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall*2-this.widthWall/2-this.pressureCoefficientAgain,this.startY+this.heightWaterTower);
        this.ctx.lineTo(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall-this.pressureCoefficientAgain,this.startY+this.heightWaterTower-this.widthWall);
        this.ctx.lineTo(this.startX+this.pipeLen+this.widthWaterTower,this.startY+this.heightWaterTower-this.widthWall);
        this.ctx.lineTo(this.startX+this.pipeLen+this.widthWaterTower,this.startY+this.heightWaterTower+this.heightPipe);
        this.ctx.lineTo(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall*2-this.widthWall/2-this.pressureCoefficientAgain,this.startY+this.heightWaterTower+this.heightPipe);
        this.ctx.closePath();
        this.ctx.fill();
        //water
        this.ctx.fillStyle = bright(this.colorLiquid,30);
        this.ctx.fillRect(this.startX+this.pipeLen+this.widthWaterTower, this.startY+this.heightWaterTower-this.heightPipe+this.widthWall*2,-this.widthWall-this.pressureCoefficientAgain,this.heightPipe-this.widthWall*4);
        this.ctx.beginPath();
        this.ctx.moveTo(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall*2-this.widthWall/2-this.pressureCoefficientAgain+0.1,this.startY+this.heightWaterTower-this.heightPipe+this.widthWall);
        this.ctx.lineTo(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall-this.pressureCoefficientAgain+0.1,this.startY+this.heightWaterTower-this.heightPipe+this.widthWall*2);
        this.ctx.lineTo(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall-this.pressureCoefficientAgain+0.1,this.startY+this.heightWaterTower-this.widthWall*2);
        this.ctx.lineTo(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall*2-this.widthWall/2-this.pressureCoefficientAgain+0.1,this.startY+this.heightWaterTower-this.widthWall);
        this.ctx.closePath();
        this.ctx.fill();
    }
    drawPipePressureRestart()
    {
        //border
        this.ctx.fillStyle = bright(this.colorMetal,-50);
        this.ctx.fillRect(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall*2-this.widthWall/2-this.pressureCoefficientAgain, this.startY+this.heightWaterTower-this.heightPipe, this.pressureCoefficientRestart, this.widthWall);
        this.ctx.fillRect(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall*2-this.widthWall/2-this.pressureCoefficient, this.startY+this.heightWaterTower, this.pressureCoefficientRestart, -this.widthWall);

        //water
        this.ctx.fillStyle = this.colorLiquid;
        this.ctx.fillRect(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall*2-this.widthWall/2-this.pressureCoefficientAgain, this.startY+this.heightWaterTower-this.heightPipe+this.widthWall,this.pressureCoefficientRestart, this.heightPipe-this.widthWall*2);
        this.ctx.beginPath();
        this.ctx.fillStyle = bright(this.colorLiquid,30)
        this.ctx.moveTo(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall*2-this.widthWall/2-this.pressureCoefficientAgain+this.pressureCoefficientRestart,this.startY+this.heightWaterTower-this.heightPipe+this.widthWall);
        this.ctx.lineTo(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall-this.pressureCoefficientAgain+this.pressureCoefficientRestart,this.startY+this.heightWaterTower-this.heightPipe+this.widthWall*2);
        this.ctx.lineTo(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall-this.pressureCoefficientAgain+this.pressureCoefficientRestart,this.startY+this.heightWaterTower-this.widthWall*2);
        this.ctx.lineTo(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall*2-this.widthWall/2-this.pressureCoefficientAgain+this.pressureCoefficientRestart,this.startY+this.heightWaterTower-this.widthWall);
        this.ctx.closePath();
        this.ctx.fill();

        this.ctx.fillStyle = bright(this.colorMetal,30);//цвет

        //top
        this.ctx.beginPath();
        this.ctx.moveTo(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall*2-this.widthWall/2-this.pressureCoefficientAgain+this.pressureCoefficientRestart,this.startY+this.heightWaterTower-this.heightPipe);
        this.ctx.lineTo(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall-this.pressureCoefficientAgain+this.pressureCoefficientRestart,this.startY+this.heightWaterTower-this.heightPipe+this.widthWall);
        this.ctx.lineTo(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall-this.pressureCoefficientAgain+this.pressureCoefficientRestart,this.startY+this.heightWaterTower-this.heightPipe+this.widthWall*2);
        this.ctx.lineTo(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall*2-this.widthWall/2-this.pressureCoefficientAgain+this.pressureCoefficientRestart,this.startY+this.heightWaterTower-this.heightPipe+this.widthWall);
        this.ctx.closePath();
        this.ctx.fill();
        //bot
        this.ctx.beginPath();
        this.ctx.moveTo(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall*2-this.widthWall/2-this.pressureCoefficientAgain+this.pressureCoefficientRestart,this.startY+this.heightWaterTower);
        this.ctx.lineTo(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall-this.pressureCoefficientAgain+this.pressureCoefficientRestart,this.startY+this.heightWaterTower-this.widthWall);
        this.ctx.lineTo(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall-this.pressureCoefficientAgain+this.pressureCoefficientRestart,this.startY+this.heightWaterTower-this.widthWall*2);
        this.ctx.lineTo(this.startX+this.pipeLen+this.widthWaterTower-this.widthWall*2-this.widthWall/2-this.pressureCoefficientAgain+this.pressureCoefficientRestart,this.startY+this.heightWaterTower-this.widthWall);
        this.ctx.closePath();
        this.ctx.fill();
    }
}
function bright(color,coefficientOfBright)
{
    const hexCode = color.slice(1);
    const red = parseInt(hexCode.substring(0, 2), 16);
    const green = parseInt(hexCode.substring(2, 4), 16);
    const blue = parseInt(hexCode.substring(4, 6), 16);
    const darkenedRed = Math.max(red - coefficientOfBright, 0);
    const darkenedGreen = Math.max(green - coefficientOfBright, 0);
    const darkenedBlue = Math.max(blue - coefficientOfBright, 0);
    const darkenedHexCode = `#${darkenedRed.toString(16).padStart(2, "0")}${darkenedGreen.toString(16).padStart(2, "0")}${darkenedBlue.toString(16).padStart(2, "0")}`;
    return darkenedHexCode;
}
