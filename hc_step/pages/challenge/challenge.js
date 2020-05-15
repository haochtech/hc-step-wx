var app = getApp();

Page({
    data: {},
    onLoad: function(a) {
        var t = this, o = a.aid;
        t.setData({
            aid: o
        }), t.Activitylist(o), t.Headcolor();
    },
    fupiao: function() {
        var e = this;
        app.Headcolor(), setTimeout(function() {
            var a = app.globalData.setdata.is_float, t = app.globalData.setdata.phoneno, o = app.globalData.setdata.copytext;
            if (1 == a) var i = app.globalData.setdata.call_icon; else i = app.globalData.setdata.copy_icon;
            e.setData({
                poc: a,
                phone: t,
                iconimh: i,
                txttex: o
            });
        }, 1e3);
    },
    onReady: function() {},
    Headcolor: function() {
        var n = this;
        app.util.request({
            url: "entry/wxapp/Headcolor",
            method: "POST",
            data: {
                user_id: app.globalData.user_id
            },
            success: function(a) {
                var t = a.data.data.inviteball, o = a.data.data.sonlist, i = a.data.data.set;
                app.globalData.setaa = a.data.data.set;
                var e = i.shenhe;
                n.setData({
                    inviteball: t,
                    sonlist: o,
                    setaa: i,
                    shenhe: e
                }), wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: i.headcolor
                }), wx.setNavigationBarTitle({
                    title: i.xcx
                });
            },
            fail: function(a) {
                console.log("失败" + a);
            }
        });
    },
    Activitylist: function() {
        var i = this;
        app.util.request({
            url: "entry/wxapp/Activitylist",
            method: "POST",
            data: {
                user_id: app.globalData.user_id,
                aid: i.data.aid
            },
            success: function(a) {
                var t = a.data.data.data, o = t.tomorrow.status;
                i.setData({
                    Activitylist: t,
                    status: o
                });
            }
        });
    },
    onShow: function() {
        this.fupiao();
    },
    onHide: function() {},
    bao: function() {
        var t = this;
        0 == t.data.status && app.util.request({
            url: "entry/wxapp/Apply",
            method: "POST",
            data: {
                user_id: app.globalData.user_id,
                aid: t.data.aid
            },
            success: function(a) {
                t.Activitylist(), wx.showModal({
                    title: "提示",
                    content: "报名成功",
                    success: function(a) {
                        a.confirm ? console.log("用户点击确定") : console.log("用户点击取消");
                    }
                });
            }
        });
    },
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});