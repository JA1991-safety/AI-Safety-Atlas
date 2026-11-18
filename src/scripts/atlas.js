// The interactive globe, map filters ("lenses"), search and area cards on the home page.
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { feature } from 'topojson-client';

const data = JSON.parse(document.getElementById('atlas-data').textContent);
const areas = new Map(data.areas.map((a) => [a.code, a]));
const areaByMapId = {};
for (const a of data.areas) for (const id of a.mapIds) areaByMapId[id] = a.code;

const $ = (sel) => document.querySelector(sel);
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const token = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

let map;
let lens = data.lenses[0];
let selected = null;
const shapeNames = {}; // map id -> Natural Earth name, for areas not yet covered

/* ---------- lenses: colour the map by one comparable fact ---------- */

function categoryFor(area, l) {
  if (l.field === 'status') return area.status;
  return area.facets ? area.facets[l.field] : null;
}

function fillExpression() {
  const pairs = [];
  for (const a of data.areas) {
    const value = categoryFor(a, lens);
    const cat = lens.categories.find((c) => c.value === value);
    pairs.push(a.code, cat ? token(cat.color) : token('--pending'));
  }
  return ['match', ['get', 'area'], ...pairs, token('--land')];
}

function renderLegend() {
  const counts = {};
  for (const a of data.areas) {
    const v = categoryFor(a, lens) ?? '__none';
    counts[v] = (counts[v] || 0) + 1;
  }
  const rows = lens.categories
    .filter((c) => counts[c.value] || lens.id === 'coverage')
    .map(
      (c) =>
        `<div class="legend-row"><span class="swatch" style="background:var(${c.color})"></span><span>${c.label}</span></div>`
    );
  if (lens.field !== 'status' && counts.__none)
    rows.push(`<div class="legend-row"><span class="swatch" style="background:var(--pending)"></span><span>Pilot area, not yet researched</span></div>`);
  rows.push(`<div class="legend-row"><span class="swatch" style="background:var(--land)"></span><span>Not in the pilot</span></div>`);
  $('#legend').innerHTML = rows.join('');
}

function renderGroups() {
  $('#lens-question').textContent = lens.question;
  const groups = [...lens.categories.map((c) => ({ ...c, items: [] })), { value: '__none', label: 'Not yet researched', color: '--pending', items: [] }];
  for (const a of data.areas) {
    const v = categoryFor(a, lens) ?? '__none';
    (groups.find((g) => g.value === v) ?? groups.at(-1)).items.push(a);
  }
  $('#area-groups').innerHTML = groups
    .filter((g) => g.items.length)
    .map(
      (g) => `<div class="area-group">
        <h3><span class="swatch" style="background:var(${g.color})"></span>${g.label} (${g.items.length})</h3>
        <ul class="area-list">${g.items
          .map(
            (a) => `<li><button type="button" class="area-button" data-select="${a.code}"><span>${a.name}</span>
            <span class="mono area-meta">${a.status === 'pending' ? 'In preparation' : a.status === 'draft' ? 'Draft' : 'Published'}</span></button></li>`
          )
          .join('')}</ul></div>`
    )
    .join('');
}

function applyLens(id) {
  lens = data.lenses.find((l) => l.id === id) ?? data.lenses[0];
  $('#lens-select').value = lens.id;
  renderLegend();
  renderGroups();
  if (map?.isStyleLoaded()) map.setPaintProperty('land', 'fill-color', fillExpression());
}

/* ---------- selecting an area ---------- */

function showCard(code, otherName) {
  document.querySelectorAll('.card').forEach((c) => (c.hidden = true));
  $('#intro').hidden = !!code;
  $('#back-button').hidden = !code;
  if (!code) return;
  const card = document.querySelector(`.card[data-area="${code}"]`);
  if (card) {
    card.hidden = false;
  } else {
    const other = document.querySelector('.card[data-area="__other"]');
    other.querySelector('h2').textContent = otherName;
    other.querySelector('#other-suggest').href = `https://github.com/JA1991-safety/AI-Safety-Atlas/issues/new?template=suggest-source.yml&title=${encodeURIComponent(`Suggest an area: ${otherName}`)}`;
    other.hidden = false;
  }
  const panel = $('#panel');
  panel.scrollTop = 0;
  // On narrow screens the panel sits below the map, so bring it into view.
  if (matchMedia('(max-width: 860px)').matches) panel.scrollIntoView({ block: 'start', behavior: reduceMotion ? 'auto' : 'smooth' });
}

