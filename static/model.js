function draw (ctx,canvas,barrier,waterTower,pipe,bucket)
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    barrier.startY += barrier.speedOnYAxis;
    barrier.draw();
    waterTower.draw();
    pipe.draw();
    bucket.draw();
    bucket.filledBucketHeight = 0; // Начальная заполненность ведра = 0
    pipe.fieldPipe = 0; // Начальная заполненность трубы = 0
    function drawBucket(){
        ctx.clearRect(bucket.startX, bucket.startY + bucket.heightBucket - bucket.filledBucketHeight, bucket.widthBucket-bucket.bucketWallWidth*2, bucket.filledBucketHeight-bucket.bucketWallWidth);

        bucket.draw();
        if (bucket.filledBucketHeight < bucket.heightBucket) // Проверка на заполненность ведра
        {
            window.requestAnimationFrame(drawBucket);
        }
        bucket.filledBucketHeight += 1;
}
    function drawPipe(){ //анимация воды
        ctx.clearRect(pipe.startX+pipe.widthWaterTower-pipe.widthWall, pipe.startY+pipe.heightWaterTower-pipe.heightPipe+pipe.widthWall,pipe.pipeLen+pipe.widthWall, pipe.heightPipe-pipe.widthWall*2);
        pipe.draw();
        if (pipe.fieldPipe < pipe.pipeLen+pipe.widthWall) // Проверка на заполненность трубы
        {
            window.requestAnimationFrame(drawPipe);
        }
        pipe.fieldPipe += 1;
    }
    drawBucket();
    drawPipe();
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
    bucket.draw();

    draw(ctx,canvas,barrier,waterTower,pipe,bucket);
}
