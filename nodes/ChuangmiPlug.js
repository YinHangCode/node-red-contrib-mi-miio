const packageFile = require("../package.json");

const CommonDevice = require('./CommonDevice');
const CommonNode = require('./CommonNode');

module.exports = function(RED) {

    class ChuangmiPlugDevice extends CommonDevice {
        constructor(config) {
            super(RED, config);
        }
        
        getAttributeList() {
            return ["power", "temperature"];
        }
        
        getAttributeSetter() {
            return {
                "power": "set_power"
            };
        }
    };
    RED.nodes.registerType("ChuangmiPlug-Device", ChuangmiPlugDevice);
    
    class ChuangmiPlug extends CommonNode {
        constructor(config) {
            super(RED, config);
        }
    }
    RED.nodes.registerType("ChuangmiPlug", ChuangmiPlug);
}