function select(code, { fly = true, otherName = '', updateHash = true } = {}) {
  selected = code;
  showCard(code && areas.has(code) ? code : code ? '__other' : null, otherName);
  if (map?.isStyleLoaded()) {
    map.setFilter('selected', ['==', ['get', 'area'], code && areas.has(code) ? code : '__none']);
    map.setFilter('selected-other', ['==', ['get', 'iso'], code && !areas.has(code) ? code.replace('iso-', '') : '__none']);
    syncSelectedFill();
  }
  if (updateHash) {
    const hash = code && areas.has(code) ? `#${code.toLowerCase()}` : '';
    if (hash !== location.hash) history.replaceState(null, '', hash || location.pathname + location.search);
  }
  if (fly && code && map) flyTo(code);
}

function bboxOfLargestPolygon(features) {
  let best = null;
  for (const f of features) {
    const polys = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
    for (const poly of polys) {
      const ring = poly[0];
      let [minX, minY, maxX, maxY] = [180, 90, -180, -90];
      for (const [x, y] of ring) {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
      const size = (maxX - minX) * (maxY - minY);
      if (!best || size > best.size) best = { size, box: [minX, minY, maxX, maxY] };
    }
  }
  return best?.box;
}

// Shapes that cross the 180° meridian (eastern Russia, Fiji) jump from +180 to -180 and draw a line
// across the whole map. Shift the western side of such rings by 360° so they stay in one piece.
function fixAntimeridian(geom) {
  const polys = geom.type === 'Polygon' ? [geom.coordinates] : geom.type === 'MultiPolygon' ? geom.coordinates : [];
  for (const poly of polys) {
    for (const ring of poly) {
      let crosses = false;
      for (let i = 1; i < ring.length; i++) if (Math.abs(ring[i][0] - ring[i - 1][0]) > 180) crosses = true;
      if (crosses) for (const pt of ring) if (pt[0] < 0) pt[0] += 360;
    }
  }
}

const VIEWS = { EU: { center: [12, 50], zoom: 2.2 }, US: { center: [-98, 39], zoom: 2.1 }, SG: { center: [103.8, 1.35], zoom: 3.6 } };
let geo;
function flyTo(code) {
  let view = VIEWS[code];
  if (!view) {
    const feats = geo.features.filter((f) => f.properties.area === code || `iso-${f.properties.iso}` === code);
    const box = bboxOfLargestPolygon(feats);
    if (!box) return;
    const span = Math.max(box[2] - box[0], (box[3] - box[1]) * 1.4);
    view = { center: [(box[0] + box[2]) / 2, (box[1] + box[3]) / 2], zoom: Math.max(1.6, Math.min(3.2, Math.log2(360 / span) - 1.5)) };
  }
  const opts = { center: view.center, zoom: view.zoom };
  if (reduceMotion) map.jumpTo(opts);
  else map.flyTo({ ...opts, duration: 1400, essential: true });
}

/* ---------- the map ---------- */

async function initMap() {
  const res = await fetch(new URL('data/countries-50m.json', document.baseURI));
  const topo = await res.json();
  geo = feature(topo, topo.objects.countries);
  for (const f of geo.features) {
    if (f.id !== '010') fixAntimeridian(f.geometry); // leave Antarctica, which wraps the pole
    f.properties.iso = f.id ?? '';
    f.properties.area = areaByMapId[f.id] ?? '';
    shapeNames[f.id] = f.properties.name;
  }
  const markers = {
    type: 'FeatureCollection',
    features: data.areas
      .filter((a) => a.marker)
      .map((a) => ({ type: 'Feature', properties: { area: a.code }, geometry: { type: 'Point', coordinates: a.marker } })),
  };
  const narrow = matchMedia('(max-width: 720px)').matches;

  map = new maplibregl.Map({
    container: 'globe',
    style: {
      version: 8,
      projection: { type: narrow ? 'mercator' : 'globe' },
      sources: {
        countries: { type: 'geojson', data: geo, attribution: 'Natural Earth' },
        markers: { type: 'geojson', data: markers },
      },
      layers: [
        { id: 'sea', type: 'background', paint: { 'background-color': token('--sea') } },
        { id: 'land', type: 'fill', source: 'countries', paint: { 'fill-color': fillExpression() } },
        { id: 'borders', type: 'line', source: 'countries', paint: { 'line-color': token('--land-edge'), 'line-width': 0.6 } },
        {
          id: 'hover',
          type: 'line',
          source: 'countries',
          filter: ['==', ['get', 'area'], '__none'],
          paint: { 'line-color': token('--ink'), 'line-width': 1.2 },
        },
        {
          id: 'selected-fill',
          type: 'fill',
          source: 'countries',
          filter: ['==', ['get', 'area'], '__none'],
          paint: { 'fill-color': token('--select'), 'fill-opacity': 0.35 },
        },
        {
          id: 'selected',
          type: 'line',
          source: 'countries',
          filter: ['==', ['get', 'area'], '__none'],
          paint: { 'line-color': token('--select'), 'line-width': 2 },
        },
        {
          id: 'selected-other',
          type: 'line',
          source: 'countries',
          filter: ['==', ['get', 'iso'], '__none'],
          paint: { 'line-color': token('--select'), 'line-width': 1.6 },
        },
        {
          id: 'markers',
          type: 'circle',
          source: 'markers',
          paint: {
            'circle-radius': 5,
            'circle-color': token('--covered'),
            'circle-stroke-color': token('--paper'),
            'circle-stroke-width': 1.5,
          },
        },
      ],
    },
    center: [12, 28],
    zoom: narrow ? 0.4 : 1.75,
    minZoom: narrow ? 0 : 0.8,
    maxZoom: 6,
    renderWorldCopies: false,
    attributionControl: { compact: true },
    dragRotate: false,
  });
  map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'bottom-right');

  const tip = new maplibregl.Popup({ closeButton: false, closeOnClick: false, offset: 12 });
  const statusText = { draft: 'Draft profile', published: 'Profile published', pending: 'Pilot area, in preparation' };

  const hit = (e) => {
    const f = map.queryRenderedFeatures(e.point, { layers: ['markers', 'land'] })[0];
    if (!f) return null;
    const code = f.properties.area;
    if (code) return { code, name: areas.get(code).name, status: statusText[areas.get(code).status] };
    return { code: `iso-${f.properties.iso}`, name: f.properties.name, status: 'Not yet covered' };
  };

  map.on('mousemove', (e) => {
    const h = hit(e);
    map.getCanvas().style.cursor = h ? 'pointer' : '';
    map.setFilter('hover', ['==', ['get', 'area'], h && areas.has(h.code) ? h.code : '__none']);
    if (h) tip.setLngLat(e.lngLat).setHTML(`<div class="tip-name">${h.name}</div><div class="tip-status">${h.status}</div>`).addTo(map);
    else tip.remove();
  });
  map.on('mouseout', () => tip.remove());
  map.on('click', (e) => {
    const h = hit(e);
    if (!h) return;
    select(h.code, { otherName: h.name });
  });

  map.on('load', () => {
    syncSelectedFill();
    const fromHash = location.hash.slice(1).toUpperCase();
    if (areas.has(fromHash)) select(fromHash, { updateHash: false });
  });

  // Recolour when the reader's theme changes.
  const recolour = () => {
    if (!map.isStyleLoaded()) return;
    map.setPaintProperty('sea', 'background-color', token('--sea'));
    map.setPaintProperty('land', 'fill-color', fillExpression());
    map.setPaintProperty('borders', 'line-color', token('--land-edge'));
    map.setPaintProperty('hover', 'line-color', token('--ink'));
    map.setPaintProperty('selected', 'line-color', token('--select'));
    map.setPaintProperty('selected-fill', 'fill-color', token('--select'));
    map.setPaintProperty('selected-other', 'line-color', token('--select'));
    map.setPaintProperty('markers', 'circle-color', token('--covered'));
    map.setPaintProperty('markers', 'circle-stroke-color', token('--paper'));
  };
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', recolour);
  new MutationObserver(recolour).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
}

