Page({
    data: {
        setInter: "",
        num: 1,
        npm: !1
    },
    onLoad: function(t) {},
    onShow: function() {
        this.startSetInter();
    },
    startSetInter: function() {
        var a = this;
        a.data.setInter = setInterval(function() {
            if (20 <= a.data.num) a.setData({
                npm: !0
            }), clearInterval(a.data.setInter); else var t = a.data.num + 1;
            a.setData({
                num: t
            }), console.log("setInterval==" + a.data.num);
        }, 1e3);
    }
});