var app = getApp();

Page({
    data: {},
    onLoad: function(a) {
        this.yemian(), this.Headcolor();
    },
    quan: function() {
        var a = this.data.lajnvds.user.rmb;
        this.setData({
            tmoney: a
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
                var t = a.data.data.inviteball, o = a.data.data.sonlist, e = a.data.data.set;
                app.globalData.setaa = a.data.data.set;
                var n = e.shenhe, i = e.adunit2;
                s.setData({
                    inviteball: t,
                    sonlist: o,
                    setaa: e,
                    shenhe: n,
                    sliu: i
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
    onReady: function() {},
    fibefva: function() {
        wx.navigateTo({
            url: "../gain/gain"
        });
    },
    yemian: function() {
        var o = this;
        app.util.request({
            url: "entry/wxapp/Hbwith",
            method: "POST",
            data: {
                user_id: app.globalData.user_id
            },
            success: function(a) {
                var t = a.data.data;
                o.setData({
                    lajnvds: t
                });
            }
        });
    },
    formSubmit: function(a) {
        console.log("form发生了submit事件，携带数据为：", a.detail.value);
        var t = a.detail.value, o = t.tmoney, e = this;
        app.util.request({
            url: "entry/wxapp/Tixian",
            method: "POST",
            data: {
                user_id: app.globalData.user_id,
                tmoney: o
            },
            success: function(a) {
                a.message;
                wx.showModal({
                    title: "提示",
                    content: "申请成功",
                    success: function(a) {
                        a.confirm ? console.log("用户点击确定") : console.log("用户点击取消");
                    }
                }), e.yemian();
            },
            fail: function(a) {
                var t = a.data.message;
                wx.showModal({
                    title: "提示",
                    content: t,
                    success: function(a) {
                        a.confirm ? console.log("用户点击确定") : console.log("用户点击取消");
                    }
                });
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
    onShareAppMessage: function(a) {
        var t = this;
        return {
            title: t.data.lajnvds.set.fourhb_sharetitle,
            imageUrl: t.data.lajnvds.set.fourhb_sharepic,
            path: "/hc_step/pages/index/index?invite=" + app.globalData.user_id,
            success: function(a) {
                console.log("本地user_id", t.data.user_id);
            },
            fail: function(a) {}
        };
    }
});