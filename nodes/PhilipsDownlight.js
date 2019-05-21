const packageFile = require("../package.json");

const CommonDevice = require('./CommonDevice');
const CommonNode = require('./CommonNode');

module.exports = function(RED) {

    class MiPhilipsDownlightDevice extends CommonDevice {
        constructor(config) {
            super(RED, config);
        }
        
        getAttributeList() {
            return [
                "power",
                "bright",
                "cct"
            ];
        }
        
        getAttributeSetter() {
            return {
                "power": "set_power",
                "bright": "set_bright",
                "cct": "set_cct"

            };
        }
    };
    RED.nodes.registerType("Mi-PhilipsDownlight-Device", MiPhilipsDownlightDevice);
    
    class MiPhilipsDownlight extends CommonNode {
        constructor(config) {
            super(RED, config);
        }
    }
    RED.nodes.registerType("Mi-PhilipsDownlight", MiPhilipsDownlight);
}
