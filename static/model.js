function draw (ctx,canvas,barrier,waterTower,pipe,bucket,waterSpeed,chek)
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
        if(barrier.startY < barrier.position+pipe.heightPipe-pipe.widthWall)
            window.requestAnimationFrame(drawBarrier);
        barrier.startY += barrier.speedOnYAxis;
        if(barrier.startY === barrier.position+pipe.heightPipe-pipe.widthWall || barrier.startY > barrier.position+pipe.heightPipe-pipe.widthWall)
            //drawDefPipe();
            drawPipePressure();
    }
    function drawPipePressure()
    {
        //ctx.clearRect(pipe.startX+pipe.widthWaterTower-pipe.widthWall, pipe.startY+pipe.heightWaterTower-pipe.heightPipe+pipe.widthWall,pipe.pipeLen+pipe.widthWall, pipe.heightPipe-pipe.widthWall*2);
        pipe.drawPipePressure();
        if (pipe.startX+pipe.pipeLen+pipe.widthWaterTower-pipe.widthWall*2-pipe.widthWall/2-pipe.pressureCoefficient > pipe.widthWaterTower+pipe.startX+0.3) // Проверка на заполненность трубы
        {
            window.requestAnimationFrame(drawPipePressure);
        }
        else
        {
            drawGraphOnce();
            drawPipePressureBack();
        }
        pipe.pressureCoefficient += 0.1;
    }
    function drawPipePressureBack()
    {
        pipe.drawPipePressureBack();
        ctx.clearRect(barrier.startX,0,canvas.width,canvas.height);
        barrier.draw();
        bucket.draw();

        if (pipe.pressureCoefficientBack < pipe.pipeLen) // Проверка на заполненность трубы
        {
            window.requestAnimationFrame(drawPipePressureBack);
            pipe.pressureCoefficientBack += 0.1;
        }
        if (pipe.pressureCoefficientBack === pipe.pipeLen || pipe.pressureCoefficientBack > pipe.pipeLen)
        {
            drawGraphTwice();
            drawPipePressureAgain();
        }
    }
    function drawPipePressureAgain()
    {
        pipe.drawPipePressureAgain();
        if (pipe.pressureCoefficientAgain < pipe.pressureCoefficient) // Проверка на заполненность трубы
        {
            window.requestAnimationFrame(drawPipePressureAgain);
            pipe.pressureCoefficientAgain += 0.1;
        }

        if (pipe.pressureCoefficientAgain === pipe.pressureCoefficient || pipe.pressureCoefficientAgain > pipe.pressureCoefficient)
        {
            drawPipePressureRestart();
        }
    }
    function drawPipePressureRestart()
    {
        pipe.drawPipePressureRestart();
        ctx.clearRect(barrier.startX,0,canvas.width,canvas.height);
        drawGraphThird();
        barrier.draw();
        bucket.draw();
        if (pipe.pressureCoefficientRestart < pipe.pipeLen) // Проверка на заполненность трубы
        {

            window.requestAnimationFrame(drawPipePressureRestart);

        }
        pipe.pressureCoefficientRestart += 0.1;
        if (pipe.fieldPipe === pipe.pipeLen || pipe.fieldPipe > pipe.pipeLen)
        {
            setTimeout(drawGraphQuad,1800*(pipe.pipeLen/100));
        }
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
function drawGraphOnce() {
    //lol

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    let widthWall = parseFloat(document.getElementById("widthWall").value) * 20;//толщина стенок, 0,5-6мм
    let widthWallTrue = widthWall / 20;
    let heightWaterTower = parseFloat(document.getElementById("heightWaterTower").value) * 50; //высота башни 5-15м
    let heightWaterTowerTrue = heightWaterTower / 50;
    let pipeLen = parseFloat(document.getElementById("pipeLen").value) * 10; //длина трубы
    let heightPipe = parseFloat(document.getElementById("heightPipe").value) * 5; //диаметр трубы

    const liquid = document.getElementById('liquid');
    const metal = document.getElementById('metal');
    let density = 0;
    let elastic_modulus_of_liquid = 0;
    if (liquid.value === 'water') {
        density = 1000;
        elastic_modulus_of_liquid = 2000;
    } else if (liquid.value === 'oil') {
        density = 875;
        elastic_modulus_of_liquid = 1450;
    }
    let pressure = (heightWaterTowerTrue * density * 9.806)/100000; //P0
    let elastic_modulus_of_metal = 0;
    if (metal.value === 'copper') {
        elastic_modulus_of_metal = 100000;
    } else if (metal.value === 'aluminium') {
        elastic_modulus_of_metal = 70000;
    } else if (metal.value === 'steel') {
        elastic_modulus_of_metal = 200000;
    }
    const startX = 5;
    let waterSpeed = Math.sqrt(2 * 9.806 * heightWaterTowerTrue);
    let a = (1 / (Math.sqrt(density * ((heightPipe / (elastic_modulus_of_metal * widthWallTrue)) + (1 / elastic_modulus_of_liquid))))) * 1000; //speed
    let param = 4000 * ((4 * pipeLen) / a);
    {
        if (param > 300)
            param = 150;
    }
    let Increment = (density * waterSpeed * a) / 100000; //delta P в барах
    const xAxis = canvas.width;
    const yAxis = canvas.height;
    ctx.translate(startX+200, yAxis - Increment-10);

        ctx.beginPath();
        ctx.strokeStyle = "blue";
        ctx.moveTo(0, 0);
        ctx.lineTo(param * (0.05), -(Increment - pressure) * 1.1);
        ctx.lineTo(param * (0.1), -(Increment - pressure));
        ctx.stroke();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
}
function drawGraphTwice() {
    //lol

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    let widthWall = parseFloat(document.getElementById("widthWall").value) * 20;//толщина стенок, 0,5-6мм
    let widthWallTrue = widthWall / 20;
    let heightWaterTower = parseFloat(document.getElementById("heightWaterTower").value) * 50; //высота башни 5-15м
    let heightWaterTowerTrue = heightWaterTower / 50;
    let pipeLen = parseFloat(document.getElementById("pipeLen").value) * 10; //длина трубы
    let heightPipe = parseFloat(document.getElementById("heightPipe").value) * 5; //диаметр трубы

    const liquid = document.getElementById('liquid');
    const metal = document.getElementById('metal');
    let density = 0;
    let elastic_modulus_of_liquid = 0;
    if (liquid.value === 'water') {
        density = 1000;
        elastic_modulus_of_liquid = 2000;
    } else if (liquid.value === 'oil') {
        density = 875;
        elastic_modulus_of_liquid = 1450;
    }
    let pressure = (heightWaterTowerTrue * density * 9.806)/100000; //P0
    let elastic_modulus_of_metal = 0;
    if (metal.value === 'copper') {
        elastic_modulus_of_metal = 100000;
    } else if (metal.value === 'aluminium') {
        elastic_modulus_of_metal = 70000;
    } else if (metal.value === 'steel') {
        elastic_modulus_of_metal = 200000;
    }
    const startX = 5;
    let waterSpeed = Math.sqrt(2 * 9.806 * heightWaterTowerTrue);
    let a = (1 / (Math.sqrt(density * ((heightPipe / (elastic_modulus_of_metal * widthWallTrue)) + (1 / elastic_modulus_of_liquid))))) * 1000; //speed
    let param = 4000 * ((4 * pipeLen) / a);
    {
        if (param > 300)
            param = 150;
    }
    let Increment = (density * waterSpeed * a) / 100000; //delta P в барах
    const xAxis = canvas.width;
    const yAxis = canvas.height;
    ctx.translate(startX+200, yAxis - Increment-10);

        ctx.beginPath();
        ctx.strokeStyle = "blue";
        ctx.moveTo(0, 0);
        ctx.lineTo(param * (0.05), -(Increment - pressure) * 1.1);
        ctx.lineTo(param * (0.1), -(Increment - pressure));
        ctx.lineTo(param * (0.45), -(Increment - pressure));
        ctx.lineTo(param * (0.5), 0);
        ctx.stroke();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
}
function drawGraphThird() {
    //lol

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    let widthWall = parseFloat(document.getElementById("widthWall").value) * 20;//толщина стенок, 0,5-6мм
    let widthWallTrue = widthWall / 20;
    let heightWaterTower = parseFloat(document.getElementById("heightWaterTower").value) * 50; //высота башни 5-15м
    let heightWaterTowerTrue = heightWaterTower / 50;
    let pipeLen = parseFloat(document.getElementById("pipeLen").value) * 10; //длина трубы
    let heightPipe = parseFloat(document.getElementById("heightPipe").value) * 5; //диаметр трубы

    const liquid = document.getElementById('liquid');
    const metal = document.getElementById('metal');
    let density = 0;
    let elastic_modulus_of_liquid = 0;
    if (liquid.value === 'water') {
        density = 1000;
        elastic_modulus_of_liquid = 2000;
    } else if (liquid.value === 'oil') {
        density = 875;
        elastic_modulus_of_liquid = 1450;
    }
    let pressure = (heightWaterTowerTrue * density * 9.806)/100000; //P0
    let elastic_modulus_of_metal = 0;
    if (metal.value === 'copper') {
        elastic_modulus_of_metal = 100000;
    } else if (metal.value === 'aluminium') {
        elastic_modulus_of_metal = 70000;
    } else if (metal.value === 'steel') {
        elastic_modulus_of_metal = 200000;
    }
    const startX = 5;
    let waterSpeed = Math.sqrt(2 * 9.806 * heightWaterTowerTrue);
    let a = (1 / (Math.sqrt(density * ((heightPipe / (elastic_modulus_of_metal * widthWallTrue)) + (1 / elastic_modulus_of_liquid))))) * 1000; //speed
    let param = 4000 * ((4 * pipeLen) / a);
    {
        if (param > 300)
            param = 150;
    }
    let Increment = (density * waterSpeed * a) / 100000; //delta P в барах
    const xAxis = canvas.width;
    const yAxis = canvas.height;
    ctx.translate(startX+200, yAxis - Increment-10);

        ctx.beginPath();
        ctx.strokeStyle = "blue";
        ctx.moveTo(0, 0);
        ctx.lineTo(param * (0.05), -(Increment - pressure) * 1.1);
        ctx.lineTo(param * (0.1), -(Increment - pressure));
        ctx.lineTo(param * (0.45), -(Increment - pressure));
        ctx.lineTo(param * (0.5), 0);
        ctx.lineTo(param * (0.55), (Increment - pressure) * 1.1);
        ctx.lineTo(param * (0.6), (Increment - pressure));
        ctx.stroke();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
}
function drawGraphQuad() {
    //lol

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    let widthWall = parseFloat(document.getElementById("widthWall").value) * 20;//толщина стенок, 0,5-6мм
    let widthWallTrue = widthWall / 20;
    let heightWaterTower = parseFloat(document.getElementById("heightWaterTower").value) * 50; //высота башни 5-15м
    let heightWaterTowerTrue = heightWaterTower / 50;
    let pipeLen = parseFloat(document.getElementById("pipeLen").value) * 10; //длина трубы
    let heightPipe = parseFloat(document.getElementById("heightPipe").value) * 5; //диаметр трубы

    const liquid = document.getElementById('liquid');
    const metal = document.getElementById('metal');
    let density = 0;
    let elastic_modulus_of_liquid = 0;
    if (liquid.value === 'water') {
        density = 1000;
        elastic_modulus_of_liquid = 2000;
    } else if (liquid.value === 'oil') {
        density = 875;
        elastic_modulus_of_liquid = 1450;
    }
    let pressure = (heightWaterTowerTrue * density * 9.806)/100000; //P0
    let elastic_modulus_of_metal = 0;
    if (metal.value === 'copper') {
        elastic_modulus_of_metal = 100000;
    } else if (metal.value === 'aluminium') {
        elastic_modulus_of_metal = 70000;
    } else if (metal.value === 'steel') {
        elastic_modulus_of_metal = 200000;
    }
    const startX = 5;
    let waterSpeed = Math.sqrt(2 * 9.806 * heightWaterTowerTrue);
    let a = (1 / (Math.sqrt(density * ((heightPipe / (elastic_modulus_of_metal * widthWallTrue)) + (1 / elastic_modulus_of_liquid))))) * 1000; //speed
    let param = 4000 * ((4 * pipeLen) / a);
    {
        if (param > 300)
            param = 150;
    }
    let Increment = (density * waterSpeed * a) / 100000; //delta P в барах
    const xAxis = canvas.width;
    const yAxis = canvas.height;
    ctx.translate(startX+200, yAxis - Increment-10);

        ctx.beginPath();
        ctx.strokeStyle = "blue";
        ctx.moveTo(0, 0);
        ctx.lineTo(param * (0.05), -(Increment - pressure) * 1.1);
        ctx.lineTo(param * (0.1), -(Increment - pressure));
        ctx.lineTo(param * (0.45), -(Increment - pressure));
        ctx.lineTo(param * (0.5), 0);
        ctx.lineTo(param * (0.55), (Increment - pressure) * 1.1);
        ctx.lineTo(param * (0.6), (Increment - pressure));
        ctx.lineTo(param * (0.95), (Increment - pressure));
        ctx.lineTo(param * (1), 0);
        ctx.stroke();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
}
function prepareScene()
{
    let chek = 0;
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let widthWall = parseFloat(document.getElementById("widthWall").value)*20;//толщина стенок, 0,5-6мм
    let widthWallTrue = widthWall/20;
    if (widthWall>=20)
        widthWall = widthWallTrue*2;
    let widthWaterTower = 160; //ширина башни = 10м
    let widthWaterTowerTrue = 10; //ширина башни = 10м
    let heightWaterTower = parseFloat(document.getElementById("heightWaterTower").value)*50; //высота башни 5-15м
    let heightWaterTowerTrue = heightWaterTower/50;
    heightWaterTower = 7*50;
    let pipeLen = parseFloat(document.getElementById("pipeLen").value)*10; //длина трубы
    let pipeLenTrue = pipeLen/10;
    let heightPipe = parseFloat(document.getElementById("heightPipe").value)*5; //диаметр трубы
    let heightPipeTrue = heightPipe/5
    let bucketVolume = parseFloat(document.getElementById("bucketVolume").value); //Объем ведра трубы
    let widthBucket = 80;
    let heightBucket = 100;
    let bucketWallWidth = 5;
    let widthBarrier = widthWall;
    let heightBarrier = heightPipe+widthWall*6;
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
    let colorLiquid;
    let colorMetal;
    if (liquid.value === 'water') {
        density = 1000;
        elastic_modulus_of_liquid = 2000;
        colorLiquid = "#8ebae8";
    } else if (liquid.value === 'oil') {
        density = 875;
        elastic_modulus_of_liquid = 1450;
        colorLiquid = "#ffff81";
    }
    let pressure = heightWaterTowerTrue * density * 9.806; //P0
    let elastic_modulus_of_metal = 0;
    if (metal.value === 'copper') {
        elastic_modulus_of_metal = 100000;
        colorMetal = "#b87333";
    }
    else if (metal.value === 'aluminium') {
        elastic_modulus_of_metal = 70000;
        colorMetal = "#a5a5a5";
    }
    else if (metal.value === 'steel') {
        elastic_modulus_of_metal = 200000;
        colorMetal = "#738595";
    }

    let waterSpeed = Math.sqrt(2*9.806*heightWaterTowerTrue);
    let flowSpeed = (waterSpeed*Math.PI*(heightPipeTrue**2))/4000;
    let bucketTimeOfFilling = bucketVolume/flowSpeed;
    let a = (1 / (Math.sqrt(density * ((heightPipe / (elastic_modulus_of_metal * widthWall)) + (1 / elastic_modulus_of_liquid)))))*1000; //speed
    let param = 4000*((4*pipeLen)/a);
    {
        if (param > 300)
        param = 150;
    }
    let Increment = (density * waterSpeed * a)/100000; //delta P в барах


    document.getElementById("myInput").value = bucketTimeOfFilling;
    let Part = density*waterSpeed*(1/(Math.sqrt(density*((heightPipeTrue/(elastic_modulus_of_metal*widthWallTrue))+(1/elastic_modulus_of_liquid))))) //delta P
    let absolute = pressure*((heightPipeTrue**2)/(4*elastic_modulus_of_metal*widthWallTrue)) //delta R
    let absoluteFake = pressure*((heightPipe**2)/(4*elastic_modulus_of_metal*widthWall)) //delta R

    let waterTower = new WaterTowerClass(ctx, startX, startY, widthWall, widthWaterTower, heightWaterTower,colorMetal,colorLiquid);
    let pipe = new Pipe(ctx, startX, startY, widthWall, pipeLen, heightPipe, widthWaterTower, heightWaterTower,absoluteFake,colorMetal,colorLiquid);
    let bucket = new Bucket(ctx, startBucketX, startBucketY, widthBucket, heightBucket, bucketWallWidth,colorLiquid)
    let barrier = new Barrier(ctx,startXBarrier, startYBarrier,widthBarrier,heightBarrier);
    draw(ctx,canvas,barrier,waterTower,pipe,bucket,waterSpeed,chek);
}
