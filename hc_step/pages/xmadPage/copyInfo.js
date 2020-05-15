Page({
    data: {
        indicatorDots: !0,
        autoplay: !0,
        circular: !0,
        interval: 5e3,
        duration: 1e3,
        dataJson: [],
        formConfig: {},
        base: "",
        title: ""
    },
    onLoad: function(t) {
        this.setData({
            base: t.bs,
            title: t.title,
            "formConfig.uuid": t.ukey,
            "formConfig.ak": t.appkey,
            "formConfig.page_key": t.pagekey,
            "formConfig.curl": t.cu.replace(/!/gi, "=")
        });
        var a = JSON.parse(t.xmadPage);
        this.setTitle(), this.setData({
            dataJson: a
        });
    },
    onShow: function() {},
    setTitle: function() {
        this.data.title && wx.setNavigationBarTitle({
            title: this.data.title
        });
    },
    copyPublicAddress: function() {
        var o = void 0, a = this;
        a.data.dataJson.forEach(function(t, a, i) {
            switch (t.type) {
              case "form":
                o = t.data.config.orderInfo.wechatCount;
            }
        });
        var i = 0;
        !function t() {
            wx.request({
                url: a.data.base + "copyPublicAccount",
                data: {
                    curl: a.data.formConfig.curl
                },
                method: "post",
                success: function() {},
                fail: function() {
                    i < 2 && (i++, data.retryTimes = i, setTimeout(function() {
                        t();
                    }, 1e3));
                }
            });
        }(), wx.setClipboardData({
            data: o,
            success: function(t) {},
            fail: function() {},
            complete: function() {}
        });
    }
});