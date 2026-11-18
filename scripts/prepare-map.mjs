// Copies the Natural Earth country shapes (via the world-atlas package) into public/data.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const src = require.resolve('world-atlas/countries-50m.json');
const dest = path.resolve('public/data/countries-50m.json');
fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.copyFileSync(src, dest);
console.log('Map shapes ready:', path.relative(process.cwd(), dest));
