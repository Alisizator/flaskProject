class DrawMainPage {

    constructor(ctx, canvas, k) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.k = k;
        this.xAxis = this.canvas.width + this.canvas.width * this.k;
        this.yAxis = this.canvas.height + this.canvas.height * this.k;
      }

    draw_Vertical_Lines() {
        this.ctx.strokeStyle = "black";
        this.ctx.fillStyle = "black";  // Set text color
        this.ctx.font = "10px Times New Roman";
        this.ctx.textAlign = "center";
        
        this.ctx.beginPath();
        for (let i = 0; i <= this.xAxis; i += this.param) {
          this.ctx.moveTo(i * this.k, 0);
          this.ctx.lineTo(i * this.k, this.k * this.yAxis);
      
          // Label the line with its x-coordinate value
          this.ctx.fillText(i.toString(), i * this.k, this.k * (this.yAxis - 1));  // Adjusted vertical position
        }
      
        this.ctx.stroke();
    }
      
    draw_Horizontal_Lines() {
        this.ctx.strokeStyle = "black";
        
        this.ctx.beginPath();
        for (let i = 0; i < this.yAxis; i = i + this.increment) {
            this.ctx.moveTo(0, i * this.k);
            this.ctx.lineTo(this.k * this.xAxis, i * this.k);
        }
        for (let i = 0; i > - this.yAxis; i = i - this.increment) {
            this.ctx.moveTo(0, this.k * i);
            this.ctx.lineTo(this.k * this.xAxis, this.k * i);
        }
        this.ctx.stroke();
    }
      
    drawVisualRepresentation() 
    {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.lineWidth = 1;
        let widthWall = parseFloat(document.getElementById("widthWall").value);//толщина стенок, 0,5-6мм
        let heightWaterTower = parseFloat(document.getElementById("heightWaterTower").value); //высота башни 5-15м
        let pipeLen = parseFloat(document.getElementById("pipeLen").value);//длина трубы
        if (pipeLen > 11 && pipeLen<23)
            pipeLen = 10;
        let heightPipe = parseFloat(document.getElementById("heightPipe").value); //диаметр трубы
        
        const liquidElement = document.getElementById('liquid');
        const liquidProperties = new LiquidProperties();
        console.log(liquidProperties.liquidData[liquidElement.value]);
        const liquid = liquidProperties.getProperties(liquidElement.value);
        console.log(liquid);
        
        this.pressure = (heightWaterTower * liquid.density * 9.8)/100000; //P0 в барах

        const metalElement = document.getElementById('metal');
        const metalProperties = new MetalProperties();
        const metal = metalProperties.getProperties(metalElement.value);


        let waterSpeed = Math.sqrt(2 * 9.806 * heightWaterTower);

        let a = (1 / (Math.sqrt(liquid.density * ((heightPipe / (metal.elasticModulus * widthWall)) + (1 / liquid.elasticModulus))))) * 1000; //speed

        this.increment = (liquid.density * waterSpeed * a) / 100000; //delta P в барах
        this.param = 4000*((4 * pipeLen) / a);
        if (this.param > 300) {
            this.param = 150;
        }
    } 
      
    drawGraph() {    
        this.draw_Vertical_Lines();
        //Перенос центра
        this.ctx.translate(0, this.yAxis * this.k / 2);
        this.draw_Horizontal_Lines();
    
        this.ctx.font = "30px Times New Roman";
        this.ctx.textAlign = "left";
        this.ctx.fillText("t (c)", 0, 25);
        this.ctx.closePath();
        for (let step = 0; step < 12; step++) {
            this.ctx.beginPath();
            this.ctx.strokeStyle = "red";
            this.ctx.lineWidth = 2;
            
            this.ctx.moveTo(this.k * this.param * step, 0);
            
            this.ctx.lineTo(this.k * this.param * (0.05 + step), this.k * -(this.increment - (this.increment * step / 12) - this.pressure) * 1.1);

            this.ctx.lineTo(this.k * this.param * (0.1 + step), this.k * -(this.increment - (this.increment * step / 12) - this.pressure));
            this.ctx.lineTo(this.k * this.param * (0.45 + step), this.k * -(this.increment - (this.increment * step / 12) - this.pressure));
            this.ctx.lineTo(this.k * this.param * (0.5+step), 0);
            
            this.ctx.lineTo(this.k * this.param * (0.55+step), this.k * (this.increment - (this.increment * step / 12) - this.pressure) * 1.1);

            this.ctx.lineTo(this.k * this.param * (0.6 + step), this.k * (this.increment-(this.increment * step / 12) - this.pressure));
            this.ctx.lineTo(this.k * this.param * (0.95 + step), this.k * (this.increment-(this.increment * step / 12) - this.pressure));
            this.ctx.lineTo(this.k * this.param * (1 + step), 0);
            this.ctx.stroke();
        }
    
        this.ctx.font = "30px Times New Roman";
        this.ctx.textAlign = "left";
        this.ctx.fillText("ΔP (бар)", 0, - this.increment - 15);
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
}


function graph() {
    const canvas = document.getElementById("canvas2");
    const ctx = canvas.getContext("2d");
    let k = 0.8;
    let dmp = new DrawMainPage(ctx, canvas, k);
    dmp.drawVisualRepresentation();
    dmp.drawGraph();
}