class Bucket{
    constructor(ctx,startX,startY,widthBucket,heightBucket,bucketWallWidth)
    {        
        this.startX = startX;
        this.startY = startY;
        this.widthBucket = widthBucket;
        this.heightBucket = heightBucket;
        this.bucketWallWidth = bucketWallWidth;
        this.ctx = ctx;

        this.leftUpXPoint = this.startX-this.bucketWallWidth;
        this.leftUpYPoint = this.startY;
        this.rightDownYPoint = this.startY+this.heightBucket+this.bucketWallWidth;
        this.leftDownYPoint = this.startY+this.heightBucket+this.bucketWallWidth

        let r1 = widthBucket/2;
        let r2 = this.rightDownYPoint - this.leftDownYPoint;
        //this.bucketVolume = (1/3) * Math.PI * (r1*r1 + r1-r2 + r2*r2) * this.heightBucket;
        this.filledBucketHeight = 0; //Заполненость ведра
    }
    draw()
    {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(this.leftUpXPoint,this.leftUpYPoint,this.widthBucket,this.heightBucket);
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(this.startX,this.startY,this.widthBucket-this.bucketWallWidth*2,this.heightBucket-this.bucketWallWidth);
        this.ctx.fillStyle = "blue";
        this.ctx.fillRect(this.startX, this.startY + this.heightBucket - this.filledBucketHeight, this.widthBucket-this.bucketWallWidth*2, this.filledBucketHeight-this.bucketWallWidth);
    }
}