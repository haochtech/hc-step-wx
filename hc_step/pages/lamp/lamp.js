Component({
    options: {
        multipleSlots: !0
    },
    properties: {
        Marquistext: {
            type: String,
            value: "测试跑马灯效"
        }
    },
    data: {
        isShow: !0,
        setInter: "",
        num: 1,
        npm: !1,
        rolltime: ""
    },
    methods: {
        hideDialog: function() {
            this.setData({
                npm: !this.data.npm
            });
        },
        showDialog: function() {
            this.setData({
                npm: !this.data.npm
            });
        },
        _cancelEvent: function(t) {
            console.log(t), this.triggerEvent("cancelEvent");
        },
        _confirmEvent: function() {
            this.triggerEvent("confirmEvent");
        },
        startSetInter: function(e) {
            var n = this;
            clearInterval(n.data.setInter), n.data.setInter = setInterval(function() {
                if (n.data.num >= 10 * e) clearInterval(n.data.setInter), n.setData({
                    npm: !0
                }), clearInterval(n.data.setInter); else {
                    var t = n.data.num + 1;
                    n.setData({
                        npm: !1
                    });
                }
                n.setData({
                    num: t
                });
            }, 1e3);
        },
        yinxaing: function(t) {
            var e = t;
            this.setData({
                hikle: !e
            });
        }
    }
});