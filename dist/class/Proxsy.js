'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var http = require('http');
var url = require('url');
var debug = require('debug')('proxsyInstance');

var Proxsy = exports.Proxsy = function () {
  function Proxsy(options) {
    _classCallCheck(this, Proxsy);
  }

  _createClass(Proxsy, [{
    key: 'listen',
    value: function listen() {}
  }]);

  return Proxsy;
}();

var test = exports.test = 'test';
//# sourceMappingURL=Proxsy.js.map
