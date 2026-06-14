import {createReadStream} from 'node:fs';
import {access, stat} from 'node:fs/promises';
import {createServer} from 'node:http';
import {extname, join, normalize} from 'node:path';

const root = join(process.cwd(), 'out');
const port = 3100;
const contentTypes = {
  '.avif': 'image/avif',
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8'
};

async function isFile(path) {
  try {
    await access(path);
    return (await stat(path)).isFile();
  } catch {
    return false;
  }
}

function sendFile(response, path, status = 200) {
  response.writeHead(status, {
    'Content-Type': contentTypes[extname(path)] ?? 'application/octet-stream'
  });
  createReadStream(path).pipe(response);
}

createServer(async (request, response) => {
  const pathname = decodeURIComponent(new URL(request.url ?? '/', 'http://localhost').pathname);

  if (pathname === '/') {
    response.writeHead(301, {Location: '/fr/'});
    response.end();
    return;
  }

  const relativePath = normalize(pathname).replace(/^[/\\]+/, '');
  const requestedPath = join(root, relativePath);
  const candidates = extname(requestedPath)
    ? [requestedPath]
    : [requestedPath, join(requestedPath, 'index.html'), `${requestedPath}.html`];

  for (const candidate of candidates) {
    if (candidate.startsWith(root) && (await isFile(candidate))) {
      sendFile(response, candidate);
      return;
    }
  }

  sendFile(response, join(root, '404.html'), 404);
}).listen(port, '127.0.0.1');
