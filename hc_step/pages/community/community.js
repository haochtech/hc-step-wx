var app = getApp();

Page({
    data: {
        fowwol: [ "推荐", "关注", "我的" ],
        fowwolindex: 0,
        pageNum: 1
    },
    onLoad: function() {
        var t = this;
        if (t.setData({
            user_id: app.globalData.user_id
        }), app.globalData.headcolor) var a = app.globalData.headcolor; else a = "#ffffff";
        if ("#ffffff" == a) var e = "#000000"; else e = "#ffffff";
        wx.setNavigationBarColor({
            frontColor: e,
            backgroundColor: a
        }), t.Dtlist(), t.Topiclist(), t.Imgurl(), setTimeout(function() {
            t.byqshare();
        }, 500);
    },
    Imgurl: function() {
        var i = this;
        app.util.request({
            url: "entry/wxapp/Imgurl",
            method: "post",
            dataType: "json",
            success: function(t) {
                var a = t.data.data, e = t.data.data.setdata;
                i.setData({
                    newset: e,
                    imgset: a
                });
            }
        });
    },
    onShow: function() {
        this.Dt_news(), this.Dtlist(), this.setData({
            pageNum: 1
        });
    },
    vies_dopeone: function() {
        wx.navigateTo({
            url: "../dopeone/dopeone"
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
    Dt_news: function() {
        var i = this;
        app.util.request({
            url: "entry/wxapp/Dt_news",
            data: {
                user_id: i.data.user_id
            },
            method: "POST",
            success: function(t) {
                console.log(t);
                var a = t.data.data.status, e = t.data.data.list;
                wx.setStorage({
                    key: "Dt_newlist",
                    data: e
                }), i.setData({
                    Dt_newsstatus: a
                });
            }
        });
    },
    touchend: function(t) {
        var a = t.currentTarget.dataset.detailsid;
        wx.navigateTo({
            url: "../topic_details/topic_details?detailsid=" + a
        });
    },
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
    followqe: function(t) {
        var a = t.currentTarget.dataset.index;
        0 == a ? (this.Dtlist(), this.setData({
            fowwolindex: a,
            pageNum: 1
        })) : 1 == a ? (this.Dtlist_g(), this.setData({
            fowwolindex: a,
            pageNum: 1
        })) : 2 == a && wx.navigateTo({
            url: "../personalhomepage/personalhomepage?my_id=" + app.globalData.user_id + "&target_id=" + app.globalData.user_id
        });
    },
    Dtlist: function() {
        var i = this;
        app.util.request({
            url: "entry/wxapp/Dtlist",
            data: {
                user_id: i.data.user_id
            },
            method: "POST",
            success: function(t) {
                for (var a = t.data.data, e = 0; e < a.length; e++) 70 < a[e].zishu ? a[e].foldlength = !0 : a[e].foldlength = !1;
                console.log(a), i.setData({
                    Dtlist: a
                });
            }
        });
    },
    Dtlist_g: function() {
        var i = this;
        app.util.request({
            url: "entry/wxapp/Guanzhulist",
            data: {
                user_id: i.data.user_id
            },
            method: "POST",
            success: function(t) {
                for (var a = t.data.data, e = 0; e < a.length; e++) 70 < a[e].zishu ? a[e].foldlength = !0 : a[e].foldlength = !1;
                i.setData({
                    Dtlist_g: a
                });
            }
        });
    },
    onReady: function() {},
    xiashi: function(t) {},
    deploy: function(t) {
        var a = t.currentTarget.id;
        if (0 == this.data.fowwolindex) {
            var e = this.data.Dtlist[a].foldlength;
            this.data.Dtlist[a].foldlength = !e, this.setData({
                Dtlist: this.data.Dtlist
            });
        } else {
            var i = this.data.Dtlist_g[a].foldlength;
            this.data.Dtlist_g[a].foldlength = !i, this.setData({
                Dtlist_g: this.data.Dtlist_g
            });
        }
        console.log(a);
    },
    switchTab: function(t) {
        var a = t.currentTarget.dataset.index;
        this.setData({
            tabIndex: a
        }), 1 == a ? this.follcha(a) : this.xiashi(a);
    },
    myattention: function() {
        wx.navigateTo({
            url: "../myAttention/myAttention"
        });
    },
    like: function(t) {
        var a = t.currentTarget.id, e = t.currentTarget.dataset.keyid, i = t.currentTarget.dataset.liked;
        this.data.toplist[a].like = i, this.setData({
            toplist: this.data.toplist
        }), _tools2.default.request({
            method: "get",
            url: "entry/wxapp/like",
            data: {
                token: wx.getStorageSync("token"),
                keyid: e,
                liked: i
            },
            success: function(t) {}
        });
    },
    memid: function(t) {
        var a = t.currentTarget.dataset.my_id, e = t.currentTarget.dataset.target_id;
        wx.navigateTo({
            url: "../personalhomepage/personalhomepage?my_id=" + a + "&target_id=" + e
        });
    },
    follow: function(t) {
        console.log(t);
        var a = t.currentTarget.dataset.src, e = t.target.id;
        if (0 == this.data.fowwolindex) var i = this.data.Dtlist[e].content_img; else i = this.data.Dtlist_g[e].content_img;
        wx.previewImage({
            current: a,
            urls: i
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
        if (a.Zan(i), 0 == a.data.fowwolindex) var n = a.data.Dtlist; else if (1 == a.data.fowwolindex) n = a.data.Dtlist_g;
        0 == s ? (n[e].is_zan = 1, n[e].zan = n[e].zan + 1, 0 == a.data.fowwolindex ? a.setData({
            Dtlist: n
        }) : 1 == a.data.fowwolindex && a.setData({
            Dtlist_g: n
        }), a.setData({
            Dtlist: n
        })) : (n[e].is_zan = 0, n[e].zan = n[e].zan - 1, 0 == a.data.fowwolindex ? a.setData({
            Dtlist: n
        }) : 1 == a.data.fowwolindex && a.setData({
            Dtlist_g: n
        }));
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
    Topiclist: function() {
        var e = this;
        app.util.request({
            url: "entry/wxapp/Topiclist",
            method: "POST",
            success: function(t) {
                var a = t.data.data;
                e.setData({
                    yao: a
                }), console.log(a);
            }
        });
    },
    release: function() {
        if ("" == this.data.user_id || null == this.data.user_id) return wx.showModal({
            title: "提示",
            content: "首页授权后才能发布",
            success: function(t) {
                t.confirm ? wx.reLaunch({
                    url: "../index/index"
                }) : t.cancel;
            }
        }), !1;
        wx.navigateTo({
            url: "../release/release"
        });
    },
    addfollow: function(t) {
        var e = this, i = (t.target.id, t.currentTarget.dataset.follow_id), s = t.currentTarget.dataset.user_id;
        if ("" == s || null == s) return wx.showModal({
            title: "提示",
            content: "首页授权后才能关注",
            success: function(t) {
                t.confirm ? wx.reLaunch({
                    url: "../index/index"
                }) : t.cancel;
            }
        }), !1;
        var a = t.currentTarget.dataset.status;
        if (0 == e.data.fowwolindex) var n = e.data.Dtlist; else if (1 == e.data.fowwolindex) n = e.data.Dtlist_g;
        if (0 == a) {
            e.Guanzhu(s, i);
            for (var o = 0; o < n.length; o++) n[o].user_id == i && (n[o].status = 1);
            0 == e.data.fowwolindex ? e.setData({
                Dtlist: n
            }) : 1 == e.data.fowwolindex && e.setData({
                Dtlist_g: n
            });
        } else wx.showModal({
            title: "提示",
            content: "确定取消关注？",
            success: function(t) {
                if (t.confirm) {
                    e.Guanzhu(s, i);
                    for (var a = 0; a < n.length; a++) n[a].user_id == i && (n[a].status = 0);
                    0 == e.data.fowwolindex ? e.setData({
                        Dtlist: n
                    }) : 1 == e.data.fowwolindex && e.setData({
                        Dtlist_g: n
                    });
                } else t.cancel;
            }
        });
    },
    jaizai: function(t) {
        var i = this;
        if (0 == i.data.fowwolindex) var a = "entry/wxapp/Dtlist", s = i.data.Dtlist; else if (1 == fowwolindex) a = "entry/wxapp/Dtlist_g", 
        s = i.data.Dtlist_g;
        app.util.request({
            url: a,
            method: "POST",
            data: {
                page: t,
                user_id: app.globalData.user_id
            },
            success: function(t) {
                for (var a = t.data.data, e = 0; e < a.length; e++) s.push(a[e]);
                if (0 == i.data.fowwolindex) {
                    for (e = 0; e < s.length; e++) 70 < s[e].zishu ? s[e].foldlength = !0 : s[e].foldlength = !1;
                    i.setData({
                        Dtlist: s
                    });
                } else {
                    for (e = 0; e < s.length; e++) 70 < s[e].zishu ? s[e].foldlength = !0 : s[e].foldlength = !1;
                    i.setData({
                        Dtlist_g: s
                    });
                }
                wx.hideToast();
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
    onPullDownRefresh: function() {
        0 == this.data.fowwolindex ? this.Dtlist() : this.Dtlist_g(), this.Dt_news(), setTimeout(function() {
            wx.stopPullDownRefresh();
        }, 2e3);
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
            title: this.data.share.share_title1,
            path: "/hc_step/pages/index/index?community=community"
        };
    }
});