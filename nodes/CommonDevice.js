const miio = require("miio");

class CommonDevice {
    constructor(RED, config) {
        RED.nodes.createNode(this, config);
        
        config.deviceSyncInterval = parseInt(config.deviceSyncInterval);
        
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
        
        if(this.config.deviceSyncInterval > 0) {
            this.syncAttributes(true);
            this.syncIntervalFlag = setInterval(this.syncAttributes.bind(this, true), config.deviceSyncInterval);
        } else {
            this.syncAttributes(false);
        }
    }
    
    close() {
        if(this.syncIntervalFlag) {
            clearInterval(this.syncIntervalFlag);
        }
    }
    
    getSyncAttributesMethod() {
        return "get_prop";
    }
    
    getSyncAttributesValue() {
        return this.getAttributeList();
    }
    
    getSyncAttributesResult(response) {
        return response;
    }
    
    syncAttributes(isUpdateNodeStatus) {
        var that = this;
        var attributeList = this.getAttributeList();
        if(null == attributeList || Array.isArray(attributeList) == false || attributeList.length == 0) {
            return;
        }
        
        var syncAttributesMethod = this.getSyncAttributesMethod();
        var syncAttributesValue = this.getSyncAttributesValue();
        this.device.call(syncAttributesMethod, syncAttributesValue, {
            'retries': 1
        }).then(response => {
            var result = that.getSyncAttributesResult(response);
            var changeAttributes = [];
            var newAttributes = {};
            for(var index in attributeList) {
                var attribute = attributeList[index];
                newAttributes[attribute] = result[index];
                if(that.attributes[attribute] != result[index]) {
                    changeAttributes.push(attribute);
                }
            }
            
            if(changeAttributes.length > 0) {
                for(var node in that.nodes) {
                    that.nodes[node].send({
                        'payload': {
                            'cmd': 'report',
                            'attributes': changeAttributes,
                            'oldValues': that.attributes,
                            'newValues': newAttributes
                        }
                    });
                }
                that.attributes = newAttributes;
            }
            
            if(isUpdateNodeStatus) {
                that.online = true;
                for(var node in that.nodes) {
                    that.nodes[node].status({fill:"green", shape:"dot", text: JSON.stringify(that.attributes) });
                }
            }
        }).catch(function(err) {
            console.error(err);
            if(isUpdateNodeStatus) {
                that.online = false;
                for(var node in that.nodes) {
                    that.nodes[node].status({fill:"red", shape:"ring", text:"offline"});
                }
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
