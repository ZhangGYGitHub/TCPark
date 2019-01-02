//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    markers: [{
							id: "1",
							latitude: 37.980317,
							longitude: 114.525604,
							width: 50,
							height: 50,
							iconPath: "/img/10.png",
							title: "风雨操场 ",
							callout:{
								content:'风雨操场 距离：335米 价格：3元',
								borderRadius:4,
								bgColor:'#C0D9D9',
								display:'ALWAYS',
								padding:4,
								},
 						},
						{
							id: "2",
							latitude: 37.997380,
							longitude: 114.521399,
							width: 50,
							height: 50,
							iconPath: "/img/10.png",
							title: "师大停车场 距离：2.2km 价格：3元",
							callout:{
								content:'河北师范大学停车场 距离：2.2km 价格：3元',
								borderRadius:4,
								bgColor:'#C0D9D9',
								display:'ALWAYS',
								padding:4,
								},
 						},
						{
							id: "3",
							latitude: 37.980063,
							longitude: 114.517525,
							width: 50,
							height: 50,
							iconPath: "/img/10.png",
							title: "6A停车场 距离：815m 价格：1元",
							callout:{
								content:'6A停车场 距离：815m 价格：1元',
								borderRadius:4,
								bgColor:'#C0D9D9',
								display:'ALWAYS',
								padding:4,
							}
						},
						{
							id: "4",
							latitude: 37.978346,
							longitude: 114.517611,
							width: 50,
							height: 50,
							iconPath: "/img/10.png",
							title: "科大生活广场停车场 ",
							callout:{
							content:'科大生活广场停车场 距离：790m 价格：2元',
							borderRadius:4,
							bgColor:'#C0D9D9',
 							display:'ALWAYS',
							padding:4,
 							}
						},{
							id: "5",
							latitude: 37.975099,
							longitude: 114.525400,
							width: 50,
							height: 50,
							iconPath: "/img/10.png",
							title: "信息楼停车场 ",
							callout:{
							content:'信息楼停车场 距离：214m 价格：3元',
							borderRadius:4,
							bgColor:'#C0D9D9',
 							display:'ALWAYS',
							padding:4,
 							}
						},{
							id: "6",
							latitude: 37.973737,
							longitude: 114.521077,
							width: 50,
							height: 50,
							iconPath: "/img/10.png",
							title: "南公教停车场 ",
							callout:{
							content:'南公教停车场 距离：541.2m 价格：4元',
							borderRadius:4,
							bgColor:'#C0D9D9',
 							display:'ALWAYS',
							padding:4,
 							}
						},{
							id: "7",
							latitude: 37.972950,
							longitude: 114.519060,
							width: 50,
							height: 50,
							iconPath: "/img/10.png",
							title: "南门停车场 ",
							callout:{
							content:'南门停车场 距离：735.8m 价格：2元',
							borderRadius:4,
							bgColor:'#C0D9D9',
 							display:'ALWAYS',
							padding:4,
 							}
						},
    ],
    controls:{
    },
    longitude:0,
    latitude: 0,
    showModalStatus: false,
    state:0,
		states:false,
    detail:{
			address:"hebei",
			sharePrice:'3',
			distance:'3',
		},
    timetxt:'预计时长',
    hour:0,
    checked:1,
    hasorder:0,
    orderDetail:{},
    showorderDetail:false,
    cancelDetail:{},
  },
  onReady: function (e) {
    wx.hideLoading()
    this.mapCtx = wx.createMapContext('myMap')
    var that =this;
    console.log(that.data.longitude)
    if(this.data.longitude == 0){
      this.gethearadr()
    }else{
      this.getAdrDate();
    }
    //this.loadState();


  },
  onLoad: function (e) {
    wx.showLoading({})
    if(e.longitude){
      this.setData({
        longitude:e.longitude,
        latitude:e.latitude
      })
    }
  },
  gethearadr:function(){
    var that =this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude

        })
        console.log(res.longitude, res.latitude)
        //that.getAdrDate();

      },
      complete:function (res){
        
      }
    })
  },
  searchFun:function(){
    wx.navigateTo({
      url: '../search/search'
    })
  },
  //事件处理函数
  loadState: function() {
    var that = this;
    wx.request({
      url: app.globalData.websize+'/api/index/state.json', 
      data:{
        sessionId: wx.getStorageSync('sessionid'),
      },
      method:'POST',
      header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function(res) {
        app.callbackFun(res.data);
        if(res.data.status == 2000000){
           res.data.data.time = parseInt(res.data.data.time/60000)
           if(res.data.data.state <4){
              that.setData({
                orderDetail:res.data.data,
                hasorder:1
              })
           }else{
              that.setData({
                orderDetail:res.data.data,
                hasorder:0
              })
           }
        }else{
          wx.showToast({
            title:res.data.message,
            icon:'loading',
          })
        }
      }
    })
  },
  daohang:function(reg){
    //let data = reg.target.dataset.json
    wx.openLocation({  
//       latitude: data.locLat,  
//       longitude: data.locLng,  
				 scale: 18,  
//       name: data.unit,  
//       address:data.address  
				latitude:markers[0].latitude,
				longitude:markers[0].longitude,
				 name:markers[0].title,
				 address:"石家庄",
    })  
  },
  cancelorder:function(){
    var that =this;
    wx.request({
      url: app.globalData.websize+'/api/staffIndex/subscribeCancel.json', 
      data:{
        sessionId: wx.getStorageSync('sessionid'),
        lockId:this.data.orderDetail.lockId
      },
      method:'POST',
      header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function(res) {
        app.callbackFun(res);
        if(res.data.status == 2000000){
           that.setData({
              cancelDetail:res.data.data
           })
        }else{
          wx.showToast({
            title:res.data.message,
            icon:'loading',
          })
        }
      }
    })
  },
  goingFun:function(){
    this.setData({
      showorderDetail:true,
      hasorder:0
    })
  },
  getAdrDate:function(){
    let that = this ;
    console.log(wx.getStorageSync('sessionid'));
    wx.request({
      url: app.globalData.websize+'/api/index/index.json', 
      data:{
        latitude:that.data.latitude,
        longitude:that.data.longitude,
        sessionId: wx.getStorageSync('sessionid'),
        hour:that.data.hour
      },
      method:'POST',
      header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function(res) {
        app.callbackFun(res.data);
        if(res.data.status == 2000000){
          let arr = [{id:0,iconPath:'/img/10.png',latitude:37.9782899771,longitude:114.5220733093,width:50,height:50,price:'sds'}];
          let list = res.data.data;
          for (var i = 0 ; i<list.length; i++) {
            let ico = '';
            if(list[i].shareState == 1){
              ico = '../images/wei.png'
            }else{
              ico = '../images/car.png'
            }
            arr.push({id:list[i].id,iconPath:ico,price:list[i].price,latitude:list[i].latitude,longitude:list[i].longitude,width:50,height:50,title:list[i].price})
          }
          that.setData({
              markers:arr
          })
        }else{
          wx.showToast({
            title:res.data.message,
            icon:'loading',
          })
        }
      }
    })
  },
  openDetaiFun:function(reg){
    console.log(reg.markerId);
    let that = this
    wx.request({
      url: app.globalData.websize+'/api/index/beforeCancel.json', 
      data:{
        pId:reg.markerId,
        sessionId: wx.getStorageSync('sessionid'),
        latitude:that.data.latitude,
        longitude:that.data.longitude
      },
      method:'POST',
      header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function(res) {
        app.callbackFun(res.data);
        if(res.data.status == 2000000){
          that.setData({
             state:res.data.data.state,
             detail:res.data.data
          })
        }else{
          wx.showToast({
            title:res.data.message,
            icon:'loading',
          })
        }
				this.yuyueFun();
      }
    })

  },
  yuyueFun:function(reg){
    this.setData({
      showModalStatus:true,
    })
    console.log(reg)
  },
	xianshi:function(reg){
		this.setData({
			states:true,
		})
	},
  commityuyue:function(){
    let that =this
    wx.request({
      url: app.globalData.websize+'/api/index/subscribe.json', 
      data:{
        pId:that.data.detail.id,
        sessionId: wx.getStorageSync('sessionid'),
        state:that.data.checked
      },
      method:'POST',
      header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function(res) {
        app.callbackFun(res.data);
        if(res.data.status == 2000000){

        }else{
          wx.showToast({
            title:res.data.message,
            icon:'loading',
          })
        }
      }
    })
  },
  changeico:function(reg){
    let num = reg.target.dataset.state;
    console.log(num);
    this.setData({
      checked:num
    })
  },
  cancelyy:function(){
    this.setData({
      showModalStatus:false
    })
  },
  closePopFun:function(reg){
    this.setData({
      state:0
    })
  },
  rebackFun(){
    console.log('dd')
    this.mapCtx.moveToLocation();
  },
	mintime: function(e){
			wx.navigateTo({
				url: "../w_my_payment_time/w_my_payment_time",
			})
	},
	aboutUs: function(e){
				wx.navigateTo({
					url: "../aboutUs/aboutUs"
				})
		},
	minmoney: function(e){
				wx.navigateTo({
					url: "../w_my_payment_recor/w_my_payment_recordlist"
				})
		},
  touserFun: function () {
    wx.navigateTo({
      url: '../personalCenter/personalCenter'
    })
  },
    closeFun: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.animationFun(currentStatu)
  },
  //  动画部分
  animationFun: function (currentStatu) {
    // 1创建动画实例   
    var animation = wx.createAnimation({
      duration: 300,  //  动画时长  
      timingFunction: "step-start", //  动画第一帧就跳至结束状态直到结束 
      delay: 0,  // 0则不延迟  
      opacity: 0 //  透明度，参数范围 0~1
    });

    // 2执行第一组动画  
    animation.opacity(0).rotateX(-100).step();

    // 3导出动画
    this.setData({
      animationData: animation.export(),
      showModalStatus: this.data.showModalStatus ? false : true
    })
  }
})
