const express = require('express');
const app = express();

const Q = require('q');
const debug = require('debug')('proxsy:ui');

const uiDefaults = {
  interface: '127.0.0.1',
  port: '8001'
};

export class ProxsyUI {

  constructor(options) {

    // Set up options
    this.interface = options.interface || uiDefaults.interface;
    this.port = options.port || uiDefaults.port;
    this.app = app;

  }

  listen() {

    let deferred = Q.deferred(); 

    this.app.listen(this.port, () => {

      if(err) {
        return deferred.reject(err);
      }

      debug(`Listening on ${this.interface}:${this.port}`);
      deferred.resolve();

    });

    return deferred.promise();

  }

}
