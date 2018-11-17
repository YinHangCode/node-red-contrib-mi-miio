const packageFile = require("../package.json");

const CommonDevice = require('./CommonDevice');
const CommonNode = require('./CommonNode');

module.exports = function(RED) {

    class MiOtherDevice extends CommonDevice {
        constructor(config) {
            super(RED, config);
            
            this.deviceAttributesArr = config.deviceAttributesArr;
            if(this.config.deviceSyncInterval > 0) {
                this.syncAttributes(true);
            } else {
                this.syncAttributes(false);
            }
        }
        
        getAttributeList() {
            var result = [];
            if(this.deviceAttributesArr) {
                for(var index in this.deviceAttributesArr) {
                    result.push(this.deviceAttributesArr[index]['attribute']);
                }
            }
            
            return result;
        }
        
        getAttributeSetter() {
            var result = {};
            if(this.deviceAttributesArr) {
                for(var index in this.deviceAttributesArr) {
                    var value = this.deviceAttributesArr[index]['setter'];
                    if(null != value && value != "") {
                        result[this.deviceAttributesArr[index]['attribute']] = value;
                    }
                }
            }
            
            return result;
        }
    };
    RED.nodes.registerType("Mi-Other-Device", MiOtherDevice);
    
    class MiOther extends CommonNode {
        constructor(config) {
            super(RED, config);
        }
    }
    RED.nodes.registerType("Mi-Other", MiOther);
}
