var app = getApp();

Page({
    data: {},
    onLoad: function(t) {
        if (app.globalData.headcolor) var a = app.globalData.headcolor; else a = "#ffffff";
        if ("#ffffff" == a) var e = "#000000"; else e = "#ffffff";
        wx.setNavigationBarColor({
            frontColor: e,
            backgroundColor: a
        }), console.log(wx.getStorageSync("Dt_newlist"));
        var o = wx.getStorageSync("Dt_newlist");
        this.setData({
            Dt_newlist: o
        });
    },
    Read_news: function() {
        app.util.request({
            url: "entry/wxapp/Read_news",
            data: {
                user_id: app.globalData.user_id
            },
            method: "POST",
            success: function(t) {}
        });
    },
    detailsid: function(t) {
        var a = t.currentTarget.dataset.dt_id;
        2 != t.currentTarget.dataset.type && wx.navigateTo({
            url: "../topic_details/topic_details?detailsid=" + a
        });
    },
    onReady: function() {},
    onShow: function() {
        this.Read_news();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});