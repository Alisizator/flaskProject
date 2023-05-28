function draw (ctx,canvas,barrier,waterTower,pipe,bucket)
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    barrier.startY += barrier.speedOnYAxis;
    barrier.draw();
    waterTower.draw();
    pipe.draw();
    bucket.draw();

    // Check if the animation is complete
    if (bucket.filledBucketHeight < bucket.heightBucket)
    {
        bucket.filledBucketHeight += 1;
    }
    window.requestAnimationFrame(draw);

}

function prepareScene()
{

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let widthWall = parseFloat(document.getElementById("widthWall").value);
    let widthWaterTower = parseFloat(document.getElementById("widthWaterTower").value);
    let heightWaterTower = parseFloat(document.getElementById("heightWaterTower").value);
    let pipeLen = parseFloat(document.getElementById("pipeLen").value);
    let heightPipe = parseFloat(document.getElementById("heightPipe").value);
    let widthBucket = parseFloat(document.getElementById("widthBucket").value);
    let heightBucket = parseFloat(document.getElementById("heightBucket").value);
    let bucketWallWidth = parseFloat(document.getElementById("bucketWallWidth").value);
    let widthBarrier = widthWall;
    let heightBarrier = heightPipe+widthWall*2;
    let startX = 5;
    let startY = 5;
    let startBucketX = 30+pipeLen+widthWaterTower;
    let startBucketY = 30+heightWaterTower;
    let startYBarrier = startY+heightWaterTower-heightPipe*2-widthWall;
    let startXBarrier = startX+pipeLen+widthWaterTower;

    let waterTower = new WaterTowerClass(ctx, startX, startY, widthWall, widthWaterTower, heightWaterTower);
    let pipe = new Pipe(ctx, startX, startY, widthWall, pipeLen, heightPipe, widthWaterTower, heightWaterTower);
    let bucket = new Bucket(ctx, startBucketX, startBucketY, widthBucket, heightBucket, bucketWallWidth)
    let barrier = new Barrier(ctx,startXBarrier, startYBarrier,widthBarrier,heightBarrier);
    barrier.draw();
    waterTower.draw();
    pipe.draw();
    bucket.filledBucketHeight = 20;
    bucket.draw();

    //draw(ctx,canvas,barrier,waterTower,pipe,bucket);
}
