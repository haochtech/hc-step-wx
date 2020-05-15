var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, app = getApp();

Page({
    data: {
        arr: [],
        host: null,
        upToken: null,
        updown: !0,
        linkFrom: "",
        addressName: "",
        latitude: "",
        longitude: "",
        detailPics: [],
        addressname: "",
        pics: [],
        count: 9,
        yao: [ "春风摇曳评女神", "新人报道", "春光正好我来赏美景", "瘦身行动打卡" ],
        hotissus: ""
    },
    aaa: function() {
        cnsole.log("22sax4sa");
    },
    yaddv: function(t) {
        var a = t.currentTarget.dataset.text, e = t.currentTarget.dataset.index, o = t.currentTarget.dataset.topic_id;
        this.setData({
            thei: e,
            hotissus: a,
            topic_id: o
        });
    },
    dleade: function() {
        this.setData({
            hotissus: "",
            thei: null
        });
    },
    onShow: function() {
        if (app.globalData.headcolor) var t = app.globalData.headcolor; else t = "#ffffff";
        if ("#ffffff" == t) var a = "#000000"; else a = "#ffffff";
        wx.setNavigationBarColor({
            frontColor: a,
            backgroundColor: t
        }), this.Topiclist();
    },
    Topiclist: function() {
        var e = this;
        app.util.request({
            url: "entry/wxapp/Topiclist",
            method: "POST",
            success: function(t) {
                var a = t.data.data;
                e.setData({
                    yao: a
                }), console.log(a);
            }
        });
    },
    uploadDetailImage: function(t) {
        console.log(111);
        var o = this, i = [], a = o.data.pics, s = app.util.url("entry/wxapp/Uploadimg") + "&&m=hc_step";
        a.length >= o.data.count ? wx.showToast({
            title: "最多选择" + o.data.count + "张！"
        }) : wx.chooseImage({
            count: o.data.count,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(t) {
                for (var a = t.tempFilePaths, e = 0; e < a.length; e++) i.push(a[e]);
                o.uploadimg({
                    upinage: s,
                    pics: i
                }), wx.showToast({
                    title: "正在上传...",
                    icon: "loading",
                    mask: !0,
                    duration: 1e4
                });
            }
        });
    },
    uploadimg: function(s) {
        var n = this, c = s.i ? s.i : 0, l = s.success ? s.success : 0, u = s.fail ? s.fail : 0;
        console.log(c, s.pics[c], "传递的图片路径"), wx.uploadFile({
            url: s.upinage,
            filePath: s.pics[c],
            name: "file",
            formData: {},
            header: {
                "Content-Type": "multipart/form-data"
            },
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {
                var a = t.data;
                if ("object" != (void 0 === (a = a.replace(" ", "")) ? "undefined" : _typeof(a))) {
                    a = a.replace(/\ufeff/g, "");
                    var e = JSON.parse(a);
                    t.data = e;
                }
                var o = t.data.data;
                console.log("接收成功的路径", o);
                var i = n.data.pics;
                i.push(o), n.setData({
                    pics: i
                }), (c += 1) == s.pics.length ? wx.showToast({
                    title: "上传成功",
                    duration: 1500,
                    mask: "false"
                }) : (s.i = c, s.success = l, s.fail = u, n.uploadimg(s));
            }
        });
    },
    remove: function(t) {
        var a = this, e = t.currentTarget.dataset.index;
        a.data.pics.splice(e, 1), a.setData({
            pics: a.data.pics
        });
    },
    map: function() {
        var e = this;
        wx.getLocation({
            type: "gcj02",
            success: function(t) {
                t.latitude, t.longitude;
                wx.chooseLocation({
                    success: function(t) {
                        var a = t.name;
                        e.setData({
                            addressname: a,
                            latitude: t.latitude,
                            longitude: t.longitude
                        });
                    },
                    fail: function(t) {
                        console.log(t);
                    }
                });
            }
        });
    },
    detail_two: function() {
        this.setData({
            addressname: ""
        });
    },
    bindTextAreaBlur: function(t) {
        var a = t.detail.value;
        this.setData({
            txt: a
        });
    },
    submit: function() {
        var t = this, a = t.data.txt;
        null == a && (a = ""), app.util.request({
            url: "entry/wxapp/Adddt",
            method: "POST",
            data: {
                description: a,
                pics: t.data.pics,
                topic_id: t.data.topic_id,
                addressname: t.data.addressname,
                user_id: app.globalData.user_id,
                latitude: t.data.latitude,
                longitude: t.data.longitude
            },
            success: function(t) {
                console.log(t.data.data), t.data.data && (wx.showToast({
                    title: "发布成功",
                    icon: "success",
                    duration: 1e4
                }), setTimeout(function() {
                    wx.navigateBack({
                        delta: 1
                    });
                }, 1e3));
            }
        });
    }
});