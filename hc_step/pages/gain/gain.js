var app = getApp();

Page({
    data: {},
    onLoad: function(a) {
        this.Headcolor();
    },
    onReady: function() {},
    fupiao: function() {
        var n = this;
        app.Headcolor(), setTimeout(function() {
            var a = app.globalData.setdata.is_float, t = app.globalData.setdata.phoneno, o = app.globalData.setdata.copytext;
            if (1 == a) var e = app.globalData.setdata.call_icon; else e = app.globalData.setdata.copy_icon;
            n.setData({
                poc: a,
                phone: t,
                iconimh: e,
                txttex: o
            });
        }, 1e3);
    },
    onShow: function() {
        this.Hblog(), this.fupiao();
    },
    Headcolor: function() {
        var l = this;
        app.util.request({
            url: "entry/wxapp/Headcolor",
            method: "POST",
            data: {
                user_id: app.globalData.user_id
            },
            success: function(a) {
                var t = a.data.data.inviteball, o = a.data.data.sonlist, e = a.data.data.set;
                app.globalData.setaa = a.data.data.set;
                var n = e.shenhe, i = e.adunit2;
                l.setData({
                    inviteball: t,
                    sonlist: o,
                    setaa: e,
                    shenhe: n,
                    sliu: i
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
    Hblog: function() {
        var o = this;
        app.util.request({
            url: "entry/wxapp/Hblog",
            method: "POST",
            data: {
                user_id: app.globalData.user_id
            },
            success: function(a) {
                var t = a.data.data.log;
                o.setData({
                    goods: t
                });
            }
        });
    },
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});