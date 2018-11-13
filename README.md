# node-red-contrib-weather

[![npm version](https://badge.fury.io/js/node-red-contrib-weather.svg)](https://badge.fury.io/js/node-red-contrib-weather)

这是一个Node-RED的天气插件。
   
天气数据取自小米。
   
Bug反馈/建议等请提交[issues](https://github.com/YinHangCode/node-red-contrib-weather/issues) 或 [QQ群: 107927710](//shang.qq.com/wpa/qunwpa?idkey=8b9566598f40dd68412065ada24184ef72c6bddaa11525ca26c4e1536a8f2a3d)。

## 感谢
第一个Node-RED插件，感谢一下萝卜大佬，哈哈。

## 安装
确认安装好Node-RED之后，执行如下命令：
```
npm install -g node-red-contrib-weather
```

## 说明
流程图中填写经度和纬度即可。
   
给进任意输入，即可输出所有的天气信息供给后续的流程使用。
   
例如：每24小时触发一次，后面接判断流程做对应的操作。
   
## 版本说明
### 0.0.2 (2018-11-08)
1. 修改输出数据由String类型变更为Object类型，方便后续使用。   
### 0.0.1 (2018-11-08)
1. 初版，获取天气信息。   