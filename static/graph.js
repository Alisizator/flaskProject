class DrawMainPage {

    constructor(ctx, canvas, scaleFactor) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.scaleFactor = scaleFactor;
        this.xAxis = (this.canvas.width + this.canvas.width) * this.scaleFactor;
        this.yAxis = (this.canvas.height + this.canvas.height) * this.scaleFactor;
      }

    // drawVerticalLines() {
    //     this.ctx.strokeStyle = "black";
    //     this.ctx.fillStyle = "black";  // Set text color
    //     this.ctx.font = "10px Times New Roman";
    //     this.ctx.textAlign = "center";

    //     this.ctx.beginPath();
    //     for (let i = 0; i <= this.xAxis; i += this.param) {
    //         let roundedValue = (i * this.scaleFactor).toFixed(2); // Round to two decimal places

    //         this.ctx.moveTo(roundedValue, 0);
    //         this.ctx.lineTo(roundedValue, this.yAxis * this.scaleFactor);
    //         this.ctx.fillText(roundedValue, roundedValue, 730 * this.scaleFactor * this.scaleFactor); // Use the rounded value for text
    //     }
    //     this.ctx.stroke(); // Moved outside the for loop to only call stroke once
    // }

    drawVerticalLines() {
        this.ctx.strokeStyle = "black";
        this.ctx.fillStyle = "black"; // Set text color
        this.ctx.font = "10px Times New Roman";
        this.ctx.textAlign = "center";

        this.ctx.beginPath();
        for (let i = 0; i <= this.xAxis; i += this.param) {
            let xPosition = i * this.scaleFactor;
            let roundedValue = xPosition.toFixed(2); // Round to two decimal places

            // Draw vertical line
            this.ctx.moveTo(xPosition, 0);
            this.ctx.lineTo(xPosition, this.yAxis);

            // Draw text with rotation for better visibility
            this.ctx.save();
            this.ctx.translate(xPosition, 830 * this.scaleFactor);
            this.ctx.rotate(-Math.PI / 4); // Rotate text by -45 degrees
            this.ctx.fillText(roundedValue, 0, 0);
            this.ctx.restore(); // Restore canvas state
        }
        this.ctx.stroke(); // Apply all line drawing
    }


    drawXAxis(lineWidth) {
        let lineWidthBefore = this.ctx.lineWidth;
        this.ctx.beginPath();
        this.ctx.lineWidth = lineWidth
        this.ctx.moveTo(this.scaleFactor*this.param, 0);
        this.ctx.lineTo(this.scaleFactor * this.xAxis, 0);
        this.ctx.stroke();
        this.ctx.lineWidth = lineWidthBefore;
    }


    // drawHorizontalLines() {
    //     this.ctx.strokeStyle = "black";

    //     this.drawXAxis(3)

    //     this.ctx.beginPath();
    //     for (let i = 0; i < this.yAxis; i = i + this.deltaPValue) {
    //         this.ctx.moveTo(0, i * this.scaleFactor);
    //         this.ctx.lineTo(this.scaleFactor * this.xAxis, i * this.scaleFactor);
    //     }

    //     for (let i = 0; i > - this.yAxis; i = i - this.deltaPValue) {
    //         this.ctx.moveTo(0, this.scaleFactor * i);
    //         this.ctx.lineTo(this.scaleFactor * this.xAxis, this.scaleFactor * i);
    //     }

    //     this.ctx.stroke();
    // }


    drawHorizontalLines() {
        this.ctx.strokeStyle = "black";

        this.drawXAxis(3);

        this.ctx.beginPath();
        this.ctx.font = "10px Times New Roman"; // Use a smaller font for y-axis labels
        this.ctx.textAlign = "right"; // Align text to the right of the y-axis

        for (let i = 0; i < this.yAxis; i += this.deltaPValue) {
            const yPos = i * this.scaleFactor;
            this.ctx.moveTo(0, yPos);
            this.ctx.lineTo(this.scaleFactor * this.xAxis, yPos);

            // Assuming the left margin has enough space for labels
            // Draw text labels on y-axis with some padding (e.g., 10 pixels from the y-axis)
            if(i == this.deltaPValue) {
                //this.ctx.fillText((i / 1000).toFixed(3), 80, yPos + 10); // Convert to bar (if i is in Pascals) and adjust position if needed
                this.ctx.fillText(-this.trueDeltaPValue.toFixed(3), 80, yPos + 10);
            }
        }

        for (let i = 0; i > -this.yAxis; i -= this.deltaPValue) {
            const yPos = this.scaleFactor * i;
            this.ctx.moveTo(0, yPos);
            this.ctx.lineTo(this.scaleFactor * this.xAxis, yPos);

            // Draw negative values on y-axis
            if(i == -this.deltaPValue) {
                //this.ctx.fillText((-i/1000).toFixed(3), 80, yPos + 10); // Convert to bar and adjust position
                this.ctx.fillText(this.trueDeltaPValue.toFixed(3), 80, yPos + 10);
            }
        }

        this.ctx.stroke();
    }


    drawVisualRepresentation()
    {
        let widthWall = parseFloat(document.getElementById("widthWall").value); //толщина стенок, 0,5-6мм
        let heightWaterTower = parseFloat(document.getElementById("heightWaterTower").value); //высота башни 5-15м
        let pipeLen = parseFloat(document.getElementById("pipeLen").value); //длина трубы
        if (pipeLen > 11 && pipeLen < 23)
            pipeLen = 10;
        let heightPipe = parseFloat(document.getElementById("heightPipe").value); //диаметр трубы

        const liquidElement = document.getElementById('liquid');
        const liquidProperties = new LiquidProperties();
        const liquid = liquidProperties.getProperties(liquidElement.value);

        const metalElement = document.getElementById('metal');
        const metalProperties = new MetalProperties();
        const metal = metalProperties.getProperties(metalElement.value);


        let waterSpeed = Math.sqrt(2 * 9.806 * heightWaterTower);
        console.log(heightWaterTower);
        //this.trueFlowSpeed = 55;//????????????????

        let a = (1 / (Math.sqrt(liquid.density * ((heightPipe / (metal.elasticModulus * widthWall)) + (1 / liquid.elasticModulus))))) * 1000; //speed
        this.trueSpeed = (1 / (Math.sqrt((liquid.density) * (((heightPipe/1000) / ((metal.elasticModulus*1000000) * (widthWall/1000))) + (1 / (liquid.elasticModulus*1000000)))))); //TrueSpeedValue
        console.log(liquid.density);
        this.deltaPValue = (liquid.density * waterSpeed * a) / 100000; //delta P в барах
        this.trueDeltaPValue = ((liquid.density*1000) * waterSpeed * this.trueSpeed) / 100000000; //deltaP, ГПа

        console.log(waterSpeed);
        console.log(this.trueDeltaPValue);
        //console.log(this.waterSpeed);

        this.initialPressureValue = (heightWaterTower * liquid.density * 9.8) / 100000; //P0 в барах
        this.trueInitialPressureValue = ((heightWaterTower/1000) * (liquid.density*1000) * 9.8) / 100000000; //P0, ГПа

        this.param = 4000 * ((4 * pipeLen) / a);
        this.trueParam = ((4 * pipeLen) / this.trueSpeed);
        if (this.param > 300) {
            this.param = 150;
        }
    }

    drawGraph() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.lineWidth = 1;
        this.drawVerticalLines();
        //Перенос центра
        this.ctx.translate(0, this.yAxis * this.scaleFactor / 2);
        this.drawHorizontalLines();

        this.ctx.font = "30px Times New Roman";
        this.ctx.textAlign = "left";
        this.ctx.fillText("t (c)", 0, 25);
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.strokeStyle = "red";
        this.ctx.lineWidth = 2;


        for (let step = 0; step < 12; step++) {

            this.ctx.moveTo(this.scaleFactor * this.param * (step + 1), 0);
            //console.log("93 moveTo x y");
            ////console.log(this.scaleFactor * this.param * step, 0);

            this.ctx.lineTo(this.scaleFactor * this.param * (1.05 + step), this.scaleFactor * -(this.deltaPValue - (this.deltaPValue * step / 12) - this.initialPressureValue) * 1.1);
            //console.log("96 lineTo x y");
            //console.log(this.scaleFactor * this.param * (0.05 + step), this.scaleFactor * -(this.deltaPValue - (this.deltaPValue * step / 12) - this.initialPressureValue) * 1.1);

            this.ctx.lineTo(this.scaleFactor * this.param * (1.1 + step), this.scaleFactor * -(this.deltaPValue - (this.deltaPValue * step / 12) - this.initialPressureValue));
            //console.log("99 lineTo x y");
            //console.log(this.scaleFactor * this.param * (0.1 + step), this.scaleFactor * -(this.deltaPValue - (this.deltaPValue * step / 12) - this.initialPressureValue));

            this.ctx.lineTo(this.scaleFactor * this.param * (1.45 + step), this.scaleFactor * -(this.deltaPValue - (this.deltaPValue * step / 12) - this.initialPressureValue));
            //console.log("102 lineTo x y");
            //console.log(this.scaleFactor * this.param * (0.45 + step), this.scaleFactor * -(this.deltaPValue - (this.deltaPValue * step / 12) - this.initialPressureValue));

            this.ctx.lineTo(this.scaleFactor * this.param * (1.5 + step), 0);
            //console.log("105 lineTo x y");
            //console.log(this.scaleFactor * this.param * (0.5 + step), 0);

            this.ctx.lineTo(this.scaleFactor * this.param * (1.55 + step), this.scaleFactor * (this.deltaPValue - (this.deltaPValue * step / 12) - this.initialPressureValue) * 1.1);
            //console.log("109 lineTo x y");
            //console.log(this.scaleFactor * this.param * (0.55 + step), this.scaleFactor * (this.deltaPValue - (this.deltaPValue * step / 12) - this.initialPressureValue) * 1.1);

            this.ctx.lineTo(this.scaleFactor * this.param * (1.6 + step), this.scaleFactor * (this.deltaPValue-(this.deltaPValue * step / 12) - this.initialPressureValue));
            //console.log("113 lineTo x y");
            //console.log(this.scaleFactor * this.param * (0.6 + step), this.scaleFactor * (this.deltaPValue-(this.deltaPValue * step / 12) - this.initialPressureValue));

            this.ctx.lineTo(this.scaleFactor * this.param * (1.95 + step), this.scaleFactor * (this.deltaPValue-(this.deltaPValue * step / 12) - this.initialPressureValue));
            //console.log("116 lineTo x y");
            //console.log(this.scaleFactor * this.param * (0.95 + step), this.scaleFactor * (this.deltaPValue-(this.deltaPValue * step / 12) - this.initialPressureValue));

            this.ctx.lineTo(this.scaleFactor * this.param * (2 + step), 0);
            //console.log("120 lineTo x y");
            //console.log(this.scaleFactor * this.param * (1 + step), 0);

        }

        this.ctx.stroke();

        this.ctx.font = "30px Times New Roman";
        this.ctx.textAlign = "left";
        this.ctx.fillText("ΔP (бар)", 0, -200);
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
}


function drawGraphOfRelationTimeToDeltaP() {
    const canvas = document.getElementById("canvas2");
    const ctx = canvas.getContext("2d");
    const sliderValue = document.getElementById('slider').value;

    let scaleFactor = sliderValue;
    let dmp = new DrawMainPage(ctx, canvas, scaleFactor);

    dmp.drawVisualRepresentation();
    dmp.drawGraph();
}
