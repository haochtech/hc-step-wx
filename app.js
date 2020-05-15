App({
    onLaunch: function() {
        this.gengxin();
    },
    gengxin: function() {
        var e = wx.getUpdateManager();
        e.onCheckForUpdate(function(n) {
            console.log(n.hasUpdate);
        }), e.onUpdateReady(function() {
            wx.showModal({
                title: "更新提示",
                content: "新版本已经准备好，是否重启应用？",
                success: function(n) {
                    n.confirm && e.applyUpdate();
                }
            });
        }), e.onUpdateFailed(function() {});
    },
    Headcolor: function() {
        var t = this;
        return new Promise(function(n, e) {
            t.util.request({
                url: "entry/wxapp/Headcolor",
                method: "POST",
                success: function(n) {
                    t.globalData.setdata = n.data.data.set;
                },
                fail: function(n) {
                    console.log("失败", n);
                }
            });
        });
    },
    util: require("we7/resource/js/util.js"),
    globalData: {
        userInfo: null,
        user_id: null,
        we_app_info: null
    },
    siteInfo: require("siteinfo.js")
});