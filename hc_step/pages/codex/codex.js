var app = getApp();

Page({
    data: {},
    onLoad: function(a) {
        console.log(Promise);
        var o = app.globalData.setaa;
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: o.headcolor
        }), this.Headcolor();
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
                var o = a.data.data.inviteball, t = a.data.data.sonlist, e = a.data.data.set;
                app.globalData.setaa = a.data.data.set;
                var n = e.shenhe;
                l.setData({
                    inviteball: o,
                    sonlist: t,
                    setaa: e,
                    shenhe: n
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
    onReady: function() {},
    onShow: function() {
        this.fupiao();
    },
    fupiao: function() {
        var n = this;
        app.Headcolor(), setTimeout(function() {
            var a = app.globalData.setdata.is_float, o = app.globalData.setdata.phoneno, t = app.globalData.setdata.copytext;
            if (1 == a) var e = app.globalData.setdata.call_icon; else e = app.globalData.setdata.copy_icon;
            n.setData({
                poc: a,
                phone: o,
                iconimh: e,
                txttex: t
            });
        }, 1e3);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});