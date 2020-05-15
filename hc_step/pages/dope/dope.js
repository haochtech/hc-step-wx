var app = getApp();

Page({
    data: {
        fowwol: [ "点赞", "粉丝", "评论" ],
        fowwolindex: 0
    },
    onLoad: function(t) {
        if (app.globalData.headcolor) var a = app.globalData.headcolor; else a = "#ffffff";
        if ("#ffffff" == a) var o = "#000000"; else o = "#ffffff";
        wx.setNavigationBarColor({
            frontColor: o,
            backgroundColor: a
        }), this.AllDt_new(this.data.fowwolindex);
    },
    followqe: function(t) {
        var a = t.currentTarget.dataset.index;
        this.setData({
            fowwolindex: a
        }), this.AllDt_new(a), wx.showToast({
            title: "加载中",
            icon: "loading",
            duration: 1e4,
            mask: !0
        });
    },
    detailsid: function(t) {
        var a = t.currentTarget.dataset.dt_id;
        wx.navigateTo({
            url: "../topic_details/topic_details?detailsid=" + a
        });
    },
    AllDt_new: function(t) {
        var o = this;
        app.util.request({
            url: "entry/wxapp/AllDt_news",
            data: {
                user_id: app.globalData.user_id,
                AllDt_newid: t
            },
            method: "POST",
            success: function(t) {
                wx.hideToast();
                var a = t.data.data.list;
                o.setData({
                    AllDt_new: a
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});