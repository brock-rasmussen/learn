const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

const mimeTypes = {
  "html": "text/html",
  "jpeg": "image/jpeg",
  "jpg": "image/jpg",
  "png": "image/png",
  "js": "text/javascript",
  "css": "text/css"
};

const hostname = '127.0.0.1';
const PORT = 3000;

http.createServer((req, res) => {
  var uri = url.parse(req.url).pathname;
  var fileName = path.join(process.cwd(), unescape(uri));
  console.log(`Loading ${uri}`);
  var stats;

  try {
    stats = fs.lstatSync(fileName);
  } catch(e) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found\n');
    return;
  }

  if (stats.isFile()) {
    var mimeType = mimeTypes[path.extname(fileName).split('.').reverse()[0]];
    res.writeHead(200, { 'Content-Type': mimeType });

    var fileStream =fs.createReadStream(fileName);
    fileStream.pipe(res);
  } else if (stats.isDirectory()) {
    res.writeHead(302, { 'Location': 'index.html' });
    res.end();
  } else {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('500 Internal Error\n');
  }
}).listen(PORT)
