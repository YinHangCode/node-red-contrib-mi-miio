const packageFile = require("../package.json");

const CommonDevice = require('./CommonDevice');
const CommonNode = require('./CommonNode');

module.exports = function(RED) {

    class MiYeelightColorLedStripDevice extends CommonDevice {
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
    RED.nodes.registerType("Philips-Downlight-Device", PhilipsDownlightDevice);
    
    class MiMiIntelligencePinboard extends CommonNode {
        constructor(config) {
            super(RED, config);
        }
    }
    RED.nodes.registerType("Philips-Downlight", MiMiIntelligencePinboard);
}
