// pages/result/result.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: wx.getStorageSync('formData'),
    progress: 0,
    showingPoint: 0,
    points: 50,
    disabled: false,
    matchJson: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var formData = wx.getStorageSync('formData')
    //console.log(formData)
    var userName1 = formData.user1.userName
    var userSex1 = formData.user1.genderIndex
    var userName2 = formData.user2.userName
    var userSex2 = formData.user2.genderIndex
    //console.log(userName1 + userSex1 + userName2 + userSex2)
    var points = pointCalculation(userName1, userSex1, userName2, userSex2)
    console.log('分数' + points)
    var that = this
    //that.data.matchJson = matchBenchmark[points]
    //console.log(that.data.matchJson)
    this.setData({
      matchJson: matchBenchmark[points]
    })
    console.log(this.data.matchJson)

    if (this.data.disabled) return

    this.setData({
      progress: 0,
      disabled: true,
      points: points*10
    })
    _next.call(this, this.data.points)
  },

  upload: function () {
    if (this.data.disabled) return

    this.setData({
      progress: 0,
      disabled: true
    })
    _next.call(this)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  bindBackToCP: function(e){
    wx.navigateTo({
      url: '../cp/cp'   //点击用户头像
    })
  },

  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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

/*---------------方法区----------------------*/

function _next(points) {
  var that = this
  if (this.data.progress >= points) {
    this.setData({
      disabled: false
    })
    return true
  }
  this.setData({
    progress: ++this.data.progress,
    showingPoint: ++this.data.showingPoint
  })
  setTimeout(function () {
    _next.call(that, points)
  }, 20)
}

function strToPoint(point) {

  var resultPoint = point / 1.182

  if (point > 10) {
    //console.log('执行1次')
    return strToPoint(resultPoint)
  } else {
    return resultPoint.toFixed(0)
  }

}

function pointCalculation(userName1, sex1, userName2, sex2) {
  var namePoint1 = strToDecCharCode(userName1)
  var sexPoint1 = strToDecCharCode(sex1)
  var namePoint2 = strToDecCharCode(userName2)
  var sexPoint2 = strToDecCharCode(sex2)

  var point = 0.618 * namePoint1 + 0.382 * sexPoint1 + 0.382 * namePoint2 + 0.618 * sexPoint2
  console.log(point)
  return strToPoint(point)
}

function strToDecCharCode(str) {
  if (str === "")
    return 0;
  var decCharCode = [];

  for (var i = 0; i < str.length; i++) {
    decCharCode.push((str.charCodeAt(i)).toString(10));
  }

  return decCharCode.join("");
}
/*---------------变量区----------------------*/
var matchBenchmark = {
  "10": {
    "points": 100,
    "title": "幸运情侣",
    "text": "出乎意料的好机会，总是能够降临到你们的的头上。一开始交往，就会互相带来好运，要互相疼爱，关系才会长久。"
  },
  "9": {
    "points": 90,
    "title": "完美情人",
    "text": "女方一见到男方，就会被对方丰富的学识及人生经验所倾倒，而义无反顾的相爱。"
  },
  "8": {
    "points": 80,
    "title": "最佳拍档",
    "text": "你们是死党，是想法一致的情侣，不过就因为同质性太高，有时会有点闷，药剂得多制造些生活情趣，多说些甜言蜜语给对方听。"
  },
  "7": {
    "points": 70,
    "title": "似远还近",
    "text": "双方个性不同，想法又各异，但竟然还可成为情侣，双方需互相迁就才能甜蜜度日。"
  },
  "6": {
    "points": 60,
    "title": "互相猜疑",
    "text": "你们当中有一方疑心病特重，对方一有风吹草动，就会往坏的地方想，对方又懒的解释，这样下去，迟早分手。"
  },
  "5": {
    "points": 50,
    "title": "先甘后苦",
    "text": "男方会适时讨好女方，让女孩子觉得好甜蜜，事事都有男方帮忙分担，但有时会物极必反，觉得自己好像没有存在价值。"
  },
  "4": {
    "points": 40,
    "title": "变心难免",
    "text": "热恋时会迁就对方，一旦变心就无法挽救。"
  },
  "3": {
    "points": 30,
    "title": "痴迷情人",
    "text": "男方说月亮是方的，女方也点头称是，简直爱到无理智可言。"
  },
  "2": {
    "points": 20,
    "title": "分手收场",
    "text": "两人找不到相同点，分手是迟早的事，唯一补救方法是完全相信彼此。"
  },
  "1": {
    "points": 10,
    "title": "不搭调",
    "text": "两人如同水与火，八竿子打不著，不知是如何走在一起的，一刹那的爱情光辉可不代表永恒。"
  },
  "0": {
    "points": 0,
    "title": "早散早好",
    "text": "一定是上天要整你，才让你们在一起，两人的恋情难有未来。"
  }
}