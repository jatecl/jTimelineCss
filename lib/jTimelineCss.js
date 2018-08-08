"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jtimeline = require("jtimeline");

var _jtimeline2 = _interopRequireDefault(_jtimeline);

var _jmove = require("jmove");

var _jmove2 = _interopRequireDefault(_jmove);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//这是一个非常简单的实现，没有分解transform，就当作一个demo吧。支持的尺寸是rem(jMove.sizeUnit())
var sizeUnit = function sizeUnit() {
    return _jmove2.default.sizeUnit();
};
var units = {
    left: sizeUnit,
    top: sizeUnit,
    right: sizeUnit,
    bottom: sizeUnit,
    width: sizeUnit,
    height: sizeUnit,
    "font-size": sizeUnit,
    padding: sizeUnit,
    "padding-left": sizeUnit,
    "padding-top": sizeUnit,
    "padding-right": sizeUnit,
    "padding-bottom": sizeUnit,
    margin: sizeUnit,
    "margin-left": sizeUnit,
    "margin-top": sizeUnit,
    "margin-right": sizeUnit,
    "margin-bottom": sizeUnit,
    "border-width": sizeUnit,
    "border-left-width": sizeUnit,
    "border-top-width": sizeUnit,
    "border-right-width": sizeUnit,
    "border-bottom-width": sizeUnit,
    x: sizeUnit,
    y: sizeUnit
};
var jmoveKeys = { x: 1, y: 1, o: 1, s: 1, translateX: 1, translateY: 1, translateZ: 1, skewX: 1, skewY: 1, scale: 1, scaleX: 1, scaleY: 1, rotate: 1 };

var createSetter = function createSetter(obj, key) {
    return function (val) {
        var o = obj._jtimeline.style;
        if (!o) obj._jtimeline.style = o = {};

        if (arguments.length) {
            if (jmoveKeys[key]) {
                o[key] = val;
                _jmove2.default.css(obj, o);
            } else {
                if (typeof val === "number" && !isNaN(val)) {
                    if (key in units) val += units[key]();else if (key == "z-index" || key == "zIndex") val = Math.round(val);
                }
                _jmove2.default.css(obj, key, val);
            }
        } else {
            val = _jmove2.default.css(obj, key);
            if (!val) {
                var cur = window.getComputedStyle ? getComputedStyle(obj) : obj.currentStyle || obj.style;
                if (cur) {
                    if (cur.getPropertyValue) val = cur.getPropertyValue(key);
                    val = obj.style[key];
                }
            }
            if (!val) {
                if (key in o) return parseFloat(o[key]) || 0;
                return 0;
            }
            return parseFloat(val) || 0;
        }
    };
};
var key_map = { x: 1, y: 1, o: 1, s: 1 };
_jtimeline2.default._accessList.unshift(function (obj, key) {
    if (obj && obj.style && key_map[key]) return createSetter(obj, key);
});
_jtimeline2.default._accessList.push(function (obj, key) {
    if (obj && obj.style && !(key in obj)) return createSetter(obj, key);
});
//把jQuery对象视为数组
_jtimeline2.default._isArrayList.push(function (o) {
    if (window.$ && $ == o.constructor) return true;
});

exports.default = _jtimeline2.default;