class MetalProperties {
    constructor() {
      this.metalData = {
        copper: { elasticModulus: 100000, color: "#b87333" },
        aluminium: { elasticModulus: 70000, color: "#a5a5a5" },
        steel: { elasticModulus: 200000, color: "#738595" },
        iron: { elasticModulus: 100000, color: "#738595" },
        brass: { elasticModulus: 90000, color: "#738595" },
        wood: { elasticModulus: 9000, color: "#738595" },
        bronze: { elasticModulus: 105000, color: "#738595" }
      };
      this.defaultProperties = { elasticModulus: 0, color: "#000" };
    }
  
    getProperties(metalType) {
      return this.metalData[metalType] || this.defaultProperties;
    }
}