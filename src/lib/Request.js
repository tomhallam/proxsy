export class Request {

  constructor(requestId) {
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
    }
  }

  addBodyChunk(chunk) {
    this.response.body.push(chunk);
    this.response.length += chunk.length;
  }

  bodyToString() {
    return this.response.body.join('') || '';
  }

  setRequestHeaders(headers) {
    this.request.headers = headers;
  }

  setResponseHeaders(headers) {
    this.response.headers = headers;
  }

  setInitTime(initTime) {
    this.timings.init = initTime;
  }

  setResponseTimes(ttfb, ttcr) {
    this.timings.timeToFirstByte = ttfb;
    this.timings.timeToCompletedRequest = ttcr;
  }

}
