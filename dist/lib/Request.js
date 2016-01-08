'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Request = exports.Request = function () {
  function Request(requestId) {
    _classCallCheck(this, Request);

    this.requestId = requestId;
    this.request = {
      body: [],
      headers: {}
    };
    this.response = {
      body: [],
      headers: {},
      code: 0,
      length: 0
    };
    this.responseLength = 0;
    this.timings = {
      init: 0,
      timeToFirstByte: 0,
      timeToCompletedRequest: 0
    };
  }

  _createClass(Request, [{
    key: 'addBodyChunk',
    value: function addBodyChunk(chunk) {
      this.response.body.push(chunk);
      this.response.length += chunk.length;
    }
  }, {
    key: 'bodyToString',
    value: function bodyToString() {
      return this.response.body.join('') || '';
    }
  }, {
    key: 'setRequestHeaders',
    value: function setRequestHeaders(headers) {
      this.request.headers = headers;
    }
  }, {
    key: 'setResponseHeaders',
    value: function setResponseHeaders(headers) {
      this.response.headers = headers;
    }
  }, {
    key: 'setInitTime',
    value: function setInitTime(initTime) {
      this.timings.init = initTime;
    }
  }, {
    key: 'setResponseTimes',
    value: function setResponseTimes(ttfb, ttcr) {
      this.timings.timeToFirstByte = ttfb;
      this.timings.timeToCompletedRequest = ttcr;
    }
  }]);

  return Request;
}();
//# sourceMappingURL=Request.js.map
