const http = require('http');
const url = require('url');
const debug = require('debug')('proxsy:main');
const uuid = require('node-uuid');
const StringDecoder = require('string_decoder').StringDecoder;
const Table = require('cli-table');

import {GenericTimer} from './Utils';
import {Request} from './Request';

export class Proxsy {

  constructor() {
    this.requests = [];
  }

  formatResult(request) {

    const table = new Table({
      head: ['Url', 'Content-Type', 'Content-Length', 'Response Time'],
      colWidths: [100, 100, 50, 50]
    });

    table.push([request.url, request.response.headers['content-type'], request.response.length.toString(), request.timings.timeToCompletedRequest.toString()])
    //console.log([request.url, request.response['content-type'], request.response.length.toString(), request.timings.timeToCompletedRequest.toString()]);

    console.log(table.toString())

  }

  handleRequest(req, res) {

    // Create the request initialisation timer
    const requestInitTimer = new GenericTimer('requestInit');
    requestInitTimer.start();

    // Ascertain the components of the url
    var urlParts = url.parse(req.url);
    debug('Requested URI Components: %o', urlParts);
    debug('Headers: %o', req.headers);

    var proxyParams = {
      host: urlParts.hostname,
      method: req.method,
      path: urlParts.path,
      headers: req.headers,
      port: (urlParts.port ? urlParts.port : 80)
    };

    debug('Connecting to %s with params: %o', urlParts.hostname, proxyParams);

    // Create the request id
    let requestId = uuid.v4();

    // Create the request in the registry
    this.requests[requestId] = new Request(requestId);
    var thisRequest = this.requests[requestId];

    // Assign the request Url
    thisRequest.setRequestUrl(req.url);

    // Assign the request headers
    thisRequest.setRequestHeaders(req.headers);

    // Create the request timer
    const requestTimer = new GenericTimer('request');
    requestTimer.start();

    // Set the request's init time
    thisRequest.setInitTime(requestInitTimer.getValue());

    const proxy = http.request(proxyParams, (proxyResult) => {

      // Get TTFB
      var ttfbTime = requestTimer.getValue();

      // Set the returned headers to the Request object
      thisRequest.setResponseHeaders(proxyResult.headers);

      // Add the vanity header in, if it isn't going to overwrite an existing header
      if(!proxyResult['X-Proxied-By']) {
        proxyResult.headers['X-Proxied-By'] = `Proxsy ${require('../../package.json').version}`;
      }

      // Repeat the code and headers from the server
      res.writeHead(proxyResult.statusCode, proxyResult.headers);

      // For every chunk of data
      proxyResult.on('data', (chunk) => {
        thisRequest.addBodyChunk(chunk);
        res.write(chunk);
      })

      // When all data has been downloaded
      proxyResult.on('end', () => {

        // Return the result to the calling socket
        res.end();

        //
        let requestCompleteTime = requestTimer.getValue();
        debug('Request completed in %dms', requestCompleteTime);
        debug('Response body length: %db', thisRequest.response.length);
        debug('Response headers: %o', proxyResult.headers);

        thisRequest.setResponseTimes(ttfbTime, requestCompleteTime);
        debug('Request Object: %o', thisRequest);

        this.formatResult(thisRequest);

      });

    });

    req.on('data', (chunk) => {
      proxy.write(chunk);
    });

    req.on('end', () => {
      proxy.end();
    });

  }

}
