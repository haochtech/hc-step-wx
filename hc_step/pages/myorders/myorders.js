var app = getApp();

Page({
    data: {
        tex: [ "1", "兑换商品", "中奖记录" ],
        qie: 1,
        xiu: "修改地址",
        state: 1
    },
    onLoad: function(a) {
        var t = this;
        if ("" == a.qie || null == a.qie) var o = t.data.qie; else o = a.qie;
        t.setData({
            qie: o
        }), t.Log(), t.Headcolor();
    },
    Log: function() {
        var i = this;
        app.util.request({
            url: "entry/wxapp/Log",
            method: "POST",
            data: {
                user_id: app.globalData.user_id,
                qie: i.data.qie
            },
            success: function(a) {
                if (0 == i.data.qie) {
                    var t = a.data.data.coinlog;
                    i.setData({
                        Log: t
                    });
                } else if (1 == i.data.qie) {
                    var o = a.data.data.goodslog;
                    i.setData({
                        Logtwo: o
                    });
                } else if (2 == i.data.qie) {
                    var e = a.data.data.awardslog;
                    i.setData({
                        Logter: e
                    });
                }
            },
            fail: function(a) {
                console.log("失败" + a);
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        this.fupiao();
    },
    Headcolor: function() {
        var n = this, l = n.data.tex;
        app.util.request({
            url: "entry/wxapp/Headcolor",
            method: "POST",
            data: {
                user_id: app.globalData.user_id
            },
            success: function(a) {
                var t = a.data.data.inviteball, o = a.data.data.sonlist, e = a.data.data.set;
                app.globalData.setaa = a.data.data.set;
                for (var i = 0; i < l.length; i++) l[0] = e.coinname, n.setData({
                    tex: l
                });
                n.setData({
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
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});