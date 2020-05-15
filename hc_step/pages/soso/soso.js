var app = getApp();

Page({
    data: {},
    onLoad: function(o) {
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: app.globalData.Headcolor
        }), this.tudizhi();
    },
    onReady: function() {},
    onShow: function() {
        this.tudizhi();
    },
    search: function() {
        wx.navigateTo({
            url: "../search/search"
        });
    },
    tudizhi: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/Chaojiso",
            method: "POST",
            success: function(o) {
                var n = o.data.data;
                t.setData({
                    Notice: n
                });
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});