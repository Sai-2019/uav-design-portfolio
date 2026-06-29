const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const metrics = [
  { label: 'Maximum takeoff weight', value: '5.50', unit: 'kg', note: 'Estimated design mass including payload' },
  { label: 'Payload included in budget', value: '2.00', unit: 'kg', note: 'Payload bay allocation' },
  { label: 'Wing span', value: '70.87', unit: 'in', note: '1.8 m reported span' },
  { label: 'Aspect ratio', value: '5:1', unit: '', note: 'Flat wing configuration' },
  { label: 'Wing area', value: '1004.39', unit: 'in²', note: '0.648 m² planform area' },
  { label: 'Cruise speed', value: '40', unit: 'km/h', note: '11 m/s flight calculations' },
  { label: 'Reynolds number', value: '400,863', unit: '', note: 'Reported for takeoff/climb/cruise' },
  { label: 'Motor power required', value: '923.33', unit: 'W', note: 'From drag force × velocity' }
];

const weightData = [
  { component: 'BLDC motor', group: 'Propulsion', kg: 0.38 },
  { component: 'Motor controller', group: 'Propulsion', kg: 0.05 },
  { component: 'Propeller & spinner', group: 'Propulsion', kg: 0.14 },
  { component: 'LiPo battery', group: 'Propulsion', kg: 0.68 },
  { component: 'Main wing mid-section', group: 'Structures', kg: 0.82 },
  { component: 'Flaps', group: 'Structures', kg: 0.03 },
  { component: 'Fuselage body', group: 'Structures', kg: 0.91 },
  { component: 'Motor mount', group: 'Structures', kg: 0.01 },
  { component: 'Landing gear', group: 'Structures', kg: 0.10 },
  { component: 'Horizontal stabilizer', group: 'Structures', kg: 0.18 },
  { component: 'Vertical stabilizer', group: 'Structures', kg: 0.20 },
  { component: 'Payload bay', group: 'Payload', kg: 2.00 }
];

const compliance = [
  { item: 'Gross weight limit', actual: 5.5, limit: 7, suffix: 'kg', status: 'Pass' },
  { item: 'L + W + H envelope', actual: 148.7, limit: 170, suffix: 'in', status: 'Pass' },
  { item: 'Payload bay requirement', actual: 1, limit: 1, suffix: '4×4×10 in available', status: 'Pass' },
  { item: 'Take-off ground roll target', actual: 61, limit: 61, suffix: 'm max target', status: 'Designed for' },
  { item: 'Landing roll target', actual: 122, limit: 122, suffix: 'm max target', status: 'Designed for' }
];

const phases = {
  'Take-off': { altitude: '0 ft', density: '1.225 kg/m³', velocity: '40 km/h / 11 m/s', cl: '0.729', cd: '0.1133', drag: '83.939 N', ld: '6.435', power: '923.329 W' },
  'Climb': { altitude: '200 ft', density: '1.225 kg/m³', velocity: '40 km/h / 11 m/s', cl: '0.729', cd: '0.1133', drag: '83.939 N', ld: '6.435', power: '923.329 W' },
  'Cruise': { altitude: '300 ft', density: '1.225 kg/m³', velocity: '40 km/h / 11 m/s', cl: '0.729', cd: '0.1133', drag: '83.939 N', ld: '6.435', power: '923.329 W' }
};

const decisions = [
  { title: 'Wing configuration', summary: 'Flat wing using foam construction to reduce mass and support high payload efficiency.', details: 'Wing span: 70.8661 in. Chord: 14.1732 in. Area: 1004.388 in². Aluminum rods reinforce the foam wing, while ailerons and servos provide roll control.' },
  { title: 'Airfoil selection', summary: 'NACA 4412 selected for favorable lift, drag, and pitching moment behavior.', details: 'The report highlights max CL of 1.6097 and a max CL/CD of 129.37 at approximately 5.25° angle of attack from the polar analysis.' },
  { title: 'Fuselage sizing', summary: 'Fuselage dimensions were linked to wing length and balance requirements.', details: 'The wing is positioned 13 in from the motor mount so the wing CG aligns with the aircraft balance strategy.' },
  { title: 'Conventional tail', summary: 'Horizontal and vertical stabilizers selected for pitch/yaw authority and stall recovery.', details: 'The horizontal stabilizer/elevator controls climb and descent; the vertical stabilizer/rudder controls yaw. Tail sizing considers CG location, CG shift, and desired stability.' },
  { title: 'Tricycle landing gear', summary: 'A stable landing gear arrangement was selected for takeoff/landing robustness.', details: 'The report compares tail-dragger and tricycle configurations, then selects tricycle gear for stability and upward fuselage inclination.' },
  { title: 'Electronics stack', summary: 'Motor, ESC, servos, receiver, propeller, and battery were selected around thrust and control requirements.', details: 'Electronics include Emax GT 4030/06 motor, 100A ESC, ES3001 servos, 2.4GHz transmitter, 16×8 propeller, and two 3S LiPo batteries.' }
];

