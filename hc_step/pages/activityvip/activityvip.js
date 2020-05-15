var app = getApp();

Page({
    data: {},
    onLoad: function(a) {
        wx.showToast({
            title: "加载中",
            icon: "loading",
            duration: 2e3,
            mask: !0
        });
    },
    onReady: function() {},
    Shenhe: function() {
        var o = this;
        app.util.request({
            url: "entry/wxapp/Shenhe",
            method: "POST",
            success: function(a) {
                var t = a.data.data.shenhe, e = o.data.huid;
                app.globalData.sh_en = a.data.data.shenhe, o.setData({
                    sh_en: t,
                    huid: !e
                });
            }
        });
    },
    Headcolor: function() {
        var n = this;
        app.util.request({
            url: "entry/wxapp/Headcolor",
            method: "POST",
            data: {
                user_id: app.globalData.user_id
            },
            success: function(a) {
                var t = a.data.data.inviteball, e = a.data.data.sonlist, o = a.data.data.set;
                app.globalData.setaa = a.data.data.set, n.setData({
                    inviteball: t,
                    sonlist: e,
                    setaa: o
                }), wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: o.headcolor
                }), wx.setNavigationBarTitle({
                    title: o.xcx
                });
            },
            fail: function(a) {
                console.log("失败" + a);
            }
        });
    },
    tyuia: function(a) {
        var t = a.currentTarget.dataset.jump, e = a.currentTarget.dataset.xcxpath, o = a.currentTarget.dataset.xcxappid, n = a.currentTarget.dataset.id;
        if (1 == t) wx.navigateTo({
            url: "../activity/activity"
        }); else if (2 == t) wx.navigateTo({
            url: "../Defiance/Defiance"
        }); else if (3 == t) wx.navigateTo({
            url: "../still/still"
        }); else if (4 == t) wx.navigateToMiniProgram({
            appId: o,
            path: e,
            extraData: {},
            envVersion: "release",
            success: function(a) {
                console.log(a);
            },
            fail: function(a) {
                console.log(a);
            }
        }); else if (5 == t) {
            var i = a.currentTarget.dataset.h5;
            app.globalData.h5 = a.currentTarget.dataset.h5, wx.navigateTo({
                url: "../white/white?h5=" + i
            });
        } else if (6 == t) {
            var s = a.currentTarget.dataset.diypic;
            wx.navigateTo({
                url: "../tu/tu?img=" + s
            });
        } else if (7 == t) {
            var l = a.currentTarget.dataset.ad;
            console.log(l);
            var r = null;
            wx.createRewardedVideoAd && (r = wx.createRewardedVideoAd({
                adUnitId: l
            })), r && (r.show().catch(function(a) {
                r.load().then(function() {
                    return r.show();
                });
            }), r.onClose(function(a) {
                (a && a.isEnded || void 0 === a) && app.util.request({
                    url: "entry/wxapp/Huodongshipin",
                    method: "POST",
                    data: {
                        user_id: app.globalData.user_id,
                        huodong_id: n
                    },
                    success: function(a) {}
                });
            }));
        }
    },
    Huodonglist: function() {
        var e = this;
        app.util.request({
            url: "entry/wxapp/Huodonglist",
            method: "POST",
            success: function(a) {
                var t = a.data.data.huodonglist;
                e.setData({
                    mainlist: t
                }), console.log(t);
            }
        });
    },
    onShow: function() {
        "function" == typeof this.getTabBar && this.getTabBar() && this.getTabBar().setData({
            selected: 1
        }), this.Headcolor(), this.Huodonglist(), this.fupiao(), this.Shenhe();
    },
    fupiao: function() {
        var n = this;
        app.Headcolor(), setTimeout(function() {
            var a = app.globalData.setdata.is_float, t = app.globalData.setdata.phoneno, e = app.globalData.setdata.copytext;
            if (1 == a) var o = app.globalData.setdata.call_icon; else o = app.globalData.setdata.copy_icon;
            n.setData({
                poc: a,
                phone: t,
                iconimh: o,
                txttex: e
            });
        }, 1e3);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});