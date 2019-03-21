const packageFile = require("../package.json");

const CommonDevice = require('./CommonDevice');
const CommonNode = require('./CommonNode');

module.exports = function(RED) {

    class MiDownlightDevice extends CommonDevice {
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
                "cct":	"set_cct"
            };
        }
    };
    RED.nodes.registerType("Mi-Downlight-Device", MiDownlightDevice);
    
    class MiMiIntelligencePinboard extends CommonNode {
        constructor(config) {
            super(RED, config);
        }
    }
    RED.nodes.registerType("Mi-Downlight", MiMiIntelligencePinboard);
}
