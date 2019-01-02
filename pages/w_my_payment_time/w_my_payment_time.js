// pages/w_my_payment_record/w_my_payment_record.js
//获取应用实例
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
  		date: "",//日期     
  		payment:[{
  			car_money: "2.00",//支付金额
				context:"10",//距离
  			payment_area: '河北科技大学停车场A2区域', //停车区域
  			pay_time: "2018-07-01 09:25",          //付款时间
  			stop_time:"2018-08-01 09:25",      //停车时长
  		}, {
  			car_money: "4.00",               //支付金额
				context:"5",//距离
  			payment_area: '河北科技大学停车场A2区域', //停车区域
  			pay_time: "2018-07-01 09:25",          //付款时间
  			stop_time:"2018-08-01 09:25",      //停车时长
  			},{
  				car_money: "6.00",               //支付金额
					context:"8",//距离
  				payment_area: '河北科技大学停车场A2区域', //停车区域
  				pay_time: "2018-07-01 09:25",          //付款时间
  				stop_time:"2018-08-01 09:25",       //停车时长
  			},{
  				car_money: "8.00",               //支付金额
					context:"8",//距离
  				payment_area: '河北科技大学停车场A2区域', //停车区域
  				pay_time: "2018-07-01 09:25",          //付款时间
  				stop_time:"2018-08-01 09:25",       //停车时长
  			},],//缴费信息
  },
//跳转到支付页面
topayment: function () {
    wx.navigateTo({
      url: '../w_payment/w_payment'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //获取当前时间戳
    var timestamp = Date.parse(new Date());
    //获取当前时间
    var n = timestamp;
    var date = new Date(n);
    //年
    var Y = date.getFullYear();
    //月
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    var time=Y+"-"+M;
    this.setData({
      date: time
    });
  },
  // 日期选择
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

})