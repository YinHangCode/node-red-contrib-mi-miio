const packageFile = require("../package.json");

const CommonDevice = require('./CommonDevice');
const CommonNode = require('./CommonNode');

module.exports = function(RED) {

    class MiMiAirMonitorB1Device extends CommonDevice {
        constructor(config) {
            super(RED, config);
        }
        
        getAttributeList() {
            return ["co2e", "humidity", "pm25", "temperature", "temperature_unit", "tvoc", "tvoc_unit"];            
        }
        
        getAttributeSetter() {
            return {};
        }
        
        
    };
    RED.nodes.registerType("Mi-MiAirMonitorB1-Device", MiMiAirMonitorB1Device);
    
    class MiMiAirMonitorB1 extends CommonNode {
        constructor(config) {
            super(RED, config);
        }
        
        getCmdGetMethod(node, msg) {
            return "get_air_data";
        }

        getCmdGetValue(node, msg) {
            return [];
        }
    }
    RED.nodes.registerType("Mi-MiAirMonitorB1", MiMiAirMonitorB1);
}
