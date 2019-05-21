const packageFile = require("../package.json");

const CommonDevice = require('./CommonDevice');
const CommonNode = require('./CommonNode');

module.exports = function(RED) {

    class MiPWZN16WayRelayDevice extends CommonDevice {
        constructor(config) {
            super(RED, config);
        }
        
        getAttributeList() {
            return ["relay_status", "err", "on_count", 
                "relay0",
                "relay1",
                "relay2",
                "relay3",
                "relay4",
                "relay5",
                "relay6",
                "relay7",
                "relay8",
                "relay9",
                "relay10",
                "relay11",
                "relay12",
                "relay13",
                "relay14",
                "relay15"
            ];
        }
        
        getAttributeSetter() {
            return {
                "relay0": "set_relay0",
                "relay1": "set_relay1",
                "relay2": "set_relay2",
                "relay3": "set_relay3",
                "relay4": "set_relay4",
                "relay5": "set_relay5",
                "relay6": "set_relay6",
                "relay7": "set_relay7",
                "relay8": "set_relay8",
                "relay9": "set_relay9",
                "relay10": "set_relay10",
                "relay11": "set_relay11",
                "relay12": "set_relay12",
                "relay13": "set_relay13",
                "relay14": "set_relay14",
                "relay15": "set_relay15"
            };
        }
    };
    RED.nodes.registerType("Mi-PWZN16WayRelay-Device", MiPWZN16WayRelayDevice);
    
    class MiPWZN16WayRelay extends CommonNode {
        constructor(config) {
            super(RED, config);
        }
        
        cmdSetGetSetterAndValue(node, msg) {
            var outputSetter = null;
            var outputValue = null;
            
            var attribute = msg.payload['attribute'];
            var value = msg.payload['value'];
            var reg = /relay[0-9]+/;
            if(reg.test(attribute)) {
                var outputValue = attribute.substring(5);
                if("0" == value) {
                    outputSetter = "power_off";
                } else if("1" == value) {
                    outputSetter = "power_on";
                }
                return {
                    'setter': outputSetter,
                    'value': outputValue
                }
            }
            return null;
        }

    }
    RED.nodes.registerType("Mi-PWZN16WayRelay", MiPWZN16WayRelay);
}
