Page({
    data: {
        image: [ {
            img: [ "../../resource/images/t2.jpg", "../../resource/images/t2.jpg" ]
        }, {
            img: [ "../../resource/images/yah.png" ],
            list: 1
        } ]
    },
    onLoad: function(o) {
        if (app.globalData.headcolor) var a = app.globalData.headcolor; else a = "#ffffff";
        if ("#ffffff" == a) var n = "#000000"; else n = "#ffffff";
        wx.setNavigationBarColor({
            frontColor: n,
            backgroundColor: a
        });
    },
    onReady: function() {},
    onShow: function() {
        for (var o = this.data.image, a = 0; a < o.length; a++) 1 == o[a].img.length && console.log(this.imageLoad(o[a].img[0]));
    },
    dd: function(o) {
        return "aaaa";
    },
    imageLoad: function(o) {
        var e;
        o = o;
        return wx.getImageInfo({
            src: o,
            success: function(o) {
                console.log(o);
                var a = o.width, n = o.height;
                e = 452 / (a / n);
            }
        }), e;
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});