const express = require('express');
const app = express();

const debug = require('debug')('proxsy:ui');

const uiDefaults = {
  interface: '127.0.0.1',
  port: '8001'
};

export class ProxsyUI {

  constructor(options = {}) {

    // Set up options
    this.interface = options.interface || uiDefaults.interface;
    this.port = options.port || uiDefaults.port;
    this.app = app;

    this.initRoutes();

  }

  initRoutes() {

  }

  listen(cb) {

    this.app.listen(this.port, (err) => {

      if(err) {
        return cb(err);
      }

      debug(`Listening on ${this.interface}:${this.port}`);
      return cb();

    });

  }

}
