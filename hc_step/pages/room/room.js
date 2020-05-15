var app = getApp();

Page({
    data: {},
    onLoad: function(a) {
        var t = a.order_id;
        console.log(t), this.setData({
            order_id: t
        }), this.Gethxcode(t), this.Headcolor();
    },
    onReady: function() {},
    onShow: function() {},
    Gethxcode: function(a) {
        var o = this;
        app.util.request({
            url: "entry/wxapp/Hexiao",
            method: "POST",
            data: {
                order_id: a
            },
            success: function(a) {
                var t = a.data.data.data;
                o.setData({
                    dianpi: t
                });
            }
        });
    },
    Hexiaoshenhe: function() {
        var o = this;
        app.util.request({
            url: "entry/wxapp/Hexiaoshenhe",
            method: "POST",
            data: {
                order_id: o.data.order_id,
                shenheyuan_id: app.globalData.user_id
            },
            success: function(a) {
                var t = a.data.data.data;
                o.setData({
                    que: t
                }), o.Gethxcode(o.data.order_id), wx.showModal({
                    title: "提示",
                    content: "核销成功",
                    success: function(a) {
                        a.confirm ? console.log("用户点击确定") : console.log("用户点击取消");
                    }
                });
            }
        });
    },
    Headcolor: function() {
        var n = this;
        app.util.request({
            url: "entry/wxapp/Headcolor",
            method: "POST",
            data: {
                user_id: app.globalData.user_id
            },
            success: function(a) {
                var t = a.data.data.inviteball, o = a.data.data.sonlist, e = a.data.data.set;
                app.globalData.setaa = a.data.data.set, n.setData({
                    inviteball: t,
                    sonlist: o,
                    setaa: e
                }), wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: e.headcolor
                }), wx.setNavigationBarTitle({
                    title: e.xcx
                });
            },
            fail: function(a) {
                console.log("失败" + a);
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});