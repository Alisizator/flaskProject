function graph() {
    const canvas = document.getElementById("canvas2");
    const ctx = canvas.getContext("2d");
    let widthWall = parseFloat(document.getElementById("widthWall").value);//толщина стенок, 0,5-6мм
    let widthWaterTower = 10;
    let heightWaterTower = parseFloat(document.getElementById("heightWaterTower").value); //высота башни 5-15м
    let pipeLen = parseFloat(document.getElementById("pipeLen").value); //длина трубы
    let heightPipe = parseFloat(document.getElementById("heightPipe").value); //диаметр трубы
    let bucketVolume = parseFloat(document.getElementById("bucketVolume").value); //Объем ведра трубы

    const liquid = document.getElementById('liquid');
    const metal = document.getElementById('metal');
    let density = 0;
    let elastic_modulus_of_liquid = 0;
    if (liquid.value === 'water') {
        density = 1000;
        elastic_modulus_of_liquid = 20300;
    } else if (liquid.value === 'oil') {
        density = 1000;
        elastic_modulus_of_liquid = 20300;
    }
    let pressure = heightWaterTower * density * 9.806; //P0
    let elastic_modulus_of_metal = 0;
    if (metal.value === 'copper')
        elastic_modulus_of_metal = 1020000;
    else if (metal.value === 'aluminium')
        elastic_modulus_of_metal = 713800;
    else if (metal.value === 'steel')
        elastic_modulus_of_metal = 2039400;

    let waterSpeed = Math.sqrt(2 * 9.806 * heightWaterTower);
    let flowSpeed = (waterSpeed * Math.PI * (heightPipe ** 2)) / 4;
    let bucketTimeOfFilling = bucketVolume / flowSpeed;

    let a = (1 / (Math.sqrt(density * ((heightPipe / (elastic_modulus_of_metal * widthWall)) + (1 / elastic_modulus_of_liquid))))); //speed
    let Increment = density * waterSpeed * (1 / (Math.sqrt(density * ((heightPipe / (elastic_modulus_of_metal * widthWall)) + (1 / elastic_modulus_of_liquid))))) //delta P

////////////////////////////////////////////////
    const canvasHeight = canvas.clientHeight;
    const canvasWidth = canvas.clientWidth;

    const scaleX = 50;
    const scaleY = 50;
    ctx.beginPath();
    ctx.strokeStyle = "#f5f0e8";
    for(let i = 0; i <= canvasWidth; i = i+scaleX)
    {
        ctx.moveTo(i,0);
        ctx.lineTo(i, canvasHeight);
    }
    for(let i = 0; i <= canvasHeight; i = i+scaleY)
    {
        ctx.moveTo(0,i);
        ctx.lineTo(canvasWidth, i);
    }
    ctx.stroke();
    ctx.closePath();
    /*
    var x = 0;
    var timer;
    drawSin();

    function drawSin()
    {
        y=100+30*Math.sin(x);
        if (x>=400)
            x=0;
        else
            x=x+0.3;
        ctx.fillRect(5*x,y,2,2);
        timer = setTimeout(drawSin,50)
    }*/
    const xAxis = canvasWidth / 2;
    const yAxis = canvasHeight / 2;

    ctx.beginPath();
    ctx.strokeStyle = 'blue';
    ctx.moveTo(0,0);
    ctx.lineTo(0,canvasHeight);
    ctx.moveTo(0,yAxis);
    ctx.lineTo(canvasWidth,yAxis);
    ctx.stroke();
    ctx.closePath();

    //start
    for (let step = 0;step < 12;step++){
    ctx.beginPath();
    ctx.strokeStyle = "blue";
    ctx.moveTo(0+100*step,yAxis);
    ctx.lineTo(15+100*step,(Increment/1000-15+step/3)+(Increment/1000-15)*(2*step/12));
    ctx.lineTo(20+100*step,(Increment/1000)+(Increment/1000-15)*(2*step/12));
    ctx.lineTo(40+100*step,(Increment/1000)+(Increment/1000-15)*(2*step/12));
    ctx.lineTo(50+100*step,yAxis);
    ctx.lineTo(60+100*step,(250-Increment/1000)-(Increment/1000-15)*(2*step/12));
    ctx.lineTo(80+100*step,(250-Increment/1000)-(Increment/1000-15)*(2*step/12));
    ctx.lineTo(85+100*step,(250-Increment/1000+15-step/3)-(Increment/1000-15)*(2*step/12));
    ctx.lineTo(100+100*step,yAxis);
    ctx.stroke();
    ctx.closePath();
    }

}