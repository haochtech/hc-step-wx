var app = getApp();

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
        var e = this;
        app.util.request({
            url: "entry/wxapp/Posterlist",
            method: "POST",
            data: {
                user_id: app.globalData.user_id
            },
            success: function(a) {
                var t = a.data.data, o = a.data.data.url;
                e.setData({
                    zong: t,
                    url: o
                });
            }
        }), e.Headcolor();
    },
    fan: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    bindchange: function(a) {
        for (var t = this, o = a.detail.current, e = t.data.imgUrls, s = 0; s < e.length; s++) {
            var n = e[o].pic;
            t.setData({
                imgcxs: n
            });
        }
        t.setData({
            tuhight: o
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
                                    fail: function(a) {
                                        console.log(a, "失败");
                                    }
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
                app.globalData.setaa = a.data.data.set, s.setData({
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
    onReady: function() {},
    onShow: function() {
        this.fupiao();
    },
    fupiao: function() {
        var n = this;
        app.Headcolor(), setTimeout(function() {
            var a = app.globalData.weixinbushu, t = app.globalData.setdata.is_float, o = app.globalData.setdata.phoneno, e = app.globalData.setdata.copytext;
            if (1 == t) var s = app.globalData.setdata.call_icon; else s = app.globalData.setdata.copy_icon;
            if ("undefined" == a) {
                a = 0;
                n.setData({
                    bushu: a
                });
            } else if (null != a) {
                a = app.globalData.weixinbushu;
                n.setData({
                    bushu: a
                });
            }
            n.setData({
                poc: t,
                phone: o,
                iconimh: s,
                txttex: e,
                bushu: a
            });
        }, 1e3);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});