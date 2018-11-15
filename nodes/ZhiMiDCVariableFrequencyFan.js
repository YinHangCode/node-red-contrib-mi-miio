const packageFile = require("../package.json");

const CommonDevice = require('./CommonDevice');
const CommonNode = require('./CommonNode');

module.exports = function(RED) {

    class MiZhiMiDCVariableFrequencyFanDevice extends CommonDevice {
        constructor(config) {
            super(RED, config);
        }
        
        getAttributeList() {
            return [
                "power",
                "ac_power",
                "battery",
                "angle_enable",
                "angle",
//              "speed",
                "speed_level",
                "natural_level",
                "temp_dec",
                "humidity",
                "buzzer",
                "child_lock",
                "led_b",
                "poweroff_time",
                "use_time"
            ];
        }
        
        getAttributeSetter() {
            return {
                "power": "set_power",
                "speed_level": "set_speed_level",
                "natural_level": "set_natural_level",
                "angle_enable": "set_angle_enable",
                "angle": "set_angle",
                "buzzer": "set_buzzer",
                "child_lock": "set_child_lock",
                "led_b": "set_led_b"
            };
        }
    };
    RED.nodes.registerType("Mi-ZhiMiDCVariableFrequencyFan-Device", MiZhiMiDCVariableFrequencyFanDevice);
    
    class ZhiMiDCVariableFrequencyFan extends CommonNode {
        constructor(config) {
            super(RED, config);
        }
        
        getCmdSetReportMsg(node, msg) {
            var result = super.getCmdSetReportMsg(node, msg);
            if(msg.payload['attribute'] == "speed_level") {
                result.payload.attributes.push('natural_level');
                result.payload.newValues['natural_level'] = 0;
            }
            return result;
        }
        
        updateCmdSetAttributes(node, msg, attribute, value) {
            super.getCmdSetReportMsg(node, msg);
            if(msg.payload['attribute'] == "speed_level") {
                node.deviceNode.attributes['natural_level'] = 0;
            }
        }
    }
    RED.nodes.registerType("Mi-ZhiMiDCVariableFrequencyFan", ZhiMiDCVariableFrequencyFan);
}
