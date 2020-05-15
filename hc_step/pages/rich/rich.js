var WxParse = require("../../../wxParse/wxParse.js"), app = getApp();

Page({
    data: {},
    onLoad: function(a) {
        var e = this;
        app.util.request({
            url: "entry/wxapp/Headcolor",
            method: "POST",
            success: function(a) {
                var t = a.data.data.set.rule, o = a.data.data.set;
                wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: o.headcolor
                }), wx.setNavigationBarTitle({
                    title: o.xcx
                }), WxParse.wxParse("article", "html", t, e, 5);
            },
            fail: function(a) {
                console.log("失败");
            }
        });
    },
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
    onReady: function() {},
    onShow: function() {
        this.fupiao();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});