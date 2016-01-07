var http = require('http');
var http = require('http');
var url = require('url');
var debug = require('debug')('proxsy:request');

http.createServer((req, res) => {

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

  var proxy = http.request(proxyParams, (proxyResult) => {

    // Add the proxy header back in
    if(!proxyResult['X-Proxied-By']) {
      proxyResult.headers['X-Proxied-By'] = `Proxsy ${require('../package.json').version}`;
    }

    // Repeat the code and headers from the server
    res.writeHead(proxyResult.statusCode, proxyResult.headers);

    proxyResult.on('data', (chunk) => {
      res.write(chunk);
    })

    proxyResult.on('end', () => {
      res.end();
    })

  });

  req.on('data', (chunk) => {
    proxy.write(chunk);
  });

  req.on('end', () => {
    proxy.end();
  });

}).listen(8991);
