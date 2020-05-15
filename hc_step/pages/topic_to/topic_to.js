var app = getApp();

Page({
    data: {
        pageNum: 1
    },
    onLoad: function(t) {
        var a = this;
        if (app.globalData.headcolor) var e = app.globalData.headcolor; else e = "#ffffff";
        if ("#ffffff" == e) var i = "#000000"; else i = "#ffffff";
        wx.setNavigationBarColor({
            frontColor: i,
            backgroundColor: e
        }), a.setData({
            user_id: app.globalData.user_id,
            topic_id: t.topic_id
        }), a.Topicdtlist(), setTimeout(function() {
            a.byqshare();
        });
    },
    Topicdtlist: function() {
        var s = this;
        app.util.request({
            url: "entry/wxapp/Topicdtlist",
            data: {
                user_id: s.data.user_id,
                topic_id: s.data.topic_id
            },
            method: "POST",
            success: function(t) {
                for (var a = t.data.data.img, e = t.data.data.list, i = 0; i < e.length; i++) 70 < e[i].zishu ? e[i].foldlength = !0 : e[i].foldlength = !1;
                s.setData({
                    img: a,
                    Dtlist: e
                });
            }
        });
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
        var a = this, e = t.currentTarget.id, i = t.currentTarget.dataset.dt_id, s = t.currentTarget.dataset.is_zan;
        if ("" == app.globalData.user_id || null == app.globalData.user_id) return wx.showModal({
            title: "提示",
            content: "首页授权后才能发布",
            success: function(t) {
                t.confirm ? wx.reLaunch({
                    url: "../index/index"
                }) : t.cancel;
            }
        }), !1;
        a.Zan(i), 0 == s ? (a.data.Dtlist[e].is_zan = 1, a.data.Dtlist[e].zan = a.data.Dtlist[e].zan + 1) : (a.data.Dtlist[e].is_zan = 0, 
        a.data.Dtlist[e].zan = a.data.Dtlist[e].zan - 1), a.setData({
            Dtlist: a.data.Dtlist
        });
    },
    memid: function(t) {
        var a = t.currentTarget.dataset.my_id, e = t.currentTarget.dataset.target_id;
        wx.navigateTo({
            url: "../personalhomepage/personalhomepage?my_id=" + a + "&target_id=" + e
        });
    },
    topic_details: function(t) {
        var a = t.currentTarget.dataset.detailsid;
        wx.navigateTo({
            url: "../topic_details/topic_details?detailsid=" + a
        });
    },
    addfollow: function(t) {
        var e = this, a = t.target.id;
        if ("" == app.globalData.user_id || null == app.globalData.user_id) return wx.showModal({
            title: "提示",
            content: "首页授权后才能发布",
            success: function(t) {
                t.confirm ? wx.reLaunch({
                    url: "../index/index"
                }) : t.cancel;
            }
        }), !1;
        var i = t.currentTarget.dataset.follow_id, s = t.currentTarget.dataset.user_id;
        if (0 == t.currentTarget.dataset.status) {
            e.Guanzhu(s, i), e.data.Dtlist[a].status = 1;
            for (var n = 0; n < e.data.Dtlist.length; n++) e.data.Dtlist[n].user_id == i && (e.data.Dtlist[n].status = 1);
            e.setData({
                Dtlist: e.data.Dtlist
            });
        } else wx.showModal({
            title: "提示",
            content: "确定取消关注？",
            success: function(t) {
                if (t.confirm) {
                    e.Guanzhu(s, i);
                    for (var a = 0; a < e.data.Dtlist.length; a++) e.data.Dtlist[a].user_id == i && (e.data.Dtlist[a].status = 0);
                    e.setData({
                        Dtlist: e.data.Dtlist
                    });
                } else t.cancel;
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
        var a = t.currentTarget.dataset.src, e = t.target.id, i = this.data.Dtlist[e].content_img;
        wx.previewImage({
            current: a,
            urls: i
        });
    },
    map: function(t) {
        var a = t.currentTarget.dataset.position, e = Number(t.currentTarget.dataset.latitude), i = Number(t.currentTarget.dataset.longitude);
        wx.openLocation({
            latitude: e,
            longitude: i,
            scale: 15,
            address: a
        });
    },
    deploy: function(t) {
        var a = t.currentTarget.id, e = this.data.Dtlist, i = e[a].foldlength;
        e[a].foldlength = !i, this.setData({
            Dtlist: e
        }), console.log(a);
    },
    jaizai: function(t) {
        var i = this, s = i.data.Dtlist;
        app.util.request({
            url: "entry/wxapp/Topicdtlist",
            method: "POST",
            data: {
                page: t,
                user_id: app.globalData.user_id,
                topic_id: i.data.topic_id
            },
            success: function(t) {
                for (var a = t.data.data.list, e = 0; e < a.length; e++) s.push(a[e]);
                for (e = 0; e < s.length; e++) 70 < s[e].zishu ? s[e].foldlength = !0 : s[e].foldlength = !1;
                i.setData({
                    Dtlist: s
                }), wx.hideToast();
            }
        });
    },
    onReachBottom: function() {
        var t = this.data.pageNum;
        t++, wx.showToast({
            title: "加载中",
            icon: "loading",
            duration: 2e3
        }), this.jaizai(t), this.setData({
            pageNum: t
        });
    },
    onReady: function() {},
    onShow: function() {
        this.setData({
            pageNum: 1
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    byqshare: function() {
        var e = this;
        app.util.request({
            url: "entry/wxapp/byqshare",
            method: "POST",
            success: function(t) {
                var a = t.data.data;
                e.setData({
                    share: a
                });
            }
        });
    },
    onShareAppMessage: function(t) {
        if ("button" === t.from) {
            console.log(t);
            var a = t.target.dataset.detailsid;
            return {
                title: this.data.share.share_title3,
                path: "/hc_step/pages/index/index?detailsid=" + a + "&topic_details=topic_details"
            };
        }
        return {
            title: this.data.share.share_title4,
            path: "/hc_step/pages/index/index?topic_id=" + this.data.topic_id
        };
    }
});