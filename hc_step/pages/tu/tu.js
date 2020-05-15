var app = getApp();

Page({
    data: {},
    onLoad: function(a) {
        var t = a.img;
        this.setData({
            img: t
        }), this.Headcolor();
    },
    onReady: function() {},
    Headcolor: function() {
        var s = this;
        return new Promise(function(a, t) {
            app.util.request({
                url: "entry/wxapp/Headcolor",
                method: "POST",
                data: {
                    user_id: app.globalData.user_id
                },
                success: function(a) {
                    var t = a.data.data.inviteball, o = a.data.data.sonlist, n = a.data.data.set;
                    app.globalData.setaa = a.data.data.set;
                    var e = n.shenhe, i = a.data.data.user;
                    s.setData({
                        inviteball: t,
                        sonlist: o,
                        setaa: n,
                        shenhe: e,
                        user: i
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
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});