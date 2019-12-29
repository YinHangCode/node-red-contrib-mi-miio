class CommonNode {
    constructor(RED, config) {
        RED.nodes.createNode(this, config);
        var node = this;
        
        this.nodeId = config.id;
        this.deviceNode = RED.nodes.getNode(config.device);
        this.deviceNode.addNode(this.nodeId, this);
        this.status({});
        
        node.on('input', function(msg) {
            var cmd = msg.payload.cmd;
            if('get' == cmd) {
                node.cmdGet(node, msg);
            } else if('set' == cmd) {
                node.cmdSet(node, msg);
            } else if('list' == cmd) {
                node.cmdList(node, msg);
            } else if('miio' == cmd) {
                node.cmdMiio(node, msg);
            } else {
                node.send({
                    'payload':{
                        'cmd': 'error',
                        'msg': 'error cmd ' + cmd
                    }
                });
            }
        });
    }
    
    close() {
        this.deviceNode.removeNode(this.nodeId);
    }
    
    getCmdGetMethod(node, msg) {
        return "get_prop";
    }
    
    getCmdGetValue(node, msg) {
        return this.deviceNode.getAttributeList();
    }
    
    cmdGet(node, msg) {
        if(null == this.deviceNode.online) {
            this.deviceNode.device.call(this.getCmdGetMethod(node, msg), this.getCmdGetValue(node, msg)).then(result => {
                var attributeList = this.deviceNode.getAttributeList();
                var results = {};
                for(var index in attributeList) {
                    results[attributeList[index]] = result[index];
                }
                node.send({
                    'payload': {
                        'cmd': 'get_response',
                        'values': results,
                        'msg': 'success'
                    }
                });
            }).catch(function(err) {
                node.send({
                    'payload':{
                        'cmd': 'get_response',
                        'values': {},
                        'msg': err
                    }
                });
            });
        } else {
            if(this.deviceNode.online) {
                node.send({
                    'payload':{
                        'cmd': 'get_response',
                        'values': this.deviceNode.attributes,
                        'msg': 'success'
                    }
                });
            } else {
                node.send({
                    'payload':{
                        'cmd': 'get_response',
                        'values': {},
                        'msg': 'device is offline.'
                    }
                });
            }
        }
    }
    
    getCmdSetSetter(node, msg) {
        var attribute = msg.payload['attribute'];
        return this.deviceNode.getAttributeSetter()[attribute];
    }
    
    getCmdSetValue(node, msg) {
        return msg.payload['value'];
    }
    
    getCmdSetSetterAndValue(node, msg) {
        return {
            'setter': this.getCmdSetSetter(node, msg),
            'value': this.getCmdSetValue(node, msg)
        }
    }
    
    cmdSet(node, msg) {
        var attribute = msg.payload['attribute'];
        if(null == attribute || attribute == "") {
            node.send({
                'payload':{
                    'cmd': 'error',
                    'msg': 'attribute is empty.'
                }
            });
        }
        
        if(false == this.deviceNode.online) {
            node.send({
                'payload':{
                    'cmd': 'set_response',
                    'result': 'fail',
                    'msg': 'device is offline.'
                }
            });
        }
        
        var setterAndValue = this.getCmdSetSetterAndValue(node, msg);
        var setter = setterAndValue && setterAndValue['setter'];
        if(null == setter) {
            node.send({
                'payload':{
                    'cmd': 'error',
                    'msg': attribute + ' is not support set.'
                }
            });
        }
        var value = setterAndValue && setterAndValue['value'];
        if(null == value) {
            node.send({
                'payload':{
                    'cmd': 'error',
                    'msg': 'value is empty.'
                }
            });
        }

        this.deviceNode.device.call(setter, [value]).then(result => {
            node.send({
                'payload': {
                    'cmd': 'set_response',
                    'result': 'success',
                    'msg': result
                }
            });
            
            var reportMsg = node.getCmdSetReportMsg(node, msg);
            for(var sameDeviceNodeId in node.deviceNode.nodes) {
                node.deviceNode.nodes[sameDeviceNodeId].send(reportMsg);
            }
            
            node.updateCmdSetAttributes(node, msg, attribute, value);
        }).catch(function(err) {
            node.send({
                'payload': {
                    'cmd': 'set_response',
                    'result': 'fail',
                    'msg': err
                }
            });
        });
    }
    
    getCmdSetReportMsg(node, msg) {
        var attribute = msg.payload['attribute'];
        var value = msg.payload['value'];
        
        var newAttributes = Object.assign({}, node.deviceNode.attributes);
        newAttributes[attribute] = value;
        return {
            'payload': {
                'cmd': 'report',
                'attributes': [attribute],
                'oldValues': node.deviceNode.attributes,
                'newValues': newAttributes
            }
        };
    }
    
    updateCmdSetAttributes(node, msg, attribute, value) {
        node.deviceNode.attributes[attribute] = value;
    }
    
    cmdList(node, msg) {
        node.send({
            'payload':{
                'cmd': 'list_response',
                'attributes': this.deviceNode.getAttributeList()
            }
        });
    }
    
    cmdMiio(node, msg) {
        var method = msg.payload['method'];
        var value = msg.payload['value'];
        node.deviceNode.device.call(method, value).then(result => {
            node.send({
                'payload': {
                    'cmd': 'miio_response',
                    'result': 'success',
                    'msg': result
                }
            });
        }).catch(function(err) {
            node.send({
                'payload': {
                    'cmd': 'miio_response',
                    'result': 'fail',
                    'msg': err
                }
            });
        });
    }
};
    
module.exports = CommonNode;