Page({
    data: {
        last_index: 0,
        amplification_index: 0,
        roll_flag: !0,
        max_number: 8,
        speed: 300,
        finalindex: 8,
        myInterval: "",
        max_speed: 40,
        minturns: 8,
        runs_now: 0
    },
    startrolling: function() {
        var a = this;
        a.data.runs_now = 0, a.data.roll_flag && (a.data.roll_flag = !1, a.rolling());
    },
    onShow: function() {
        this.data.min_height = getApp().globalData.windowheight, this.setData(this.data);
    },
    rolling: function(a) {
        var t = this;
        this.data.myInterval = setTimeout(function() {
            t.rolling();
        }, this.data.speed), this.data.runs_now++, this.data.amplification_index++;
        var i = this.data.minturns * this.data.max_number + this.data.finalindex - this.data.last_index;
        this.data.runs_now <= i / 3 * 2 ? (this.data.speed -= 30, this.data.speed <= this.data.max_speed && (this.data.speed = this.data.max_speed)) : this.data.runs_now >= i ? (clearInterval(this.data.myInterval), 
        this.data.roll_flag = !0) : i - this.data.runs_now <= 10 ? this.data.speed += 20 : (this.data.speed += 10, 
        100 <= this.data.speed && (this.data.speed = 100)), this.data.amplification_index > this.data.max_number && (this.data.amplification_index = 1), 
        this.setData(this.data);
    }
});