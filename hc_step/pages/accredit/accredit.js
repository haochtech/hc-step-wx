var app = getApp();

Page({
    data: {},
    onLoad: function(a) {
        var t = app.globalData.setaa;
        this.setData({
            setaa: t
        }), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: t.headcolor
        }), wx.setNavigationBarTitle({
            title: t.xcx
        });
    },
    fupiao: function() {
        var e = this;
        app.Headcolor(), setTimeout(function() {
            var a = app.globalData.setdata.is_float, t = app.globalData.setdata.phoneno, o = app.globalData.setdata.copytext;
            if (1 == a) var n = app.globalData.setdata.call_icon; else n = app.globalData.setdata.copy_icon;
            e.setData({
                poc: a,
                phone: t,
                iconimh: n,
                txttex: o
            });
        }, 1e3);
    },
    bindopensetting: function() {
        wx.openSetting({
            success: function(a) {
                a.authSetting = {
                    "scope.werun": !0
                };
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        var o = this;
        wx.getSetting({
            success: function(a) {
                if (a.authSetting["scope.werun"]) t = 1; else var t = 0;
                o.setData({
                    shou: t
                });
            }
        }), o.fupiao();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});