import { events, news, dateLabel } from './data.js';

const page = document.body.dataset.page || 'home';
const root = document.getElementById('app');
const nav = [
  ['Events', '/ebs-site/events/'], ['Teams', '/ebs-site/teams/'], ['News', '/ebs-site/news/'], ['Shop', '/ebs-site/shop/'],
  ['Membership', '/ebs-site/membership/'], ['Partners', '/ebs-site/partners/'], ['About', '/ebs-site/about/']
];
const routeName = { home: 'Home', events: 'Events', teams: 'Teams', news: 'News', shop: 'Shop', membership: 'Membership', partners: 'Partners', about: 'About' };
const esc = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

function header() {
  return `<a class="skip" href="#main">Skip to content</a><div class="scroll-progress" aria-hidden="true"></div>
  <div class="announce">2027 competition calendar is taking shape. <a href="/ebs-site/events/">Explore the programme →</a></div>
  <header class="site-header"><div class="container header-inner">
    <a class="brand" href="/ebs-site/" aria-label="England Beach Soccer home"><img src="/ebs-site/assets/images/lion-mark.webp" alt=""><span>England<strong>Beach Soccer</strong></span></a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Open menu">☰</button>
    <nav id="site-nav" class="nav" aria-label="Main navigation">${nav.map(([label, href]) => `<a href="${href}" ${page === label.toLowerCase() ? 'aria-current="page"' : ''}>${label}</a>`).join('')}</nav>
    <a class="header-cta" href="/ebs-site/events/">Explore events <span aria-hidden="true">↗</span></a>
  </div></header>`;
}
function footer() {
  return `<footer class="footer"><div class="container"><div class="footer-grid"><div>
    <a class="brand" href="/ebs-site/" aria-label="England Beach Soccer home"><img src="/ebs-site/assets/images/lion-mark.webp" alt=""><span>England<strong>Beach Soccer</strong></span></a>
    <p>From the first touch on the sand to the national stage. The future of the game is being built together.</p>
    <p class="eyebrow">Powered by SHOT Clubhouse</p></div>
    <div><h4>Explore</h4><a href="/ebs-site/events/">Events</a><a href="/ebs-site/teams/">The teams</a><a href="/ebs-site/news/">News</a></div>
    <div><h4>Get involved</h4><a href="/ebs-site/membership/">Membership</a><a href="/ebs-site/shop/">Shop</a><a href="/ebs-site/partners/">Partners</a></div>
    <div><h4>Discover</h4><a href="/ebs-site/about/">About us</a><a href="https://www.englandbeachsoccer.org/" target="_blank" rel="noopener">Current EBSA website ↗</a></div>
    <div><h4>On the sand</h4><a href="https://www.instagram.com/englandbeachsoccer/" target="_blank" rel="noopener">Instagram ↗</a><a href="https://www.englandbeachsoccer.org/contact" target="_blank" rel="noopener">Contact ↗</a></div>
  </div><div class="footer-bottom"><span>© ${new Date().getFullYear()} England Beach Soccer. Site preview powered by SHOT Clubhouse.</span><span>2027 dates and details may change. <a href="https://www.englandbeachsoccer.org/policy" target="_blank" rel="noopener">Current policies ↗</a></span></div></div></footer>`;
}
function pageHero(kicker, title, copy, theme = '') {
  return `<section class="page-hero ${theme}"><div class="container"><span class="eyebrow">${kicker}</span><h1>${title}</h1><p class="lead">${copy}</p></div></section>`;
}
function eventCard(event) {
  return `<a class="event-card ${event.type === 'National Finals' ? 'final' : ''}" href="/ebs-site/events/?event=${event.id}" aria-label="Explore ${esc(event.title)}, ${dateLabel(event)}">
    <span class="date">${dateLabel(event)}</span><span class="type">${event.type} / 2027</span><h3>${esc(event.title)}</h3>
    <span class="region">${esc(event.region)}${!event.confirmed ? '<br><span class="pending">Date to confirm</span>' : ''}</span><span class="arrow" aria-hidden="true">↗</span></a>`;
}
function newsCard(item) {
  return `<a class="news-card" href="${item.href}" target="_blank" rel="noopener" aria-label="Read ${esc(item.title)} on England Beach Soccer">
    <div class="news-image"><img src="${item.image}" alt="" loading="lazy"></div><div class="news-body"><span class="eyebrow red">${item.category} / 2026</span><h3>${item.title}</h3><p>${item.summary}</p><span class="text-link">Read the story ↗</span></div></a>`;
}
function home() {
  return `<main id="main"><section class="hero"><div class="container hero-grid"><div class="hero-copy reveal">
    <span class="eyebrow">England Beach Soccer / The next wave</span><h1><span>Built</span><span>Different.</span></h1>
    <p class="lead">A game with no sidelines. A pathway from local sand to the national stage. Come closer to the action.</p>
    <div class="hero-actions"><a class="btn btn-red" href="/ebs-site/events/">Explore 2027 events ↗</a><a class="btn btn-blue" href="/ebs-site/teams/">Meet the teams ↗</a></div></div>
    <img class="hero-photo" src="/ebs-site/assets/images/women-hero.webp" alt="England beach soccer players celebrating together" fetchpriority="high"><div class="hero-stamp">The sand<br>is ours</div></div></section>
    <div class="marquee" aria-hidden="true"><div class="marquee-track"><span>ONE GAME <b>◆</b> MANY PATHS <b>◆</b> ALL OF ENGLAND <b>◆</b> BUILT ON SAND <b>◆</b></span><span>ONE GAME <b>◆</b> MANY PATHS <b>◆</b> ALL OF ENGLAND <b>◆</b> BUILT ON SAND <b>◆</b></span></div></div>
    <section class="section dark"><div class="container split"><div class="mission-image reveal"><img src="/ebs-site/assets/images/mens-duel.webp" alt="Beach soccer players contesting the ball" loading="lazy"></div><div class="mission-copy reveal"><span class="eyebrow">Our purpose</span><h2>More than a match.</h2><p class="lead">Beach soccer is fast, expressive and open to everyone willing to step onto the sand. We connect community competition, development and England teams in one growing pathway.</p><a class="btn btn-white" href="/ebs-site/about/">Discover our story ↗</a></div></div></section>
    <section class="section white"><div class="container"><div class="section-head reveal"><div><span class="eyebrow red">The road to the finals</span><h2>2027 starts here.</h2></div><p>Regional weekends build towards two Hampshire FA & Isle of Wight national finals weekends. Three dates remain to be confirmed.</p></div><div class="event-feature-grid reveal">${[events[0], events[2], events[7], events[8]].map(eventCard).join('')}</div><div style="margin-top:26px"><a class="btn btn-blue" href="/ebs-site/events/">See all 10 weekends ↗</a></div></div></section>
    <section class="image-strip" aria-label="England teams"><div class="image-panel"><div class="panel-copy"><span class="eyebrow">The international pathway</span><h2>Men’s<br>team.</h2></div><img src="/ebs-site/assets/images/mens-action.webp" alt="England men's beach soccer player in action" loading="lazy"><a class="btn btn-white" href="/ebs-site/teams/?team=men#team-spotlight">Explore the team ↗</a></div><div class="image-panel"><div class="panel-copy"><span class="eyebrow">The international pathway</span><h2>Women’s<br>team.</h2></div><img src="/ebs-site/assets/images/women-team.webp" alt="England women's beach soccer team together" loading="lazy"><a class="btn btn-white" href="/ebs-site/teams/?team=women#team-spotlight">Explore the team ↗</a></div></section>
    <section class="section"><div class="container"><div class="section-head reveal"><div><span class="eyebrow red">From the sand</span><h2>Stories in motion.</h2></div><p>The people and moments shaping English beach soccer. These stories open on the current England Beach Soccer site.</p></div><div class="news-grid reveal">${news.map(newsCard).join('')}</div><div style="margin-top:27px"><a class="btn btn-blue" href="/ebs-site/news/">More stories ↗</a></div></div></section>
    <section class="section blue"><div class="container feature-cta reveal"><div><span class="eyebrow">Be part of the next wave</span><h2>Find your place.</h2><p>Follow the events, explore the pathways and discover how the wider beach soccer community is growing.</p></div><a class="btn btn-white" href="/ebs-site/membership/">Explore membership ↗</a></div></section></main>`;
}
function eventsPage() {
  return `<main id="main">${pageHero('National competition / 2027', 'The road to<br>the finals.', 'Ten weekends. Eight regional stops. Two national finals weekends. Find your place on the sand.', 'blue-theme')}
  <section class="section"><div class="container"><div class="stats-band reveal"><div class="stat"><strong>08</strong><span>Regional weekends</span></div><div class="stat"><strong>02</strong><span>Finals weekends</span></div><div class="stat"><strong>03</strong><span>Dates to confirm</span></div><div class="stat"><strong>2027</strong><span>Competition season</span></div></div>
  <div style="height:65px"></div><div class="section-head"><div><span class="eyebrow red">Find an event</span><h2>Choose your sand.</h2></div><p>Filter the programme by type or search for a county. Booking details will appear here when confirmed.</p></div>
  <div class="filter-bar" role="group" aria-label="Filter events"><button type="button" class="event-filter" data-filter="all" aria-pressed="true">All events</button><button type="button" class="event-filter" data-filter="Regional" aria-pressed="false">Regional</button><button type="button" class="event-filter" data-filter="National Finals" aria-pressed="false">National Finals</button><input id="event-search" class="search" type="search" placeholder="Search county or region" aria-label="Search events"></div>
  <p id="event-count" class="eyebrow" aria-live="polite"></p><div id="event-results" class="event-list"></div><div id="event-detail"></div>
  <div class="notice"><strong>Calendar status.</strong> London, Cornwall and Essex dates need confirmation. Venues, entry categories, prices and booking terms have not yet been provided. The event cards are information previews, not reservations.</div></div></section></main>`;
}
function teamsPage() {
  const teams = [
    ['men', 'Men’s', 'The senior men’s international pathway.', '/ebs-site/assets/images/mens-action.webp'],
    ['women', 'Women’s', 'The senior women’s international pathway.', '/ebs-site/assets/images/women-team.webp'],
    ['u20', 'Under 20s', 'The next generation making its mark.', '/ebs-site/assets/images/international-action.webp'],
    ['u16', 'Under 16s', 'An early step towards the national pathway.', '/ebs-site/assets/images/mens-duel.webp']
  ];
  return `<main id="main">${pageHero('Representing England', 'The teams.', 'Four pathways, one badge. Explore the teams and the people driving beach soccer forward.')}
  <section class="section white"><div class="container"><div class="section-head"><div><span class="eyebrow red">The pathway</span><h2>Find your team.</h2></div><p>Men, women, U20s and U16s. Team spaces, squad information and player content will be added with England Beach Soccer.</p></div><div class="pathway-grid">${teams.map(([id, title, copy], i) => `<article id="${id}" class="pathway-card reveal"><span class="eyebrow">0${i + 1} / England pathway</span><h3>${title}</h3><p>${copy}</p><a class="text-link" href="#team-spotlight" data-team="${id}">Explore pathway ↗</a></article>`).join('')}</div>
  <div id="team-spotlight" class="event-detail"><div class="visual"><img id="team-image" src="/ebs-site/assets/images/mens-action.webp" alt="England beach soccer player in action"></div><div class="content"><span class="eyebrow red">England pathway</span><h2 id="team-title">Men’s team</h2><p id="team-copy" class="lead">The senior men’s international pathway.</p><div class="notice">Squad lists, schedules and member spaces will be connected once confirmed by England Beach Soccer. No player accounts are created on this preview site.</div><a class="btn btn-blue" href="https://www.englandbeachsoccer.org/" target="_blank" rel="noopener">Current team updates ↗</a></div></div></div></section>
  <section class="section dark"><div class="container split"><div><span class="eyebrow">Beyond the badge</span><h2>A pathway worth sharing.</h2><p class="lead">From regional opportunity to the international game, each stage should give players a place to learn, connect and keep moving forward.</p></div><img src="/ebs-site/assets/images/women-hero.webp" alt="England beach soccer players celebrating" loading="lazy"></div></section></main>`;
}
function newsPage() {
  return `<main id="main">${pageHero('Latest from the sand', 'News & culture.', 'Matches, milestones, people and places. A home for the stories behind the game.', 'red-theme')}
  <section class="section"><div class="container"><div class="section-head"><div><span class="eyebrow red">Editorial</span><h2>Worth the read.</h2></div><p>These verified 2026 stories currently live on the England Beach Soccer website. This space is ready for a future connected news feed.</p></div><div class="news-grid">${news.map(newsCard).join('')}</div></div></section></main>`;
}
function shopPage() {
  return `<main id="main">${pageHero('Wear the movement', 'The shop.', 'From the touchline to the sand. A bold new home for England Beach Soccer kit and culture.')}
  <section class="section white"><div class="container"><div class="section-head"><div><span class="eyebrow red">Coming into focus</span><h2>Made to be seen.</h2></div><p>Explore the intended shop areas. Product designs, stock, prices and checkout are still being agreed.</p></div><div class="shop-grid"><article class="shop-tile"><span class="eyebrow">01 / On the sand</span><h3>Match kit.</h3><img src="/ebs-site/assets/images/mens-action.webp" alt="" loading="lazy"><p>Official kit range to be confirmed.</p></article><article class="shop-tile"><span class="eyebrow">02 / Everywhere</span><h3>Everyday wear.</h3><img src="/ebs-site/assets/images/women-hero.webp" alt="" loading="lazy"><p>Supporter apparel to be confirmed.</p></article><article class="shop-tile"><span class="eyebrow">03 / The details</span><h3>Accessories.</h3><img src="/ebs-site/assets/images/lion-mark.webp" alt="" loading="lazy"><p>Accessories to be confirmed.</p></article></div><div class="notice">This is a shop preview. Nothing can be added to a basket or purchased yet.</div></div></section></main>`;
}
function membershipPage() {
  return `<main id="main">${pageHero('Be part of it', 'Your place<br>in the game.', 'A future membership home for players, clubs and supporters, connected to the wider SHOT Clubhouse experience.', 'blue-theme')}
  <section class="section white"><div class="container split"><div><span class="eyebrow red">Membership</span><h2>Belong to the movement.</h2><p class="lead">The membership offer is being shaped with England Beach Soccer. The aim is to make it easier to follow events, connect with teams and access the right experiences in SHOT Clubhouse.</p><div class="notice">Membership benefits, eligibility, prices and purchase flow are not yet confirmed. This page does not create an account or take payment.</div></div><div class="mission-image"><img src="/ebs-site/assets/images/women-team.webp" alt="England beach soccer team together" loading="lazy"></div></div></section>
  <section class="section dark"><div class="container"><span class="eyebrow">The experience we are designing</span><h2>One connected journey.</h2><div class="pathway-grid"><article class="pathway-card"><span class="eyebrow">01</span><h3>Discover</h3><p>Find competitions, teams and stories in one clear place.</p></article><article class="pathway-card"><span class="eyebrow">02</span><h3>Join</h3><p>Sign up through SHOT when the member offer is agreed.</p></article><article class="pathway-card"><span class="eyebrow">03</span><h3>Take part</h3><p>Access the events and content that match your role.</p></article><article class="pathway-card"><span class="eyebrow">04</span><h3>Grow</h3><p>Follow your pathway from community to national opportunity.</p></article></div></div></section></main>`;
}
function partnersPage() {
  return `<main id="main">${pageHero('Built together', 'Partners.', 'The game grows when communities, brands and football organisations move together.', 'red-theme')}
  <section class="section white"><div class="container split"><div><span class="eyebrow red">Partnerships</span><h2>More reach.<br>More impact.</h2><p class="lead">England Beach Soccer already works with organisations across competitions, community delivery and the international pathway. This new space can bring their stories and activations to life.</p><p>Partner names, logo use and placements need approval before this site is published.</p><a class="btn btn-blue" href="https://www.englandbeachsoccer.org/partnerships" target="_blank" rel="noopener">Current partnerships ↗</a></div><div class="mission-image"><img src="/ebs-site/assets/images/international-action.webp" alt="Beach soccer players in international action" loading="lazy"></div></div></section>
  <section class="section blue"><div class="container feature-cta"><div><span class="eyebrow">A platform for the next wave</span><h2>Build with the game.</h2><p>Events, teams, content and community give partners ways to contribute beyond a logo on a board.</p></div><a class="btn btn-white" href="https://www.englandbeachsoccer.org/contact" target="_blank" rel="noopener">Contact England Beach Soccer ↗</a></div></section></main>`;
}
function aboutPage() {
  return `<main id="main">${pageHero('Who we are', 'Built on sand.', 'England Beach Soccer brings the game to life across community competitions and international pathways.')}
  <section class="section white"><div class="container split"><div><span class="eyebrow red">Our story</span><h2>One game.<br>Many ways in.</h2><p class="lead">Beach soccer makes space for skill, energy and expression. England Beach Soccer connects local opportunities, national competition and international teams, giving the sport room to grow.</p><a class="btn btn-blue" href="/ebs-site/events/">Explore the events ↗</a></div><div class="mission-image"><img src="/ebs-site/assets/images/mens-duel.webp" alt="Beach soccer players competing" loading="lazy"></div></div></section>
  <section class="section dark"><div class="container"><span class="eyebrow">2026 national championships / reported by England Beach Soccer</span><h2>The game in motion.</h2><div class="stats-band" style="border-color:#5f78a9"><div class="stat"><strong style="color:#fff">177</strong><span>Teams</span></div><div class="stat"><strong style="color:#fff">333</strong><span>Games</span></div><div class="stat"><strong style="color:#fff">15</strong><span>National finals</span></div><div class="stat"><strong style="color:#fff">7</strong><span>Courts</span></div></div><p style="margin-top:20px"><a class="text-link" href="https://www.englandbeachsoccer.org/post/national-championships-2026" target="_blank" rel="noopener">Read the 2026 championships report ↗</a></p></div></section>
  <section class="section blue"><div class="container feature-cta"><div><span class="eyebrow">What comes next</span><h2>The next wave is yours.</h2><p>The 2027 calendar links regional competition to national finals. Find the weekend that brings the game closer to you.</p></div><a class="btn btn-white" href="/ebs-site/events/">See the calendar ↗</a></div></section></main>`;
}
const pages = { home, events: eventsPage, teams: teamsPage, news: newsPage, shop: shopPage, membership: membershipPage, partners: partnersPage, about: aboutPage };
root.innerHTML = header() + (pages[page] || home)() + footer();
document.title = `${routeName[page] || 'Home'} | England Beach Soccer`;

