var app = getApp();

Page({
    data: {
        logs: [],
        fx_level: 0,
        is_daili: 0,
        follow: 0
    },
    onLoad: function() {
        wx.showToast({
            title: "加载中",
            icon: "loading",
            duration: 2e3,
            mask: !0
        });
        var a = this;
        console.log(a.data);
        var t = app.globalData.userInfo, o = app.globalData.sh_en;
        a.setData({
            userInfo: t,
            sh_en: o
        });
        var e = app.globalData.setaa;
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: e.headcolor
        }), app.globalData.user_id ? a.Headcolor() : setTimeout(function() {
            a.Headcolor();
        }, 2e3), a.Imgurl(), a.Shenhe();
    },
    tiaija: function() {
        wx.navigateTo({
            url: "../income/income"
        });
    },
    Imgurl: function() {
        var e = this;
        app.util.request({
            url: "entry/wxapp/Imgurl",
            method: "post",
            dataType: "json",
            success: function(a) {
                var t = a.data.data, o = a.data.data.setdata;
                e.setData({
                    newset: o,
                    imgset: t
                });
            }
        });
    },
    submitInfotwo: function(a) {
        console.log("获取id");
        var t = a.detail.formId;
        console.log(t), console.log("获取formid结束"), this.setData({
            formid: t
        }), app.util.request({
            url: "entry/wxapp/Formid",
            method: "POST",
            data: {
                user_id: app.globalData.user_id,
                formid: this.data.formid
            },
            success: function(a) {}
        });
    },
    submitIncodex: function(a) {
        this.submitInfotwo(a), this.codex();
    },
    submitInsearch: function(a) {
        this.submitInfotwo(a), this.guanzhu();
    },
    submitInaccredit: function(a) {
        this.submitInfotwo(a), this.accredit();
    },
    submitInnews: function(a) {
        this.submitInfotwo(a), this.news();
    },
    submitIntrouble: function(a) {
        this.submitInfotwo(a), this.trouble();
    },
    submitInacinventer: function(a) {
        this.submitInfotwo(a), this.inventer();
    },
    submitInsshiywe: function(a) {
        this.submitInfotwo(a), this.shiywe();
    },
    submitIntmyorde: function(a) {
        this.submitInfotwo(a), this.myord();
    },
    myord: function() {
        wx.navigateTo({
            url: "../myorders/myorders"
        });
    },
    inventer: function() {
        wx.navigateTo({
            url: "../inventer/inventer"
        });
    },
    shiywe: function() {
        wx.navigateTo({
            url: "../shiywe/shiywe"
        });
    },
    sao: function() {
        wx.scanCode({
            onlyFromCamera: !0,
            success: function(a) {
                var t = a.path;
                console.log(t), wx.navigateTo({
                    url: t
                }), console.log(a);
            }
        });
    },
    dizhi: function() {
        wx.chooseAddress({
            success: function(a) {
                a.userName, a.postalCode, a.provinceName, a.cityName, a.countyName, a.detailInfo, 
                a.telNumber, a.nationalCode;
            }
        });
    },
    Shenhe: function() {
        var o = this;
        app.util.request({
            url: "entry/wxapp/Shenhe",
            method: "POST",
            success: function(a) {
                var t = a.data.data.shenhe;
                o.setData({
                    sh_en: t
                }), 1 == t && o.Sanshibushu();
            }
        });
    },
    Sanshibushu: function() {
        var e = this;
        wx.login({
            success: function(a) {
                var t = a.code;
                e.setData({
                    code: t
                }), wx.getWeRunData({
                    success: function(a) {
                        var t = a.encryptedData, o = a.iv;
                        app.util.request({
                            url: "entry/wxapp/Sanshibushu",
                            method: "post",
                            dataType: "json",
                            data: {
                                wRunEncryptedData: t,
                                iv: o,
                                code: e.data.code,
                                user_id: app.globalData.user_id
                            },
                            success: function(a) {
                                var t = a.data.data.bushu, o = a.data.data.data;
                                e.setData({
                                    stepInfoList: t,
                                    bu: o
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    news: function() {
        wx.navigateTo({
            url: "../news/news"
        });
    },
    trouble: function() {
        wx.navigateTo({
            url: "../trouble/trouble"
        });
    },
    codex: function() {
        wx.navigateTo({
            url: "../codex/codex"
        });
    },
    order: function(a) {
        var t = a.currentTarget.dataset.chshi;
        wx.navigateTo({
            url: "../goods/goods?chshi=" + t
        });
    },
    Headcolor: function() {
        var n = this;
        app.util.request({
            url: "entry/wxapp/Headcolor",
            method: "POST",
            data: {
                user_id: app.globalData.user_id
            },
            success: function(a) {
                var t = a.data.data.user;
                console.log(t.head_pic);
                var o = a.data.data.set, e = o.shenhe;
                n.setData({
                    user: t,
                    setaa: o,
                    shenhe: e
                });
            },
            fail: function(a) {
                console.log("失败" + a);
            }
        });
    },
    duiahua: function() {
        wx.navigateTo({
            url: "../conversion/conversion"
        });
    },
    accredit: function() {
        wx.navigateTo({
            url: "../accredit/accredit"
        });
    },
    onShow: function() {
        var a = this, t = app.globalData.sh_en;
        "" != t && null != t || (t = 0);
        var o = app.globalData.user_id;
        console.log(app.globalData.user_id), a.setData({
            user_id: o,
            sh_en: t
        }), a.Black(o), a.Shenhe(), a.fupiao(), a.Headcolor();
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
    Black: function(a) {
        app.util.request({
            url: "entry/wxapp/Black",
            method: "POST",
            data: {
                user_id: a
            },
            success: function(a) {
                1 == a.data.data && wx.navigateTo({
                    url: "../back/back?finish=true"
                });
            },
            fail: function(a) {
                console.log("失败看咯哦", a);
            }
        });
    },
    guanzhu: function() {
        this.data.follow;
        this.setData({
            follow: 1
        });
    },
    xiao: function() {
        this.data.follow;
        this.setData({
            follow: 0
        }), app.util.request({
            url: "entry/wxapp/Kefu",
            method: "POST",
            data: {
                user_id: app.globalData.user_id
            }
        });
    },
    dabvsb: function() {}
});