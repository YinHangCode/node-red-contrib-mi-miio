# node-red-contrib-mi-miio

[![npm version](https://badge.fury.io/js/node-red-contrib-mi-miio.svg)](https://badge.fury.io/js/node-red-contrib-mi-miio)

这是一个Node-RED的小米MiIO设备的插件。
   
Bug反馈/建议等请提交[issues](https://github.com/YinHangCode/node-red-contrib-mi-miio/issues) 或 [QQ群: 107927710](//shang.qq.com/wpa/qunwpa?idkey=8b9566598f40dd68412065ada24184ef72c6bddaa11525ca26c4e1536a8f2a3d)。

## 支持设备
||设备名称|Device Name|MiIO model|
|:-:|:-|:-|:-|
|1|米家智能插线板|MiIntelligencePinboard|zimi.powerstrip.v2|
|2|Yeelight彩光灯带|YeelightColorLedStrip|yeelink.light.strip1<br>yeelink.light.strip2|

更多设备待添加中。。。

## 安装
确认安装好Node-RED之后，执行如下命令：
```
npm install -g node-red-contrib-mi-miio
```

## 输入/输出消息说明
### 获取设备属性列表
输入内容：
```
{
    "cmd": "list"
}
```
![](https://raw.githubusercontent.com/YinHangCode/node-red-contrib-mi-miio/master/images/list.png)
输出内容：
```
{
    "cmd": "list_response",
    "attributes": ["power", "power_consume_rate", "temperature", "wifi_led"]
}
```
### 获取设备属性值
输入内容：
```
{
    "cmd": "get"
}
```
![](https://raw.githubusercontent.com/YinHangCode/node-red-contrib-mi-miio/master/images/get.png)   
输出内容：
```
{
    "cmd": "get_response",
    "values": {
        "power": "off",
        "power_consume_rate": 0,
        "temperature": 41.11,
        "wifi_led": "on"
    },
    "msg": "success"
}
```
### 修改设备属性值
输入内容：
```
{
    "cmd": "set",
    "attribute": "要修改的属性",
    "value": "要修改的值"
}
```
![](https://raw.githubusercontent.com/YinHangCode/node-red-contrib-mi-miio/master/images/set.png)   
输出内容：
```
{
    "cmd": "set_response",
    "result": "success",
    "msg":["ok"]
}
```
### 属性值变动通知
当某个属性的值有变动时，通知如下消息：
```
{
    "cmd": "report",
    "attribute": "值变动的属性",
    "oldValue": 变动前的值,
    "newValue": 变动后的值
}
```
![](https://raw.githubusercontent.com/YinHangCode/node-red-contrib-mi-miio/master/images/report.png)

## 与Dashboard配合的例子
![](https://raw.githubusercontent.com/YinHangCode/node-red-contrib-mi-miio/master/images/example1_1.png)
![](https://raw.githubusercontent.com/YinHangCode/node-red-contrib-mi-miio/master/images/example1_2.png)
   
## 版本说明
### 0.0.1 (2018-11-13)
1. 增加支持米家智能插线板。   
2. 增加支持Yeelight彩光灯带。   