const process = [
  { step: 'Ideas', text: 'Translate competition goals into candidate aircraft concepts.' },
  { step: 'Conceptual design', text: 'Select broad wing, tail, fuselage, landing gear, and material strategy.' },
  { step: 'Detailed design', text: 'Define wing span, chord, area, aspect ratio, CG position, electronics, and fabrication approach.' },
  { step: 'Modeling and analysis', text: 'Build CAD geometry, mesh the structure, run structural analysis, and review flow behavior.' },
  { step: 'Fabrication and testing', text: 'Manufacture foam, polycarbonate, aluminum, and PVC components; integrate electronics and validate assembly.' }
];

const gallery = [
  { title: 'NACA 4412 airfoil', src: 'assets/naca_4412_airfoil.jpg', tag: 'aero', note: 'Airfoil geometry and polar summary' },
  { title: 'CL/CD and drag polar graphs', src: 'assets/aero_performance_graphs_1.jpg', tag: 'aero', note: 'Performance curves from report figure 1' },
  { title: 'CL vs CD and CL vs alpha', src: 'assets/aero_performance_graphs_2.jpg', tag: 'aero', note: 'Lift behavior and drag relationship' },
  { title: 'Pitching moment graph', src: 'assets/pitching_moment_graph.jpg', tag: 'aero', note: 'Cm versus angle of attack' },
  { title: 'Wing loading table', src: 'assets/wing_loading_table.jpg', tag: 'structure', note: 'Wing loading calculations' },
  { title: 'Fuselage CAD', src: 'assets/fuselage_cad.jpg', tag: 'structure', note: 'SolidWorks fuselage views' },
  { title: 'Tail engineering drawings', src: 'assets/tail_2d_drawings.jpg', tag: 'structure', note: 'Horizontal and vertical tail drawings' },
  { title: 'Horizontal tail calculations', src: 'assets/horizontal_tail_calcs.jpg', tag: 'structure', note: 'Input and output sizing calculations' },
  { title: 'Vertical tail calculations', src: 'assets/vertical_tail_calcs_1.jpg', tag: 'structure', note: 'Vertical tail design table, part 1' },
  { title: 'Vertical tail calculations continued', src: 'assets/vertical_tail_calcs_2.jpg', tag: 'structure', note: 'Vertical tail design table, part 2' },
  { title: 'Center of gravity', src: 'assets/center_of_gravity.jpg', tag: 'layout', note: 'CG table from report' },
  { title: 'SolidWorks modeling', src: 'assets/solidworks_modeling.jpg', tag: 'analysis', note: '3D modeling screenshots' },
  { title: 'Meshing analysis', src: 'assets/meshing_analysis.jpg', tag: 'analysis', note: 'Mesh setup screenshot' },
  { title: 'Structural analysis', src: 'assets/structural_analysis.jpg', tag: 'analysis', note: 'Load response visuals' },
  { title: 'Flow analysis', src: 'assets/flow_analysis.jpg', tag: 'analysis', note: 'CFD visual results' },
  { title: 'Payload prediction graph', src: 'assets/payload_prediction_graph.jpg', tag: 'aero', note: 'Payload vs density altitude' },
  { title: 'Final aircraft layout', src: 'assets/final_aircraft_layout.jpg', tag: 'layout', note: 'A3 aircraft layout with dimensions' }
];

function initTheme() {
  const saved = localStorage.getItem('uavTheme');
  if (saved === 'light') document.documentElement.classList.add('light');
  $('#themeToggle').addEventListener('click', () => {
    document.documentElement.classList.toggle('light');
    localStorage.setItem('uavTheme', document.documentElement.classList.contains('light') ? 'light' : 'dark');
  });
}

function renderKpis() {
  $('#kpiGrid').innerHTML = metrics.map(m => `
    <article class="kpi-card">
      <span>${m.label}</span>
      <strong>${m.value}${m.unit ? ` <small>${m.unit}</small>` : ''}</strong>
      <small>${m.note}</small>
    </article>`).join('');
}

