var app = getApp();

Page({
    data: {
        indicatorDots: !1,
        autoplay: !0,
        interval: 5e3,
        duration: 1e3,
        previousmargin: "137rpx",
        nextmargin: "137rpx",
        circular: !0,
        tuhight: 0,
        lable: !1,
        Mask: !1
    },
    onLoad: function(t) {
        var a = wx.getMenuButtonBoundingClientRect().top;
        this.setData({
            top: a
        }), this.Kouhonglist();
    },
    lablefor: function(t) {
        console.log(t.currentTarget.dataset);
        var a = this, e = (t.currentTarget.dataset.index, t.currentTarget.dataset.id), i = t.currentTarget.dataset.paytype, n = t.currentTarget.dataset.selltype, o = a.data.lable;
        o = 0 == o, a.setData({
            lable: o,
            id: e,
            paytype: i,
            selltype: n,
            autoplay: !a.data.autoplay
        });
    },
    Game: function() {
        var i = this;
        app.util.request({
            url: "entry/wxapp/Game",
            method: "POST",
            data: {
                user_id: app.globalData.user_id,
                id: i.data.id,
                paytype: i.data.paytype,
                selltype: i.data.selltype
            },
            success: function(t) {
                var a = t.data.data.status, e = t.data.data;
                app.globalData.url = e, i.setData({
                    url: e
                }), console.log(e), 1 == a ? i.setData({
                    Mask: !0
                }) : 2 == a ? wx.showModal({
                    title: "提示",
                    content: "您今日挑战次数已达上限",
                    success: function(t) {
                        t.confirm && console.log("用户点击确定");
                    }
                }) : wx.navigateTo({
                    url: "../gamet/gamet"
                });
            }
        });
    },
    myzhia: function() {
        this.setData({
            Mask: !1
        });
    },
    bindchange: function(t) {
        var a = t.detail.current;
        this.data.imgUrls;
        this.setData({
            tuhight: a,
            lable: !1,
            autoplay: !0
        });
    },
    fan: function() {
        wx.reLaunch({
            url: "../../../pages/index/index"
        });
    },
    Kouhonglist: function() {
        var o = this;
        app.util.request({
            url: "entry/wxapp/Kouhonglist",
            method: "POST",
            data: {
                user_id: app.globalData.user_id
            },
            success: function(t) {
                var a = t.data.data.list, e = t.data.data.peoplelist, i = t.data.data.pic, n = t.data.data.title;
                o.setData({
                    imgUrls: a,
                    peoplelist: e,
                    pic: i,
                    title: n
                });
            }
        });
    },
    game: function() {
        1 == this.data.lable ? this.Game() : wx.showToast({
            title: "请选择一个商品",
            icon: "none",
            duration: 1e3,
            mask: !0
        });
    },
    mall: function() {
        wx.navigateTo({
            url: "../../../pages/still/still"
        });
    },
    onReady: function() {},
    onShow: function() {
        this.Kouhonglist();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(t) {
        var a = app.globalData.user_id;
        return console.log(a, "转发user_id"), {
            title: this.data.title,
            path: "hc_step/game/pages/gameinvite/gameinvite?user_id=" + app.globalData.user_id,
            imageUrl: this.data.pic,
            success: function(t) {},
            fail: function(t) {}
        };
    }
});