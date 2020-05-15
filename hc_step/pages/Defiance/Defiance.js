var app = getApp();

function countdown(t) {
    var a = t.data.Activitylist.tomorrow.endtime || [], o = new Date().getTime() / 1e3, e = a - (o = parseInt(o)) || [];
    t.setData({
        clock: dateformat(e)
    }), e <= 0 && t.setData({
        clock: "0:0:0"
    }), setTimeout(function() {
        e -= 1, countdown(t);
    }, 1e3);
}

function dateformat(t) {
    var a = Math.floor(t);
    Math.floor(a / 3600 / 24);
    return Math.floor(a / 3600 % 24) + "时" + Math.floor(a / 60 % 60) + "分" + Math.floor(a % 60) + "秒";
}

Page({
    data: {
        txd: [ "3000步", "5000步", "10000步" ],
        moretab: 0,
        countDownHour: 0,
        countDownMinute: 0,
        countDownSecond: 0
    },
    onLoad: function(t) {
        var o = this, a = app.globalData.sh_en;
        o.Activity(), o.setData({
            sh_en: a
        }), o.Headcolor(), app.util.request({
            url: "entry/wxapp/Activitylist",
            method: "POST",
            data: {
                user_id: app.globalData.user_id
            },
            success: function(t) {
                var a = t.data.data.data;
                o.setData({
                    Activitylist: a
                }), countdown(o);
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
            success: function(t) {
                var a = t.data.data.inviteball, o = t.data.data.sonlist, e = t.data.data.set;
                app.globalData.setaa = t.data.data.set;
                var i = t.data.data.fake, n = e.shenhe;
                s.setData({
                    inviteball: a,
                    sonlist: o,
                    setaa: e,
                    fake: i,
                    shenhe: n
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
    },
    rich: function() {
        wx.navigateTo({
            url: "../rich/rich"
        });
    },
    daoji: function(t) {
        var r = t - Date.parse(new Date()) / 1e3, l = setInterval(function() {
            var t = r, a = Math.floor(t / 3600 / 24), o = a.toString();
            1 == o.length && (o = "0" + o);
            var e = Math.floor((t - 3600 * a * 24) / 3600), i = e.toString();
            1 == i.length && (i = "0" + i);
            var n = Math.floor((t - 3600 * a * 24 - 3600 * e) / 60), s = n.toString();
            1 == s.length && (s = "0" + s);
            var c = (t - 3600 * a * 24 - 3600 * e - 60 * n).toString();
            1 == c.length && (c = "0" + c), this.setData({
                countDownDay: o,
                countDownHour: i,
                countDownMinute: s,
                countDownSecond: c
            }), --r < 0 && (clearInterval(l), wx.showToast({
                title: "活动已结束"
            }), this.setData({
                countDownDay: "00",
                countDownHour: "00",
                countDownMinute: "00",
                countDownSecond: "00"
            }));
        }.bind(this), 1e3);
    },
    Shenhe: function() {
        var o = this;
        app.util.request({
            url: "entry/wxapp/Shenhe",
            method: "POST",
            success: function(t) {
                var a = t.data.data.shenhe;
                o.setData({
                    sh_en: a
                });
            }
        });
    },
    Activity: function() {
        var i = this;
        app.util.request({
            url: "entry/wxapp/Activity",
            method: "POST",
            data: {
                user_id: app.globalData.user_id
            },
            success: function(t) {
                for (var a = t.data.data.activity, o = 0; o < a.length; o++) {
                    var e = a[0].id;
                    i.setData({
                        aid: e
                    }), i.Activitylist(e), i.Updatestep(e);
                }
                i.setData({
                    activity: a
                });
            }
        });
    },
    Activitylist: function(t) {
        var o = this;
        app.util.request({
            url: "entry/wxapp/Activitylist",
            method: "POST",
            data: {
                user_id: app.globalData.user_id,
                aid: t
            },
            success: function(t) {
                var a = t.data.data.data;
                o.setData({
                    Activitylist: a
                });
            }
        });
    },
    submitInfotwo: function(t) {
        console.log("获取id");
        var a = t.detail.formId;
        console.log(a), console.log("获取formid结束"), this.setData({
            formid: a
        }), app.util.request({
            url: "entry/wxapp/Formid",
            method: "POST",
            data: {
                user_id: app.globalData.user_id,
                formid: this.data.formid
            },
            success: function(t) {}
        });
    },
    submitInsearch: function(t) {
        this.submitInfotwo(t), this.rich();
    },
    submitInchallenge: function(t) {
        this.submitInfotwo(t), this.detaikf(t);
    },
    submitInming: function(t) {
        this.submitInfotwo(t), this.challenge();
    },
    detaikf: function() {
        wx.navigateTo({
            url: "../detaikf/detaikf"
        });
    },
    qiehuf: function(t) {
        console.log("走接口");
        var a = t.currentTarget.dataset.index, o = t.currentTarget.dataset.aid;
        this.setData({
            moretab: a,
            aid: o
        }), this.Activitylist(this.data.aid);
    },
    challenge: function() {
        wx.navigateTo({
            url: "../challenge/challenge?aid=" + this.data.Activitylist.tomorrow.aid
        });
    },
    Updatestep: function(t) {
        var e = this;
        wx.login({
            success: function(t) {
                var a = t.code;
                e.setData({
                    code: a
                }), wx.getWeRunData({
                    success: function(t) {
                        var a = t.encryptedData, o = t.iv;
                        app.util.request({
                            url: "entry/wxapp/Updatestep",
                            method: "post",
                            dataType: "json",
                            data: {
                                wRunEncryptedData: a,
                                iv: o,
                                code: e.data.code,
                                user_id: app.globalData.user_id
                            },
                            success: function(t) {
                                var a = t.data.data;
                                e.setData({
                                    step: a
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    onShow: function() {
        var t = this, a = app.globalData.sh_en;
        "" != a && null != a || (a = 0), t.setData({
            sh_en: a
        }), t.Activitylist(t.data.aid), t.Shenhe(), t.Headcolor(), t.fupiao();
    },
    fupiao: function() {
        var i = this;
        app.Headcolor(), setTimeout(function() {
            var t = app.globalData.setdata.is_float, a = app.globalData.setdata.phoneno, o = app.globalData.setdata.copytext;
            if (1 == t) var e = app.globalData.setdata.call_icon; else e = app.globalData.setdata.copy_icon;
            i.setData({
                poc: t,
                phone: a,
                iconimh: e,
                txttex: o
            });
        }, 1e3);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        var t = this;
        t.Updatestep(t.data.aid), t.Activitylist(t.data.aid), setTimeout(function() {
            wx.stopPullDownRefresh(), wx.showModal({
                title: "提示",
                content: "步数同步成功",
                success: function(t) {
                    t.confirm ? console.log("用户点击确定") : console.log("用户点击取消");
                }
            });
        }, 1e3), t.Headcolor();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});