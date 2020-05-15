var util = require("../../../utils/util.js"), app = getApp();

Page({
    data: {
        winHeight: "",
        currentTab: 0,
        scrollLeft: 0,
        expertList: [ {
            img: "avatar.png",
            name: "欢顔",
            tag: "知名情感博主",
            swiperHeight: 240
        } ]
    },
    goodslist: function(i) {
        var r = this;
        app.util.request({
            url: "entry/wxapp/More",
            method: "POST",
            data: {
                id: i
            },
            success: function(t) {
                var a = t.data.data.list;
                if (0 == i) {
                    (s = t.data.data.sort)[0].goodslist = a;
                    var e = s[i].goodslist.length / 2 * 590 + 240;
                } else {
                    var s;
                    (s = r.data.sort)[i].goodslist = a;
                    var o = s[i].goodslist.length;
                    if (1 < o) e = 590 * o / 2 + 240; else if (0 == o) e = 240; else e = 830;
                }
                r.setData({
                    sort: s,
                    swiperHeight: e
                }), console.log(s);
            }
        });
    },
    switchTab: function(t) {
        var a = this;
        a.setData({
            currentTab: t.detail.current
        }), a.checkCor();
        var e = a.data.sort;
        if ("" == e[t.detail.current].goodslist || null == e[t.detail.current].goodslist) a.goodslist(t.detail.current); else {
            var s = a.data.sort[t.detail.current].goodslist.length;
            if (1 < s) var o = 590 * s / 2 + 240; else o = 830;
            a.setData({
                swiperHeight: o
            });
        }
    },
    swichNav: function(t) {
        var a = this, e = t.currentTarget.dataset.index, s = a.data.sort;
        if (a.data.currentTaB == e) return !1;
        if (a.setData({
            currentTab: e
        }), "" == s[e].goodslist || null == s[e].goodslist) a.goodslist(e); else {
            var o = a.data.sort[e].goodslist.length;
            if (1 < o) var i = 590 * o / 2 + 240; else i = 830;
            a.setData({
                swiperHeight: i
            });
        }
    },
    checkCor: function() {
        4 < this.data.currentTab ? this.setData({
            scrollLeft: 300
        }) : this.setData({
            scrollLeft: 0
        });
    },
    onLoad: function() {
        var e = this;
        e.Headcolor(), wx.getSystemInfo({
            success: function(t) {
                var a = t.windowHeight * (750 / t.windowWidth) - 180;
                console.log(a), e.setData({
                    winHeight: a
                });
            }
        }), e.goodslist(0);
    },
    Headcolor: function() {
        var r = this;
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
                    var o = s.shenhe, i = t.data.data.user;
                    r.setData({
                        inviteball: a,
                        sonlist: e,
                        setaa: s,
                        shenhe: o,
                        user: i
                    }), wx.setNavigationBarColor({
                        frontColor: "#ffffff",
                        backgroundColor: s.headcolor
                    }), wx.setNavigationBarTitle({
                        title: s.xcx
                    });
                },
                fail: function(t) {
                    console.log("失败" + t);
                }
            });
        });
    },
    footerTap: app.footerTap
});