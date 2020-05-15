Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
    return typeof o;
} : function(o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
}, toPromise = function(n) {
    return "function" != typeof n ? n : function() {
        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
        return "object" !== (void 0 === e ? "undefined" : _typeof(e)) ? n(e) : new Promise(function(o, t) {
            e.success = o, e.fail = t, n(e);
        });
    };
};

exports.default = Object.keys(wx).reduce(function(o, t) {
    return o[t] = toPromise(wx[t]), o;
}, {});