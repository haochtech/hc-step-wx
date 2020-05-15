Page({
    data: {
        region: [ "地区信息（请选择）", "", "" ],
        address: ""
    },
    onLoad: function(o) {},
    bindRegionChange: function(o) {
        console.log("picker发送选择改变，携带值为", o.detail.value), this.setData({
            region: o.detail.value,
            provinceName: o.detail.value[0],
            cityName: o.detail.value[1],
            countyName: o.detail.value[2]
        });
    },
    formSubmit: function(o) {
        console.log("form发生了submit事件，携带数据为：", o.detail.value);
        var e = o.detail.value;
        return "" == e.userName ? (wx.showToast({
            title: "请填写姓名",
            icon: "none",
            duration: 1e3
        }), !1) : "" == e.region ? (wx.showToast({
            title: "请选择地区",
            icon: "none",
            duration: 1e3
        }), !1) : "" == e.telNumber ? (wx.showToast({
            title: "请填写联系方式",
            icon: "none",
            duration: 1e3
        }), !1) : "" == e.detailInfo ? (wx.showToast({
            title: "请填写详细地址",
            icon: "none",
            duration: 1e3
        }), !1) : void wx.navigateTo({
            url: "../take/take"
        });
    },
    onReady: function() {},
    onShow: function() {
        console.log(this.data.address);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});