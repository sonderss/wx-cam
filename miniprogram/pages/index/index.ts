// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    isOpen:false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  onLoad() {
    // @ts-ignore
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    // 监听关闭
    wx.onSocketClose((e:any) => {
      console.log(e)
      wx.showToast({title:'关闭了'})
    })
    // 监听打开
    wx.onSocketOpen(() => {
      console.log('onSocketOpen')
      this.setData({
        isOpen: true
      })
    })
    // 接收消息
    wx.onSocketMessage((e:any) => {
      console.log(e)
    })
  },
  getUserProfile() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e: any) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  // 发送消息
  sendWsMsg() {
    if(this.data.isOpen) {
      console.log(123)
      const arrayBuffer = "aaa"
      console.log(arrayBuffer)
      // {
      //   "event" : "hello2",
      //   "data" : "测试数据"
      //   }
      wx.sendSocketMessage({
        data: JSON.stringify({event:'msgClient',data:1}),
        complete: (e:any) => {
          console.log(e)
        } 
      })
    }
   
  },
  // 关掉ws
  closeWs() {
    wx.closeSocket({
      complete: (e:any) => {
        console.log(e)
      }
    })
  },
  // 连接ws
  connectWs() {
    console.log(1)
    wx.connectSocket({
      url: 'ws://localhost:8090',
      header:{
        'content-type': 'application/json'
      },
      protocols: ['protocol1'],
      complete: function(e:any) {
        console.log(e)
      }
    })
  },
  
})
