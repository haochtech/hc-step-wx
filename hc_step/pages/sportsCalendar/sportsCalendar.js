Page({
    data: {
        li: [ {
            num: 1
        }, {
            num: 2
        }, {
            num: 3
        }, {
            num: 4
        }, {
            num: 5
        } ]
    },
    onLoad: function(t) {
        var a = new Date(), e = a.getFullYear(), s = a.getMonth() + 1;
        this.calculateEmptyGrids(e, s), this.calculateDays(e, s), this.setData({
            cur_year: e,
            cur_month: s,
            weeks_ch: [ "日", "一", "二", "三", "四", "五", "六" ]
        }), this.getStepOfMonth();
    },
    getThisMonthDays: function(t, a) {
        return new Date(t, a, 0).getDate();
    },
    getFirstDayOfWeek: function(t, a) {
        return new Date(Date.UTC(t, a - 1, 1)).getDay();
    },
    calculateEmptyGrids: function(t, a) {
        var e = this;
        e.setData({
            days: []
        });
        var s = this.getFirstDayOfWeek(t, a);
        if (0 < (e.data.cellNum = s)) {
            for (var h = 0; h < s; h++) {
                e.data.days.push({
                    date: null,
                    isSign: !1
                });
            }
            this.setData({
                days: e.data.days
            });
        } else this.setData({
            days: []
        });
    },
    calculateDays: function(t, a) {
        for (var e = this.getThisMonthDays(t, a), s = 1; s <= e; s++) {
            var h = {
                date: s,
                stepNum: ""
            };
            this.data.days.push(h);
        }
        this.setData({
            days: this.data.days
        });
        for (var n = 0; n < this.data.days.length; n++) if (null != this.data.days[n].date) for (var i = 0; i < this.data.li.length; i++) this.data.days[n].ca = this.data.li[i].num;
        this.setData({
            days: this.data.days
        });
    },
    handleCalendar: function(t) {
        var a = t.currentTarget.dataset.handle, e = this.data.cur_year, s = this.data.cur_month;
        if ("prev" === a) {
            var h = s - 1, n = e;
            h < 1 && (n = e - 1, h = 12), this.calculateEmptyGrids(n, h), this.calculateDays(n, h), 
            this.setData({
                cur_year: n,
                cur_month: h
            }), this.getStepOfMonth();
        } else {
            var i = s + 1, r = e;
            12 < i && (r = e + 1, i = 1), this.calculateEmptyGrids(r, i), this.calculateDays(r, i), 
            this.setData({
                cur_year: r,
                cur_month: i
            }), this.getStepOfMonth();
        }
    },
    getStepOfMonth: function() {
        var s = this, a = s.data.cur_year + "-" + s.data.cur_month + "-01";
        t.GETSTEPOFMONTH(a, function(t) {
            if ("OK" == t.code) {
                for (var a = s.data.days, e = 0; e < t.data.result.length; e++) a[s.data.cellNum + new Date(t.data.result[e].stepDate).getDate() - 1].stepNum = t.data.result[e].stepNum;
                s.setData({
                    days: a
                });
            }
        });
    },
    onShareAppMessage: function() {},
    onShow: function() {
        this.Shenhe();
    },
    Shenhe: function() {
        var s = this;
        app.util.request({
            url: "entry/wxapp/Shenhe",
            method: "POST",
            success: function(t) {
                var a = t.data.data.shenhe, e = s.data.huid;
                app.globalData.sh_en = t.data.data.shenhe, s.setData({
                    sh_en: a,
                    huid: !e
                });
            }
        });
    }
});