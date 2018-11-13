const miio = require("miio");

class CommonDevice {
    constructor(RED, config) {
        RED.nodes.createNode(this, config);
        
        this.config = config;
        this.device = new miio.Device({
            address: this.config.deviceIP,
            token: this.config.deviceToken
        });
        this.nodes = {};
        
        this.online = null;
        this.attributes = {};
        for(var index in this.getAttributeList()) {
            var attribute = this.getAttributeList()[index];
            this.attributes[attribute] = null;
        }
        this.syncAttributes();
        
        if(this.config.deviceSyncInterval > 0) {
            this.syncIntervalFlag = setInterval(this.syncAttributes.bind(this), config.deviceSyncInterval);
        }
    }
    
    close() {
        if(this.syncIntervalFlag) {
            clearInterval(this.syncIntervalFlag);
        }
    }
    
    syncAttributes() {
        var that = this;
        var attributeList = this.getAttributeList();
        this.device.call("get_prop", attributeList, {
            'options.retries': 1
        }).then(result => {
            for(var index in attributeList) {
                var attribute = attributeList[index];
                if(that.attributes[attribute] != result[index]) {
                    for(var node in that.nodes) {
                        that.nodes[node].send({
                            'payload': {
                                'cmd': 'report',
                                'attribute': attribute,
                                'oldValue': that.attributes[attribute],
                                'newValue': result[index]
                            }
                        });
                    }
                    that.attributes[attribute] = result[index];
                }
            }
            
            that.online = true;
            for(var node in that.nodes) {
                that.nodes[node].status({fill:"green", shape:"dot", text: JSON.stringify(that.attributes) });
            }
        }).catch(function(err) {
            that.debug(err);
            that.online = false;
            for(var node in that.nodes) {
                that.nodes[node].status({fill:"red", shape:"ring", text:"offline"});
            }
        });
    }
    
    addNode(id, node) {
        this.nodes[id] = node;
    }
    
    removeNode(id) {
        delete this.nodes[id];
    }
    
    getAttributeList() {
        return [];
    }
    
    getAttributeSetter() {
        return {};
    }
};
    
module.exports = CommonDevice;
