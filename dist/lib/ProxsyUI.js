'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var express = require('express');
var app = express();

var Q = require('q');
var debug = require('debug')('proxsy:ui');

var uiDefaults = {
  interface: '127.0.0.1',
  port: '8001'
};

var ProxsyUI = exports.ProxsyUI = function () {
  function ProxsyUI(options) {
    _classCallCheck(this, ProxsyUI);

    // Set up options
    this.interface = options.interface || uiDefaults.interface;
    this.port = options.port || uiDefaults.port;
    this.app = app;
  }

  _createClass(ProxsyUI, [{
    key: 'listen',
    value: function listen() {
      var _this = this;

      var deferred = Q.deferred();

      this.app.listen(this.port, function () {

        if (err) {
          return deferred.reject(err);
        }

        debug('Listening on ' + _this.interface + ':' + _this.port);
        deferred.resolve();
      });

      return deferred.promise();
    }
  }]);

  return ProxsyUI;
}();
//# sourceMappingURL=ProxsyUI.js.map