function drawWeightChart(group = 'all') {
  const svg = $('#weightChart');
  const data = group === 'all' ? weightData : weightData.filter(d => d.group === group);
  const width = 920, height = 330, left = 190, right = 34, top = 22, barH = Math.min(24, (height - 70) / data.length - 4);
  const max = Math.max(...data.map(d => d.kg), 2.0);
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  const axisY = height - 35;
  const bars = data.map((d, i) => {
    const y = top + i * (barH + 6);
    const w = ((width - left - right) * d.kg) / max;
    return `<g>
      <text x="0" y="${y + barH * .72}" class="chart-label">${d.component}</text>
      <rect x="${left}" y="${y}" width="${w}" height="${barH}" rx="8" class="bar bar-${d.group}"></rect>
      <text x="${left + w + 10}" y="${y + barH * .72}" class="chart-value">${d.kg.toFixed(2)} kg</text>
    </g>`;
  }).join('');
  svg.innerHTML = `<style>
    .chart-label{fill:var(--muted);font-size:15px}.chart-value{fill:var(--text);font-weight:700;font-size:14px}
    .axis{stroke:var(--line);stroke-width:1}.tick{fill:var(--muted);font-size:12px}
    .bar{fill:url(#weightGradient)}.bar-Payload{filter:brightness(1.2)}
  </style>
  <defs><linearGradient id="weightGradient" x1="0" x2="1"><stop offset="0%" stop-color="#3dd6c6"/><stop offset="100%" stop-color="#78a6ff"/></linearGradient></defs>
  ${bars}
  <line x1="${left}" x2="${width-right}" y1="${axisY}" y2="${axisY}" class="axis"></line>
  ${[0, .5, 1, 1.5, 2].map(t => `<text x="${left + ((width-left-right)*t/max)}" y="${height-12}" text-anchor="middle" class="tick">${t}</text>`).join('')}
  <text x="${width-right}" y="${height-12}" text-anchor="end" class="tick">kg</text>`;
}

function renderCompliance() {
  $('#complianceList').innerHTML = compliance.map(c => {
    const pct = Math.min(100, (c.actual / c.limit) * 100);
    return `<div class="compliance-item">
      <div class="compliance-top"><span>${c.item}</span><small>${c.status}</small></div>
      <div>${c.actual === c.limit ? c.limit : c.actual} / ${c.limit} ${c.suffix}</div>
      <div class="meter"><span style="width:${pct}%"></span></div>
    </div>`;
  }).join('');
}

function renderPhase(name = 'Take-off') {
  const p = phases[name];
  $('#phasePanel').innerHTML = [
    ['Altitude', p.altitude], ['Air density', p.density], ['Velocity', p.velocity], ['CL', p.cl],
    ['CD', p.cd], ['Drag force', p.drag], ['CL/CD', p.ld], ['Power required', p.power]
  ].map(([k, v]) => `<div class="phase-item"><span>${k}</span><strong>${v}</strong></div>`).join('');
}

function drawPayloadChart(alt = 0) {
  const svg = $('#payloadChart');
  const width = 820, height = 260, left = 54, right = 24, top = 18, bottom = 42;
  const xMax = 30000, yMin = 4.45, yMax = 4.95;
  const payload = payloadAt(alt);
  const x = v => left + (v / xMax) * (width - left - right);
  const y = v => top + ((yMax - v) / (yMax - yMin)) * (height - top - bottom);
  const points = [];
  for (let a = 0; a <= xMax; a += 2500) points.push(`${x(a)},${y(payloadAt(a))}`);
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  svg.innerHTML = `<style>
    .grid{stroke:var(--line);stroke-width:1}.payload-line{fill:none;stroke:#3dd6c6;stroke-width:4;stroke-linecap:round}.payload-dot{fill:#ffc85a;stroke:var(--bg);stroke-width:4}.tick{fill:var(--muted);font-size:12px}.label{fill:var(--text);font-weight:800;font-size:13px}
  </style>
  ${[0, 10000, 20000, 30000].map(v => `<line class="grid" x1="${x(v)}" x2="${x(v)}" y1="${top}" y2="${height-bottom}"></line><text class="tick" x="${x(v)}" y="${height-14}" text-anchor="middle">${v/1000}k</text>`).join('')}
  ${[4.5, 4.7, 4.9].map(v => `<line class="grid" x1="${left}" x2="${width-right}" y1="${y(v)}" y2="${y(v)}"></line><text class="tick" x="${left-10}" y="${y(v)+4}" text-anchor="end">${v.toFixed(1)}</text>`).join('')}
  <polyline class="payload-line" points="${points.join(' ')}"></polyline>
  <circle class="payload-dot" cx="${x(alt)}" cy="${y(payload)}" r="8"></circle>
  <text class="label" x="${x(alt)}" y="${Math.max(18, y(payload)-14)}" text-anchor="middle">${payload.toFixed(3)}</text>
  <text class="tick" x="${width/2}" y="${height-1}" text-anchor="middle">Density altitude (m)</text>`;
}

