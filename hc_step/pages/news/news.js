var app = getApp();

Page({
    data: {},
    onLoad: function(a) {
        var t = app.globalData.setaa;
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: t.headcolor
        }), wx.setNavigationBarTitle({
            title: t.xcx
        }), this.Headcolor();
    },
    dians: function() {
        wx.navigateTo({
            url: "../dope/dope"
        });
    },
    Headcolor: function() {
        var e = this;
        app.util.request({
            url: "entry/wxapp/Headcolor",
            method: "POST",
            data: {
                user_id: app.globalData.user_id
            },
            success: function(a) {
                var t = a.data.data.inviteball, o = a.data.data.sonlist, n = a.data.data.set;
                app.globalData.setaa = a.data.data.set, e.setData({
                    inviteball: t,
                    sonlist: o,
                    setaa: n
                }), wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: n.headcolor
                }), wx.setNavigationBarTitle({
                    title: n.xcx
                });
            },
            fail: function(a) {
                console.log("失败" + a);
            }
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