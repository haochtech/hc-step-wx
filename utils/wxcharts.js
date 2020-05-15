function t(t, n) {
    if (null == t) throw new TypeError("Cannot convert undefined or null to object");
    for (var i = Object(t), e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        if (null != a) for (var o in a) Object.prototype.hasOwnProperty.call(a, o) && (i[o] = a[o]);
    }
    return i;
}

function n(t, n, i) {
    if (isNaN(t)) throw new Error("[wxCharts] unvalid series data!");
    i = i || 10, n = n || "upper";
    for (var e = 1; i < 1; ) i *= 10, e *= 10;
    for (t = "upper" === n ? Math.ceil(t * e) : Math.floor(t * e); t % i != 0; ) "upper" === n ? t++ : t--;
    return t / e;
}

function i(t, n, i, e) {
    var a = e.width - i.padding - n.xAxisPoints[0], o = n.eachSpacing * e.categories.length, r = t;
    return 0 <= t ? r = 0 : Math.abs(t) >= o - a && (r = a - o), r;
}

function e(t, n, i) {
    function e(t) {
        for (;t < 0; ) t += 2 * Math.PI;
        for (;t > 2 * Math.PI; ) t -= 2 * Math.PI;
        return t;
    }
    return t = e(t), n = e(n), (i = e(i)) < n && (i += 2 * Math.PI, t < n && (t += 2 * Math.PI)), 
    n <= t && t <= i;
}

function a(t, n) {
    function i(t, n) {
        return !(!t[n - 1] || !t[n + 1]) && (t[n].y >= Math.max(t[n - 1].y, t[n + 1].y) || t[n].y <= Math.min(t[n - 1].y, t[n + 1].y));
    }
    var e = null, a = null, o = null, r = null;
    if (n < 1 ? (e = t[0].x + .2 * (t[1].x - t[0].x), a = t[0].y + .2 * (t[1].y - t[0].y)) : (e = t[n].x + .2 * (t[n + 1].x - t[n - 1].x), 
    a = t[n].y + .2 * (t[n + 1].y - t[n - 1].y)), n > t.length - 3) {
        var s = t.length - 1;
        o = t[s].x - .2 * (t[s].x - t[s - 1].x), r = t[s].y - .2 * (t[s].y - t[s - 1].y);
    } else o = t[n + 1].x - .2 * (t[n + 2].x - t[n].x), r = t[n + 1].y - .2 * (t[n + 2].y - t[n].y);
    return i(t, n + 1) && (r = t[n + 1].y), i(t, n) && (a = t[n].y), {
        ctrA: {
            x: e,
            y: a
        },
        ctrB: {
            x: o,
            y: r
        }
    };
}

function o(t, n) {
    var i = 0;
    return t.map(function(t) {
        return t.color || (t.color = n.colors[i], i = (i + 1) % n.colors.length), t;
    });
}

function r(t, i) {
    var e, a = i - t;
    return {
        minRange: n(t, "lower", e = 1e4 <= a ? 1e3 : 1e3 <= a ? 100 : 100 <= a ? 10 : 10 <= a ? 5 : 1 <= a ? 1 : .1 <= a ? .1 : .01),
        maxRange: n(i, "upper", e)
    };
}

function s(t) {
    var n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 10, i = 0;
    return (t = (t = String(t)).split("")).forEach(function(t) {
        /[a-zA-Z]/.test(t) ? i += 7 : /[0-9]/.test(t) ? i += 5.5 : /\./.test(t) ? i += 2.7 : /-/.test(t) ? i += 3.25 : /[\u4e00-\u9fa5]/.test(t) ? i += 10 : /\(|\)/.test(t) ? i += 3.73 : /\s/.test(t) ? i += 2.5 : /%/.test(t) ? i += 8 : i += 10;
    }), i * n / 10;
}

function h(t) {
    return t.reduce(function(t, n) {
        return (t.data ? t.data : t).concat(n.data);
    }, []);
}

function c(t, i) {
    var e = [];
    return t.forEach(function(t) {
        if (null !== t.data[i] && "undefinded" != typeof t.data[i]) {
            var n = {};
            n.color = t.color, n.name = t.name, n.data = t.format ? t.format(t.data[i]) : t.data[i], 
            e.push(n);
        }
    }), e;
}