function payloadAt(alt) {
  return 4.905 - 0.00001475 * alt;
}

function initPayloadSlider() {
  const slider = $('#altitudeSlider');
  const render = () => {
    const alt = Number(slider.value);
    $('#altitudeValue').textContent = `${alt.toLocaleString()} m`;
    $('#payloadValue').textContent = payloadAt(alt).toFixed(3);
    drawPayloadChart(alt);
  };
  slider.addEventListener('input', render);
  render();
}

function renderDecisions() {
  $('#decisionGrid').innerHTML = decisions.map((d, i) => `<article class="decision-card">
    <h3>${d.title}</h3>
    <p>${d.summary}</p>
    <button type="button" aria-expanded="false" data-decision="${i}">Show engineering detail →</button>
    <div class="decision-details">${d.details}</div>
  </article>`).join('');
  $$('[data-decision]').forEach(btn => btn.addEventListener('click', () => {
    const card = btn.closest('.decision-card');
    const open = card.classList.toggle('open');
    btn.textContent = open ? 'Hide detail ↑' : 'Show engineering detail →';
    btn.setAttribute('aria-expanded', String(open));
  }));
}

function renderTimeline() {
  $('#timeline').innerHTML = process.map((p, i) => `<div class="timeline-item">
    <div class="timeline-index">${i + 1}</div>
    <div class="timeline-body"><h3>${p.step}</h3><p>${p.text}</p></div>
  </div>`).join('');
}

function renderGallery(filter = 'all') {
  const cards = gallery.filter(g => filter === 'all' || g.tag === filter);
  $('#galleryGrid').innerHTML = cards.map(g => `<button class="gallery-card" data-full="${g.src}">
    <img src="${g.src}" alt="${g.title}">
    <span>${g.title}</span>
    <small>${g.note}</small>
  </button>`).join('');
  initLightboxButtons();
}

function initGalleryFilters() {
  $$('.chip').forEach(chip => chip.addEventListener('click', () => {
    $$('.chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    renderGallery(chip.dataset.filter);
  }));
}

function initLightboxButtons() {
  $$('[data-full]').forEach(btn => {
    btn.onclick = () => {
      $('#lightboxImage').src = btn.dataset.full;
      $('#lightbox').showModal();
    };
  });
}

function initLightbox() {
  $('#closeLightbox').addEventListener('click', () => $('#lightbox').close());
  $('#lightbox').addEventListener('click', event => {
    if (event.target.id === 'lightbox') $('#lightbox').close();
  });
}

function initTabs() {
  $$('.tab').forEach(tab => tab.addEventListener('click', () => {
    $$('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderPhase(tab.dataset.phase);
  }));
  renderPhase();
}

function initScrollProgress() {
  const update = () => {
    const doc = document.documentElement;
    const scrolled = doc.scrollTop / (doc.scrollHeight - doc.clientHeight);
    $('#progress').style.width = `${Math.max(0, Math.min(1, scrolled)) * 100}%`;
  };
  document.addEventListener('scroll', update, { passive: true });
  update();
}

function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: .12 });
  $$('.reveal').forEach(el => observer.observe(el));
}

function initPresentationToggle() {
  $('#presentationToggle').addEventListener('click', () => {
    document.body.classList.toggle('presentation');
    $('#presentationToggle').textContent = document.body.classList.contains('presentation') ? 'Detailed mode' : 'Presentation mode';
  });
}

function init() {
  initTheme();
  renderKpis();
  drawWeightChart();
  $('#weightFilter').addEventListener('change', e => drawWeightChart(e.target.value));
  renderCompliance();
  initTabs();
  initPayloadSlider();
  renderDecisions();
  renderTimeline();
  renderGallery();
  initGalleryFilters();
  initLightbox();
  initScrollProgress();
  initReveal();
  initPresentationToggle();
}

document.addEventListener('DOMContentLoaded', init);
