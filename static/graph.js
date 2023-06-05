function graph() {
    const canvas = document.getElementById("canvas2");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.lineWidth = 1;
    let widthWall = parseFloat(document.getElementById("widthWall").value);//толщина стенок, 0,5-6мм
    let widthWaterTower = 10;
    let heightWaterTower = parseFloat(document.getElementById("heightWaterTower").value); //высота башни 5-15м
    let pipeLen = parseFloat(document.getElementById("pipeLen").value);//длина трубы
    if (pipeLen > 11 && pipeLen<23)
        pipeLen = 10;
    let heightPipe = parseFloat(document.getElementById("heightPipe").value); //диаметр трубы
    let bucketVolume = parseFloat(document.getElementById("bucketVolume").value); //Объем ведра трубы
    let colorLiquid;
    const liquid = document.getElementById('liquid');
    const metal = document.getElementById('metal');
    let density = 0;
    let elastic_modulus_of_liquid = 0;
    if (liquid.value === 'water') {
        density = 1000;
        elastic_modulus_of_liquid = 2000;
        colorLiquid = "#8ebae8";
    } else if (liquid.value === 'oil') {
        density = 875;
        elastic_modulus_of_liquid = 1450;
        colorLiquid = "#ffff81";
    }
    let pressure = (heightWaterTower * density * 9.8)/100000; //P0 в барах
    let elastic_modulus_of_metal = 0;
    let colorMetal;
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

    let waterSpeed = Math.sqrt(2 * 9.806 * heightWaterTower);
    let flowSpeed = (waterSpeed * Math.PI * (heightPipe ** 2)) / 4000;
    let bucketTimeOfFilling = bucketVolume / flowSpeed;

    let a = (1 / (Math.sqrt(density * ((heightPipe / (elastic_modulus_of_metal * widthWall)) + (1 / elastic_modulus_of_liquid)))))*1000; //speed
    let Increment = (density * waterSpeed * a)/100000; //delta P в барах
    let param = 4000*((4*pipeLen)/a);
    if (param > 300)
        param = 150;
////////////////////////////////////////////////
    // Получаем ширину и высоту холста

    const xAxis = canvas.width;
    const yAxis = canvas.height;


    // Горизонтальные
    ctx.beginPath();
    ctx.strokeStyle = "black";
    for(let i = 0;i < xAxis;i = i + param)
    {
        ctx.moveTo(i, 0);
        ctx.lineTo(i,yAxis);
    }
    ctx.stroke();

    ctx.translate(0, yAxis / 2);
    ctx.beginPath();
    ctx.strokeStyle = "black";
    for(let i = 0;i < yAxis;i = i + Increment)
    {
        ctx.moveTo(0, i);
        ctx.lineTo(xAxis,i);
    }
    for(let i = 0;i > -yAxis;i = i - Increment)
    {
        ctx.moveTo(0, i);
        ctx.lineTo(xAxis,i);
    }
    ctx.stroke();

    // Рисуем координатные оси
    ctx.beginPath();
    ctx.moveTo(-xAxis, 0);
    ctx.lineTo(xAxis, 0);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(0, -yAxis);
    ctx.lineTo(0, yAxis);
    ctx.stroke();
    ctx.closePath();

    ctx.font = "30px Times New Roman";
    ctx.textAlign = "left";
    ctx.fillText("t (c)",0,25);
    ctx.closePath();
    for (let step = 0;step < 12;step++){
        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.moveTo(param*step,0);
        ctx.lineTo(param*(0.05+step),-(Increment-(Increment*step/12)-pressure)*1.1);
        ctx.lineTo(param*(0.1+step),-(Increment-(Increment*step/12)-pressure));
        ctx.lineTo(param*(0.45+step), -(Increment-(Increment*step/12)-pressure));
        ctx.lineTo(param*(0.5+step), 0);
        ctx.lineTo(param*(0.55+step),(Increment-(Increment*step/12)-pressure)*1.1);
        ctx.lineTo(param*(0.6+step),(Increment-(Increment*step/12)-pressure));
        ctx.lineTo(param*(0.95+step),(Increment-(Increment*step/12)-pressure));
        ctx.lineTo(param*(1+step),0);
        ctx.stroke();
    }

    ctx.font = "30px Times New Roman";
    ctx.textAlign = "left";
    ctx.fillText("ΔP (бар)",0,-Increment-15);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
}