function l(t, n, i, e) {
    var a = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : {}, o = t.map(function(t) {
        return {
            text: a.format ? a.format(t, e[i]) : t.name + ": " + t.data,
            color: t.color
        };
    }), r = [], s = {
        x: 0,
        y: 0
    };
    return n.forEach(function(t) {
        "undefinded" != typeof t[i] && null !== t[i] && r.push(t[i]);
    }), r.forEach(function(t) {
        s.x = Math.round(t.x), s.y += t.y;
    }), s.y /= r.length, {
        textList: o,
        offset: s
    };
}

function u(i, t, n, e) {
    var a = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : 0, o = -1;
    return f(i, n, e) && t.forEach(function(t, n) {
        i.x + a > t && (o = n);
    }), o;
}

function f(t, n, i) {
    return t.x < n.width - i.padding && t.x > i.padding + i.yAxisWidth + i.yAxisTitleWidth && t.y > i.padding && t.y < n.height - i.legendHeight - i.xAxisHeight - i.padding;
}

function d(t, n, i) {
    var a = 2 * Math.PI / i, o = -1;
    if (x(t, n.center, n.radius)) {
        var r = function(t) {
            return t < 0 && (t += 2 * Math.PI), t > 2 * Math.PI && (t -= 2 * Math.PI), t;
        }, s = Math.atan2(n.center.y - t.y, t.x - n.center.x);
        (s *= -1) < 0 && (s += 2 * Math.PI), n.angleList.map(function(t) {
            return r(-1 * t);
        }).forEach(function(t, n) {
            var i = r(t - a / 2), e = r(t + a / 2);
            e < i && (e += 2 * Math.PI), (i <= s && s <= e || s + 2 * Math.PI >= i && s + 2 * Math.PI <= e) && (o = n);
        });
    }
    return o;
}

function p(t, n) {
    var i = -1;
    if (x(t, n.center, n.radius)) {
        var a = Math.atan2(n.center.y - t.y, t.x - n.center.x);
        a = -a;
        for (var o = 0, r = n.series.length; o < r; o++) {
            var s = n.series[o];
            if (e(a, s._start_, s._start_ + 2 * s._proportion_ * Math.PI)) {
                i = o;
                break;
            }
        }
    }
    return i;
}

function x(t, n, i) {
    return Math.pow(t.x - n.x, 2) + Math.pow(t.y - n.y, 2) <= Math.pow(i, 2);
}

function g(t) {
    var i = [], e = [];
    return t.forEach(function(t, n) {
        null !== t ? e.push(t) : (e.length && i.push(e), e = []);
    }), e.length && i.push(e), i;
}

function y(t, i, n) {
    if (!1 === i.legend) return {
        legendList: [],
        legendHeight: 0
    };
    var e = [], a = 0, o = [];
    return t.forEach(function(t) {
        var n = 30 + s(t.name || "undefinded");
        a + n > i.width ? (e.push(o), a = n, o = [ t ]) : (a += n, o.push(t));
    }), o.length && e.push(o), {
        legendList: e,
        legendHeight: e.length * (n.fontSize + 8) + 5
    };
}

function v(t, n, i) {
    var e = {
        angle: 0,
        xAxisHeight: i.xAxisHeight
    }, a = A(t, n, i).eachSpacing, o = t.map(function(t) {
        return s(t);
    }), r = Math.max.apply(this, o);
    return r + 2 * i.xAxisTextPadding > a && (e.angle = 45 * Math.PI / 180, e.xAxisHeight = 2 * i.xAxisTextPadding + r * Math.sin(e.angle)), 
    e;
}

function m(t) {
    var n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 1, i = 0, e = 0;
    return t.forEach(function(t) {
        t.data = null === t.data ? 0 : t.data, i += t.data;
    }), t.forEach(function(t) {
        t.data = null === t.data ? 0 : t.data, t._proportion_ = t.data / i * n;
    }), t.forEach(function(t) {
        t._start_ = e, e += 2 * t._proportion_ * Math.PI;
    }), t;
}

function P(t) {
    var i = 0;
    return (t = m(t)).forEach(function(t) {
        var n = t.format ? t.format(+t._proportion_.toFixed(2)) : G.toFixed(100 * t._proportion_) + "%";
        i = Math.max(i, s(n));
    }), i;
}

function A(t, n, i) {
    var e = i.yAxisWidth + i.yAxisTitleWidth, a = (n.width - 30) / (n.enableScroll ? Math.min(5, t.length) : t.length) + 2, o = [], r = i.padding + e, s = n.width - i.padding;
    return t.forEach(function(t, n) {
        o.push(30 + n * a);
    }), !0 === n.enableScroll ? o.push(r + t.length * a) : o.push(s), {
        xAxisPoints: o,
        startX: r,
        endX: s,
        eachSpacing: a
    };
}

