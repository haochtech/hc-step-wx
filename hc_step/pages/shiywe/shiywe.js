var app = getApp();

Page({
    data: {
        line: [ "未使用", "已使用" ],
        state: 0,
        yua: !0
    },
    onLoad: function(a) {
        this.Headcolor(), this.Hexiaolog(0);
    },
    onReady: function() {},
    Hexiaolog: function(e) {
        var i = this;
        app.util.request({
            url: "entry/wxapp/Hexiaolog",
            method: "POST",
            data: {
                user_id: app.globalData.user_id,
                state: e
            },
            success: function(a) {
                if (1 == e) {
                    var t = a.data.data.log;
                    i.setData({
                        logtwo: t
                    });
                } else if (0 == e) {
                    var o = a.data.data.log;
                    i.setData({
                        log: o
                    });
                }
            },
            fail: function(a) {
                console.log("失败看咯哦", a);
            }
        });
    },
    qifuyua: function(a) {
        this.setData({
            state: a.currentTarget.dataset.index
        }), this.Hexiaolog(a.currentTarget.dataset.index);
    },
    secrity: function(a) {
        var t = a.currentTarget.dataset.order_id;
        this.setData({
            yua: !this.data.yua
        }), this.Gethxcode(t);
    },
    Gethxcode: function(a) {
        var o = this;
        app.util.request({
            url: "entry/wxapp/Gethxcode",
            method: "POST",
            data: {
                order_id: a
            },
            success: function(a) {
                var t = a.data.data;
                o.setData({
                    dianpi: t
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
                app.globalData.setaa = a.data.data.set, i.setData({
                    inviteball: t,
                    sonlist: o,
                    setaa: e
                }), wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: e.headcolor
                }), wx.setNavigationBarTitle({
                    title: e.xcx
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
    fupiao: function() {
        var i = this;
        app.Headcolor(), setTimeout(function() {
            var a = app.globalData.setdata.is_float, t = app.globalData.setdata.phoneno, o = app.globalData.setdata.copytext;
            if (1 == a) var e = app.globalData.setdata.call_icon; else e = app.globalData.setdata.copy_icon;
            i.setData({
                poc: a,
                phone: t,
                iconimh: e,
                txttex: o
            });
        }, 1e3);
    },
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});