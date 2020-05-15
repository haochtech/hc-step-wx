var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(a) {
    return typeof a;
} : function(a) {
    return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a;
}, util = require("../../../utils/util.js"), app = getApp();

Page({
    data: {
        cut: 0,
        step: 0,
        tujh: [ "true", "true", "true", "true" ],
        upbushu: "",
        shenhe: 1,
        shouquan: 0,
        follow: 0,
        colr: "#ffffff",
        array: [ "01.00", "02.00", "03.00", "04.00", "05.00", "06.00", "07.00", "08.00", "09.00", "10.00", "11.00", "12.00", "13.00", "14.00", "15.00", "16.00", "17.00", "18.00", "19.00", "20.00", "21.00", "22.00", "23.00", "24.00" ],
        index: "",
        yunti: !0,
        sign: !0,
        followtwo: !0,
        huid: !1,
        hikle: !0,
        hikletwo: !0,
        hikletre: !0,
        setInter: "",
        num: 1,
        Marquistext: "测试跑马灯",
        montions: 0,
        hikleree: !1,
        onPageScrolllist: !0
    },
    tiaija: function() {
        wx.navigateTo({
            url: "../income/income"
        });
    },
    community: function(a) {
        var t = a.currentTarget.dataset.jump, e = a.currentTarget.dataset.appid, i = a.currentTarget.dataset.path;
        0 == t ? wx.navigateTo({
            url: "../community/community"
        }) : 1 == t ? wx.navigateTo({
            url: "../reward/reward"
        }) : 2 == t ? wx.navigateTo({
            url: "../still/still"
        }) : 3 == t ? wx.switchTab({
            url: "../activityvip/activityvip"
        }) : 4 == t ? wx.navigateToMiniProgram({
            appId: e,
            path: i,
            extraData: {},
            envVersion: "release",
            success: function(a) {
                that.Missiondo(mission_id);
            }
        }) : 5 == t && wx.navigateTo({
            url: "../../game/pages/mark/mark"
        });
    },
    Imgurl: function() {
        var i = this;
        app.util.request({
            url: "entry/wxapp/Imgurl",
            method: "post",
            dataType: "json",
            success: function(a) {
                var t = a.data.data, e = a.data.data.setdata;
                i.setData({
                    newset: e,
                    imgset: t
                }), i.goodslist();
            }
        });
    },
    binderror: function(a) {
        cnsole.log(a);
    },
    dianaca: function() {
        var t = null;
        wx.createRewardedVideoAd && (t = wx.createRewardedVideoAd({
            adUnitId: "adunit-cd53e23600447bf7"
        })), t && (t.show().catch(function(a) {
            t.load().then(function() {
                return t.show();
            });
        }), t.onClose(function(a) {
            a && a.isEnded || void 0 === a ? console.log("正常播放结束，下发奖励") : console.log("播放中途退出，进行提示");
        }));
    },
    onLoad: function(a) {
        wx.showToast({
            title: "加载中",
            icon: "loading",
            duration: 2e3,
            mask: !0
        }), a.topic_details ? wx.navigateTo({
            url: "../topic_details/topic_details?detailsid=" + a.detailsid
        }) : a.community ? wx.navigateTo({
            url: "../community/community"
        }) : a.personalhomepage ? (console.log("uid--------------------------", a.user_id), 
        wx.navigateTo({
            url: "../personalhomepage/personalhomepage?target_id=" + a.target_id + "&my_id=" + a.my_id
        })) : a.topic_id && (console.log("topic_to--------------------------", a.user_id), 
        wx.navigateTo({
            url: "../topic_to/topic_to?topic_id=" + a.topic_id
        }));
        var t = this;
        if (a.finish && wx.navigateBack({
            delta: 1
        }), "" == a.sethong || null == a.sethong) var e = ""; else e = a.sethong;
        var i = a.invite;
        console.log(a.invite, "接收邀请参数");
        var s = a.follow, n = a.attention;
        t.data.shouquan;
        app.globalData.invite = i, console.log(app.globalData.invite, "接收全局邀请参数");
        var o = app.globalData.userInfo, u = a.goods_id;
        t.setData({
            userInfo: o,
            follow: s,
            attention: n,
            goods_id: u,
            sethong: e
        }), setTimeout(function() {
            t.Headcolor();
        }, 500), setTimeout(function() {
            t.Adv();
        }, 600);
    },
    onPageScroll: function() {
        this.data.onPageScrolllist && this.setData({
            onPageScrolllist: !1
        });
    },
    fupiao: function() {
        var s = this;
        app.Headcolor(), setTimeout(function() {
            var a = app.globalData.setdata.is_float, t = app.globalData.setdata.phoneno, e = app.globalData.setdata.copytext;
            if (1 == a) var i = app.globalData.setdata.call_icon; else i = app.globalData.setdata.copy_icon;
            s.setData({
                poc: a,
                phone: t,
                iconimh: i,
                txttex: e
            });
        }, 1e3);
    },
    bindPickerChange: function(a) {
        console.log("picker发送选择改变，携带值为", a.detail.value), this.setData({
            index: a.detail.value
        });
    },
    Shenhe: function() {
        var i = this;
        app.util.request({
            url: "entry/wxapp/Shenhe",
            method: "POST",
            success: function(a) {
                var t = a.data.data.shenhe, e = i.data.huid;
                app.globalData.sh_en = a.data.data.shenhe, i.setData({
                    sh_en: t,
                    huid: !e
                }), i.overdue(), i.Notice();
            }
        });
    },
    Bighb: function() {
        var s = this;
        app.util.request({
            url: "entry/wxapp/Bighb",
            method: "POST",
            data: {
                user_id: app.globalData.user_id
            },
            success: function(a) {
                var t = a.data.data, e = t.isopen, i = t.is_money;
                0 == e ? wx.showModal({
                    title: "提示",
                    content: "开启红包需要消耗" + s.data.setaa.fourhb_coin + s.data.setaa.coinname,
                    success: function(a) {
                        a.confirm ? 666 == i ? wx.showModal({
                            content: s.data.setaa.coinname + "不足",
                            showCancel: !1,
                            confirmText: "好的",
                            confirmColor: "#72B9C3",
                            success: function(a) {
                                a.confirm && (console.log("用户点击确定"), s.setData({
                                    hidden: !0
                                }));
                            }
                        }) : (console.log("用户点击确定"), s.setData({
                            hikletwo: !s.data.hikletwo,
                            hikle: !0,
                            isopen: e,
                            big_hong: t
                        }), s.Headcolor()) : a.cancel && console.log("取消");
                    }
                }) : (s.siabvdas(), s.setData({
                    hikletre: !1,
                    hikle: !0,
                    isopen: e,
                    big_hong: t
                }));
            }
        });
    },
    shipinie: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/Shipinball2bushu",
            method: "POST",
            data: {
                user_id: app.globalData.user_id
            },
            success: function(a) {
                t.Headcolor(), t.jiemi();
            }
        });
    },
    hiklenone: function() {
        this.setData({
            hikle: !this.data.hikle
        });
    },
    hikletwonone: function() {
        this.setData({
            hikletwo: !this.data.hikletwo
        });
    },
    hikletrenone: function() {
        this.setData({
            hikletre: !this.data.hikletre,
            hikletwo: !0
        });
    },
    kohidans: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/Opensamllhb",
            method: "POST",
            data: {
                user_id: app.globalData.user_id
            },
            success: function(a) {
                console.log(a), app.util.request({
                    url: "entry/wxapp/Opensmallhb",
                    method: "POST",
                    data: {
                        user_id: app.globalData.user_id
                    },
                    success: function(a) {
                        t.jua();
                    }
                });
            }
        });
    },
    jua: function() {
        var e = this;
        app.util.request({
            url: "entry/wxapp/Smallhb",
            method: "POST",
            data: {
                user_id: app.globalData.user_id
            },
            success: function(a) {
                console.log(a);
                var t = a.data.data;
                e.setData({
                    ken: t
                });
            }
        });
    },
    Guanzhuaddstep: function() {
        1 == this.data.attention && app.util.request({
            url: "entry/wxapp/Guanzhuaddstep",
            method: "POST",
            data: {
                user_id: app.globalData.user_id
            },
            success: function(a) {}
        });
    },
    Notice: function() {
        var i = this;
        app.util.request({
            url: "entry/wxapp/Notice",
            method: "POST",
            success: function(a) {
                var t = a.data.data, e = (t.rolltime, t.status);
                i.setData({
                    notice: t,
                    montions: e
                }), i.lamp.startSetInter(t.rolltime);
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
    tiaohuan: function(a) {
        var t = this, e = a.currentTarget.dataset.jump, i = a.currentTarget.dataset.appid, s = a.currentTarget.dataset.path;
        if (0 == e) {
            if ("" != (o = t.data.index)) ; else var n = new Date(), o = Number(n.getHours()) - 1;
            console.log(o);
            var u = t.data.yunti;
            t.data.array;
            t.setData({
                yunti: !u,
                index: o
            });
        } else if (1 == e) t.hanshui(); else if (2 == e) wx.navigateToMiniProgram({
            appId: i,
            path: s,
            extraData: {},
            envVersion: "release",
            success: function(a) {}
        }); else if (3 == e) {
            var r = a.currentTarget.dataset.webview;
            app.globalData.h5 = a.currentTarget.dataset.webview, wx.navigateTo({
                url: "../white/white?h5=" + r
            });
        } else if (4 == e) {
            var l = a.currentTarget.dataset.tippic;
            t.setData({
                tippng: l
            }), t.xiaotwo();
        }
    },
    animationData: function() {
        var a = this, t = wx.createAnimation({
            duration: 200,
            delay: 400
        });
        t.translateX("100").step(), a.setData({
            animationData: t.export()
        }), setTimeout(function() {
            a.setData({
                animationData: {},
                isShow: !0
            });
        }, 2e3);
    },
    queding: function() {
        var t = this, a = t.data.yunti;
        t.setData({
            yunti: !a
        }), 0 == t.data.user.is_yy && app.util.request({
            url: "entry/wxapp/Yy",
            method: "POST",
            data: {
                user_id: app.globalData.user_id
            },
            success: function(a) {
                wx.showModal({
                    title: "提示",
                    content: "预约成功",
                    success: function(a) {
                        a.confirm ? console.log("用户点击确定") : console.log("用户点击取消");
                    }
                }), t.Headcolor(), t.jiemi();
            }
        });
    },
    guanbil: function() {
        var a = this.data.yunti;
        this.setData({
            yunti: !a
        });
    },
    sing: function() {
        var a = this.data.sign;
        this.setData({
            sign: !a
        }), this.Issignshare();
    },
    Issignshare: function() {
        var s = this;
        app.util.request({
            url: "entry/wxapp/Issignshare",
            method: "POST",
            data: {
                user_id: app.globalData.user_id
            },
            success: function(a) {
                var t = a.data.data.set, e = a.data.data.user, i = t.is_signshare;
                s.setData({
                    Issigntaa: t,
                    Issignuser: e,
                    is_signshare: i
                });
            }
        });
    },
    guanbilsig: function() {
        var a = this.data.sign;
        this.setData({
            sign: !a
        });
    },
    submitInhanshui: function(a) {
        var t = this;
        t.submitInfotwo(a), setTimeout(function() {
            t.hanshui();
        }, 350);
    },
    submitInreset: function(a) {
        var t = this;
        t.submitInfotwo(a), wx.getNetworkType({
            success: function(a) {
                "none" != a.networkType && t.reset();
            }
        });
    },
    submitInqueding: function(a) {
        this.submitInfotwo(a), this.queding();
    },
    more: function() {
        wx.navigateTo({
            url: "../still/still"
        });
    },
    Updatebushu: function() {
        app.util.request({
            url: "entry/wxapp/Updatebushu",
            method: "post",
            dataType: "json",
            data: {
                weixinbushu: this.data.weixinbushu,
                user_id: app.globalData.user_id
            },
            success: function(a) {}
        });
    },
    zhuan: function(a) {
        var t = a.currentTarget.dataset.appid, e = a.currentTarget.dataset.path, i = a.currentTarget.dataset.jump;
        if (1 == i) wx.navigateToMiniProgram({
            appId: t,
            path: e,
            extraData: {
                user_id: this.data.user_id
            },
            envVersion: "release",
            success: function(a) {
                console.log(a);
            },
            fail: function(a) {
                console.log(a);
            }
        }); else if (2 == i) {
            var s = a.currentTarget.dataset.webview;
            app.globalData.h5 = a.currentTarget.dataset.webview, wx.navigateTo({
                url: "../white/white?h5=" + s
            });
        } else if (3 == i) {
            var n = a.currentTarget.dataset.tippic;
            this.setData({
                tippng: n
            }), this.xiaotwo();
        }
    },
    Guanzhuball2bushu: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/Guanzhuball2bushu",
            method: "POST",
            data: {
                user_id: app.globalData.user_id
            },
            success: function(a) {
                t.Headcolor(), t.jiemi();
            }
        });
    },
    zai: function() {
        this.data.shenhe;
        this.setData({
            shouquan: 0
        });
    },
    overdue: function() {
        var t = this;
        wx.getSetting({
            success: function(a) {
                if (a.authSetting["scope.userInfo"]) wx.checkSession({
                    success: function(a) {
                        t.register(function(a) {});
                    },
                    fail: function(a) {
                        t.data.shouquan;
                        t.setData({
                            shouquan: 1
                        });
                    }
                }); else {
                    t.data.shouquan;
                    t.setData({
                        shouquan: 1
                    });
                }
            }
        });
    },
    getUserInfo: function(t) {
        var e = this;
        wx.getSetting({
            success: function(a) {
                console.log(a), a.authSetting["scope.userInfo"] ? e.login(t) : wx.showModal({
                    title: "提示",
                    content: "获取用户信息失败,需要授权才能继续使用！",
                    showCancel: !1,
                    confirmText: "授权",
                    success: function(a) {
                        a.confirm && wx.openSetting({
                            success: function(a) {
                                a.authSetting["scope.userInfo"] ? wx.showToast({
                                    title: "授权成功"
                                }) : wx.showToast({
                                    title: "未授权..."
                                });
                            }
                        });
                    }
                });
            },
            fail: function(a) {
                console.log(a);
            }
        });
    },
    register: function(c) {
        app.globalData.invite;
        var d = this;
        console.log("接收红包参数", d.data.sethong), wx.getStorage({
            key: "user",
            success: function(a) {
                var t = a.data.detail, e = a.data.detail.openid, i = (t = t.userInfo).country, s = t.province, n = t.city, o = t.gender, u = t.nickName, r = t.avatarUrl, l = d.data.sethong;
                app.util.request({
                    url: "entry/wxapp/zhuce",
                    method: "post",
                    dataType: "json",
                    data: {
                        open_id: e,
                        nickName: u,
                        gender: o,
                        country: i,
                        province: s,
                        city: n,
                        avatarUrl: r,
                        invite: app.globalData.invite,
                        goods_id: d.data.goods_id,
                        sethong: l
                    },
                    success: function(a) {
                        console.log(a, "未过期成功");
                        d.data.shouquan;
                        app.globalData.user_id = a.data.data;
                        var t = a.data.data;
                        d.setData({
                            user_id: t,
                            shouquan: 0
                        }), "function" == typeof c && c(a.data.data), d.sports(), d.Black(t), d.Signin(t), 
                        d.Guanzhuaddstep(), d.Headcolor(), d.Adv(), d.popup();
                    },
                    fail: function(a) {
                        console.log(a, "未过期失败");
                        d.data.shouquan;
                        d.setData({
                            shouquan: 1
                        });
                    }
                });
            },
            fail: function(a) {
                d.data.shouquan;
                d.setData({
                    shouquan: 1
                });
            }
        });
    },
    Signin: function(a) {
        app.util.request({
            url: "entry/wxapp/Signin",
            method: "POST",
            data: {
                user_id: a
            },
            success: function(a) {
                a.data;
            },
            fail: function(a) {
                console.log("失败看咯哦", a);
            }
        });
    },
    Black: function(a) {
        var e = this;
        app.util.request({
            url: "entry/wxapp/Black",
            method: "POST",
            data: {
                user_id: a
            },
            success: function(a) {
                var t = a.data.data;
                e.setData({
                    tyuy: t
                }), 1 == t && wx.navigateTo({
                    url: "../back/back?finish=true"
                });
            },
            fail: function(a) {
                console.log("失败看咯哦", a);
            }
        });
    },
    login: function(e) {
        wx.showToast({
            title: "加载中...",
            mask: !0,
            icon: "loading"
        });
        var i = this;
        app.globalData.userInfo ? ("function" == typeof cb && cb(app.globalData.userInfo), 
        i.register(function(a) {})) : wx.login({
            success: function(a) {
                var t = e.detail;
                app.globalData.userInfo = t.userInfo, t.act = "autologin", t.code = a.code, app.util.request({
                    url: "entry/wxapp/getopenid",
                    method: "post",
                    dataType: "json",
                    data: t,
                    success: function(a) {
                        wx.hideLoading(), 0 == a.data.errno && (t.openid = a.data.data.openid, t.session_key = a.data.data.session_key, 
                        app.globalData.userInfo = t, app.globalData.session_key = a.data.data.session_key, 
                        wx.setStorageSync("user", e), "function" == typeof cb && cb(app.globalData.userInfo), 
                        i.register(function(a) {}), i.setData({
                            session_key: a.data.data.session_key
                        }));
                    }
                });
            },
            fail: function(a) {
                console.log(a, "获取失败");
            }
        });
    },
    sports: function() {
        var t = this;
        wx.authorize({
            scope: "scope.werun",
            success: function(a) {
                t.jiemi();
            },
            fail: function(a) {
                wx.showModal({
                    title: "打开微信运动授权，开始获取步数",
                    success: function(a) {
                        a.confirm ? wx.openSetting({
                            success: function(a) {
                                a.authSetting = {
                                    "scope.werun": !0
                                }, t.jiemi();
                            },
                            fail: function(a) {}
                        }) : a.cancel;
                    }
                });
            }
        });
    },
    jiemi: function() {
        var n = this;
        n.data.session_key;
        wx.login({
            success: function(a) {
                var t = a.code;
                n.setData({
                    code: t
                }), wx.getWeRunData({
                    success: function(a) {
                        var e = a.encryptedData, i = a.iv;
                        return new Promise(function(a, t) {
                            app.util.request({
                                url: "entry/wxapp/bushu",
                                method: "post",
                                dataType: "json",
                                data: {
                                    wRunEncryptedData: e,
                                    iv: i,
                                    code: n.data.code,
                                    session_key: n.data.session_key,
                                    user_id: app.globalData.user_id
                                },
                                success: function(a) {
                                    var t = a.data.data.bushu;
                                    app.globalData.step = a.data.data.bushu;
                                    a.data.data.bushu30;
                                    app.globalData.bushu30 = a.data.data.bushu30;
                                    var e = a.data.data.weixinbushu;
                                    app.globalData.weixinbushu = a.data.data.weixinbushu;
                                    var i = a.data.data.user, s = a.data.data.upbushu;
                                    e = a.data.data.weixinbushu;
                                    app.globalData.weixinbushu = a.data.data.weixinbushu, n.setData({
                                        step: t,
                                        zpnghe: i,
                                        upbushu: s,
                                        weixinbushu: e
                                    });
                                }
                            });
                        });
                    }
                });
            }
        });
    },
    Adv: function() {
        var n = this;
        return new Promise(function(a, t) {
            app.util.request({
                url: "entry/wxapp/Adv",
                method: "post",
                dataType: "json",
                data: {
                    user_id: app.globalData.user_id
                },
                success: function(a) {
                    var t = a.data.data.adv, e = a.data.data.icon, i = a.data.data.runpic, s = a.data.data.hongbao;
                    n.setData({
                        Advimg: t,
                        iconimg: e,
                        runpic: i,
                        Advhongbao: s
                    });
                }
            });
        });
    },
    jia: function(a) {
        var t = a.currentTarget.dataset.upbushu, e = this;
        app.util.request({
            url: "entry/wxapp/Upball2bushu",
            method: "post",
            dataType: "json",
            data: {
                upbushu: t,
                user_id: app.globalData.user_id
            },
            success: function(a) {
                t = "", e.setData({
                    upbushu: t
                }), e.jiemi();
            }
        });
    },
    onPullDownRefresh: function() {
        this.jiemi(), setTimeout(function() {
            wx.stopPullDownRefresh();
        }, 1e3), this.Headcolor();
    },
    hanshui: function() {
        wx.navigateTo({
            url: "../Sweatdiary/Sweatdiary?bushu=" + this.data.weixinbushu
        });
    },
    detail: function(a) {
        console.log(a);
        var t = this.data.id, e = this.data.paytype, i = this.data.selltype;
        this.data.indexoftanlia;
        wx.navigateTo({
            url: "../detail/detail?id=" + t + "&index=1&paytype=" + e + "&selltype=" + i
        });
    },
    invite: function() {
        wx.navigateTo({
            url: "../inviter/inviter"
        });
    },
    onReady: function() {
        console.log("onReady"), this.dialog = this.selectComponent("#dialog");
        this.lamp = this.selectComponent("#lamp"), this.Icon = this.selectComponent("#Icon");
    },
    hiuan: function() {
        var a = this.data.hikle;
        this.lamp.yinxaing(a);
    },
    onShow: function() {
        "function" == typeof this.getTabBar && this.getTabBar() && this.getTabBar().setData({
            selected: 0
        }), console.log("onShow");
        var a = app.globalData.sh_en;
        "" != a && null != a || (a = 0), this.Shenhe(), this.Imgurl();
        var t = parseInt(100 * Math.random());
        this.setData({
            top: t,
            sh_en: a
        });
    },
    popup: function() {
        var n = this;
        app.util.request({
            url: "entry/wxapp/Tan",
            method: "POST",
            data: {
                user_id: app.globalData.user_id
            },
            success: function(a) {
                var t = a.data.data, e = Number(t.tan_type), i = Number(t.is_tan), s = Number(t.tanguo);
                console.log(void 0 === e ? "undefined" : _typeof(e)), 1 == i && 0 == s && 0 == e ? n.tuihaidaj() : 1 == i && 0 == s && 0 != e ? n.setData({
                    hikleree: !0
                }) : n.setData({
                    hikleree: !1
                }), n.setData({
                    tan: t
                });
            }
        });
    },
    tanlia: function(a) {
        var t = a.currentTarget.dataset.tan_type, e = a.currentTarget.dataset.goods_id, i = a.currentTarget.dataset.paytype, s = a.currentTarget.dataset.selltype;
        if (this.setData({
            id: e,
            paytype: i,
            selltype: s
        }), 1 == t) this.more(); else if (2 == t) this.detail(); else if (3 == t) return;
        this.setData({
            hikleree: !1
        });
    },
    reset: util.throttle(function(a) {
        var e = this;
        1 != e.data.tyuy ? app.util.request({
            url: "entry/wxapp/bushu2money",
            method: "post",
            dataType: "json",
            data: {
                step: e.data.step,
                user_id: app.globalData.user_id
            },
            success: function(a) {
                var t = a.data.data;
                wx.showModal({
                    content: "兑换" + e.data.step + "步为" + t + e.data.setaa.coinname,
                    success: function(a) {
                        a.confirm ? app.util.request({
                            url: "entry/wxapp/bushulog",
                            method: "post",
                            dataType: "json",
                            data: {
                                step: e.data.step,
                                user_id: app.globalData.user_id
                            },
                            success: function(a) {
                                e.jiemi();
                                var t = wx.createInnerAudioContext();
                                t.autoplay = !0, t.src = e.data.setaa.voice, t.onPlay(function() {
                                    console.log("开始播放");
                                }), setTimeout(function() {
                                    t.onStop(function() {
                                        console.log("开始播放");
                                    });
                                }, 200);
                            }
                        }) : a.cancel;
                    }
                });
            }
        }) : wx.showModal({
            title: "提示",
            content: "您不能兑换步数币",
            success: function(a) {
                a.confirm ? console.log("用户点击确定") : console.log("用户点击取消");
            }
        });
    }, 2e3),
    Headcolor: function() {
        var o = this;
        return new Promise(function(a, t) {
            app.util.request({
                url: "entry/wxapp/Headcolor",
                method: "POST",
                data: {
                    user_id: app.globalData.user_id
                },
                success: function(a) {
                    var t = a.data.data.inviteball, e = a.data.data.sonlist, i = a.data.data.set;
                    console.log(i.shenhe, "审核"), app.globalData.setaa = a.data.data.set;
                    var s = i.shenhe, n = a.data.data.user;
                    app.globalData.headcolor = i.headcolor, o.setData({
                        inviteball: t,
                        sonlist: e,
                        setaa: i,
                        shenhe: s,
                        user: n
                    }), wx.setNavigationBarColor({
                        frontColor: "#ffffff",
                        backgroundColor: i.headcolor
                    }), wx.setNavigationBarTitle({
                        title: i.xcx
                    }), o.fupiao();
                },
                fail: function(a) {
                    console.log("失败", a);
                }
            });
        });
    },
    xiaoshi: function(a) {
        for (var t = a.currentTarget.dataset.id, e = a.currentTarget.dataset.index, i = this, s = i.data.tujh, n = 0; n < s.length; n++) s[e] = !1, 
        i.setData({
            tujh: s
        });
        app.util.request({
            url: "entry/wxapp/Ball2bushu",
            method: "POST",
            data: {
                user_id: app.globalData.user_id,
                id: t
            },
            success: function(a) {
                i.jiemi();
            }
        });
    },
    goodslist: function() {
        var e = this;
        app.util.request({
            url: "entry/wxapp/Goodslist",
            method: "POST",
            success: function(a) {
                var t = a.data.data;
                e.setData({
                    goods: t
                });
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
        });
    },
    xiaotwo: function() {
        var a = this.data.followtwo;
        this.setData({
            followtwo: !a
        });
    },
    fenyia: function() {
        var t = this;
        1 != t.data.Issigntaa.is_signshare && app.util.request({
            url: "entry/wxapp/Signshare",
            method: "POST",
            data: {
                user_id: app.globalData.user_id
            },
            success: function(a) {
                t.data.is_signshare;
                t.jiemi();
                t.data.sign;
                t.setData({
                    sign: !0,
                    is_signshare: 0
                });
            }
        });
    },
    honsiak: function() {
        this.Bighb();
    },
    tuihaidaj: function() {
        this.setData({
            hikle: !this.data.hikle
        });
    },
    tanlia_img: function() {
        this.setData({
            hikleree: !1
        });
    },
    siabvdas: function() {
        var e = this;
        app.util.request({
            url: "entry/wxapp/Smallhb",
            method: "POST",
            data: {
                user_id: app.globalData.user_id
            },
            success: function(a) {
                console.log(a);
                var t = a.data.data;
                0 == e.data.big_hong && e.setData({
                    hikletre: !0,
                    ken: t
                }), e.setData({
                    hikletre: !1,
                    ken: t
                });
            }
        });
    },
    onShareAppMessage: function(a) {
        var t = this;
        if (null == a.target || null == a.target.dataset) var e = 1; else e = a.target.dataset.sethong;
        return 1 != e ? {
            title: t.data.setaa.fourhb_sharetitle,
            imageUrl: t.data.setaa.fourhb_sharepic,
            path: "/hc_step/pages/index/index?invite=" + t.data.user_id + "&sethong=" + e,
            success: function(a) {
                console.log("本地user_id", t.data.user_id);
            },
            fail: function(a) {}
        } : {
            title: t.data.setaa.sharetitle,
            imageUrl: t.data.setaa.sharepic,
            path: "/hc_step/pages/index/index?invite=" + t.data.user_id,
            success: function(a) {
                console.log("本地user_id", t.data.user_id);
            },
            fail: function(a) {}
        };
    }
});