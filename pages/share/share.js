// pages/share/share.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      //console.log(res.target)
    }
    return {
      title: '测一测你和TA的缘分指数',
      path: '/pages/index/index',
      success: function (res) {
        wx.setStorageSync('shared', true)
        wx.navigateTo({
          url: '../result/result',
        })
        // 转发成功
      },
      fail: function (res) {
        wx.setStorageSync('shared', false)
        // 转发失败
      }
    }
  },

  bindSeeResult: function () {
    //console.log(wx.getStorageSync('shared'))
    var shared = wx.getStorageSync('shared')
    if (shared == true && shared == false){
      wx.navigateTo({
        url: '../result/result',
      })
    }else{
      wx.showModal({
        content: '分享之后才能查看结果哦',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var formData = wx.getStorageSync('formData')
    //console.log(formData)
    //console.log(wx.getStorageSync('shared'))
    if (wx.getStorageSync('shared') == true) {
      wx.navigateTo({
        url: '../result/result',
      })
    }
    /*--------自动提交表单-------------------------------*/
    console.log(formData)
    // wx.navigateTo({
    //   url: '../result/result',
    // })
    /*--------------------------------------------------*/
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
    if (wx.getStorageSync('shared') == true) {
      //console.log('erw')
    }
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

  }
})