import { api, config, Request, Common } from '../../../utils/index';
import { Toast } from '../../../packages/index';

const http =  new Request();
const { url } = config;

Page(Object.assign({},
  Toast,
  {
    data: {
      baseUrl: url.base,
      BLEList: [],
      myBLEList: [],
      isConnectting: false,
      isDiscovering: false,
    },

    onLoad: function() {
      this.getBLEList();
    },
    
    getBLEList() {
      const that = this;
      wx.showLoading({
        title: '开启蓝牙适配'
      });
      // 打开蓝牙适配器
      wx.openBluetoothAdapter({
        success: function (res) {
          console.log("初始化蓝牙适配器");
          console.log(res);
          that.getBluetoothAdapterState();
        },
        fail: function (err) {
          console.log(err);
          wx.showToast({
            title: '蓝牙初始化失败',
            icon: 'success',
            duration: 2000
          })
          setTimeout(function () {
            wx.hideToast()
          }, 2000)
        }
    });
    // 监听蓝牙设备状态改变
    wx.onBluetoothAdapterStateChange(function (res) {
      const available = res.available;
      if (available) {
        that.getBluetoothAdapterState();
      }
    })
  },

  getBluetoothAdapterState() {
    const that = this;
    wx.getBluetoothAdapterState({
      success: function (res) {
        const available = res.available,
          discovering = res.discovering;
        if (!available) {
          wx.showToast({
            title: '设备无法开启蓝牙连接',
            icon: 'success',
            duration: 2000
          })
          setTimeout(function () {
            wx.hideToast()
          }, 2000)
        }
        else {
          if (!discovering) {
            that.startBluetoothDevicesDiscovery();
            if(that.serviceId) {
              that.getConnectedBluetoothDevices();
            }
          }
        }
      }
    })
  },

  // 搜索设备
  startBluetoothDevicesDiscovery() {
    const that = this;
    wx.showLoading({
      title: '蓝牙搜索'
    });
    wx.startBluetoothDevicesDiscovery({
      // services: [],
      allowDuplicatesKey: false,
      success: function (res) {
        if (!res.isDiscovering) {
          that.getBluetoothAdapterState();
        }
        else {
          that.onBluetoothDeviceFound();
        }
      },
      fail: function (err) {
        console.log(err);
      }
    });
  },

  // 获取已配对的设备
  getConnectedBluetoothDevices() {
    const that = this;
    wx.getConnectedBluetoothDevices({
      services: [that.serviceId],
      success: function (res) {
        console.log("获取处于连接状态的设备", res);
        // const devices = res['devices'],
        //   flag = false,
        //   index = 0,
        //   conDevList = [];
        // devices.forEach(function (value, index, array) {
        //   if (value['name'].indexOf('FeiZhi') != -1) {
        //     // 如果存在包含FeiZhi字段的设备
        //     flag = true;
        //     index += 1;
        //     conDevList.push(value['deviceId']);
        //     that.deviceId = value['deviceId'];
        //     return;
        //   }
        // });
        // if (flag) {
        //   this.connectDeviceIndex = 0;
        //   that.loopConnect(conDevList);
        // }
        // else {
        //   if (!this.getConnectedTimer) {
        //     that.getConnectedTimer = setTimeout(function () {
        //       that.getConnectedBluetoothDevices();
        //     }, 5000);
        //   }
        // }
      },
      fail: function (err) {
        if (!this.getConnectedTimer) {
          that.getConnectedTimer = setTimeout(function () {
            that.getConnectedBluetoothDevices();
          }, 5000);
        }
      }
    });
  },

  // 新设备发现后触发
  onBluetoothDeviceFound() {
    const that = this;
    // console.log('onBluetoothDeviceFound');
    wx.onBluetoothDeviceFound(function (res) {
      console.log('new device list has founded')
      console.log(res);
      if (res.devices[0] && res.devices[0].name) {
        that.setData({
          BLEList: [...that.data.BLEList, res.devices[0]],
        }) 
      }
    })
  },

  // 停止设备搜索
  stopBluetoothDevicesDiscovery() {
    const that = this;    
    wx.stopBluetoothDevicesDiscovery({
      success: function (res) {
        console.log('停止搜索蓝牙设备', res)
      }
    })
  },

  // 开始连接设备
  startConnectDevices(deviceId) {
    that.stopBluetoothDevicesDiscovery();
    this.isConnectting = true;
    wx.createBLEConnection({
      deviceId: deviceId,
      success: function (res) {
        if (res.errCode == 0) {
          setTimeout(function () {
            that.getService(that.deviceId);
          }, 5000)
        }
      },
      fail: function (err) {
        console.log('连接失败：', err);
        if (ltype == 'loop') {
          that.connectDeviceIndex += 1;
          that.loopConnect(array);
        }
        else {
          that.startBluetoothDevicesDiscovery();
          that.getConnectedBluetoothDevices();
        }
      },
      complete: function () {
        console.log('complete connect devices');
        this.isConnectting = false;
      }
    });
  },

  // 获取连接到的设备的服务
  getService(deviceId) {
    const that = this;
    // 监听蓝牙连接
    wx.onBLEConnectionStateChange(function (res) {
      console.log(res);
    });
    // 获取蓝牙设备service值
    wx.getBLEDeviceServices({
      deviceId: deviceId,
      success: function (res) {
        that.getCharacter(deviceId, res.services);
      }
    })
  },

  // 读取服务特征值
  getCharacter(deviceId, services) {
    const that = this;
    services.forEach(function (value, index, array) {
      // bug 默认的 serverId 是没有的，
      if (value == that.serviceId) {
        that.serviceId = array[index]; // ? value ??
      }
    });
    wx.getBLEDeviceCharacteristics({
      deviceId: deviceId,
      serviceId: that.serviceId,
      success: function (res) {
        /** bug 待处理 
         * 我这里不需要 write, 我可以先将特征值存起来，在解析完用户语音后再 write
         * 当然这里可以 open notify
        */
        that.writeBLECharacteristicValue(deviceId, that.serviceId, that.characterId_write);
        that.openNotifyService(deviceId, that.serviceId, that.characterId_read);
      },
      fail: function (err) {
        console.log(err);
      },
      complete: function () {
        console.log('complete');
      }
    })
  }
  


}

));