function M(t, a, o, r, s, h, c) {
    var l = 7 < arguments.length && void 0 !== arguments[7] ? arguments[7] : 1, u = [], f = h.height - 2 * c.padding - c.xAxisHeight - c.legendHeight;
    return t.forEach(function(t, n) {
        if (null === t) u.push(null); else {
            var i = {};
            i.x = r[n] + Math.round(s / 2) - 20;
            var e = f * (t - a) / (o - a);
            e *= l, i.y = h.height - c.xAxisHeight - c.legendHeight - Math.round(e) - c.padding + 20, 
            i.v = t, u.push(i);
        }
    }), u;
}

function S(t, n, i) {
    var e = h(t);
    e = e.filter(function(t) {
        return null !== t;
    });
    var a = Math.min.apply(this, e), o = Math.max.apply(this, e);
    if ("number" == typeof n.yAxis.min && (a = Math.min(n.yAxis.min, a)), "number" == typeof n.yAxis.max && (o = Math.max(n.yAxis.max, o)), 
    a === o) {
        var s = o || 1;
        a -= s, o += s;
    }
    for (var c = r(a, o), l = c.minRange, u = [], f = (c.maxRange - l) / i.yAxisSplit, d = 0; d <= i.yAxisSplit; d++) u.push(l + f * d);
    return u.reverse();
}

function b(t, n, i) {
    var e = S(t, n, i), a = i.yAxisWidth, o = e.map(function(t) {
        return t = G.toFixed(t, 2), t = n.yAxis.format ? n.yAxis.format(Number(t)) : t, 
        a = Math.max(a, s(t) + 5), t;
    });
    return !0 === n.yAxis.disabled && (a = 0), {
        rangesFormat: o,
        ranges: e,
        yAxisWidth: a
    };
}

function I(t, n, i, e) {
    e.beginPath(), e.setStrokeStyle("#404040"), e.setLineWidth(1), e.setFillStyle("#ffffff"), 
    t.forEach(function(t, n) {
        null !== t && (e.moveTo(t.x + 2.5, t.y), e.setStrokeStyle("#ab71ec"), e.arc(t.x, t.y, 2.5, 0, 2 * Math.PI, !1), 
        e.setFillStyle("#868686"), e.font = "10rpx PingFang-SC-Regular", e.fillText(t.v, t.x - 10, t.y - 10));
    }), e.closePath(), e.setFillStyle("#ffffff"), e.fill(), e.stroke();
}

function _(t, n, i) {}

function T(t, n, i, e) {}

function w(t, n, i, e, a, o) {}

function L(t, n, i, e) {}

function D(t, n, i, e) {}

function E(t, n, i, e) {}

function C(t, o, r, s) {
    var h = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : 1, n = b(t, o, r).ranges, i = A(o.categories, o, r), c = i.xAxisPoints, l = i.eachSpacing, u = n.pop(), f = n.shift(), d = [];
    return s.save(), o._scrollDistance_ && 0 !== o._scrollDistance_ && !0 === o.enableScroll && s.translate(o._scrollDistance_, 0), 
    o.tooltip && o.tooltip.textList && o.tooltip.textList.length && 1 === h && L(o.tooltip.offset.x, o, r, s), 
    t.forEach(function(t, n) {
        var i = M(t.data, u, f, c, l, o, r, h);
        if (d.push(i), g(i).forEach(function(e, t) {
            s.beginPath(), s.setStrokeStyle("#ab71ec"), s.setLineWidth(3), 1 === e.length ? (s.moveTo(e[0].x, e[0].y), 
            s.arc(e[0].x, e[0].y, 1, 0, 2 * Math.PI)) : (s.moveTo(e[0].x, e[0].y), "curve" === o.extra.lineStyle ? e.forEach(function(t, n) {
                if (0 < n) {
                    var i = a(e, n - 1);
                    s.bezierCurveTo(i.ctrA.x, i.ctrA.y, i.ctrB.x, i.ctrB.y, t.x, t.y);
                }
            }) : e.forEach(function(t, n) {
                0 < n && s.lineTo(t.x, t.y);
            }), s.moveTo(e[0].x, e[0].y)), s.closePath(), s.stroke();
        }), !1 !== o.dataPointShape) {
            var e = r.dataPointShape[n % r.dataPointShape.length];
            I(i, t.color, e, s);
        }
    }), !1 !== o.dataLabel && 1 === h && t.forEach(function(t, n) {
        T(M(t.data, u, f, c, l, o, r, h), t, r, s);
    }), {
        xAxisPoints: c,
        calPoints: d,
        eachSpacing: l
    };
}

