var app = getApp();

Page({
    data: {
        Ping: !1
    },
    onLoad: function(t) {
        if (app.globalData.headcolor) var a = app.globalData.headcolor; else a = "#ffffff";
        if ("#ffffff" == a) var e = "#000000"; else e = "#ffffff";
        wx.setNavigationBarColor({
            frontColor: e,
            backgroundColor: a
        }), this.setData({
            detailsid: t.detailsid,
            user_id: app.globalData.user_id
        }), this.Dtlist();
    },
    Zan: function(t) {
        app.util.request({
            url: "entry/wxapp/Zan",
            method: "POST",
            data: {
                dt_id: t,
                user_id: this.data.user_id
            },
            success: function(t) {}
        });
    },
    Fabulous: function(t) {
        var a = this, e = t.currentTarget.id, n = t.currentTarget.dataset.dt_id, i = t.currentTarget.dataset.is_zan;
        a.Zan(n), 0 == i ? (a.data.Dtlist[e].is_zan = 1, a.data.Dtlist[e].zan = a.data.Dtlist[e].zan + 1) : (a.data.Dtlist[e].is_zan = 0, 
        a.data.Dtlist[e].zan = a.data.Dtlist[e].zan - 1), a.setData({
            Dtlist: a.data.Dtlist
        });
    },
    Dtlist: function() {
        var n = this;
        app.util.request({
            url: "entry/wxapp/Dtlist",
            data: {
                user_id: n.data.user_id,
                detailsid: n.data.detailsid
            },
            method: "POST",
            success: function(t) {
                for (var a = t.data.data, e = 0; e < a.length; e++) 70 < a[e].zishu ? a[e].foldlength = !0 : a[e].foldlength = !1;
                console.log(a), n.setData({
                    Dtlist: a
                });
            }
        });
    },
    complete: function() {
        var t = this;
        if ("" == t.data.user_id || null == t.data.user_id) return wx.showModal({
            title: "提示",
            content: "首页授权后才能评论",
            success: function(t) {
                t.confirm ? wx.reLaunch({
                    url: "../index/index"
                }) : t.cancel;
            }
        }), !1;
        t.setData({
            Ping: !t.data.Ping,
            focus: !0,
            content: ""
        });
    },
    map: function(t) {
        var a = t.currentTarget.dataset.position, e = Number(t.currentTarget.dataset.latitude), n = Number(t.currentTarget.dataset.longitude);
        wx.openLocation({
            latitude: e,
            longitude: n,
            scale: 15,
            address: a
        });
    },
    memid: function(t) {
        var a = t.currentTarget.dataset.my_id, e = t.currentTarget.dataset.target_id;
        wx.navigateTo({
            url: "../personalhomepage/personalhomepage?my_id=" + a + "&target_id=" + e
        });
    },
    topic: function(t) {
        var a = t.currentTarget.dataset.topic_id;
        wx.navigateTo({
            url: "../topic_to/topic_to?topic_id=" + a
        });
    },
    content: function(t) {
        this.setData({
            content: t.detail.value
        });
    },
    Addpl: function() {
        var a = this;
        if ("" == a.data.content) return wx.showToast({
            title: "请填写内容",
            icon: "none",
            duration: 1e3
        }), !1;
        app.util.request({
            url: "entry/wxapp/Addpl",
            data: {
                user_id: a.data.user_id,
                content: a.data.content,
                dt_id: a.data.detailsid
            },
            method: "POST",
            success: function(t) {
                a.Dtlist(), a.setData({
                    Ping: !1
                });
            }
        });
    },
    addfollow: function(t) {
        var a = this, e = t.target.id, n = t.currentTarget.dataset.follow_id, i = t.currentTarget.dataset.user_id;
        0 == t.currentTarget.dataset.status ? (a.Guanzhu(i, n), a.data.Dtlist[e].status = 1, 
        a.setData({
            Dtlist: a.data.Dtlist
        })) : wx.showModal({
            title: "提示",
            content: "确定取消关注？",
            success: function(t) {
                t.confirm ? (a.Guanzhu(i, n), a.data.Dtlist[e].status = 0, a.setData({
                    Dtlist: a.data.Dtlist
                })) : t.cancel;
            }
        });
    },
    Guanzhu: function(t, a) {
        app.util.request({
            url: "entry/wxapp/Guanzhu",
            method: "POST",
            data: {
                user_id: t,
                follow_id: a
            },
            success: function(t) {}
        });
    },
    follow: function(t) {
        console.log(t);
        var a = t.currentTarget.dataset.src, e = t.target.id, n = this.data.Dtlist[e].content_img;
        wx.previewImage({
            current: a,
            urls: n
        });
    },
    deploy: function(t) {
        var a = t.currentTarget.id, e = this.data.Dtlist, n = e[a].foldlength;
        e[a].foldlength = !n, this.setData({
            Dtlist: e
        }), console.log(a);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});