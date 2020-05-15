var app = getApp();

Page({
    data: {
        lable: !0
    },
    onLoad: function(t) {
        var e = this;
        e.Missionlist(), wx.login({
            success: function(t) {
                app.util.request({
                    url: "entry/wxapp/Getsessionkey",
                    method: "POST",
                    data: {
                        code: t.code
                    },
                    success: function(t) {
                        console.log(t);
                        var a = t.data.data.session_key;
                        e.setData({
                            session_key: a
                        });
                    }
                });
            }
        });
    },
    Missionlist: function() {
        var e = this;
        app.util.request({
            url: "entry/wxapp/Missionlist",
            method: "POST",
            data: {
                user_id: app.globalData.user_id
            },
            success: function(t) {
                var a = t.data.data;
                e.setData({
                    Missionlist: a
                });
            }
        });
    },
    tiao: function(t) {
        var a = this, e = t.currentTarget.dataset.appid, s = t.currentTarget.dataset.path, i = t.currentTarget.dataset.mission_id;
        wx.navigateToMiniProgram({
            appId: e,
            path: s,
            extraData: {
                foo: "bar"
            },
            envVersion: "release",
            success: function(t) {
                a.Missiondo(i);
            }
        });
    },
    fdatie: function(t) {
        var a = t.currentTarget.dataset.mission_id;
        this.Missiondo(a), wx.navigateTo({
            url: "../community/community"
        });
    },
    getPhoneNumber: function(t) {
        var a = this;
        console.log(t.detail.errMsg), console.log(t.detail.iv), console.log(t.detail.encryptedData);
        var e = t.currentTarget.dataset.mission_id;
        app.util.request({
            url: "entry/wxapp/Missiondo",
            method: "POST",
            data: {
                user_id: app.globalData.user_id,
                mission_id: e,
                iv: t.detail.iv,
                encryptedData: t.detail.encryptedData,
                session_key: a.data.session_key
            },
            success: function(t) {
                a.Missionlist();
            }
        });
    },
    getPhoneNumberqu: function(t) {
        var a = this, e = t.currentTarget.dataset.mission_id, s = t.currentTarget.dataset.ad, i = null;
        wx.createRewardedVideoAd && (i = wx.createRewardedVideoAd({
            adUnitId: s
        })), i && (i.show().catch(function(t) {
            i.load().then(function() {
                return i.show();
            });
        }), i.onClose(function(t) {
            t && t.isEnded || void 0 === t ? app.util.request({
                url: "entry/wxapp/Missiondo",
                method: "POST",
                data: {
                    user_id: app.globalData.user_id,
                    mission_id: e
                },
                success: function(t) {
                    console.log(t, "Missiondo"), a.Missionlist();
                }
            }) : wx.showModal({
                title: "提示",
                content: "中途退出不会得到奖励哦",
                success: function(t) {
                    t.confirm ? console.log("用户点击确定") : t.cancel && console.log("用户点击取消");
                }
            });
        }));
    },
    Missiondo: function(t) {
        var a = this;
        app.util.request({
            url: "entry/wxapp/Missiondo",
            method: "POST",
            data: {
                user_id: app.globalData.user_id,
                mission_id: t
            },
            success: function(t) {
                a.Missionlist();
            }
        });
    },
    lingqu: function(t) {
        var a = this, e = t.currentTarget.dataset.mission_id;
        wx.showToast({
            title: "领取成功",
            icon: "succes",
            duration: 1e3
        }), app.util.request({
            url: "entry/wxapp/Mission2bushu",
            method: "POST",
            data: {
                user_id: app.globalData.user_id,
                mission_id: e
            },
            success: function(t) {
                a.Missionlist();
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        this.Headcolor();
        var t = getCurrentPages();
        console.log(t[0].__displayReporter.route);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    Headcolor: function() {
        var n = this;
        return new Promise(function(t, a) {
            app.util.request({
                url: "entry/wxapp/Headcolor",
                method: "POST",
                data: {
                    user_id: app.globalData.user_id
                },
                success: function(t) {
                    var a = t.data.data.inviteball, e = t.data.data.sonlist, s = t.data.data.set;
                    app.globalData.setaa = t.data.data.set;
                    var i = s.shenhe, o = t.data.data.user;
                    n.setData({
                        inviteball: a,
                        sonlist: e,
                        setaa: s,
                        shenhe: i,
                        user: o
                    }), wx.setNavigationBarColor({
                        frontColor: "#ffffff",
                        backgroundColor: s.headcolor
                    }), wx.setNavigationBarTitle({
                        title: s.xcx
                    });
                },
                fail: function(t) {
                    console.log("失败", t);
                }
            });
        });
    },
    onShareAppMessage: function(t) {
        var a = this;
        return {
            title: a.data.setaa.sharetitle,
            imageUrl: a.data.setaa.sharepic,
            path: "/hc_step/pages/index/index?invite=" + app.globalData.user_id,
            success: function(t) {
                console.log("本地user_id", a.data.user_id);
            },
            fail: function(t) {}
        };
    }
});