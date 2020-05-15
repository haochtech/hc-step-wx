var util = require("../../../utils/util.js"), app = getApp();

Page({
    data: {
        qiyf: [ "", "", "" ],
        huid: !1,
        last_index: 0,
        amplification_index: 0,
        roll_flag: !0,
        max_number: 8,
        speed: 300,
        finalindex: 8,
        myInterval: "",
        max_speed: 40,
        minturns: 8,
        runs_now: 0
    },
    startrolling: util.throttle(function(a) {
        var t = this;
        t.data.runs_now = 0, wx.showModal({
            title: "提示",
            content: "是否消耗" + t.data.setaa.boxprice + t.data.setaa.coinname + "进行抽奖?",
            success: function(a) {
                a.confirm && t.data.roll_flag && (t.data.roll_flag = !1, t.Lotto());
            }
        });
    }, 2e3),
    onLoad: function(a) {
        var t = this;
        t.goodslist(), t.Headcolor();
        var i = app.globalData.setaa, e = app.globalData.user_id;
        t.setData({
            user_id: e
        }), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: i.headcolor
        });
    },
    onReady: function() {},
    detail: function(a) {
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../detail/detail?id=" + t + "&index=2"
        });
    },
    Lotto: function(a) {
        var n = this;
        app.util.request({
            url: "entry/wxapp/Lotto",
            method: "POST",
            data: {
                user_id: app.globalData.user_id
            },
            success: function(a) {
                var t = a.data.data.goods_name, i = Number(a.data.data.sort), e = a.data.data.status, o = a.data.data.is_jump, s = a.data.data.goods_id;
                n.setData({
                    finalindex: i,
                    message: t,
                    status: e,
                    amplification_index: 0,
                    is_jump: o,
                    goods_id: s
                }), n.rolling(), n.Headcolor();
            },
            fail: function(a) {
                n.Headcolor();
                var t = a.data.message, i = Number(a.data.data.sort), e = a.data.data.status;
                if (n.setData({
                    finalindex: i,
                    status: e,
                    amplification_index: 0
                }), !i) return wx.showModal({
                    title: "提示",
                    content: t,
                    success: function(a) {
                        n.setData({
                            amplification_index: 0,
                            roll_flag: !0
                        });
                    }
                }), void (n.data.roll_flag = !0);
                n.rolling();
            }
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
                var t = a.data.data.inviteball, i = a.data.data.sonlist, e = a.data.data.set;
                app.globalData.setaa = a.data.data.set;
                var o = a.data.data.user, s = o.money;
                n.setData({
                    inviteball: t,
                    sonlist: i,
                    setaa: e,
                    user: o,
                    money: s
                });
            },
            fail: function(a) {
                console.log("失败" + a);
            }
        });
    },
    onShow: function() {
        var a = this, t = app.globalData.user_id;
        console.log(app.globalData.user_id);
        var i = app.globalData.sh_en;
        "" != i && null != i || (i = 0), a.setData({
            user_id: t,
            sh_en: i
        }), a.Headcolor(), a.Black(t), a.Shenhe(), a.goodslist(), a.fupiao();
    },
    fupiao: function() {
        var o = this;
        app.Headcolor(), setTimeout(function() {
            var a = app.globalData.setdata.is_float, t = app.globalData.setdata.phoneno, i = app.globalData.setdata.copytext;
            if (1 == a) var e = app.globalData.setdata.call_icon; else e = app.globalData.setdata.copy_icon;
            o.setData({
                poc: a,
                phone: t,
                iconimh: e,
                txttex: i
            });
        }, 1e3);
    },
    rolling: function(a) {
        var t = this;
        this.data.myInterval = setTimeout(function() {
            t.rolling();
        }, this.data.speed), this.data.runs_now++, this.data.amplification_index++;
        var i = this.data.minturns * this.data.max_number + this.data.finalindex - this.data.last_index;
        this.data.runs_now <= i / 3 * 2 ? (this.data.speed -= 30, this.data.speed <= this.data.max_speed && (this.data.speed = this.data.max_speed)) : this.data.runs_now >= i ? (clearInterval(this.data.myInterval), 
        this.data.roll_flag = !0, 2 == this.data.status ? setTimeout(function() {
            wx.showModal({
                title: "提示",
                content: "您未抽中,谢谢惠顾",
                success: function(a) {
                    t.setData({
                        amplification_index: 0,
                        roll_flag: !0
                    });
                },
                fail: function() {
                    t.setData({
                        amplification_index: 0,
                        roll_flag: !0
                    });
                }
            });
        }, 1e3) : setTimeout(function() {
            0 == t.data.is_jump ? wx.showModal({
                title: "提示",
                content: " 恭喜您获得" + t.data.message + ",已自动到账请注意查看",
                success: function(a) {
                    t.setData({
                        amplification_index: 0,
                        roll_flag: !0
                    }), t.Lotto_result();
                }
            }) : wx.showModal({
                title: "提示",
                content: "恭喜您抽中了" + t.data.message + ",请到个人中心中奖纪录完善收货信息",
                success: function(a) {
                    a.confirm && (wx.navigateTo({
                        url: "../conversion/conversion?qie=2"
                    }), t.setData({
                        amplification_index: 0,
                        roll_flag: !0
                    })), t.setData({
                        amplification_index: 0,
                        roll_flag: !0
                    }), t.Headcolor();
                }
            });
        }, 500)) : i - this.data.runs_now <= 10 ? this.data.speed += 20 : (this.data.speed += 10, 
        100 <= this.data.speed && (this.data.speed = 100)), this.data.amplification_index > this.data.max_number && (this.data.amplification_index = 1), 
        this.setData(this.data);
    },
    Lotto_result: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/Lotto_result",
            method: "POST",
            data: {
                user_id: app.globalData.user_id,
                goods_id: t.data.goods_id
            },
            success: function(a) {
                t.Headcolor();
            }
        });
    },
    goodslist: function() {
        var i = this;
        app.util.request({
            url: "entry/wxapp/Awardslist",
            method: "POST",
            data: {
                user_id: app.globalData.user_id
            },
            success: function(a) {
                var t = a.data.data;
                i.setData({
                    goods: t
                });
            }
        });
    },
    Shenhe: function() {
        var e = this;
        app.util.request({
            url: "entry/wxapp/Shenhe",
            method: "POST",
            success: function(a) {
                var t = a.data.data.shenhe, i = e.data.huid;
                e.setData({
                    sh_en: t,
                    huid: !i
                });
            }
        });
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
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});