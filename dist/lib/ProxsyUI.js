'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var express = require('express');
var app = express();

var debug = require('debug')('proxsy:ui');

var uiDefaults = {
  interface: '127.0.0.1',
  port: '8001'
};

var ProxsyUI = exports.ProxsyUI = function () {
  function ProxsyUI() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, ProxsyUI);

    // Set up options
    this.interface = options.interface || uiDefaults.interface;
    this.port = options.port || uiDefaults.port;
    this.app = app;

    this.initRoutes();
  }

  _createClass(ProxsyUI, [{
    key: 'initRoutes',
    value: function initRoutes() {}
  }, {
    key: 'listen',
    value: function listen(cb) {
      var _this = this;

      this.app.listen(this.port, function (err) {

        if (err) {
          return cb(err);
        }

        debug('Listening on ' + _this.interface + ':' + _this.port);
        return cb();
      });
    }
  }]);

  return ProxsyUI;
}();
//# sourceMappingURL=ProxsyUI.js.map
