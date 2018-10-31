Page({
  logout: function () {
    let that = this;
    wx.request({
      url: app.globalData.websize + '/api/common/listMessage.json',
      data: {
        sessionId: wx.getStorageSync('sessionid')
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        app.callbackFun(res);
        if (res.data.status == 2000000) {

        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'loading',
          })
        }
      }
    })
  },
  phoneNumber: '',
  getPhoneNumber: function (e) {
    console.log("e.detail.errMsg" + e.detail.errMsg)
    this.setData({
      phoneNumber: e.detail.errMsg})
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
      wx.showModal({
        
        title: '提示',
        showCancel: false,
        content: '未授权',
        success: function (res) { }
      })
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '同意授权',
        success: function (res) { }
      })
    }
  },
  //一键获取手机号，将获取的值渲染到input框
  getPhoneNumber: function (e) {
    console.log("e.detail.errMsg" + e.detail.errMsg)
    this.setData({
      phoneNumber: e.detail.errMsg
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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