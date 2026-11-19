// Shared page sections that show the breadth of England Beach Soccer.
// Facts here come from England Beach Soccer's own posts (linked beside each one) and assets/js/data.js.
// Photo rules: youth photos appear only in event sections; England-team photos only in national-team sections.
// No caption or alt text names or identifies a child.
import { events, dateLabel } from './data.js';

export const esc = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
export const thumb = id => `/assets/images/gallery/${id}-t.webp`;
export const full = id => `/assets/images/gallery/${id}.webp`;
export const photo = id => `/assets/images/photos/${id}.webp`;
const post = slug => `https://www.englandbeachsoccer.org/post/${slug}`;
const ext = 'target="_blank" rel="noopener"';

export const alt = {
  youth: 'Young players competing at an England Beach Soccer youth event',
  youthCelebrate: 'A youth team celebrating on the sand at an England Beach Soccer event',
  crowd: 'Spectators and families lining the pitches at an England Beach Soccer event',
  clubMen: 'Men’s club players competing at a European club beach soccer competition',
  clubWomen: 'Women’s club players competing at a European club beach soccer competition',
  champsMen: 'A men’s team celebrating a national championship win on the sand',
  champsWomen: 'A women’s team lifting the trophy after a national championship final',
  englandMen: 'England men’s beach soccer players in action',
  englandWomen: 'England women’s beach soccer players in action'
};

// A framed, tilted photographic print. `tilt` is a class such as tilt-l or tilt-r.
export function print(src, text, cls = '', eager = false) {
  return `<figure class="print ${cls}"><img src="${src}" alt="${esc(text)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"></figure>`;
}

// A moving strip of photos. Decorative: the gallery holds the same photos with full controls.
export function photoMarquee(ids, reverse = false) {
  const imgs = ids.map(id => `<img src="${thumb(id)}" alt="" loading="lazy" decoding="async">`).join('');
  return `<div class="photo-marquee${reverse ? ' rev' : ''}" aria-hidden="true"><div class="pm-track">${imgs}${imgs}</div></div>`;
}

export function textMarquee(words) {
  const run = words.map(w => `${w} <b>◆</b>`).join(' ');
  return `<div class="marquee" aria-hidden="true"><div class="marquee-track"><span>${run}</span><span>${run}</span></div></div>`;
}

const byId = id => events.find(e => e.id === id);
const regional = events.filter(e => e.type === 'Regional');
const dayMonth = iso => new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', timeZone: 'UTC' }).format(new Date(`${iso}T12:00:00Z`));
const seriesSpan = `${dayMonth(regional[0].start)} – ${dayMonth(regional.at(-1).end)}`;

// The 2027 programme as a festival bill: every kind of event EBSA runs, with real dates.
export const lineup = [
  { tone: 'blue', kicker: `${regional.length} regional weekends`, title: 'Summer Series', when: `${seriesSpan} 2027`,
    copy: 'County FA weekends from Sussex to Northumberland, building towards the national finals.',
    img: thumb('youth-14'), alt: alt.youth, href: '/events/#programme', cta: 'See the weekends' },
  { tone: 'red', kicker: 'Youth National Finals', title: 'Youth Championships', when: `${dateLabel(byId('youth-finals'))} 2027`,
    copy: 'U7 to U9 mixed, then girls and boys from U10 to U16, on the sand in Hampshire & Isle of Wight.',
    img: photo('youth-champions-yellow'), alt: alt.youthCelebrate, href: '/events/?event=youth-finals', cta: 'Finals weekend' },
  { tone: 'deep', kicker: 'Senior & U18 National Finals', title: 'National Championships', when: `${dateLabel(byId('senior-finals'))} 2027`,
    copy: 'Men’s, women’s, U18 boys’ and U18 girls’ championships, a week before the youth finals.',
    img: thumb('clubs-43'), alt: alt.champsWomen, href: '/events/?event=senior-finals', cta: 'Finals weekend' },
  { tone: 'sand', kicker: 'Representing England', title: 'England teams', when: 'Men · Women · U20 · U16',
    copy: 'Four squads on the international stage, including the U16 side unbeaten in Porto in 2025.',
    img: photo('england-men-duel'), img2: photo('england-women-action'), alt: alt.englandMen, alt2: alt.englandWomen, href: '/teams/', cta: 'Meet the teams' },
  { tone: 'white', kicker: 'Euro Winners Cup', title: 'European club competition', when: 'Nazaré, Portugal',
    copy: 'English clubs take on Europe’s best. In 2026 Isle of Wight women finished 10th, a top-10 finish for the second year running.',
    img: photo('club-euro-winners'), alt: alt.clubMen, href: post('european-club-championships-report'), cta: 'Read the report', external: true }
];

