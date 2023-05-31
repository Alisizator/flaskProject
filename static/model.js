function draw (ctx,canvas,barrier,waterTower,pipe,bucket,waterSpeed,flowSpeed)
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    barrier.draw();
    waterTower.draw();
    pipe.draw();
    bucket.draw();
    bucket.filledBucketHeight = 0; // Начальная заполненность ведра = 0
    pipe.fieldPipe = 0; // Начальная заполненность трубы = 0
    barrier.position = barrier.startY;

    let absDel = pipe.absoluteFake/12;
    pipe.absoluteFake = absDel;
    let counter = 0;
    function drawPipe()
    { //анимация воды
        ctx.clearRect(pipe.startX+pipe.widthWaterTower-pipe.widthWall, pipe.startY+pipe.heightWaterTower-pipe.heightPipe+pipe.widthWall,pipe.pipeLen+pipe.widthWall, pipe.heightPipe-pipe.widthWall*2);
        pipe.draw();
        if (pipe.fieldPipe < pipe.pipeLen+pipe.widthWall) // Проверка на заполненность трубы
        {
            window.requestAnimationFrame(drawPipe);
        }
        pipe.fieldPipe += waterSpeed/5;
        if (pipe.fieldPipe === pipe.pipeLen + pipe.widthWall || pipe.fieldPipe > pipe.pipeLen + pipe.widthWall)
            drawBucket();
    }
    function drawBarrier()
    {
        ctx.clearRect(barrier.startX, barrier.position, barrier.width, barrier.height);
        barrier.draw()
        if(barrier.startY < barrier.position+pipe.heightPipe+pipe.widthWall)
            window.requestAnimationFrame(drawBarrier);
        barrier.startY += barrier.speedOnYAxis;
        if(barrier.startY === barrier.position+pipe.heightPipe+pipe.widthWall || barrier.startY > barrier.position+pipe.heightPipe+pipe.widthWall)
            drawDefPipe()
    }
    function drawDefPipe()
    {
        ctx.clearRect(pipe.startX+pipe.widthWaterTower, pipe.startY+pipe.heightWaterTower-pipe.heightPipe-pipe.absoluteFake,pipe.pipeLen-pipe.widthWall*2,pipe.absoluteFake);
        ctx.clearRect(pipe.startX+pipe.widthWaterTower, this.startY+this.heightWaterTower,pipe.pipeLen-pipe.widthWall*2,pipe.absoluteFake);
        pipe.drawDefPipe()
        if(counter<12)
            window.requestAnimationFrame(drawDefPipe);
        counter++;
        pipe.absoluteFake += absDel;
    }
    function drawBucket()
    {
        ctx.clearRect(bucket.startX, bucket.startY + bucket.heightBucket - bucket.filledBucketHeight, bucket.widthBucket-bucket.bucketWallWidth*2, bucket.filledBucketHeight-bucket.bucketWallWidth);

        bucket.draw();
        if (bucket.filledBucketHeight < bucket.heightBucket) // Проверка на заполненность ведра
        {
            window.requestAnimationFrame(drawBucket);
        }
        bucket.filledBucketHeight += waterSpeed/10;
        if (bucket.filledBucketHeight === bucket.heightBucket || bucket.filledBucketHeight > bucket.heightBucket)
            drawBarrier();
    }
    drawPipe();
}
function prepareScene()
{
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let widthWall = parseFloat(document.getElementById("widthWall").value)*20;//толщина стенок, 0,5-6мм
    let widthWallTrue = widthWall/20;
    if (widthWall>=20)
        widthWall = widthWallTrue*10;
    let widthWaterTower = 160; //ширина башни = 10м
    let widthWaterTowerTrue = 10; //ширина башни = 10м
    let heightWaterTower = parseFloat(document.getElementById("heightWaterTower").value)*50; //высота башни 5-15м
    let heightWaterTowerTrue = heightWaterTower/50;
    let pipeLen = parseFloat(document.getElementById("pipeLen").value)*10; //длина трубы
    let pipeLenTrue = pipeLen/10;
    let heightPipe = parseFloat(document.getElementById("heightPipe").value)*5; //диаметр трубы
    let heightPipeTrue = heightPipe/5
    let bucketVolume = parseFloat(document.getElementById("bucketVolume").value); //Объем ведра трубы
    let widthBucket = 80;
    let heightBucket = 100;
    let bucketWallWidth = 5;
    let widthBarrier = widthWall;
    let heightBarrier = heightPipe+widthWall*2;
    let startX = 5;
    let startY = 5;
    let startBucketX = 30+pipeLen+widthWaterTower;
    let startBucketY = 30+heightWaterTower;
    let startYBarrier = startY+heightWaterTower-heightPipe*2-widthWall*2;
    let startXBarrier = startX+pipeLen+widthWaterTower;

    const liquid = document.getElementById('liquid');
    const metal =  document.getElementById('metal');
    let density = 0;
    let elastic_modulus_of_liquid = 0;
       if (liquid.value === 'water')
       {
        density = 1000;
        elastic_modulus_of_liquid = 20300;
       }
    else if (liquid.value === 'oil')
    {
        density = 1000;
        elastic_modulus_of_liquid = 20300;
    }
    let pressure = heightWaterTowerTrue * density * 9.806; //P0
    let elastic_modulus_of_metal = 0;
    if (metal.value === 'copper')
        elastic_modulus_of_metal = 1020000;
    else if (metal.value === 'aluminium')
        elastic_modulus_of_metal = 713800;
    else if (metal.value === 'steel')
        elastic_modulus_of_metal = 2039400;

    let waterSpeed = Math.sqrt(2*9.806*heightWaterTowerTrue);
    let flowSpeed = (waterSpeed*Math.PI*(heightPipeTrue**2))/4;
    let bucketTimeOfFilling = bucketVolume/flowSpeed;

    let Part = density*waterSpeed*(1/(Math.sqrt(density*((heightPipeTrue/(elastic_modulus_of_metal*widthWallTrue))+(1/elastic_modulus_of_liquid))))) //delta P
    let absolute = pressure*((heightPipeTrue**2)/(4*elastic_modulus_of_metal*widthWallTrue)) //delta R
    let absoluteFake = pressure*((heightPipe**2)/(4*elastic_modulus_of_metal*widthWall)) //delta R

    let waterTower = new WaterTowerClass(ctx, startX, startY, widthWall, widthWaterTower, heightWaterTower);
    let pipe = new Pipe(ctx, startX, startY, widthWall, pipeLen, heightPipe, widthWaterTower, heightWaterTower,absoluteFake);
    let bucket = new Bucket(ctx, startBucketX, startBucketY, widthBucket, heightBucket, bucketWallWidth)
    let barrier = new Barrier(ctx,startXBarrier, startYBarrier,widthBarrier,heightBarrier);
    draw(ctx,canvas,barrier,waterTower,pipe,bucket,waterSpeed,flowSpeed);
}