function syncSelectedFill() {
  if (!map?.isStyleLoaded()) return;
  map.setFilter('selected-fill', ['==', ['get', 'area'], selected && areas.has(selected) ? selected : '__none']);
}

/* ---------- search ---------- */

const escapeHtml = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

function snippet(text, q) {
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return escapeHtml(text.slice(0, 140)) + (text.length > 140 ? '…' : '');
  const start = Math.max(0, i - 60);
  const end = Math.min(text.length, i + q.length + 80);
  return (
    (start > 0 ? '…' : '') +
    escapeHtml(text.slice(start, i)) +
    `<mark>${escapeHtml(text.slice(i, i + q.length))}</mark>` +
    escapeHtml(text.slice(i + q.length, end)) +
    (end < text.length ? '…' : '')
  );
}

function runSearch(q) {
  const list = $('#search-results');
  const input = $('#search-input');
  q = q.trim();
  if (q.length < 2) {
    list.hidden = true;
    input.setAttribute('aria-expanded', 'false');
    return;
  }
  const ql = q.toLowerCase();
  const terms = ql.split(/\s+/).filter(Boolean);
  const matches = (t) => terms.every((term) => t.toLowerCase().includes(term));
  const areaHits = data.areas.filter((a) => matches(a.name) || a.code.toLowerCase() === ql);
  const lensHits = data.lenses.filter((l) => matches(`${l.label} ${l.question}`));
  const textHits = data.search.filter((s) => matches(s.text)).slice(0, 12);
  const firstTerm = terms.find((t) => t.length > 1) ?? q;
  const items = [
    ...areaHits.map(
      (a) => `<li><button type="button" data-select="${a.code}"><span class="result-where">Area</span><span>${escapeHtml(a.name)}</span></button></li>`
    ),
    ...lensHits.map(
      (l) => `<li><button type="button" data-lens="${l.id}"><span class="result-where">Compare on the map</span><span>${escapeHtml(l.question)}</span></button></li>`
    ),
    ...textHits.map(
      (s) => `<li><a href="${s.href}"><span class="result-where">${escapeHtml(s.areaName)} · ${escapeHtml(s.section)}</span><span>${snippet(s.text, firstTerm)}</span></a></li>`
    ),
  ];
  list.innerHTML = items.length ? items.join('') : `<li class="search-empty">No matches in the profiles drafted so far.</li>`;
  list.hidden = false;
  input.setAttribute('aria-expanded', 'true');
}