export function lineupSection(head = true) {
  return `<section class="section lineup-section" id="lineup"><div class="container">
    ${head ? `<div class="section-head reveal"><div><span class="eyebrow red">The 2027 line-up</span><h2>Five ways<br>onto the sand.</h2></div><p>From a first festival weekend to a European final, this is everything England Beach Soccer puts on.</p></div>` : ''}
    <div class="bill reveal" aria-hidden="true">${lineup.map(l => `<span>${l.title}</span>`).join('<i>◆</i>')}</div>
    <div class="lineup-grid">${lineup.map((l, i) => `<a class="lineup-card tone-${l.tone} reveal" href="${l.href}" ${l.external ? ext : ''}>
      <div class="lineup-photos">${print(l.img, l.alt, i % 2 ? 'tilt-r' : 'tilt-l')}${l.img2 ? print(l.img2, l.alt2, 'tilt-r second') : ''}</div>
      <div class="lineup-body"><span class="eyebrow">${l.kicker}</span><h3>${l.title}</h3><strong class="when">${l.when}</strong><p>${l.copy}</p><span class="text-link">${l.cta} ${l.external ? '↗' : '→'}</span></div></a>`).join('')}</div>
  </div></section>`;
}

// Youth to adults, in balance. Categories are the 2026 National Championships divisions.
const players = [
  ['Girls', 'U10, U12, U14 and U16 girls’ championships', thumb('youth-49'), alt.youth],
  ['Boys', 'U10 to U16 boys’ championships', thumb('youth-16'), alt.youth],
  ['Women', 'Women’s nationals, club Europe and England', thumb('clubs-33'), alt.clubWomen],
  ['Men', 'Men’s nationals, club Europe and England', thumb('clubs-06'), alt.clubMen]
];
export const categories2026 = ['U7 Mixed', 'U8 Mixed', 'U9 Mixed', 'U10 Girls', 'U10 Boys', 'U11 Boys', 'U12 Girls', 'U12 Boys', 'U13 Boys', 'U14 Girls', 'U14 Boys', 'U16 Girls', 'U16 Boys', 'Women', 'Men'];

export function everyoneSection(theme = 'white') {
  return `<section class="section ${theme} everyone"><div class="container">
    <div class="section-head reveal"><div><span class="eyebrow red">Who plays</span><h2>Everyone in.</h2></div><p>Girls and boys from U7, through to the women’s and men’s national championships. Same sand, same rules, same medals.</p></div>
    <div class="everyone-grid">${players.map(([who, what, src, text], i) => `<article class="who reveal who-${i}">${print(src, text, i % 2 ? 'tilt-r' : 'tilt-l')}<h3>${who}</h3><p>${what}</p></article>`).join('')}</div>
    <div class="age-ribbon reveal"><span class="eyebrow">2026 national championship divisions</span><ul>${categories2026.map(c => `<li>${c}</li>`).join('')}</ul></div>
  </div></section>`;
}

// 2026 National Championships, as reported by England Beach Soccer.
export function nationalsBand() {
  const stats = [['177', 'Teams'], ['333', 'Games'], ['1,984', 'Players'], ['15', 'National finals'], ['7', 'Courts']];
  return `<section class="nationals-band" style="--bg:url('${full('youth-21')}')"><div class="container">
    <span class="eyebrow">2026 National Championships / reported by England Beach Soccer</span>
    <h2>One weekend.<br>Every age group.</h2>
    <div class="big-stats">${stats.map(([n, l]) => `<div class="big-stat reveal"><strong>${n}</strong><span>${l}</span></div>`).join('')}</div>
    <a class="btn btn-white" href="${post('national-championships-2026')}" ${ext}>Read the 2026 report ↗</a>
  </div></section>`;
}

// Community and culture: the beach day at EBSA events.
export function beachDaySection() {
  return `<section class="section beach-day"><div class="container beach-grid">
    <div class="beach-copy reveal"><span class="eyebrow red">At our events</span><h2>The beach day.</h2>
      <p class="lead">Seven courts running at once. Families along the shoreline. A medal ceremony at the end of every final, and 180 gold medals handed out at the 2026 Nationals.</p>
      <a class="btn btn-blue" href="/gallery/">See every photo ↗</a></div>
    <div class="beach-collage">
      ${print(thumb('youth-29'), alt.crowd, 'c1 tilt-l')}
      ${print(thumb('clubs-42'), alt.champsMen, 'c2 tilt-r')}
      ${print(thumb('youth-43'), alt.youthCelebrate, 'c3 tilt-l')}
      ${print(thumb('clubs-44'), alt.champsWomen, 'c4 tilt-r')}
      ${print(thumb('youth-58'), alt.youthCelebrate, 'c5 tilt-l')}
      <span class="sticker">Medals<br>at every<br>final</span>
    </div>
  </div></section>`;
}

