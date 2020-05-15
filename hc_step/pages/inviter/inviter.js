var app = getApp();

Page({
    data: {
        safca: [ "", "", "", "" ]
    },
    onLoad: function(a) {
        this.Headcolor();
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
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});