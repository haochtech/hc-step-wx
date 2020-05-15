Page({
    data: {
        indicatorDots: !0,
        autoplay: !0,
        circular: !0,
        interval: 5e3,
        duration: 1e3,
        genderIndex: "",
        genders: [ {
            name: "男",
            value: "1"
        }, {
            name: "女",
            value: "2"
        } ],
        area: [],
        userInfo: {},
        dataJson: [],
        formConfig: {},
        hasAuth: 0,
        base: "",
        title: ""
    },
    onLoad: function(t) {
        this.setData({
            dataJson: JSON.parse(t.xmadPage),
            hasAuth: "0" == t.hasAuth ? 0 : 1,
            base: t.bs,
            title: t.title,
            "formConfig.uuid": t.ukey,
            "formConfig.ak": t.appkey,
            "formConfig.page_key": t.pagekey,
            "formConfig.curl": t.cu.replace(/!/gi, "=")
        }), this.setTitle();
    },
    onShow: function() {},
    areaChange: function(t) {
        this.setData({
            area: t.detail.value
        });
    },
    postLog: function(a, e) {
        var n = 0, o = this.data.base;
        !function t() {
            wx.request({
                url: o + a.url,
                data: a.data,
                method: "post",
                success: function() {
                    e && wx.showModal({
                        content: "提交成功~",
                        showCancel: !1,
                        confirmText: "好的"
                    });
                },
                fail: function() {
                    n < 2 && (n++, setTimeout(function() {
                        t();
                    }, 1e3));
                }
            });
        }();
    },
    submitForm: function(t) {
        var a = this.data.dataJson.filter(function(t) {
            return "form" === t.type;
        })[0].data.needs, e = t.detail.value;
        for (var n in a) if (a[n] && !e[n]) return wx.showModal({
            content: "请填写完整后再提交哦~",
            showCancel: !1,
            confirmText: "知道了"
        });
        this.postLog({
            url: "order",
            data: Object.assign({}, {
                dataType: 2
            }, this.data.formConfig, e)
        }, 1);
    },
    setTitle: function() {
        this.data.title && wx.setNavigationBarTitle({
            title: this.data.title
        });
    }
});