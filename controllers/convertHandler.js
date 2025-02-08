function ConvertHandler() {
  
  this.getNum = function(input) {
    const match = input.match(/^-?(\d+(\.\d+)?(\/\d+(\.\d+)?)?)?/);

    if (input.includes('/')) {
      let fractionParts = input.split('/');
      if (fractionParts.length !== 2) return null;
    }
    if (match) {
      const num = match[0];
      if (!match || !match[0]) return 1;

      if (num.startsWith('-')) {
          return null;
      }

      if (num.includes('/')) {
        let fractionParts = num.split('/');
        return fractionParts[0] / fractionParts[1];
      }

      return parseFloat(num);
    }
  };
  
  this.getUnit = function(input) {
    const match = input.match(/[a-zA-Z]+/);
    if (!match) return null;

    let unit = match[0].toLowerCase();
    const validUnits = ["gal", "l", "lbs", "kg", "mi", "km"];
    return validUnits.includes(unit) ? (unit === "l" ? "L" : unit) : null;
  };
  
  this.getReturnUnit = function(initUnit) {
    const convertUnitMap = {
      "gal": "L", "L" : "gal",
      "lbs": "kg", "kg": "lbs",
      "mi": "km", "km": "mi"
    };
    return convertUnitMap[initUnit] || null;
  };

  this.spellOutUnit = function(unit) {
    const spellOutMap = {
      "gal": "gallons",
      "L": "liters",
      "lbs": "pounds",
      "kg": "kilograms",
      "mi": "miles",
      "km": "kilometers"
    };
    
    return spellOutMap[unit] || null;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    const conversionRates = {
      "gal": 3.78541,
      "L": 1 / 3.78541,
      "lbs": 0.453592,
      "kg": 1 / 0.453592,
      "mi": 1.60934,
      "km": 1 / 1.60934
    };

    let conversionRate = conversionRates[initUnit];

    if (!conversionRate) return null;
    
    let result = parseFloat((initNum * conversionRate).toFixed(5));
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
