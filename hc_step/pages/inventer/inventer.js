var _Page;

function _defineProperty(a, t, e) {
    return t in a ? Object.defineProperty(a, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = e, a;
}

var app = getApp();

Page((_defineProperty(_Page = {
    data: {
        tex: [ "人数", "头像", "邀请人", "步数", "时间" ]
    },
    onLoad: function(a) {
        var o = this;
        o.Headcolor(), app.util.request({
            url: "entry/wxapp/Invitelog",
            method: "POST",
            data: {
                user_id: app.globalData.user_id
            },
            success: function(a) {
                var t = a.data.data.invitelog, e = a.data.data.invitetype;
                o.setData({
                    list: t,
                    invitetype: e
                });
            }
        });
    },
    onReady: function() {},
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
    Headcolor: function() {
        var i = this;
        app.util.request({
            url: "entry/wxapp/Headcolor",
            method: "POST",
            data: {
                user_id: app.globalData.user_id
            },
            success: function(a) {
                var t = a.data.data.inviteball, e = a.data.data.sonlist, o = a.data.data.set;
                app.globalData.setaa = a.data.data.set;
                var n = o.shenhe;
                i.setData({
                    inviteball: t,
                    sonlist: e,
                    setaa: o,
                    shenhe: n
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
    onShow: function() {
        this.fupiao();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {}
}, "fupiao", function() {
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
}), _defineProperty(_Page, "onReachBottom", function() {}), _defineProperty(_Page, "onShareAppMessage", function() {}), 
_Page));