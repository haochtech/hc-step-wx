Page({
    data: {
        region: [ "地区信息（请选择）", "", "" ],
        aaa: 111,
        area: [ {
            provinceName: "山东",
            cityName: "济南市",
            countyName: "珠海区",
            detailInfo: "详细",
            telNumber: "15266358544",
            userName: "v5"
        }, {
            provinceName: "山西",
            cityName: "太原市",
            countyName: "珠海区",
            detailInfo: "智源街道",
            telNumber: "15266358544",
            userName: "v5"
        } ]
    },
    onLoad: function(a) {
        this.chincs();
    },
    chincs: function() {
        for (var a = this, e = 0; e < a.data.area.length; e++) a.data.area[e].chinge = !1;
        a.data.area[0].chinge = !0, a.setData({
            area: a.data.area
        });
    },
    chinge: function(a) {
        for (var e = this, t = a.currentTarget.dataset.index, n = 0; n < e.data.area.length; n++) e.data.area[n].chinge = !1;
        e.data.area[t].chinge = !0, e.setData({
            area: e.data.area
        });
    },
    chaihan: function() {
        for (var a = this, e = 0; e < a.data.area.length; e++) 1 == a.data.area[e].chinge && a.setData({
            address: a.data.area[e]
        });
    },
    onReady: function() {},
    bindRegionChange: function(a) {
        console.log("picker发送选择改变，携带值为", a.detail.value), this.setData({
            region: a.detail.value
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {
        for (var a = getCurrentPages(), e = a[a.length - 2], t = this, n = 0; n < t.data.area.length; n++) 1 == t.data.area[n].chinge && (t.setData({
            address: t.data.area[n]
        }), e.setData({
            address: t.data.area[n]
        }));
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});