function F(t, n, i, e) {}

function O(t, n, i, e) {}

function H(t, n, i) {}

function W(t, n, i, e) {}

function k(t, n, i, e) {}

function z(t, n, i, e) {
    var a = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : 1, o = n.extra.pie || {};
    t = m(t, a);
    var r = {
        x: n.width / 2,
        y: (n.height - i.legendHeight) / 2
    }, s = Math.min(r.x - i.pieChartLinePadding - i.pieChartTextPadding - i._pieTextMaxLength_, r.y - i.pieChartLinePadding - i.pieChartTextPadding);
    if (n.dataLabel ? s -= 10 : s -= 2 * i.padding, (t = t.map(function(t) {
        return t._start_ += (o.offsetAngle || 0) * Math.PI / 180, t;
    })).forEach(function(t) {
        e.beginPath(), e.setLineWidth(2), e.setStrokeStyle("#ffffff"), e.setFillStyle(t.color), 
        e.moveTo(r.x, r.y), e.arc(r.x, r.y, s, t._start_, t._start_ + 2 * t._proportion_ * Math.PI), 
        e.closePath(), e.fill(), !0 !== n.disablePieStroke && e.stroke();
    }), "ring" === n.type) {
        var h = .6 * s;
        "number" == typeof n.extra.ringWidth && 0 < n.extra.ringWidth && (h = Math.max(0, s - n.extra.ringWidth)), 
        e.beginPath(), e.setFillStyle(n.background || "#ffffff"), e.moveTo(r.x, r.y), e.arc(r.x, r.y, h, 0, 2 * Math.PI), 
        e.closePath(), e.fill();
    }
    if (!1 !== n.dataLabel && 1 === a) {
        for (var c = !1, l = 0, u = t.length; l < u; l++) if (0 < t[l].data) {
            c = !0;
            break;
        }
        c && w(t, n, i, e, s, r);
    }
    return 1 === a && "ring" === n.type && _(n, i, e), {
        center: r,
        radius: s,
        series: t
    };
}

function X(t, n, i, e) {}

function R(t, n) {
    n.draw();
}

function B(i) {
    this.isStop = !1, i.duration = void 0 === i.duration ? 1e3 : i.duration, i.timing = i.timing || "linear";
    var e = "undefined" != typeof requestAnimationFrame ? requestAnimationFrame : "undefined" != typeof setTimeout ? function(n, t) {
        setTimeout(function() {
            var t = +new Date();
            n(t);
        }, t);
    } : function(t) {
        t(null);
    }, a = null, o = function(t) {
        if (null === t || !0 === this.isStop) return i.onProcess && i.onProcess(1), void (i.onAnimationFinish && i.onAnimationFinish());
        if (null === a && (a = t), t - a < i.duration) {
            var n = (t - a) / i.duration;
            n = (0, Z[i.timing])(n), i.onProcess && i.onProcess(n), e(o, 17);
        } else i.onProcess && i.onProcess(1), i.onAnimationFinish && i.onAnimationFinish();
    };
    o = o.bind(this), e(o, 17);
}

