function _defineProperty(n, e, t) {
    return e in n ? Object.defineProperty(n, e, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : n[e] = t, n;
}

Page({
    data: {
        region: [],
        enter: !1,
        und: {
            li: "faka",
            ttx: "改"
        }
    },
    onLoad: function(n) {
        this.data.und;
        var e = this.data.und.li;
        this.setData(_defineProperty({}, e, "改变")), console.log(this.data.und);
    },
    yuab: function() {
        this.setData({
            enter: !this.data.enter
        });
    },
    onReady: function() {},
    bindRegionChange: function(n) {
        console.log("picker发送选择改变，携带值为", n.detail.value), this.setData({
            region: n.detail.value
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});