var app = getApp();

Page({
    data: {
        pageNum: 1,
        guanw: !0
    },
    follwith: function(t) {
        var a = this, e = t.currentTarget.dataset.status;
        a.data.info.status = 0 == e ? 1 : 0, a.Guanzhu(a.data.my_id, a.data.target_id), 
        a.setData({
            info: a.data.info
        }), a.Dtlist();
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
        a.Zan(i), 0 == s ? (a.data.Dtlist[e].is_zan = 1, a.data.Dtlist[e].zan = a.data.Dtlist[e].zan + 1) : (a.data.Dtlist[e].is_zan = 0, 
        a.data.Dtlist[e].zan = a.data.Dtlist[e].zan - 1), a.setData({
            Dtlist: a.data.Dtlist
        }), a.Dtlist();
    },
    onLoad: function(t) {
        var a = this;
        if (app.globalData.headcolor) var e = app.globalData.headcolor; else e = "#ffffff";
        if ("#ffffff" == e) var i = "#000000"; else i = "#ffffff";
        wx.setNavigationBarColor({
            frontColor: i,
            backgroundColor: e
        });
        var s = t.my_id, n = t.my_id, d = t.target_id;
        a.setData({
            my_id: n,
            target_id: d,
            user_id: s
        }), a.Dtlist(), setTimeout(function() {
            a.byqshare();
        }, 500);
    },
    onShow: function() {
        this.setData({
            pageNum: 1
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
            e.data.info.status = 1, e.setData({
                Dtlist: e.data.Dtlist,
                info: e.data.info
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
                    }), e.Dtlist();
                } else t.cancel;
            }
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
    Dtlist: function() {
        var s = this;
        app.util.request({
            url: "entry/wxapp/Myhome",
            data: {
                my_id: s.data.user_id,
                target_id: s.data.target_id
            },
            method: "POST",
            success: function(t) {
                for (var a = t.data.data.info, e = t.data.data.list, i = 0; i < e.length; i++) 70 < e[i].zishu ? e[i].foldlength = !0 : e[i].foldlength = !1;
                console.log(e), s.setData({
                    Dtlist: e,
                    info: a
                });
            }
        });
    },
    deploy: function(t) {
        var a = t.currentTarget.id, e = this.data.Dtlist, i = e[a].foldlength;
        e[a].foldlength = !i, this.setData({
            Dtlist: e
        }), console.log(a);
    },
    follow: function(t) {
        console.log(t);
        var a = t.currentTarget.dataset.src, e = t.target.id, i = this.data.Dtlist[e].content_img;
        wx.previewImage({
            current: a,
            urls: i
        });
    },
    remove: function(t) {
        var a = this, e = t.currentTarget.id, i = t.currentTarget.dataset.dt_id;
        wx.showModal({
            title: "提示",
            content: "确定删除么？",
            success: function(t) {
                t.confirm ? app.util.request({
                    url: "entry/wxapp/Deletedt",
                    data: {
                        user_id: a.data.user_id,
                        dt_id: i
                    },
                    method: "POST",
                    success: function(t) {
                        a.data.Dtlist.splice(e, 1), a.setData({
                            Dtlist: a.data.Dtlist
                        });
                    }
                }) : t.cancel;
            }
        });
    },
    comment: function(t) {
        var a = t.currentTarget.dataset.comment_id;
        wx.navigateTo({
            url: "../topic_details/topic_details?comment_id=" + a
        });
    },
    dainz: function() {},
    topic: function(t) {
        var a = t.currentTarget.dataset.topic_id;
        wx.navigateTo({
            url: "../topic_to/topic_to?topic_id=" + a
        });
    },
    topic_details: function(t) {
        var a = t.currentTarget.dataset.detailsid;
        wx.navigateTo({
            url: "../topic_details/topic_details?detailsid=" + a
        });
    },
    jaizai: function(t) {
        var i = this, s = i.data.Dtlist;
        app.util.request({
            url: "entry/wxapp/Myhome",
            method: "POST",
            data: {
                page: t,
                user_id: app.globalData.user_id
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
    onPullDownRefresh: function() {
        this.Dtlist(), setTimeout(function() {
            wx.stopPullDownRefresh();
        }, 2e3);
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
        var a = this, e = t.target.dataset.detailsid;
        return "button" === t.from ? t.target.dataset.zhuye ? {
            title: a.data.share.share_title2,
            path: "/hc_step/pages/index/index?my_id=" + a.data.my_id + "&personalhomepage=personalhomepage&target_id=" + a.data.target_id
        } : {
            title: a.data.share.share_title3,
            path: "/hc_step/pages/index/index?detailsid=" + e + "&topic_details=topic_details"
        } : {
            title: a.data.share.share_title2,
            path: "/hc_step/pages/index/index?my_id=" + a.data.my_id + "&personalhomepage=personalhomepage&target_id=" + a.data.target_id
        };
    }
});