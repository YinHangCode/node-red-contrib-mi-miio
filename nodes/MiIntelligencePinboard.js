const packageFile = require("../package.json");

const CommonDevice = require('./CommonDevice');
const CommonNode = require('./CommonNode');

module.exports = function(RED) {

    class MiMiIntelligencePinboardDevice extends CommonDevice {
        constructor(config) {
            super(RED, config);
        }
        
        getAttributeList() {
            return ["power", "power_consume_rate", "temperature", "wifi_led"];
        }
        
        getAttributeSetter() {
            return {
                "power": "set_power", 
                "wifi_led": "set_wifi_led"
            };
        }
    };
    RED.nodes.registerType("Mi-MiIntelligencePinboard-Device", MiMiIntelligencePinboardDevice);
    
    class MiMiIntelligencePinboard extends CommonNode {
        constructor(config) {
            super(RED, config);
        }
    }
    RED.nodes.registerType("Mi-MiIntelligencePinboard", MiMiIntelligencePinboard);
}
