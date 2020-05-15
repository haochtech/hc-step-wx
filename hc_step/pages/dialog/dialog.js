Component({
    options: {
        multipleSlots: !0
    },
    properties: {
        title: {
            type: String,
            value: "标题"
        },
        content: {
            type: String,
            value: "弹窗内容"
        },
        cancelText: {
            type: String,
            value: "取消"
        },
        confirmText: {
            type: String,
            value: "确定"
        }
    },
    data: {
        isShow: !1
    },
    methods: {
        hideDialog: function() {
            this.setData({
                isShow: !this.data.isShow
            });
        },
        showDialog: function() {
            this.setData({
                isShow: !this.data.isShow
            });
        },
        _cancelEvent: function() {
            this.triggerEvent("cancelEvent");
        },
        _confirmEvent: function() {
            this.triggerEvent("confirmEvent");
        },
        startSetInter: function() {
            var e = this;
            e.data.setInter = setInterval(function() {
                if (30 <= e.data.num) e.setData({
                    npm: !0
                }), clearInterval(e.data.setInter); else var t = e.data.num + 1;
                e.setData({
                    num: t
                }), console.log("setInterval==" + e.data.num);
            }, 1e3);
        }
    }
});