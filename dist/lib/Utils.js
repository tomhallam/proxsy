"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GenericTimer = exports.GenericTimer = function () {
  function GenericTimer(id) {
    _classCallCheck(this, GenericTimer);

    this.id = id;
  }

  _createClass(GenericTimer, [{
    key: "start",
    value: function start() {
      this.timer = process.hrtime();
    }
  }, {
    key: "getValue",
    value: function getValue() {
      var diff = process.hrtime(this.timer);
      return (diff[0] * 1e9 + diff[1]) / 1e6;
    }
  }]);

  return GenericTimer;
}();
//# sourceMappingURL=Utils.js.map
