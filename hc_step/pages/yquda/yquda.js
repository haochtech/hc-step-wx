var t = getApp();

Page({
    data: {
        bgPic: null,
        imgList: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18 ],
        currentHatId: 1,
        hatCenterX: wx.getSystemInfoSync().windowWidth / 2,
        hatCenterY: 150,
        cancelCenterX: wx.getSystemInfoSync().windowWidth / 2 - 50 - 2,
        cancelCenterY: 100,
        handleCenterX: wx.getSystemInfoSync().windowWidth / 2 + 50 - 2,
        handleCenterY: 200,
        hatSize: 100,
        scale: 1,
        rotate: 0
    },
    onLoad: function() {
        this.setData({
            bgPic: t.globalData.bgPic
        });
    },
    onReady: function() {
        this.hat_center_x = this.data.hatCenterX, this.hat_center_y = this.data.hatCenterY, 
        this.cancel_center_x = this.data.cancelCenterX, this.cancel_center_y = this.data.cancelCenterY, 
        this.handle_center_x = this.data.handleCenterX, this.handle_center_y = this.data.handleCenterY, 
        this.scale = this.data.scale, this.rotate = this.data.rotate, this.touch_target = "", 
        this.start_x = 0, this.start_y = 0;
    },
    touchStart: function(t) {
        "hat" == t.target.id ? this.touch_target = "hat" : "handle" == t.target.id ? this.touch_target = "handle" : this.touch_target = "", 
        "" != this.touch_target && (this.start_x = t.touches[0].clientX, this.start_y = t.touches[0].clientY);
    },
    touchEnd: function(t) {
        this.hat_center_x = this.data.hatCenterX, this.hat_center_y = this.data.hatCenterY, 
        this.cancel_center_x = this.data.cancelCenterX, this.cancel_center_y = this.data.cancelCenterY, 
        this.handle_center_x = this.data.handleCenterX, this.handle_center_y = this.data.handleCenterY, 
        this.touch_target = "", this.scale = this.data.scale, this.rotate = this.data.rotate;
    },
    touchMove: function(t) {
        var e = t.touches[0].clientX, a = t.touches[0].clientY, h = e - this.start_x, n = a - this.start_y;
        if ("hat" == this.touch_target && this.setData({
            hatCenterX: this.data.hatCenterX + h,
            hatCenterY: this.data.hatCenterY + n,
            cancelCenterX: this.data.cancelCenterX + h,
            cancelCenterY: this.data.cancelCenterY + n,
            handleCenterX: this.data.handleCenterX + h,
            handleCenterY: this.data.handleCenterY + n
        }), "handle" == this.touch_target) {
            this.setData({
                handleCenterX: this.data.handleCenterX + h,
                handleCenterY: this.data.handleCenterY + n,
                cancelCenterX: 2 * this.data.hatCenterX - this.data.handleCenterX,
                cancelCenterY: 2 * this.data.hatCenterY - this.data.handleCenterY
            });
            var s = this.handle_center_x - this.hat_center_x, i = this.handle_center_y - this.hat_center_y, r = this.data.handleCenterX - this.hat_center_x, c = this.data.handleCenterY - this.hat_center_y, d = Math.sqrt(s * s + i * i), l = Math.sqrt(r * r + c * c), _ = Math.atan2(i, s) / Math.PI * 180, o = Math.atan2(c, r) / Math.PI * 180;
            this.setData({
                scale: l / d * this.scale,
                rotate: o - _ + this.rotate
            });
        }
        this.start_x = e, this.start_y = a;
    },
    chooseImg: function(t) {
        console.log(t), this.setData({
            currentHatId: t.target.dataset.hatId
        });
    },
    combinePic: function() {
        t.globalData.scale = this.scale, t.globalData.rotate = this.rotate, t.globalData.hat_center_x = this.hat_center_x, 
        t.globalData.hat_center_y = this.hat_center_y, t.globalData.currentHatId = this.data.currentHatId, 
        wx.navigateTo({
            url: "../combine/combine"
        });
    }
});