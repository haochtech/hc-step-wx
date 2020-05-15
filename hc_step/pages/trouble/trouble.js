function _defineProperty(a, t, o) {
    return t in a ? Object.defineProperty(a, t, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = o, a;
}

var app = getApp();

Page({
    data: {
        dataInfo: []
    },
    onLoad: function(a) {
        this.Question();
        var t = app.globalData.setaa;
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: t.headcolor
        }), wx.setNavigationBarTitle({
            title: t.xcx
        });
        var o = this.data.tempInfo;
        for (var e in this.data.tempInfo) this.data.tempInfo[e].flag = !1;
        this.setData({
            tempInfo: this.data.tempInfo
        }), console.log(o), this.Headcolor();
    },
    fupiao: function() {
        var n = this;
        app.Headcolor(), setTimeout(function() {
            var a = app.globalData.setdata.is_float, t = app.globalData.setdata.phoneno, o = app.globalData.setdata.copytext;
            if (1 == a) var e = app.globalData.setdata.call_icon; else e = app.globalData.setdata.copy_icon;
            n.setData({
                poc: a,
                phone: t,
                iconimh: e,
                txttex: o
            });
        }, 1e3);
    },
    dainj: function(a) {
        var t = a.currentTarget.dataset.index, o = "tempInfo[" + t + "].flag", e = this.data.tempInfo[t].flag;
        this.setData(_defineProperty({}, o, !e));
    },
    onReady: function() {},
    Question: function() {
        var o = this;
        app.util.request({
            url: "entry/wxapp/Question",
            method: "POST",
            success: function(a) {
                var t = a.data.data;
                o.setData({
                    tempInfo: t
                });
            }
        });
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
                var t = a.data.data.inviteball, o = a.data.data.sonlist, e = a.data.data.set;
                app.globalData.setaa = a.data.data.set;
                var n = a.data.data.user;
                i.setData({
                    inviteball: t,
                    sonlist: o,
                    setaa: e,
                    user: n
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
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});