// Membership before launch: what joining is for, drawn from the FA agreement post. No prices or terms.
export function membershipSection() {
  const roles = [
    ['Players', 'A route from county weekends and club teams through to international representation.'],
    ['Coaches', 'Coaches sit inside the same pathway, aligned with County FA requirements.'],
    ['Officials', 'Referees and officials have their own way in, alongside players and coaches.'],
    ['Clubs', 'Club development is a stage of the pathway, from a first team to the national finals.']
  ];
  return `<section class="section membership" id="membership"><div class="container member-grid">
    <div class="member-copy reveal"><span class="eyebrow">Membership</span><h2>Join the<br>movement.</h2>
      <p class="lead">On 10 December 2025 England Beach Soccer signed a Memorandum of Understanding with The FA. It sets out a tiered pathway from county competition and club development to international representation, open to players, coaches and officials.</p>
      <div class="member-roles">${roles.map(([r, c]) => `<div><strong>${r}</strong><p>${c}</p></div>`).join('')}</div>
      <div class="notice member-notice"><strong>Membership is being finalised.</strong> Options, prices and terms will be published here by England Beach Soccer. Nothing is on sale yet.</div>
      <div class="hero-actions"><a class="btn btn-white" href="https://www.englandbeachsoccer.org/contact" ${ext}>Register your interest ↗</a><a class="btn btn-outline" href="${post('england-beachsoccer-signs-fa-agreement')}" ${ext}>The FA agreement ↗</a></div></div>
    <div class="wristband-wrap reveal" aria-hidden="true"><div class="wristband"><img src="/assets/images/lion-mark.webp" alt=""><span>England<br>Beach Soccer</span><b>Member</b></div><div class="wristband two"><span>Players · Coaches · Officials · Clubs</span></div></div>
  </div></section>`;
}

// Milestones from England Beach Soccer's own posts, newest last.
export const milestones = [
  ['Aug 2025', 'U16 gold in Porto', 'England’s U16 talent pathway team went unbeaten to win the Madjer International Cup.', post('england-u16-champions-in-porto')],
  ['Dec 2025', 'FA agreement signed', 'A Memorandum of Understanding with The FA to grow beach soccer at all levels.', post('england-beachsoccer-signs-fa-agreement')],
  ['Mar 2026', 'New head coaches', 'England announced head coaches for the women’s and men’s teams.', post('england-s-men-s-head-coach')],
  ['Jun 2026', 'Top 10 in Europe', 'Isle of Wight women finished 10th at the Euro Winners Cup in Nazaré.', post('european-club-championships-report')],
  ['Jul 2026', 'North East on the sand', 'The Longsands Beach Soccer Cups brought girls’ and senior competition to Tynemouth.', post('north-east-beach-soccer')],
  ['Aug 2026', 'Record Nationals', '177 teams, 333 games and 15 national finals in one championship.', post('national-championships-2026')]
];

export function timelineSection() {
  return `<section class="section sand-strip"><div class="container"><div class="section-head reveal"><div><span class="eyebrow red">Recent milestones</span><h2>The story so far.</h2></div><p>Each milestone links to the full story on England Beach Soccer’s current website.</p></div>
    <ol class="timeline">${milestones.map(([d, t, c, href]) => `<li class="reveal"><a href="${href}" ${ext}><time>${d}</time><h3>${t}</h3><p>${c}</p><span class="text-link">Read ↗</span></a></li>`).join('')}</ol></div></section>`;
}

// Page hero with layered prints instead of a flat colour block.
export function collageHero(kicker, title, copy, theme, prints) {
  return `<section class="page-hero collage-hero ${theme}"><div class="container"><div class="ch-copy"><span class="eyebrow">${kicker}</span><h1>${title}</h1><p class="lead">${copy}</p></div>
    <div class="ch-prints">${prints.map(([src, text], i) => print(src, text, `p${i}`, i === 0)).join('')}</div></div></section>`;
}

// Balanced photo order for the gallery and marquees: rotate through every group.
export function interleave(items, key = item => item[0]) {
  const groups = new Map();
  for (const item of items) { const k = key(item); if (!groups.has(k)) groups.set(k, []); groups.get(k).push(item); }
  const queues = [...groups.values()]; const out = [];
  while (queues.some(q => q.length)) for (const q of queues) if (q.length) out.push(q.shift());
  return out;
}
