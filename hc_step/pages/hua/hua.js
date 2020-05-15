var app = getApp();

Page({
    data: {
        items: [],
        startX: 0,
        startY: 0
    },
    onLoad: function() {
        for (var t = 0; t < 10; t++) this.data.items.push({
            content: t + " 向左滑动删除哦,向左滑动删除哦,向左滑动删除哦,向左滑动删除哦,向左滑动删除哦",
            isTouchMove: !1
        });
        this.setData({
            items: this.data.items
        });
    },
    touchstart: function(t) {
        this.data.items.forEach(function(t, a) {
            t.isTouchMove && (t.isTouchMove = !1);
        }), this.setData({
            startX: t.changedTouches[0].clientX,
            startY: t.changedTouches[0].clientY,
            items: this.data.items
        });
    },
    touchmove: function(t) {
        var a = this, e = t.currentTarget.dataset.index, s = a.data.startX, i = a.data.startY, c = t.changedTouches[0].clientX, n = t.changedTouches[0].clientY, h = a.angle({
            X: s,
            Y: i
        }, {
            X: c,
            Y: n
        });
        a.data.items.forEach(function(t, a) {
            t.isTouchMove = !1, 30 < Math.abs(h) || a == e && (t.isTouchMove = !(s < c));
        }), a.setData({
            items: a.data.items
        });
    },
    angle: function(t, a) {
        var e = a.X - t.X, s = a.Y - t.Y;
        return 360 * Math.atan(s / e) / (2 * Math.PI);
    },
    del: function(t) {
        this.data.items.splice(t.currentTarget.dataset.index, 1), this.setData({
            items: this.data.items
        });
    }
});