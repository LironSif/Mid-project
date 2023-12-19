
export const hazardInformation = {

        HEALTH_HAZARD: {
          0: "Normal material",
          1: "Slightly hazardous",
          2: "Hazardous",
          3: "Extreme danger",
          4: "Deadly"
        },
        FIRE_HAZARD: {
        0: "Will not burn",
        1: "Above 93° C",
        2: "Below 93° C",
        3: "Below 38° C",
        4: "Below 23° C"
        },
        SPECIFIC_HAZARD: [
          "Oxidizer",
          "Acid",
          "ACID",
          "Alkali",
          "ALK",
          "Corrosive",
          "COR",
          "Use NO WATER",
          "W",
          "Radiation Hazard"
        ],
        INSTABILITY: {
          0: "Stable",
          1: "Unstable if heated",
          2: "Violent chemical change",
          3: "Shock and heat may detonate",
          4: "May detonate"
        }
  };
  
  export const chemicals = {
    UN1075: {
        Name: "Propane",
        INSTABILITY: 0,
        SPECIFIC_HAZARD: "None",
        FIRE_HAZARD: 3,
        HEALTH_HAZARD: 0,
        STATE: "Gas", 
        OXIDIZER: false, 
        CORROSIVE: false,
        FLAMMABLE : true
      },
      UN1203: {
        Name: "Gasoline",
        INSTABILITY: 0,
        SPECIFIC_HAZARD: "None",
        FIRE_HAZARD: 3,
        HEALTH_HAZARD: 0,
        STATE: "Liquid", 
        OXIDIZER: false, 
        CORROSIVE: false,
        FLAMMABLE : true
      },
      UN1230: {
        Name: "Methanol",
        INSTABILITY: 0,
        SPECIFIC_HAZARD: "POI",
        FIRE_HAZARD: 3,
        HEALTH_HAZARD: 4,
        STATE: "Gas", 
        OXIDIZER: false, 
        CORROSIVE: false,
        FLAMMABLE : true
      },
      UN0029: {
        Name: "Explosive Material",
        INSTABILITY: 4,
        SPECIFIC_HAZARD: "None",
        FIRE_HAZARD: 0,
        HEALTH_HAZARD: 0,
        STATE: "Solid", 
        OXIDIZER: false, 
        CORROSIVE: false,
        FLAMMABLE : true
      },
      UN1344: {
        Name: "Ferrous Sulfide",
        INSTABILITY: 0,
        SPECIFIC_HAZARD: "None",
        FIRE_HAZARD: 2,
        HEALTH_HAZARD: 0,
        STATE: "Solid", 
        OXIDIZER: true, 
        CORROSIVE: false,
        FLAMMABLE : true
        // need to fix data
      },
      UN1748: {
        Name: "Oxidizing Substance",
        INSTABILITY: 2,
        SPECIFIC_HAZARD: "OXI",
        FIRE_HAZARD: 2,
        HEALTH_HAZARD: 0,
        STATE: "Solid", 
        OXIDIZER: true, 
        CORROSIVE: false,
        FLAMMABLE : false
        // need to fix data
      },
      UN1588: {
        Name: "Toxic Substance",
        INSTABILITY: 0,
        SPECIFIC_HAZARD: "TOX",
        FIRE_HAZARD: 0,
        HEALTH_HAZARD: 3,
        STATE: "Solid", 
        OXIDIZER: true, 
        CORROSIVE: true,
        FLAMMABLE : true
        // need to fix data
      },
  };
  