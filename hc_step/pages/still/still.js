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
            answer: 134,
            listen: 2234
        } ]
    },
    goodslist: function(e) {
        var s = this;
        app.util.request({
            url: "entry/wxapp/More",
            method: "POST",
            data: {
                id: e
            },
            success: function(t) {
                var a, o = t.data.data.list;
                0 == e ? (a = t.data.data.sort)[0].goodslist = o : (a = s.data.sort)[e].goodslist = o;
                s.setData({
                    sort: a
                }), console.log(a);
            }
        });
    },
    switchTab: function(t) {
        var a = this;
        a.setData({
            currentTab: t.detail.current
        }), a.checkCor();
        var o = a.data.sort;
        "" != o[t.detail.current].goodslist && null != o[t.detail.current].goodslist || a.goodslist(t.detail.current);
    },
    swichNav: function(t) {
        var a = this, o = t.currentTarget.dataset.index, e = a.data.sort;
        if (a.data.currentTaB == o) return !1;
        a.setData({
            currentTab: o
        }), "" != e[o].goodslist && null != e[o].goodslist || a.goodslist(o);
    },
    checkCor: function() {
        4 < this.data.currentTab ? this.setData({
            scrollLeft: 300
        }) : this.setData({
            scrollLeft: 0
        });
    },
    onLoad: function() {
        var o = this;
        o.Headcolor(), wx.getSystemInfo({
            success: function(t) {
                var a = t.windowHeight * (750 / t.windowWidth) - 180;
                console.log(a), o.setData({
                    winHeight: a
                });
            }
        }), o.goodslist(0), o.fupiao();
    },
    fupiao: function() {
        var s = this;
        app.Headcolor(), setTimeout(function() {
            var t = app.globalData.setdata.is_float, a = app.globalData.setdata.phoneno, o = app.globalData.setdata.copytext;
            if (1 == t) var e = app.globalData.setdata.call_icon; else e = app.globalData.setdata.copy_icon;
            s.setData({
                poc: t,
                phone: a,
                iconimh: e,
                txttex: o
            });
        }, 1e3);
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
                    var a = t.data.data.inviteball, o = t.data.data.sonlist, e = t.data.data.set;
                    app.globalData.setaa = t.data.data.set;
                    var s = e.shenhe, i = t.data.data.user;
                    r.setData({
                        inviteball: a,
                        sonlist: o,
                        setaa: e,
                        shenhe: s,
                        user: i
                    }), wx.setNavigationBarColor({
                        frontColor: "#ffffff",
                        backgroundColor: e.headcolor
                    }), wx.setNavigationBarTitle({
                        title: e.xcx
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