/* ---------- wiring ---------- */

document.addEventListener('click', (e) => {
  const sel = e.target.closest('[data-select]');
  if (sel) {
    select(sel.dataset.select);
    $('#search-results').hidden = true;
    return;
  }
  const lensBtn = e.target.closest('[data-lens]');
  if (lensBtn) {
    applyLens(lensBtn.dataset.lens);
    select(null, { fly: false });
    $('#search-results').hidden = true;
    return;
  }
  if (!e.target.closest('.search')) $('#search-results').hidden = true;
});
$('#back-button').addEventListener('click', () => select(null, { fly: false }));
$('#lens-select').addEventListener('change', (e) => {
  applyLens(e.target.value);
  select(null, { fly: false });
});
$('#search-input').addEventListener('input', (e) => runSearch(e.target.value));
$('#search-input').addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    e.target.value = '';
    runSearch('');
  }
  if (e.key === 'Enter') {
    const first = $('#search-results').querySelector('a, button');
    if (first) first.click();
  }
});
window.addEventListener('hashchange', () => {
  const code = location.hash.slice(1).toUpperCase();
  if (areas.has(code)) select(code, { updateHash: false });
});

applyLens('coverage');
const initial = location.hash.slice(1).toUpperCase();
if (areas.has(initial)) showCard(initial);
initMap().catch((err) => {
  console.error(err);
  $('#globe').insertAdjacentHTML('afterend', '<p class="map-error">The map could not load. Use the list of areas instead.</p>');
});
