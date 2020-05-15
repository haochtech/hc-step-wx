var app = getApp();

Page({
    data: {},
    getUserInfo: function(t) {
        var e = this;
        wx.getSetting({
            success: function(a) {
                a.authSetting["scope.userInfo"] ? e.login(t) : wx.showModal({
                    title: "提示",
                    content: "获取用户信息失败,需要授权才能继续使用！",
                    showCancel: !1,
                    confirmText: "授权",
                    success: function(a) {
                        a.confirm && wx.openSetting({
                            success: function(a) {
                                a.authSetting["scope.userInfo"] ? wx.showToast({
                                    title: "授权成功"
                                }) : wx.showToast({
                                    title: "未授权..."
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    onShow: function() {
        this.bgl();
    },
    register: function(u) {
        var a = app.globalData.invite;
        console.log("接收参数2", a);
        var t = this;
        wx.getStorage({
            key: "user",
            success: function(a) {
                var t = a.data.detail, e = a.data.detail.openid, o = (t = t.userInfo).country, n = t.province, i = t.city, s = t.gender, r = t.nickName, c = t.avatarUrl;
                app.util.request({
                    url: "entry/wxapp/zhuce",
                    method: "post",
                    dataType: "json",
                    data: {
                        open_id: e,
                        nickName: r,
                        gender: s,
                        country: o,
                        province: n,
                        city: i,
                        avatarUrl: c,
                        invite: app.globalData.invite
                    },
                    success: function(a) {
                        app.globalData.user_id = a.data.data, "function" == typeof u && u(a.data.data), 
                        wx.reLaunch({
                            url: "../index/index"
                        });
                    }
                });
            },
            fail: function(a) {
                t.setData({});
            }
        });
    },
    xiangqig: function(a) {
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../education/education?id=" + t
        });
    },
    bgl: function() {
        var e = this;
        app.util.request({
            url: "entry/wxapp/bgl",
            method: "post",
            dataType: "json",
            success: function(a) {
                var t = a.data.data;
                e.setData({
                    denglu_bgk: t
                });
            }
        });
    },
    login: function(e) {
        var o = this;
        app.globalData.userInfo ? "function" == typeof cb && cb(app.globalData.userInfo) : wx.login({
            success: function(a) {
                var t = e.detail;
                app.globalData.userInfo = t.userInfo, t.act = "autologin", t.code = a.code, app.util.request({
                    url: "entry/wxapp/getopenid",
                    method: "post",
                    dataType: "json",
                    data: t,
                    success: function(a) {
                        0 == a.data.errno && (t.openid = a.data.data.openid, t.session_key = a.data.data.session_key, 
                        app.globalData.userInfo = t, app.globalData.userInfo = a.data.data.session_key, 
                        wx.setStorageSync("user", e), "function" == typeof cb && cb(app.globalData.userInfo), 
                        o.register(function(a) {
                            wx.reLaunch({
                                url: "../index/index"
                            });
                        }));
                    }
                });
            },
            fail: function(a) {
                console.log("获取失败");
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
    }
});