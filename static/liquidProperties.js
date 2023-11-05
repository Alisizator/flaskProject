class LiquidProperties {
    constructor() {
        this.liquidData = {
            water: { density: 1000, elasticModulus: 2000, color: "#8ebae8" },
            water_distilled: { density: 998, elasticModulus: 2100, color: "#ffff81" },
            oil: { density: 875, elasticModulus: 1450, color: "#ffff81" },
            amg_10: { density: 850, elasticModulus: 1330, color: "#ffff81" },
            cylindrical: { density: 900, elasticModulus: 1850, color: "#ffff81" },
            industrial_I50A: { density: 890, elasticModulus: 1500, color: "#ffff81" },
            industrial_I20A: { density: 890, elasticModulus: 1400, color: "#ffff81" },
            turbine: { density: 900, elasticModulus: 1750, color: "#ffff81" },
            kerosene: { density: 815, elasticModulus: 1350, color: "#ffff81" },
            silicone_liquid: { density: 1, elasticModulus: 1050, color: "#ffff81" },
            glycerin: { density: 1260, elasticModulus: 4300, color: "#ffff81" },
            mercury: { density: 13540, elasticModulus: 2500, color: "#ffff81" },
        };
        this.defaultProperties = { density: 0, elasticModulus: 0, color: "#000000" };
    }

    getProperties(liquidType) {
        return this.liquidData[liquidType] || this.defaultProperties;
    }
}