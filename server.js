const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const publicDir = path.join(__dirname, 'public');

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.html':
      return 'text/html; charset=utf-8';
    case '.css':
      return 'text/css; charset=utf-8';
    case '.js':
      return 'application/javascript; charset=utf-8';
    case '.png':
      return 'image/png';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.svg':
      return 'image/svg+xml; charset=utf-8';
    default:
      return 'text/plain; charset=utf-8';
  }
}

const server = http.createServer((req, res) => {
  let filePath = req.url === '/' ? '/index.html' : req.url;

  // Простейшая защита от выхода из директории public
  filePath = filePath.split('?')[0];
  filePath = path.normalize(filePath).replace(/^(\.\.[/\\])+/, '');

  const absolutePath = path.join(publicDir, filePath);

  fs.readFile(absolutePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('404: Файл не найден');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('500: Внутренняя ошибка сервера');
      }
      return;
    }

    res.writeHead(200, { 'Content-Type': getContentType(absolutePath) });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});


