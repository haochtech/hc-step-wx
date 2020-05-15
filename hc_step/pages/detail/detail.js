var WxParse = require("../../../wxParse/wxParse.js"), app = getApp();

Page({
    data: {
        circular: !0,
        autoplay: !0,
        interval: 3e3,
        shenhe: 0,
        tiaotwo: 3,
        ycsavua: !0,
        hezi: !0,
        selltype: 3,
        hol: !1,
        ilsa: !0,
        name: "普通商品纯步数币",
        worth: "燃立币100.00",
        keephold: !1,
        address: []
    },
    onLoad: function(a) {
        console.log(a);
        var t = this, e = a.invite, o = a.id, n = a.paytype, s = a.index, i = a.selltype;
        app.globalData.setaa;
        t.setData({
            goods_id: o,
            index: s,
            paytype: n,
            selltype: i,
            invite: e
        }), "" != app.globalData.user_id & null != app.globalData.user_id && 0 == i ? 1 == s ? t.goodsone() : 2 == s && t.goodstwo() : t.goodsone(), 
        t.Headcolor();
    },
    openLocation: function(a) {
        var t = Number(a.currentTarget.dataset.latitude), e = Number(a.currentTarget.dataset.longitude);
        wx.getLocation({
            type: "gcj02",
            success: function(a) {
                wx.openLocation({
                    latitude: t,
                    longitude: e,
                    scale: 28
                });
            }
        });
    },
    login: function(e) {
        wx.showToast({
            title: "加载中...",
            mask: !0,
            icon: "loading"
        });
        var o = this;
        app.globalData.userInfo ? ("function" == typeof cb && cb(app.globalData.userInfo), 
        o.register(function(a) {})) : wx.login({
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
                        o.register(function(a) {}), o.setData({
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
    register: function(d) {
        var a = app.globalData.invite;
        console.log("接收参数", a);
        var u = this;
        wx.getStorage({
            key: "user",
            success: function(a) {
                var t = a.data.detail, e = a.data.detail.openid, o = (t = t.userInfo).country, n = t.province, s = t.city, i = t.gender, l = t.nickName, c = t.avatarUrl;
                app.util.request({
                    url: "entry/wxapp/zhuce",
                    method: "post",
                    dataType: "json",
                    data: {
                        open_id: e,
                        nickName: l,
                        gender: i,
                        country: o,
                        province: n,
                        city: s,
                        avatarUrl: c,
                        invite: u.data.invite,
                        goods_id: u.data.goods_id
                    },
                    success: function(a) {
                        console.log(a, "未过期成功");
                        u.data.shouquan;
                        app.globalData.user_id = a.data.data;
                        var t = a.data.data;
                        u.sports(), u.setData({
                            user_id: t,
                            shouquan: 0
                        }), "function" == typeof d && d(a.data.data);
                    },
                    fail: function(a) {
                        console.log(a, "未过期失败");
                        u.data.shouquan;
                        u.setData({
                            shouquan: 1
                        });
                    }
                });
            },
            fail: function(a) {
                u.data.shouquan;
                u.setData({
                    shouquan: 1
                });
            }
        });
    },
    fan: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    switch1Change: function(a) {
        var t = a.detail.value;
        if (t) var e = this.data.zhmng.quanhou; else e = this.data.zhmng.maxrmb;
        this.setData({
            quanhou: e,
            ilsa: t
        }), console.log("switch1 发生 change 事件，携带值为", a.detail.value);
    },
    yuaj: function() {
        this.setData({
            hol: !1
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
    tel: function() {
        var a = this.data.zhmng.tel;
        wx.makePhoneCall({
            phoneNumber: a
        });
    },
    huuji: function(a) {
        var t = this, e = (a.currentTarget.dataset.state, t.data.paytype);
        if (0 == t.data.zhmng.is_you) wx.showModal({
            title: "提示",
            content: "已经抢光了！！！",
            success: function(a) {
                a.confirm ? console.log("用户点击确定") : a.cancel && console.log("用户点击取消");
            }
        }); else {
            var o = t.data.zu;
            if (0 != o) 0 == e ? (t.setData({
                zu: o
            }), wx.showModal({
                title: "提示",
                content: "您确定要兑换此商品么",
                success: function(a) {
                    a.confirm ? (console.log("用户点击确定"), t.Createhexiao()) : a.cancel && console.log("用户点击取消");
                }
            })) : wx.showModal({
                title: "提示",
                content: "您确定要兑换此商品么",
                success: function(a) {
                    a.confirm ? (console.log("用户点击确定"), t.Createhexiaopay(1)) : a.cancel && console.log("用户点击取消");
                }
            }); else {
                t.data.bnian;
                t.setData({
                    bnian: 0
                });
            }
        }
    },
    Createhexiao: function() {
        var e = this;
        app.util.request({
            url: "entry/wxapp/Createhexiao",
            method: "POST",
            data: {
                user_id: app.globalData.user_id,
                goods_id: e.data.goods_id
            },
            success: function(a) {
                var t = a.data.data;
                e.setData({
                    order_id: t
                }), e.Gethxcode(), e.goodssr();
            }
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
    Gethxcode: function() {
        var e = this;
        app.util.request({
            url: "entry/wxapp/Gethxcode",
            method: "POST",
            data: {
                order_id: e.data.order_id
            },
            success: function(a) {
                var t = a.data.data;
                console.log(t.url), e.setData({
                    dianpi: t,
                    hezi: !e.data.hezi,
                    hol: !1
                });
            }
        });
    },
    yuanhuuji: function(a) {
        var t = this.data.zhmng, e = a.currentTarget.dataset.state, o = this.data.zhmng.is_hongbao;
        0 == t.is_you ? wx.showModal({
            title: "提示",
            content: "已经抢光了！！！",
            success: function(a) {
                a.confirm ? console.log("用户点击确定") : a.cancel && console.log("用户点击取消");
            }
        }) : 1 == o ? this.setData({
            hol: !0,
            state: e
        }) : this.Createhexiaopay(e);
    },
    reatehexi: function(a) {
        var t = a.currentTarget.dataset.state;
        if (this.data.ilsa) t = 2; else t = t;
        this.Createhexiaopay(t);
    },
    Createhexiaopay: function(a) {
        var e = this;
        app.util.request({
            url: "entry/wxapp/pay",
            method: "POST",
            data: {
                user_id: app.globalData.user_id,
                goods_id: e.data.goods_id,
                state: a
            },
            success: function(a) {
                var t = a.data.data.order_id;
                e.setData({
                    order_id: t
                }), wx.requestPayment({
                    timeStamp: a.data.data.timeStamp + "",
                    nonceStr: a.data.data.nonceStr,
                    package: a.data.data.package,
                    signType: "MD5",
                    paySign: a.data.data.sign + "",
                    success: function(a) {
                        e.Gethxcode(), e.goodssr();
                    },
                    fail: function(a) {
                        console.log(a);
                    },
                    complete: function(a) {
                        console.log(a);
                    }
                });
            }
        });
    },
    fan_imga: function() {
        this.setData({
            keephold: !1
        });
    },
    canvasTextAutoLine: function(a, t, e, o, n, s) {
        var i = a.split(""), l = "", c = !0, d = !1, u = void 0;
        try {
            for (var r, f = i[Symbol.iterator](); !(c = (r = f.next()).done); c = !0) {
                l += r.value, s < t.measureText(l).width && (t.fillText(l, e, o), l = "", o += n);
            }
        } catch (a) {
            d = !0, u = a;
        } finally {
            try {
                !c && f.return && f.return();
            } finally {
                if (d) throw u;
            }
        }
        l && t.fillText(l, e, o);
    },
    canvas: function() {
        var a = this, t = wx.createCanvasContext("myCanvas");
        t.setFillStyle("#ffffff"), t.fillRect(0, 0, 300, 600), t.stroke();
        var e = "../../resource/images/b06ba5f3abe9da7ed2e7aff68ec260d.png";
        t.drawImage(e, 0, 0, 300, 100), t.stroke();
        var o = a.data.zhmng.goods_name.split(""), n = "", s = [];
        if (t.setFontSize(15), 20 < o.length) {
            t.setFillStyle("#000000");
            for (var i = 0; i < o.length; i++) t.measureText(n).width < 250 ? n += o[i] : (i--, 
            s.push(n), n = "");
            if (s.push(n), 2 < s.length) {
                var l = s.slice(0, 2), c = l[1], d = "", u = [];
                for (i = 0; i < c.length && t.measureText(d).width < 220; i++) d += c[i];
                u.push(d);
                var r = u[0] + "...";
                l.splice(1, 1, r), s = l;
            }
            for (var f = 0; f < s.length; f++) t.fillText(s[f], 10, 30 + 30 * f, 300);
        } else {
            var p = a.data.zhmng.goods_name;
            t.setFontSize(15), t.setFillStyle("#000000");
            var g = t.measureText(p).width;
            t.fillText(p, (300 - g) / 2, 70);
        }
        if (t.stroke(), 0 == a.data.selltype || 1 == a.data.selltype) if (0 == a.data.paytype) var h = a.data.zhmng.price + a.data.setaa.coinname; else h = a.data.zhmng.price2 + a.data.setaa.coinname + "+" + a.data.zhmng.rmb + "元"; else if (2 == a.data.selltype || 3 == a.data.selltype) h = "邀请" + a.data.zhmng.minpeople + "个好友即可兑换";
        a.setData({
            namepaytype: h
        });
        p = h;
        t.setFontSize(15), t.setFillStyle("#d6252f");
        g = t.measureText(p).width;
        if (t.fillText(p, (300 - g) / 2, 100), t.stroke(), 2 != a.data.selltype & 0 != a.data.paytype) p = "原价:" + a.data.zhmng.maxrmb + "元"; else p = "";
        p = p;
        t.setFontSize(14), t.setFillStyle("#b0abab");
        g = t.measureText(p).width;
        t.fillText(p, (300 - g) / 2, 120), t.stroke();
        e = a.data.main_img_yu;
        t.drawImage(e, 0, 160, 300, 300), t.stroke();
        e = a.data.dataurll;
        console.log(e), t.drawImage(e, 20, 470, 110, 110), t.stroke();
        p = a.data.setaa.xcx;
        t.setFontSize(17), t.setFillStyle("#d6252f"), t.fillText(p, 150, 525), t.stroke();
        p = "微信内长按识别小程序码";
        t.setFontSize(12), t.setFillStyle("#858585"), t.fillText(p, 150, 555), t.stroke(), 
        t.draw();
    },
    savaImageToPhoto: function() {
        var t = this;
        wx.showLoading({
            title: "努力生成中..."
        }), wx.canvasToTempFilePath({
            destWidth: 500,
            destHeight: 930,
            canvasId: "myCanvas",
            success: function(a) {
                wx.hideLoading(), wx.saveImageToPhotosAlbum({
                    filePath: a.tempFilePath,
                    success: function(a) {
                        wx.showModal({
                            content: "图片已保存到相册了",
                            showCancel: !1,
                            confirmText: "知道啦",
                            confirmColor: "#72B9C3",
                            success: function(a) {
                                a.confirm && (console.log("用户点击确定"), t.setData({
                                    hidden: !0
                                }));
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
    guantwo: function() {
        this.setData({
            hezi: !this.data.hezi
        });
    },
    pengyiud: function() {
        var e = this;
        if (2 == e.data.selltype) var a = e.data.selltype; else a = "";
        wx.showLoading({
            title: "图片生成中"
        }), app.util.request({
            url: "entry/wxapp/Getgoodscode",
            method: "POST",
            data: {
                user_id: app.globalData.user_id,
                goods_id: e.data.goods_id,
                selltype: a,
                paytype: e.data.paytype
            },
            success: function(a) {
                var t = a.data.data.url;
                wx.downloadFile({
                    url: t,
                    success: function(a) {
                        var t = a.tempFilePath;
                        e.setData({
                            keephold: !0,
                            dataurll: t
                        }), e.canvas();
                    }
                });
            },
            fail: function(a) {}
        });
    },
    bao: function() {
        var e = this;
        app.util.request({
            url: "entry/wxapp/Goodsposterurl",
            method: "POST",
            success: function(a) {
                var t = a.data.data;
                e.setData({
                    imgcxs: t
                }), wx.downloadFile({
                    url: e.data.imgcxs,
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
                            fail: function(a) {}
                        });
                    }
                });
            },
            fail: function(a) {
                console.log(a), console.log("失败" + a);
            }
        });
    },
    dui: function(a) {
        var t = this, e = (a.currentTarget.dataset.state, t.data.paytype), o = t.data.zu;
        if (0 != o) 0 == e ? (t.setData({
            zu: o
        }), wx.showModal({
            title: "提示",
            content: "您确定要兑换此商品么",
            success: function(a) {
                a.confirm ? (console.log("用户点击确定"), t.dizhixuz()) : a.cancel && console.log("用户点击取消");
            }
        })) : wx.showModal({
            title: "提示",
            content: "您确定要兑换此商品么",
            success: function(a) {
                a.confirm ? (console.log("用户点击确定"), t.duihuantwo(1)) : a.cancel && console.log("用户点击取消");
            }
        }); else {
            t.data.bnian;
            t.setData({
                bnian: 0
            });
        }
    },
    dizhixuz: function() {
        var d = this;
        wx.chooseAddress({
            success: function(a) {
                var t = a.userName, e = a.postalCode, o = a.provinceName, n = a.cityName, s = a.countyName, i = a.detailInfo, l = a.telNumber, c = a.nationalCode;
                app.util.request({
                    url: "entry/wxapp/Createorder",
                    method: "POST",
                    data: {
                        user_id: app.globalData.user_id,
                        userName: t,
                        postalCode: e,
                        provinceName: o,
                        cityName: n,
                        countyName: s,
                        detailInfo: i,
                        telNumber: l,
                        nationalCode: c,
                        goods_id: d.data.goods_id
                    },
                    success: function(a) {
                        wx.showModal({
                            title: "提示",
                            content: "领取成功",
                            success: function(a) {
                                a.confirm ? (console.log("用户点击确定"), d.goodssr()) : a.cancel && console.log("用户点击取消");
                            }
                        });
                    },
                    fail: function(a) {
                        wx.showModal({
                            title: "提示",
                            content: a.data.message,
                            success: function(a) {
                                a.confirm ? console.log("用户点击确定") : a.cancel && console.log("用户点击取消");
                            }
                        });
                    }
                });
            },
            fail: function(a) {
                wx.showModal({
                    title: "提示",
                    content: "填写地址才能兑换奖品哦",
                    success: function(a) {
                        a.confirm ? console.log("用户点击确定") : a.cancel && console.log("用户点击取消");
                    }
                });
            }
        });
    },
    duihu: function(a) {
        var t = a.currentTarget.dataset.state, e = this.data.zhmng.is_hongbao;
        0 == this.data.zhmng.is_you ? wx.showModal({
            title: "提示",
            content: "已经抢光了！！！",
            success: function(a) {
                a.confirm ? console.log("用户点击确定") : a.cancel && console.log("用户点击取消");
            }
        }) : 1 == e ? this.setData({
            hol: !0,
            state: t
        }) : this.duihuantwo(t);
    },
    duihuasatxsaca: function(a) {
        var t = a.currentTarget.dataset.state;
        if (this.data.ilsa) t = 2; else t = t;
        this.duihuantwo(t);
    },
    duihuantwo: function(d) {
        var u = this;
        wx.chooseAddress({
            success: function(a) {
                var t = a.userName, e = a.postalCode, o = a.provinceName, n = a.cityName, s = a.countyName, i = a.detailInfo, l = a.telNumber, c = a.nationalCode;
                app.util.request({
                    url: "entry/wxapp/pay",
                    method: "POST",
                    data: {
                        user_id: app.globalData.user_id,
                        userName: t,
                        postalCode: e,
                        provinceName: o,
                        cityName: n,
                        countyName: s,
                        detailInfo: i,
                        telNumber: l,
                        nationalCode: c,
                        goods_id: u.data.goods_id,
                        state: d
                    },
                    success: function(a) {
                        wx.requestPayment({
                            timeStamp: a.data.data.timeStamp + "",
                            nonceStr: a.data.data.nonceStr,
                            package: a.data.data.package,
                            signType: "MD5",
                            paySign: a.data.data.sign + "",
                            success: function(a) {
                                u.data.state;
                                u.setData({
                                    hol: !1
                                }), console.log("成功"), wx.showModal({
                                    title: "提示",
                                    content: "您已购买成功，请到兑换记录查看",
                                    success: function(a) {
                                        a.confirm ? (console.log("用户点击确定"), wx.navigateTo({
                                            url: "../conversion/conversion"
                                        }), u.goodssr()) : a.cancel && console.log("用户点击取消");
                                    }
                                });
                            },
                            fail: function(a) {
                                console.log(a);
                            },
                            complete: function(a) {
                                console.log(a);
                            }
                        });
                    },
                    fail: function(a) {
                        wx.showModal({
                            title: "提示",
                            content: a.data.message,
                            success: function(a) {
                                a.confirm ? (console.log("用户点击确定"), wx.navigateBack({
                                    delta: 1
                                })) : a.cancel && console.log("用户点击取消");
                            }
                        });
                    }
                });
            },
            fail: function(a) {
                wx.showModal({
                    title: "提示",
                    content: "填写地址才能兑换奖品哦",
                    success: function(a) {
                        a.confirm ? console.log("用户点击确定") : a.cancel && console.log("用户点击取消");
                    }
                });
            }
        });
    },
    dianguji: function() {
        this.data.bnian;
        this.setData({
            bnian: 1
        });
    },
    downloadFile: function() {
        var e = this, a = e.data.zhmng.main_img;
        wx.downloadFile({
            url: a,
            success: function(a) {
                var t = a.tempFilePath;
                e.setData({
                    main_img_yu: t
                });
            }
        });
    },
    goodsone: function() {
        var d = this;
        console.log(d.data.goods_id, app.globalData.user_id, "走goodsone"), app.util.request({
            url: "entry/wxapp/Goodsdetail",
            method: "POST",
            data: {
                goods_id: d.data.goods_id,
                user_id: app.globalData.user_id,
                index: 1
            },
            success: function(a) {
                var t = a.data.data.goods, e = a.data.data.user, o = t.quanhou, n = t.goodsinfo, s = a.data.data.list;
                WxParse.wxParse("article", "html", n, d, 5);
                t.minpeople;
                var i = a.data.data.people;
                if (console.log(t.is_you, "判断足不足"), d.setData({
                    zhmng: t,
                    index: 1,
                    zhmnglist: s,
                    tny: i,
                    zhuuser: e,
                    quanhou: o
                }), d.downloadFile(), 0 == t.is_you && wx.showModal({
                    title: "提示",
                    content: "已经抢光了！！！",
                    success: function(a) {
                        a.confirm ? console.log("用户点击确定") : a.cancel && console.log("用户点击取消");
                    }
                }), 0 == t.is_rich) var l = "燃力币不足，快去邀请好友得步数吧", c = 0; else l = "请兑换", c = 1;
                d.setData({
                    hua: l,
                    zu: c
                });
            },
            fail: function(a) {}
        });
    },
    goodssr: function() {
        var s = this;
        app.util.request({
            url: "entry/wxapp/Goodsdetail",
            method: "POST",
            data: {
                goods_id: s.data.goods_id,
                user_id: app.globalData.user_id,
                index: 1
            },
            success: function(a) {
                var t = a.data.data.goods, e = (t.goodsinfo, a.data.data.list);
                if (s.setData({
                    zhmng: t,
                    index: 1,
                    zhmnglist: e
                }), s.downloadFile(), 0 == t.is_rich) var o = "燃力币不足，快去邀请好友得步数吧", n = 0; else o = "请兑换", 
                n = 1;
                s.setData({
                    hua: o,
                    zu: n
                });
            },
            fail: function(a) {
                s.setData({
                    qity: 1
                }), wx.showModal({
                    title: "提示",
                    content: "已经抢光了！！！",
                    success: function(a) {
                        a.confirm ? (console.log("用户点击确定"), wx.navigateBack({
                            delta: 1
                        })) : a.cancel && (console.log("用户点击取消"), wx.navigateBack({
                            delta: 1
                        }));
                    }
                });
            }
        });
    },
    goodstwo: function() {
        var s = this;
        app.util.request({
            url: "entry/wxapp/Goodsdetail",
            method: "POST",
            data: {
                goods_id: s.data.goods_id,
                user_id: app.globalData.user_id,
                index: 2
            },
            success: function(a) {
                var t = a.data.data;
                if (s.setData({
                    zhmng: t,
                    index: 2
                }), s.downloadFile(), 0 == t.is_rich) var e = "燃力币不足，快去邀请好友得步数吧", o = 0, n = 0; else e = "请兑换", 
                o = 1, n = 1;
                s.setData({
                    hua: e,
                    bnian: o,
                    zu: n
                });
            },
            fail: function(a) {
                wx.showModal({
                    title: "提示",
                    content: "已经抢光了！！！",
                    success: function(a) {
                        a.confirm ? (console.log("用户点击确定"), wx.navigateBack({
                            delta: 1
                        })) : a.cancel && console.log("用户点击取消");
                    }
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
                var t = a.data.data.inviteball, e = a.data.data.sonlist, o = a.data.data.set;
                app.globalData.setaa = a.data.data.set;
                var n = o.shenhe, s = o.adunit2;
                i.setData({
                    inviteball: t,
                    sonlist: e,
                    setaa: o,
                    shenhe: n,
                    sliu: s
                }), wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: o.headcolor
                }), wx.setNavigationBarTitle({
                    title: o.xcx
                });
            },
            fail: function(a) {
                console.log("失败" + a);
            }
        });
    },
    Createpeoplegoods: function() {
        var d = this;
        0 == d.data.zhmng.is_you ? wx.showModal({
            title: "提示",
            content: "已经抢光了！！！",
            success: function(a) {
                a.confirm ? console.log("用户点击确定") : a.cancel && console.log("用户点击取消");
            }
        }) : wx.chooseAddress({
            success: function(a) {
                var t = a.userName, e = a.postalCode, o = a.provinceName, n = a.cityName, s = a.countyName, i = a.detailInfo, l = a.telNumber, c = a.nationalCode;
                app.util.request({
                    url: "entry/wxapp/Createpeoplegoods",
                    method: "POST",
                    data: {
                        user_id: app.globalData.user_id,
                        userName: t,
                        postalCode: e,
                        provinceName: o,
                        cityName: n,
                        countyName: s,
                        detailInfo: i,
                        telNumber: l,
                        nationalCode: c,
                        goods_id: d.data.goods_id
                    },
                    success: function(a) {
                        d.goodsone(), wx.showModal({
                            title: "提示",
                            content: "兑换成功",
                            success: function(a) {
                                a.confirm ? console.log("用户点击确定") : console.log("用户点击取消");
                            }
                        });
                    },
                    fail: function(a) {
                        wx.showModal({
                            title: "提示",
                            content: a.data.message,
                            success: function(a) {
                                a.confirm ? console.log("用户点击确定") : a.cancel && console.log("用户点击取消");
                            }
                        });
                    }
                });
            },
            fail: function(a) {
                wx.showModal({
                    title: "提示",
                    content: "填写地址才能兑换奖品哦",
                    success: function(a) {
                        a.confirm ? console.log("用户点击确定") : a.cancel && console.log("用户点击取消");
                    }
                });
            }
        });
    },
    gaotwo: function() {
        var a = this, t = a.data.tiaotwo, e = a.data.zhmnglist.length;
        a.data.ycsavua;
        e <= (t += 5) && a.setData({
            ycsavua: !1
        }), a.setData({
            tiaotwo: t
        });
    },
    onReady: function() {},
    onShow: function() {
        this.overdue(), this.fupiao();
    },
    fupiao: function() {
        var n = this;
        app.Headcolor(), setTimeout(function() {
            var a = app.globalData.setdata.is_float, t = app.globalData.setdata.phoneno, e = app.globalData.setdata.copytext;
            if (1 == a) var o = app.globalData.setdata.call_icon; else o = app.globalData.setdata.copy_icon;
            n.setData({
                poc: a,
                phone: t,
                iconimh: o,
                txttex: e
            });
        }, 1e3);
    },
    onHide: function() {},
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
        var s = this;
        s.data.session_key;
        wx.login({
            success: function(a) {
                var t = a.code;
                s.setData({
                    code: t
                }), wx.getWeRunData({
                    success: function(a) {
                        var e = a.encryptedData, o = a.iv;
                        return new Promise(function(a, t) {
                            app.util.request({
                                url: "entry/wxapp/bushu",
                                method: "post",
                                dataType: "json",
                                data: {
                                    wRunEncryptedData: e,
                                    iv: o,
                                    code: s.data.code,
                                    session_key: s.data.session_key,
                                    user_id: app.globalData.user_id
                                },
                                success: function(a) {
                                    var t = a.data.data.bushu, e = a.data.data.weixinbushu, o = a.data.data.user, n = a.data.data.upbushu;
                                    e = a.data.data.weixinbushu;
                                    app.globalData.weixinbushu = a.data.data.weixinbushu, 0 == s.data.selltype ? 1 == s.data.index ? s.goodsone() : 2 == s.data.index && s.goodstwo() : s.goodsone(), 
                                    s.setData({
                                        step: t,
                                        zpnghe: o,
                                        upbushu: n,
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
    fanhui: function() {
        wx.reLaunch({
            url: "../index/index"
        });
    },
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(a) {
        var t = this;
        return t.setData({
            bnian: 1
        }), {
            title: t.data.zhmng.goods_name,
            imageUrl: t.data.zhmng.main_img,
            path: "/hc_step/pages/detail/detail?invite=" + app.globalData.user_id + "&id=" + t.data.goods_id + "&paytype=" + t.data.paytype + "&index=1&selltype=" + t.data.selltype,
            success: function(a) {
                console.log("本地user_id", t.data.user_id);
            },
            fail: function(a) {}
        };
    }
});