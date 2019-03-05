// pages/cp/cp.js
var app = getApp()
var simpleUser
var provinceAndID = {
  "Shanghai": "上海",
  "Beijing": "北京",
  "Tianjin": "天津",
  "Chongqing": "重庆",
  "Hebi": "河北",
  "Henan": "河南",
  "Yunnan": "云南",
  "Liaoning": "辽宁",
  "Heilongjiang": "黑龙江",
  "Hunan": "湖南",
  "Anhui": "安徽",
  "Shandong": "山东",
  "Xinjiang": "新疆",
  "Shanxi": "山西",
  "Jiangsu": "江苏",
  "Zhejiang": "浙江",
  "Jiangxi": "江西",
  "Hubei": "湖北",
  "Guangxi": "广西",
  "Gansu": "甘肃",
  "Shanxi": "陕西",
  "Neimenggu": "内蒙古",
  "Jilin": "吉林",
  "Fujian": "福建",
  "Guizhou": "贵州",
  "Guangdong": "广东",
  "Qinghai": "青海",
  "Xizang": "西藏",
  "Sichuan": "四川",
  "Ningxia": "宁夏",
  "Hainan": "海南",
  "Taiwan": "台湾",
  "Xianggang": "香港",
  "Aomen": "澳门"
}

Page({

  /**
   * 页面的初始数据
   */

  data: {
    //Badage部分数据
    wechatAccount: '杨铖的微信号',
    userImageSource: null,
    province: null,
    gender: null,

    user1: {
      userName: '',
      date: '',
      //性别选择
      genderSelection: ['性别', '男', '女'],
      genderIndex: 1,
    },

    user2: {
      userName: '',
      date: '',
      //性别选择
      genderSelection: ['性别', '男', '女'],
      genderIndex: 2,
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(this.data.user1.date)
    var userprofile = app.globalData.userInfo
    var copyOfUser1 = this.data.user1
    copyOfUser1.genderIndex = userprofile.gender
    //console.log(copyOfUser1)
    //var genderOfUser2 = this.data.user2.gender

    this.setData({
      user1: copyOfUser1,
      province: userprofile.province,
      wechatAccount: userprofile.nickName,   //把nickName赋值给wechatAccount
      userImageSource: userprofile.avatarUrl
    })
    //console.log(userprofile)
    //console.log("sex:" + genderOfUser1)
    //console.log("sex:" + this.data.user1.gender)
    //console.log(this.data.province)
    //console.log(this.data.wechatAccount)

    //将省份换成中文
    if (this.data.province != "") {
      this.setData({
        province: provinceAndID[this.data.province] //用json把省份拼音转化成中文
      })
      //console.log(this.data.province)
    }

/*-------------自动提交表单-------------------------------------*/
    var that = this;
    var formData = that.data
    //console.log('88888888888888888888888')
    //console.log(formData)
    //console.log('88888888888888888888888')
    wx.setStorageSync('formData', formData)
    // wx.navigateTo({
    //   url: '../share/share',
    //   success: function (res) {
    //     console.log(res)
    //   },
    //   fail: function (res) {
    //     console.log(res)
    //   },
    //   complete: function (res) {
    //     console.log(res)
    //   }
    // })
    //console.log("yes")
    
/*-------------------------------------------------------------*/
  },

  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  //user1选择生日
  bindDateChange1: function (e) {
    var that = this
    //console.log(that)
    that.data.user1.date = e.detail.value
    this.setData({
      user1: that.data.user1
    })
    console.log(this.data.user1.date)
  },

  //user2选择生日
  bindDateChange2: function (e) {
    var that = this
    //console.log(that)
    that.data.user2.date = e.detail.value
    this.setData({
      user2: that.data.user2
    })
    console.log(this.data.user2.date)
  },

  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'   //点击用户头像
    })
  },

  //输入user1的名字
  bindNameInput1: function (e) {
    var that = this
    console.log(e.detail.value)
    that.data.user1.userName = e.detail.value
    this.setData({
      user1: that.data.user1
    })
  },

  //输入user2的名字
  bindNameInput2: function (e) {
    var that = this
    console.log(e.detail.value)
    that.data.user2.userName = e.detail.value
    this.setData({
      user2: that.data.user2
    })
  },

  //用户1性别选择
  bindGenderSelectionChange1: function (e) {
    console.log('性别选择发生选择改变，携带值为', e.detail.value);
    var copyOfUser1 = this.data.user1
    copyOfUser1.genderIndex = e.detail.value
    this.setData({
      user1: copyOfUser1
    })
  },

  //用户2性别选择
  bindGenderSelectionChange2: function (e) {
    console.log('性别选择发生选择改变，携带值为', e.detail.value);
    var copyOfUser2 = this.data.user2
    copyOfUser2.genderIndex = e.detail.value
    this.setData({
      user2: copyOfUser2
    })
  },

  //提交表单后的操作(优先)
  formSubmit: function (e) {
    var that = this;
    var formData = that.data
    if (formData.user1.userName == '' | formData.user2.userName == '' | formData.user1.date == '' | formData.user2.date == ''){
      wx.showModal({
        content: '亲，请将你和TA的信息填写完整哦 (づ￣3￣)づ╭❤～',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      });
    }else{
      wx.setStorageSync('formData', formData)
      console.log(this.data)
      wx.navigateTo({
        url: '../share/share',
        success: function (res) {
          console.log(res)
        },
        fail: function (res) {
          console.log(res)
        },
        complete: function (res) {
          console.log(res)
        }

      })
      console.log("yes")
    }


  },
  //提交表单后的操作
  bindOnSubmit: function (e) {
    //console.log("fuck")

  },
  /**
   * 生命周期函数--监听页面隐藏
   */


  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})