function j(t, r, s, h) {
    var c = this, l = r.series, u = r.categories, n = y(l = o(l, s), r, s).legendHeight;
    s.legendHeight = n;
    var i = b(l, r, s).yAxisWidth;
    if (s.yAxisWidth = i, u && u.length) {
        var e = v(u, r, s), a = e.xAxisHeight, f = e.angle;
        s.xAxisHeight = a, s._xAxisTextAngle_ = f;
    }
    "pie" !== t && "ring" !== t || (s._pieTextMaxLength_ = !1 === r.dataLabel ? 0 : P(l));
    var d = r.animation ? 1e3 : 0;
    switch (this.animationInstance && this.animationInstance.stop(), t) {
      case "line":
        this.animationInstance = new B({
            timing: "easeIn",
            duration: d,
            onProcess: function(t) {
                H(r, s, h);
                var n = C(l, r, s, h, t), i = n.xAxisPoints, e = n.calPoints, a = n.eachSpacing;
                c.chartData.xAxisPoints = i, c.chartData.calPoints = e, c.chartData.eachSpacing = a, 
                O(u, r, s, h), k(r.series, r, s, h), W(l, r, s, h), F(r, s, h, t), R(r, h);
            },
            onAnimationFinish: function() {
                c.event.trigger("renderComplete");
            }
        });
        break;

      case "column":
        this.animationInstance = new B({
            timing: "easeIn",
            duration: d,
            onProcess: function(t) {
                H(r, s, h);
                var n = D(l, r, s, h, t), i = n.xAxisPoints, e = n.eachSpacing;
                c.chartData.xAxisPoints = i, c.chartData.eachSpacing = e, O(u, r, s, h), k(r.series, r, s, h), 
                W(l, r, s, h), R(r, h);
            },
            onAnimationFinish: function() {
                c.event.trigger("renderComplete");
            }
        });
        break;

      case "area":
        this.animationInstance = new B({
            timing: "easeIn",
            duration: d,
            onProcess: function(t) {
                H(r, s, h);
                var n = E(l, r, s, h, t), i = n.xAxisPoints, e = n.calPoints, a = n.eachSpacing;
                c.chartData.xAxisPoints = i, c.chartData.calPoints = e, c.chartData.eachSpacing = a, 
                O(u, r, s, h), k(r.series, r, s, h), W(l, r, s, h), F(r, s, h, t), R(r, h);
            },
            onAnimationFinish: function() {
                c.event.trigger("renderComplete");
            }
        });
        break;

      case "ring":
      case "pie":
        this.animationInstance = new B({
            timing: "easeInOut",
            duration: d,
            onProcess: function(t) {
                c.chartData.pieData = z(l, r, s, h, t), k(r.series, r, s, h), R(r, h);
            },
            onAnimationFinish: function() {
                c.event.trigger("renderComplete");
            }
        });
        break;

      case "radar":
        this.animationInstance = new B({
            timing: "easeInOut",
            duration: d,
            onProcess: function(t) {
                c.chartData.radarData = X(l, r, s, h, t), k(r.series, r, s, h), R(r, h);
            },
            onAnimationFinish: function() {
                c.event.trigger("renderComplete");
            }
        });
    }
}

function q() {
    this.events = {};
}

var N = {
    yAxisWidth: 20,
    yAxisSplit: 6,
    xAxisHeight: 15,
    xAxisLineHeight: 15,
    legendHeight: 15,
    yAxisTitleWidth: 20,
    padding: 10,
    columePadding: 3,
    fontSize: 10,
    dataPointShape: [ "diamond", "circle", "triangle", "rect" ],
    colors: [ "#7cb5ec", "#f7a35c", "#434348", "#90ed7d", "#f15c80", "#8085e9" ],
    pieChartLinePadding: 25,
    pieChartTextPadding: 15,
    xAxisTextPadding: 3,
    titleColor: "#333333",
    titleFontSize: 20,
    subtitleColor: "#999999",
    subtitleFontSize: 15,
    toolTipPadding: 3,
    toolTipBackground: "#000000",
    toolTipOpacity: .7,
    toolTipLineHeight: 14,
    radarGridCount: 3,
    radarLabelTextMargin: 15
}, G = {
    toFixed: function(t, n) {
        return n = n || 2, this.isFloat(t) && (t = t.toFixed(n)), t;
    },
    isFloat: function(t) {
        return t % 1 != 0;
    },
    approximatelyEqual: function(t, n) {
        return Math.abs(t - n) < 1e-10;
    },
    isSameSign: function(t, n) {
        return Math.abs(t) === t && Math.abs(n) === n || Math.abs(t) !== t && Math.abs(n) !== n;
    },
    isSameXCoordinateArea: function(t, n) {
        return this.isSameSign(t.x, n.x);
    },
    isCollision: function(t, n) {
        return t.end = {}, t.end.x = t.start.x + t.width, t.end.y = t.start.y - t.height, 
        n.end = {}, n.end.x = n.start.x + n.width, n.end.y = n.start.y - n.height, !(n.start.x > t.end.x || n.end.x < t.start.x || n.end.y > t.start.y || n.start.y < t.end.y);
    }
}, Z = {
    easeIn: function(t) {
        return Math.pow(t, 3);
    },
    easeOut: function(t) {
        return Math.pow(t - 1, 3) + 1;
    },
    easeInOut: function(t) {
        return (t /= .5) < 1 ? .5 * Math.pow(t, 3) : .5 * (Math.pow(t - 2, 3) + 2);
    },
    linear: function(t) {
        return t;
    }
};

