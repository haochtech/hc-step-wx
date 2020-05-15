var n = require("../../../utils/wxcharts.js"), app = getApp();

Page({
    data: {
        imgUrls: [ "../../resource/images/0180803114113.png", "../../resource/images/0180803114113.png" ],
        circular: !0,
        bushu: "",
        listIndex: 0
    },
    eventDraw: function() {
        var a = this, t = a.data.listIndex;
        t += 1, a.data.url.length <= t && (t = 0), a.setData({
            listIndex: t
        });
    },
    onLoad: function(a) {
        wx.showToast({
            title: "加载中",
            icon: "loading",
            duration: 2e3,
            mask: !0
        }), this.Headcolor();
    },
    wxchvs: function() {
        try {
            var a = wx.getSystemInfoSync().windowWidth;
        } catch (a) {
            console.error("getSystemInfoSync failed!");
        }
        new n({
            canvasId: "lineCanvas",
            type: "line",
            categories: [ "2012", "2013", "2014", "2015", "2016", "2017", "2018" ],
            animation: !1,
            series: [ {
                name: "",
                data: this.data.bushu30,
                format: function(a, t) {
                    return a.toFixed(2);
                }
            } ],
            width: a,
            height: 100,
            dataLabel: !1,
            dataPointShape: !0,
            extra: {
                lineStyle: "curve"
            }
        });
    },
    fan: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    bindchange: function(a) {
        for (var t = this, e = a.detail.current, o = t.data.imgUrls, i = 0; i < o.length; i++) {
            var s = o[e].pic;
            t.setData({
                imgcxs: s
            });
        }
        t.setData({
            tuhight: e
        });
    },
    Create: function() {
        var t = this, a = t.data.listIndex;
        wx.showLoading({
            title: "图片保存中。。。"
        }), app.util.request({
            url: "entry/wxapp/Create",
            method: "POST",
            data: {
                user_id: app.globalData.user_id,
                bushu: t.data.bushu,
                listimg: t.data.url[a]
            },
            success: function(a) {
                console.log("第一步成功接口", a), app.util.request({
                    url: "entry/wxapp/Posterurl",
                    method: "POST",
                    data: {
                        user_id: app.globalData.user_id,
                        bushu: t.data.bushu
                    },
                    success: function(a) {
                        var t = a.data.data;
                        wx.downloadFile({
                            url: t,
                            success: function(a) {
                                console.log(a);
                                var t = a.tempFilePath;
                                wx.showToast({
                                    title: "保存成功",
                                    icon: "success",
                                    duration: 2e3
                                }), wx.saveImageToPhotosAlbum({
                                    filePath: t,
                                    success: function(a) {
                                        console.log(a);
                                    },
                                    fail: function(a) {}
                                });
                            },
                            fail: function(a) {
                                console.log(a);
                            }
                        });
                    }
                });
            },
            fail: function(a) {
                console.log("第一步失败接口", a);
            }
        });
    },
    getBeforeDate: function() {
        for (var a = new Date(), t = a.getDate(), e = a.getMonth() + 1, o = [], i = 1; i < 8; i++) {
            a.setDate(a.getDate() - 1);
            var s = (t = a.getDate()) < 10 ? "0" + t : t;
            o.push(s);
        }
        o.reverse(), this.setData({
            tilis: o,
            mon: e
        }), console.log(this.data.tilis);
    },
    linkHistory: function() {
        wx.navigateTo({
            url: "../sportsCalendar/sportsCalendar"
        });
    },
    Headcolor: function() {
        var s = this;
        app.util.request({
            url: "entry/wxapp/Headcolor",
            method: "POST",
            data: {
                user_id: app.globalData.user_id
            },
            success: function(a) {
                var t = a.data.data.inviteball, e = a.data.data.sonlist, o = a.data.data.set;
                app.globalData.setaa = a.data.data.set;
                var i = a.data.data.fake;
                s.setData({
                    inviteball: t,
                    sonlist: e,
                    setaa: o,
                    fake: i
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
    onReady: function() {},
    onShow: function() {
        "function" == typeof this.getTabBar && this.getTabBar() && this.getTabBar().setData({
            selected: 2
        });
        var a = this;
        a.fupiao(), a.Shenhe(), a.getBeforeDate(), a.fupiao(), a.Headcolor(), setTimeout(function() {
            a.suia();
        }, 1e3), a.Activity();
    },
    Activity: function() {
        var i = this;
        app.util.request({
            url: "entry/wxapp/Activity",
            method: "POST",
            data: {
                user_id: app.globalData.user_id
            },
            success: function(a) {
                for (var t = a.data.data.activity, e = 0; e < t.length; e++) {
                    var o = t[0].id;
                    i.setData({
                        aid: o
                    });
                }
                i.setData({
                    activity: t
                });
            }
        });
    },
    suia: function() {
        for (var o = this, a = app.globalData.weixinbushu, t = app.globalData.bushu30, e = 0, i = 0; i < t.length; i++) e += t[i];
        e = 1e4 < e ? (e /= 1e4).toFixed(2) + "w" : e, o.setData({
            bushu: a,
            bushu30: t,
            sum: e
        }), app.util.request({
            url: "entry/wxapp/Posterlist",
            method: "POST",
            data: {
                user_id: app.globalData.user_id
            },
            success: function(a) {
                var t = a.data.data, e = a.data.data.url;
                o.setData({
                    zong: t,
                    url: e
                });
            }
        }), o.wxchvs();
    },
    fupiao: function() {
        var i = this;
        app.Headcolor(), setTimeout(function() {
            var a = app.globalData.setdata.is_float, t = app.globalData.setdata.phoneno, e = app.globalData.setdata.copytext;
            if (1 == a) var o = app.globalData.setdata.call_icon; else o = app.globalData.setdata.copy_icon;
            i.setData({
                poc: a,
                phone: t,
                iconimh: o,
                txttex: e
            });
        }, 1e3);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.suia(), setTimeout(function() {
            wx.stopPullDownRefresh();
        }, 1e3);
    },
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
    onReachBottom: function() {}
});