const menu = document.querySelector('.menu-toggle');
menu?.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu'); document.querySelector('.nav').classList.toggle('open', open); });
window.addEventListener('scroll', () => { const max = document.documentElement.scrollHeight - window.innerHeight; document.querySelector('.scroll-progress').style.width = `${max > 0 ? Math.min(100, window.scrollY / max * 100) : 0}%`; }, { passive: true });
const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: .08 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

if (page === 'events') {
  let filter = 'all'; const results = document.getElementById('event-results'); const count = document.getElementById('event-count'); const search = document.getElementById('event-search');
  const show = () => { const query = search.value.trim().toLowerCase(); const found = events.filter(e => (filter === 'all' || e.type === filter) && `${e.title} ${e.region} ${dateLabel(e)}`.toLowerCase().includes(query)); results.innerHTML = found.length ? found.map(eventCard).join('') : '<div class="empty">No events match. Try another region or filter.</div>'; count.textContent = `${found.length} ${found.length === 1 ? 'event' : 'events'} shown`; };
  document.querySelectorAll('.event-filter').forEach(button => button.addEventListener('click', () => { filter = button.dataset.filter; document.querySelectorAll('.event-filter').forEach(b => b.setAttribute('aria-pressed', String(b === button))); show(); }));
  search.addEventListener('input', show); show();
  const selected = events.find(e => e.id === new URLSearchParams(location.search).get('event'));
  if (selected) { document.getElementById('event-detail').innerHTML = `<article class="event-detail"><div class="visual"><img src="${selected.type === 'National Finals' ? '/ebs-site/assets/images/women-hero.webp' : '/ebs-site/assets/images/mens-action.webp'}" alt="Beach soccer players in action"></div><div class="content"><span class="eyebrow red">${selected.type} / 2027</span><h2>${esc(selected.title)}</h2><p class="lead">${dateLabel(selected)} 2027 · ${esc(selected.region)}</p>${!selected.confirmed ? '<div class="notice red-notice"><strong>Date to confirm.</strong> This weekend is proposed and may change.</div>' : ''}${selected.sessions?.map(s => `<div class="session"><strong>${s.date}</strong>${s.title}</div>`).join('') || ''}<div class="notice">Booking is not open on this preview site. Venue, entry categories, prices and terms will be shown once confirmed.</div><a class="btn btn-blue" href="/ebs-site/events/">Back to all events ↗</a></div></article>`; document.getElementById('event-detail').scrollIntoView({ behavior: 'smooth', block: 'start' }); }
}
if (page === 'teams') {
  const teams = { men: ['Men’s team', 'The senior men’s international pathway.', '/ebs-site/assets/images/mens-action.webp'], women: ['Women’s team', 'The senior women’s international pathway.', '/ebs-site/assets/images/women-team.webp'], u20: ['Under 20s', 'The next generation making its mark.', '/ebs-site/assets/images/international-action.webp'], u16: ['Under 16s', 'An early step towards the national pathway.', '/ebs-site/assets/images/mens-duel.webp'] };
  const setTeam = id => { const [title, copy, image] = teams[id]; document.getElementById('team-title').textContent = title; document.getElementById('team-copy').textContent = copy; document.getElementById('team-image').src = image; document.getElementById('team-image').alt = `${title} beach soccer`; };
  const selected = new URLSearchParams(location.search).get('team'); if (selected && teams[selected]) setTeam(selected);
  document.querySelectorAll('[data-team]').forEach(link => link.addEventListener('click', () => { setTeam(link.dataset.team); history.replaceState(null, '', `/ebs-site/teams/?team=${link.dataset.team}#team-spotlight`); }));
}
