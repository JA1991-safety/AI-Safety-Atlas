// Rewrites root-relative URLs in the built HTML ("/assets/x.js") to relative ones ("../assets/x.js"),
// so the built site works wherever it is hosted, including inside a sub-folder.
import fs from 'node:fs';
import path from 'node:path';

const DIST = path.resolve('dist');

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const p = path.join(dir, d.name);
    return d.isDirectory() ? walk(p) : [p];
  });
}

let changed = 0;
for (const file of walk(DIST)) {
  if (!file.endsWith('.html')) continue;
  const depth = path.relative(DIST, path.dirname(file)).split(path.sep).filter(Boolean).length;
  const prefix = depth ? '../'.repeat(depth) : './';
  const html = fs.readFileSync(file, 'utf8');
  const out = html.replace(/(\s(?:src|href)=")\/(?!\/)/g, `$1${prefix}`).replace(/(import\(")\/(?!\/)/g, `$1${prefix}`);
  if (out !== html) {
    fs.writeFileSync(file, out);
    changed++;
  }
}
console.log(`Relative links written in ${changed} pages.`);
