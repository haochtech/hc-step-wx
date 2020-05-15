var app = getApp();

Component({
    options: {
        multipleSlots: !0
    },
    properties: {
        img: {
            type: String,
            value: "../../resource/images/ptu.png"
        },
        poc: {
            type: String,
            value: "0"
        },
        phone: {
            type: String,
            value: "15265985144"
        },
        txt: {
            type: String,
            value: "这是一段文字"
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
        porc: function(t) {
            var a = t.currentTarget.dataset.poc, e = t.currentTarget.dataset.txt, n = t.currentTarget.dataset.phone;
            1 == a ? wx.makePhoneCall({
                phoneNumber: n
            }) : 2 == a && wx.setClipboardData({
                data: e,
                success: function(t) {
                    wx.getClipboardData({
                        success: function(t) {
                            console.log(t.data);
                        }
                    });
                }
            });
        },
        _cancelEvent: function(t) {
            console.log(t), this.triggerEvent("cancelEvent");
        },
        _confirmEvent: function() {
            this.triggerEvent("confirmEvent");
        },
        onShow: function() {
            this.Headcolor();
        },
        Headcolor: function() {
            var i = this;
            app.util.request({
                url: "entry/wxapp/Headcolor",
                method: "POST",
                data: {
                    user_id: app.globalData.user_id
                },
                success: function(t) {
                    var a = t.data.data.inviteball, e = t.data.data.sonlist, n = t.data.data.set;
                    app.globalData.setaa = t.data.data.set;
                    var o = t.data.data.user, s = o.money;
                    i.setData({
                        inviteball: a,
                        sonlist: e,
                        setaa: n,
                        user: o,
                        money: s
                    });
                },
                fail: function(t) {
                    console.log("失败" + t);
                }
            });
        }
    }
});