B.prototype.stop = function() {
    this.isStop = !0;
}, q.prototype.addEventListener = function(t, n) {
    this.events[t] = this.events[t] || [], this.events[t].push(n);
}, q.prototype.trigger = function() {
    for (var t = arguments.length, n = Array(t), i = 0; i < t; i++) n[i] = arguments[i];
    var e = n[0], a = n.slice(1);
    this.events[e] && this.events[e].forEach(function(t) {
        try {
            t.apply(null, a);
        } catch (t) {
            console.error(t);
        }
    });
};

var J = function(n) {
    n.title = n.title || {}, n.subtitle = n.subtitle || {}, n.yAxis = n.yAxis || {}, 
    n.xAxis = n.xAxis || {}, n.extra = n.extra || {}, n.legend = !1 !== n.legend, n.animation = !1 !== n.animation;
    var i = t({}, N);
    i.yAxisTitleWidth = !0 !== n.yAxis.disabled && n.yAxis.title ? i.yAxisTitleWidth : 0, 
    i.pieChartLinePadding = !1 === n.dataLabel ? 0 : i.pieChartLinePadding, i.pieChartTextPadding = !1 === n.dataLabel ? 0 : i.pieChartTextPadding, 
    this.opts = n, this.config = i, this.context = wx.createCanvasContext(n.canvasId), 
    this.chartData = {}, this.event = new q(), this.scrollOption = {
        currentOffset: 0,
        startTouchX: 0,
        distance: 0
    }, j.call(this, n.type, n, i, this.context);
};

J.prototype.updateData = function() {
    var n = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
    this.opts.series = n.series || this.opts.series, this.opts.categories = n.categories || this.opts.categories, 
    this.opts.title = t({}, this.opts.title, n.title || {}), this.opts.subtitle = t({}, this.opts.subtitle, n.subtitle || {}), 
    j.call(this, this.opts.type, this.opts, this.config, this.context);
}, J.prototype.stopAnimation = function() {
    this.animationInstance && this.animationInstance.stop();
}, J.prototype.addEventListener = function(t, n) {
    this.event.addEventListener(t, n);
}, J.prototype.getCurrentDataIndex = function(t) {
    var n = t.touches && t.touches.length ? t.touches : t.changedTouches;
    if (n && n.length) {
        var i = n[0], e = i.x, a = i.y;
        return "pie" === this.opts.type || "ring" === this.opts.type ? p({
            x: e,
            y: a
        }, this.chartData.pieData) : "radar" === this.opts.type ? d({
            x: e,
            y: a
        }, this.chartData.radarData, this.opts.categories.length) : u({
            x: e,
            y: a
        }, this.chartData.xAxisPoints, this.opts, this.config, Math.abs(this.scrollOption.currentOffset));
    }
    return -1;
}, J.prototype.showToolTip = function(n) {
    var i = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
    if ("line" === this.opts.type || "area" === this.opts.type) {
        var e = this.getCurrentDataIndex(n), a = this.scrollOption.currentOffset, o = t({}, this.opts, {
            _scrollDistance_: a,
            animation: !1
        });
        if (-1 < e) {
            var r = c(this.opts.series, e);
            if (0 === r.length) j.call(this, o.type, o, this.config, this.context); else {
                var s = l(r, this.chartData.calPoints, e, this.opts.categories, i), h = s.textList, u = s.offset;
                o.tooltip = {
                    textList: h,
                    offset: u,
                    option: i
                }, j.call(this, o.type, o, this.config, this.context);
            }
        } else j.call(this, o.type, o, this.config, this.context);
    }
}, J.prototype.scrollStart = function(t) {
    t.touches[0] && !0 === this.opts.enableScroll && (this.scrollOption.startTouchX = t.touches[0].x);
}, J.prototype.scroll = function(n) {
    if (n.touches[0] && !0 === this.opts.enableScroll) {
        var e = n.touches[0].x - this.scrollOption.startTouchX, a = this.scrollOption.currentOffset, o = i(a + e, this.chartData, this.config, this.opts);
        this.scrollOption.distance = e = o - a;
        var r = t({}, this.opts, {
            _scrollDistance_: a + e,
            animation: !1
        });
        j.call(this, r.type, r, this.config, this.context);
    }
}, J.prototype.scrollEnd = function(t) {
    if (!0 === this.opts.enableScroll) {
        var n = this.scrollOption, i = n.currentOffset, e = n.distance;
        this.scrollOption.currentOffset = i + e, this.scrollOption.distance = 0;
    }
}, module.exports = J;