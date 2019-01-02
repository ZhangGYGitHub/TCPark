// pages/w_payment_prompt/w_payment_prompt.js
//获取应用实例
const app = getApp()
Page({
data: {
    time: 3,
},
/**
 * 生命周期函数--监听页面初次渲染完成
 */
onLoad() {
    //5s后跳转
    this.data.Time = setInterval(() => {
      this.setData({
        time: --this.data.time
      })
      if (this.data.time <= 0) {
        this.goHome()
      }
		
    }, 1000)
},
goHome() {
      			wx.switchTab({
      				url: "/pages/parking/parking",
      			})
						}
})



