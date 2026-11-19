import { events, news, dateLabel } from './data.js';
import { entryLinks, pickEntryLink } from './entry-links.js';
import { gallery } from './gallery.js';
import { newsArchive, newsArchiveUpdated } from './news-archive.js';
import { print, photo, thumb, full, alt, lineupSection, everyoneSection, nationalsBand, beachDaySection, membershipSection, timelineSection, collageHero, textMarquee, photoMarquee, interleave } from './sections.js';

const page = document.body.dataset.page || 'home';
const root = document.getElementById('app');
const nav = [
  ['Events', '/events/'], ['Teams', '/teams/'], ['Gallery', '/gallery/'], ['News', '/news/'],
  ['Partners', '/partners/'], ['About', '/about/']
];
const routeName = { home: 'Home', events: 'Events', teams: 'Teams', gallery: 'Gallery', news: 'News', partners: 'Partners', about: 'About' };
const esc = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

function header() {
  return `<a class="skip" href="#main">Skip to content</a><div class="scroll-progress" aria-hidden="true"></div>
  <div class="announce">2027 competition calendar is live. <a href="/events/">Explore the programme →</a></div>
  <header class="site-header"><div class="container header-inner">
    <a class="brand" href="/" aria-label="England Beach Soccer home"><img src="/assets/images/lion-mark.webp" alt=""><span>England<strong>Beach Soccer</strong></span></a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Open menu">☰</button>
    <nav id="site-nav" class="nav" aria-label="Main navigation">${nav.map(([label, href]) => `<a href="${href}" ${page === label.toLowerCase() ? 'aria-current="page"' : ''}>${label}</a>`).join('')}</nav>
    <a class="shot-powered" href="https://shotclubhouse.com/" target="_blank" rel="noopener" aria-label="Powered by SHOT Clubhouse"><span>Powered by</span><img src="/assets/brand/shot-logo.png" alt="SHOT"></a>
  </div></header>`;
}
function footer() {
  return `<footer class="footer"><div class="container"><div class="footer-grid"><div>
    <a class="brand" href="/" aria-label="England Beach Soccer home"><img src="/assets/images/lion-mark.webp" alt=""><span>England<strong>Beach Soccer</strong></span></a>
    <p>From the first touch on the sand to the national stage. The future of the game is being built together.</p>
    <a class="footer-powered" href="https://shotclubhouse.com/" target="_blank" rel="noopener"><span>Powered by</span><img src="/assets/brand/shot-logo.png" alt="SHOT Clubhouse"></a></div>
    <div><h4>Explore</h4><a href="/events/">Events</a><a href="/teams/">The teams</a><a href="/gallery/">Gallery</a><a href="/news/">News</a></div>
    <div><h4>Get involved</h4><a href="/events/#entry">Enter a team</a><a href="/about/#membership">Membership</a><a href="/partners/">Partners</a></div>
    <div><h4>Discover</h4><a href="/about/">About us</a><a href="https://www.englandbeachsoccer.org/" target="_blank" rel="noopener">Current EBSA website ↗</a></div>
    <div><h4>On the sand</h4><a href="https://www.instagram.com/englandbeachsoccer/" target="_blank" rel="noopener">Instagram ↗</a><a href="https://www.englandbeachsoccer.org/contact" target="_blank" rel="noopener">Contact ↗</a></div>
  </div><div class="footer-bottom"><span>© ${new Date().getFullYear()} England Beach Soccer. Powered by SHOT Clubhouse.</span><span>2027 dates and details may change. <a href="https://www.englandbeachsoccer.org/policy" target="_blank" rel="noopener">Current policies ↗</a></span></div></div></footer>`;
}
function pageHero(kicker, title, copy, theme = '') {
  return `<section class="page-hero ${theme}"><div class="container"><span class="eyebrow">${kicker}</span><h1>${title}</h1><p class="lead">${copy}</p></div></section>`;
}
function eventCard(event) {
  return `<a class="event-card ${event.type === 'National Finals' ? 'final' : ''}" href="/events/?event=${event.id}" aria-label="Explore ${esc(event.title)}, ${dateLabel(event)}">
    <span class="date">${dateLabel(event)}</span><span class="type">${event.type} / 2027</span><h3>${esc(event.title)}</h3>
    <span class="region">${esc(event.region)}${!event.confirmed ? '<br><span class="pending">Date to be announced</span>' : ''}</span><span class="arrow" aria-hidden="true">↗</span></a>`;
}
function newsCard(item) {
  return `<a class="news-card" href="${item.href}" target="_blank" rel="noopener" aria-label="Read ${esc(item.title)} on England Beach Soccer">
    <div class="news-image"><img src="${item.image}" alt="" loading="lazy"></div><div class="news-body"><span class="eyebrow red">${item.category} / 2026</span><h3>${item.title}</h3><p>${item.summary}</p><span class="text-link">Read the story ↗</span></div></a>`;
}
function entryButton() {
  const link = pickEntryLink(entryLinks, new Date().toISOString().slice(0, 10));
  return link
    ? `<a class="btn btn-red" href="${link}" target="_blank" rel="noopener">Enter a team ↗</a>`
    : '<a class="btn btn-red" href="https://www.englandbeachsoccer.org/contact" target="_blank" rel="noopener">Enquire about team entry ↗</a>';
}
const heroPrints = [
  [photo('youth-girls-action'), alt.youth, 'h0'],
  [thumb('clubs-08'), alt.clubMen, 'h1'],
  [photo('youth-match-action'), alt.youth, 'h2'],
  [thumb('clubs-26'), alt.clubWomen, 'h3']
];
const wall = ['youth-12', 'clubs-41', 'youth-49', 'clubs-24', 'youth-44', 'clubs-06', 'youth-15', 'clubs-35', 'youth-57', 'clubs-09', 'youth-34', 'clubs-44', 'youth-24', 'clubs-02'];
const wall2 = ['youth-42', 'clubs-17', 'youth-62', 'clubs-11', 'youth-50', 'clubs-40', 'youth-22', 'clubs-31', 'youth-45', 'clubs-05', 'youth-03', 'clubs-43', 'youth-28', 'clubs-38'];
function home() {
  return `<main id="main"><section class="hero hero-fest"><div class="container hero-grid"><div class="hero-copy reveal">
    <span class="eyebrow">England Beach Soccer / Season 2027</span><h1><span>Everyone</span><br><span>on the sand.</span></h1>
    <p class="lead">Under-7s at their first festival weekend. Women’s and men’s national finals. England squads abroad and English clubs in Europe. One game, every age.</p>
    <div class="hero-actions"><a class="btn btn-red" href="/events/">Explore 2027 events ↗</a><a class="btn btn-blue" href="#membership">Join the movement ↗</a></div>
    <ul class="hero-tags" aria-label="Who plays"><li>Girls</li><li>Boys</li><li>Women</li><li>Men</li><li>U7 to senior</li></ul></div>
    <div class="hero-collage">${heroPrints.map(([src, text, cls], i) => print(src, text, cls, i === 0)).join('')}<div class="hero-stamp">The sand<br>is ours</div></div></div></section>
    ${textMarquee(['Youth Championships', 'National Championships', 'Summer Series', 'England teams', 'Euro Winners Cup', 'U7 to senior'])}
    ${lineupSection()}
    ${everyoneSection()}
    ${nationalsBand()}
    <section class="image-strip" aria-label="England teams"><div class="image-panel"><div class="panel-copy"><span class="eyebrow">The international pathway</span><h2>Men’s<br>team.</h2></div><img src="/assets/images/photos/england-men-duel.webp" alt="England men's beach soccer player challenging an opponent for the ball" loading="lazy"><a class="btn btn-white" href="/teams/?team=men#team-spotlight">Explore the team ↗</a></div><div class="image-panel"><div class="panel-copy"><span class="eyebrow">The international pathway</span><h2>Women’s<br>team.</h2></div><img src="/assets/images/photos/england-women-action.webp" alt="England women's beach soccer players in action on the sand" loading="lazy"><a class="btn btn-white" href="/teams/?team=women#team-spotlight">Explore the team ↗</a></div></section>
    ${beachDaySection()}
    ${membershipSection()}
    <section class="section white wall-section"><div class="container"><div class="section-head reveal"><div><span class="eyebrow red">The gallery</span><h2>Moments from the sand.</h2></div><p>Youth festivals, national finals and English clubs in Europe: ${gallery.length} photos from England Beach Soccer events.</p></div></div>
    ${photoMarquee(wall)}${photoMarquee(wall2, true)}<div class="container"><div style="margin-top:30px"><a class="btn btn-blue" href="/gallery/">See the gallery ↗</a></div></div></section>
    <section class="section"><div class="container"><div class="section-head reveal"><div><span class="eyebrow red">From the sand</span><h2>Stories in motion.</h2></div><p>The people and moments shaping English beach soccer. These stories open on the current England Beach Soccer site.</p></div><div class="news-grid reveal">${news.map(newsCard).join('')}</div><div style="margin-top:27px"><a class="btn btn-blue" href="/news/">More stories ↗</a></div></div></section>
    <section class="section blue"><div class="container feature-cta reveal"><div><span class="eyebrow">2027 youth competition</span><h2>Enter your team.</h2><p>Eight regional weekends build towards two national finals weekends. Find your place on the sand.</p></div><a class="btn btn-white" href="/events/#entry">See team entry ↗</a></div></section></main>`;
}
function eventsPage() {
  return `<main id="main">${collageHero('National competition / 2027', 'The road to<br>the finals.', 'Ten weekends across the summer. Youth festivals, senior and U18 finals, and a regional series from Sussex to Northumberland.', 'blue-theme', [[photo('youth-champions-blue'), alt.youthCelebrate], [thumb('clubs-41'), alt.champsMen], [thumb('youth-49'), alt.youth]])}
  ${lineupSection()}
  <section class="section white" id="programme"><div class="container"><div class="stats-band reveal"><div class="stat"><strong>08</strong><span>Regional weekends</span></div><div class="stat"><strong>02</strong><span>Finals weekends</span></div><div class="stat"><strong>10</strong><span>Weekends in all</span></div><div class="stat"><strong>2027</strong><span>Competition season</span></div></div>
  <div class="entry-pricing" id="entry"><div class="entry-heading"><div><span class="eyebrow red">2027 youth competition</span><h2>Team entry.</h2></div><p>Choose the entry window that suits your team. Entry is charged per team.</p></div><div class="entry-grid"><article class="entry-card"><span class="eyebrow">Early bird / invitation only</span><strong>£80</strong><p>Per team, by invitation.</p></article><article class="entry-card"><span class="eyebrow">Standard / public entry</span><strong>£100</strong><p>Per team. Open to all teams.</p></article><article class="entry-card"><span class="eyebrow">Late / from 2 May 2027</span><strong>£120</strong><p>Per team, subject to availability.</p></article></div><div class="entry-action">${entryButton()}</div></div>
  <div style="height:65px"></div><div class="section-head"><div><span class="eyebrow red">Find an event</span><h2>Choose your sand.</h2></div><p>Filter the programme by type or search for a county.</p></div>
  <div class="filter-bar" role="group" aria-label="Filter events"><button type="button" class="event-filter" data-filter="all" aria-pressed="true">All events</button><button type="button" class="event-filter" data-filter="Regional" aria-pressed="false">Regional</button><button type="button" class="event-filter" data-filter="National Finals" aria-pressed="false">National Finals</button><input id="event-search" class="search" type="search" placeholder="Search county or region" aria-label="Search events"></div>
  <p id="event-count" class="eyebrow" aria-live="polite"></p><div id="event-results" class="event-list"></div><div id="event-detail"></div>
  </div></section>
  ${everyoneSection('')}
  ${nationalsBand()}
  ${beachDaySection()}</main>`;
}
const teamData = {
  men: { title: 'Men’s team', copy: 'The senior men’s international pathway. A new men’s head coach was announced in March 2026.', image: photo('england-men-action'), href: 'https://www.englandbeachsoccer.org/post/england-s-men-s-head-coach', link: 'Head coach news' },
  women: { title: 'Women’s team', copy: 'The senior women’s international pathway, with a new head coach from March 2026 and a European league campaign that summer.', image: photo('england-women-team'), href: 'https://www.englandbeachsoccer.org/post/england-women-s-ebsl-report', link: 'Women’s league report' },
  u20: { title: 'Under 20s', copy: 'The next generation making its mark, with a Euro Cup campaign in spring 2026.', image: '/assets/images/lion-mark.webp', href: 'https://www.englandbeachsoccer.org/post/england-u20-euro-cup-report', link: 'U20 Euro Cup report' },
  u16: { title: 'Under 16s', copy: 'An early step towards the national pathway. The U16 talent pathway team went unbeaten to win gold in Porto in 2025.', image: '/assets/images/lion-mark.webp', href: 'https://www.englandbeachsoccer.org/post/england-u16-champions-in-porto', link: 'U16 gold in Porto' }
};
const squadWall = ['men-01', 'women-02', 'men-02', 'women-04', 'men-05', 'women-09', 'men-06', 'women-11', 'men-03', 'women-17', 'men-07', 'women-18', 'men-04', 'women-16'];
function teamsPage() {
  const cards = [['men', 'Men’s', photo('england-men-tackle'), alt.englandMen], ['women', 'Women’s', photo('england-women-duel'), alt.englandWomen], ['u20', 'Under 20s'], ['u16', 'Under 16s']];
  return `<main id="main">${collageHero('Representing England', 'The teams.', 'Four squads, one badge. Men and women at senior level, with U20 and U16 sides coming through.', '', [[photo('england-men-action'), alt.englandMen], [photo('england-women-hero'), alt.englandWomen]])}
  <section class="section white"><div class="container"><div class="section-head"><div><span class="eyebrow red">The pathway</span><h2>Find your team.</h2></div><p>Men, women, U20s and U16s.</p></div><div class="pathway-grid">${cards.map(([id, title, src, text], i) => `<article id="${id}" class="pathway-card reveal${src ? ' has-photo' : ''}">${src ? print(src, text, i % 2 ? 'tilt-r' : 'tilt-l') : '<div class="crest"><img src="/assets/images/lion-mark.webp" alt=""></div>'}<span class="eyebrow">0${i + 1} / England pathway</span><h3>${title}</h3><p>${teamData[id].copy}</p><a class="text-link" href="#team-spotlight" data-team="${id}">Explore pathway ↗</a></article>`).join('')}</div>
  <div id="team-spotlight" class="event-detail"><div class="visual"><img id="team-image" src="${teamData.men.image}" alt="Men’s team beach soccer"></div><div class="content"><span class="eyebrow red">England pathway</span><h2 id="team-title">${teamData.men.title}</h2><p id="team-copy" class="lead">${teamData.men.copy}</p><div class="hero-actions"><a id="team-link" class="btn btn-red" href="${teamData.men.href}" target="_blank" rel="noopener">${teamData.men.link} ↗</a><a class="btn btn-blue" href="https://www.englandbeachsoccer.org/" target="_blank" rel="noopener">Current team updates ↗</a></div></div></div></div></section>
  <section class="section dark squad-section"><div class="container"><div class="section-head"><div><span class="eyebrow">On the international stage</span><h2>Men and women.<br>One shirt.</h2></div><p>England’s senior squads in European competition.</p></div></div>${photoMarquee(squadWall)}</section>
  <section class="section"><div class="container"><div class="section-head reveal"><div><span class="eyebrow red">The pathway, as agreed with The FA</span><h2>From county<br>to country.</h2></div><p>The Memorandum of Understanding signed on 10 December 2025 sets out a tiered pathway for players, coaches and officials.</p></div>
  <ol class="ladder">${[['County competition', 'Regional weekends and County FA events, aligned with County FA requirements.'], ['Club development', 'Clubs build teams for the national championships and European club competition.'], ['International representation', 'England squads at Beach Soccer Worldwide and FIFA events.']].map(([t, c], i) => `<li class="reveal"><span>0${i + 1}</span><h3>${t}</h3><p>${c}</p></li>`).join('')}</ol></div></section>
  <section class="section white"><div class="container split clubs-europe"><div class="clubs-prints">${print(thumb('clubs-24'), alt.clubWomen, 'tilt-l')}${print(thumb('clubs-08'), alt.clubMen, 'tilt-r')}</div><div><span class="eyebrow red">Clubs in Europe</span><h2>English clubs abroad.</h2><p class="lead">At the 2026 Euro Winners Cup in Nazaré, Isle of Wight women finished 10th, a top-10 finish for the second year running. Portsmouth men qualified as England’s best third-placed domestic side.</p><a class="btn btn-blue" href="https://www.englandbeachsoccer.org/post/european-club-championships-report" target="_blank" rel="noopener">Read the club report ↗</a></div></div></section></main>`;
}
function newsPage() {
  const years = [...new Set(newsArchive.map(item => item.date.slice(0, 4)))];
  return `<main id="main">${pageHero('From the sand', 'News & culture.', 'Matches, milestones, people and places. Follow the stories behind the game.', 'red-theme')}
  <section class="section"><div class="container"><div class="section-head"><div><span class="eyebrow red">Featured stories</span><h2>Worth the read.</h2></div><p>Start with recent moments from the England Beach Soccer story.</p></div><div class="news-grid">${news.map(newsCard).join('')}</div></div></section>
  <section class="section white"><div class="container"><div class="section-head"><div><span class="eyebrow red">The complete archive</span><h2>Every story.</h2></div><p>${newsArchive.length} published articles from 2019 to 2026. Browse here, then open the original article on England Beach Soccer’s current website.</p></div>
  <div class="archive-controls"><label class="archive-search-label" for="news-search">Search stories<input id="news-search" type="search" placeholder="Search by title" autocomplete="off"></label><label for="news-year">Published year<select id="news-year"><option value="all">All years</option>${years.map(year => `<option value="${year}">${year}</option>`).join('')}</select></label></div>
  <p id="news-count" class="archive-count" role="status" aria-live="polite"></p><div id="news-results" class="archive-list"></div><button id="news-more" class="btn btn-blue" type="button" hidden>Show more stories</button>
  <p class="archive-source">Archive checked ${new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${newsArchiveUpdated}T12:00:00Z`))}. Titles, dates and links come from the <a href="https://www.englandbeachsoccer.org/news" target="_blank" rel="noopener">current England Beach Soccer site ↗</a>. New articles will appear after the archive is refreshed.</p></div></section></main>`;
}
function galleryPage() {
  const groups = [['all', 'All photos'], ['youth', 'Youth events'], ['clubs', 'Clubs & nationals'], ['men', 'England men'], ['women', 'England women']];
  const count = id => id === 'all' ? gallery.length : gallery.filter(g => g[0] === id).length;
  return `<main id="main">${collageHero('From the sand', 'The gallery.', `${gallery.length} photos from youth festivals, national finals, European club competition and England matches.`, 'blue-theme', [[thumb('youth-42'), alt.youthCelebrate], [thumb('clubs-42'), alt.champsMen], [thumb('youth-22'), alt.youth]])}
  <section class="section"><div class="container"><div class="filter-bar" role="group" aria-label="Filter photos">${groups.map(([id, label], i) => `<button type="button" class="event-filter gallery-filter" data-group="${id}" aria-pressed="${i === 0}">${label} <small>${count(id)}</small></button>`).join('')}</div>
  <p id="gallery-count" class="archive-count" role="status" aria-live="polite"></p><div id="gallery-grid" class="gallery-grid"></div><button id="gallery-more" class="btn btn-blue" type="button" hidden>Show more photos</button></div></section>
  <dialog id="lightbox" class="lightbox" aria-label="Photo viewer"><button class="lb-close" type="button" aria-label="Close photo">×</button><button class="lb-prev" type="button" aria-label="Previous photo">‹</button><img id="lb-img" alt=""><button class="lb-next" type="button" aria-label="Next photo">›</button><p id="lb-cap" class="lb-cap"></p></dialog></main>`;
}
function partnersPage() {
  return `<main id="main">${pageHero('Built together', 'Partners.', 'The game grows when communities, brands and football organisations move together.', 'red-theme')}
  <section class="section white"><div class="container"><div class="section-head"><div><span class="eyebrow red">The people building this</span><h2>More reach.<br>More impact.</h2></div><p>Five roles across the experience, from what happens on the sand to the digital home around it.</p></div><div class="partner-grid">
    <article class="partner-card partner-light"><span class="eyebrow">Outerwear</span><div class="partner-logo"><img src="/assets/brand/dryrobe.svg" alt="Dryrobe" loading="lazy"></div><h3>Dryrobe</h3><p>Waterproof changing robes and outdoor layers made for warmth and changing beside the beach.</p><a class="text-link" href="https://dryrobe.com/" target="_blank" rel="noopener">Visit Dryrobe ↗</a></article>
    <article class="partner-card partner-light"><span class="eyebrow">Kit & equipment</span><div class="partner-logo"><img src="/assets/brand/forza.svg" alt="FORZA" loading="lazy"></div><h3>FORZA</h3><p>Kit and equipment partner for the senior England teams, supporting EBS events and the FORZA Super Cup.</p><a class="text-link" href="https://www.forza.com/uk/" target="_blank" rel="noopener">Visit FORZA ↗</a></article>
    <article class="partner-card donis-card"><span class="eyebrow">Partnerships / delivery</span><div class="partner-logo"><img src="/assets/brand/donis-wordmark-white.png" alt="Donis" loading="lazy"></div><h3>Donis</h3><p>Bringing street football communities and event delivery into the wider beach soccer experience.</p><a class="text-link" href="https://donis.shotclubhouse.com/" target="_blank" rel="noopener">Visit Donis ↗</a></article>
    <article class="partner-card shot-card"><span class="eyebrow">Software / powered by</span><div class="partner-logo"><img src="/assets/brand/shot-logo.png" alt="SHOT Clubhouse" loading="lazy"></div><h3>SHOT Clubhouse</h3><p>Building this digital home and shaping connected event, community, content and performance journeys.</p><a class="text-link" href="https://shotclubhouse.com/" target="_blank" rel="noopener">Visit SHOT ↗</a></article>
    <article class="partner-card partner-light"><span class="eyebrow">Main shirt / 2026 season</span><div class="partner-logo"><img src="/assets/brand/far-logistics.svg" alt="FAR Logistics" loading="lazy"></div><h3>FAR Logistics</h3><p>UK freight and supply chain specialist, announced as front-of-shirt sponsor for the men’s and women’s 2026 international season.</p><a class="text-link" href="https://farlogistics.co.uk/" target="_blank" rel="noopener">Visit FAR Logistics ↗</a></article>
  </div><a class="btn btn-blue" href="https://www.englandbeachsoccer.org/partnerships" target="_blank" rel="noopener">Current partnerships ↗</a></div></section>
  <section class="section blue"><div class="container feature-cta"><div><span class="eyebrow">A platform for the next wave</span><h2>Build with the game.</h2><p>Events, teams, content and community give partners ways to contribute beyond a logo on a board.</p></div><a class="btn btn-white" href="https://www.englandbeachsoccer.org/contact" target="_blank" rel="noopener">Contact England Beach Soccer ↗</a></div></section></main>`;
}
function aboutPage() {
  return `<main id="main">${collageHero('Who we are', 'Built on sand.', 'England Beach Soccer runs youth festivals, national championships and England teams, and sends English clubs into Europe.', '', [[photo('youth-beach-aerial'), alt.crowd], [thumb('clubs-44'), alt.champsWomen], [thumb('clubs-41'), alt.champsMen]])}
  <section class="section white"><div class="container split"><div><span class="eyebrow red">Our story</span><h2>One game.<br>Many ways in.</h2><p class="lead">Beach soccer makes space for skill, energy and expression. England Beach Soccer connects local opportunities, national competition and international teams, giving the sport room to grow.</p><p>The 2026 National Championships crowned 15 champions, from U7 mixed through to the women’s and men’s finals. That range is the point of the whole programme.</p><a class="btn btn-blue" href="/events/">Explore the events ↗</a></div><div class="about-prints">${print(photo('youth-girls-action'), alt.youth, 'tilt-l')}${print(thumb('youth-16'), alt.youth, 'tilt-r small')}</div></div></section>
  ${timelineSection()}
  ${everyoneSection('white')}
  ${nationalsBand()}
  ${beachDaySection()}
  ${membershipSection()}
  <section class="section blue"><div class="container feature-cta"><div><span class="eyebrow">What comes next</span><h2>The next wave is yours.</h2><p>The 2027 calendar links regional competition to national finals. Find the weekend that brings the game closer to you.</p></div><a class="btn btn-white" href="/events/">See the calendar ↗</a></div></section></main>`;
}
const pages = { home, events: eventsPage, teams: teamsPage, gallery: galleryPage, news: newsPage, partners: partnersPage, about: aboutPage };
root.innerHTML = header() + (pages[page] || home)() + footer();
document.title = `${routeName[page] || 'Home'} | England Beach Soccer`;

const menu = document.querySelector('.menu-toggle');
menu?.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu'); document.querySelector('.nav').classList.toggle('open', open); });
window.addEventListener('scroll', () => { const max = document.documentElement.scrollHeight - window.innerHeight; document.querySelector('.scroll-progress').style.width = `${max > 0 ? Math.min(100, window.scrollY / max * 100) : 0}%`; }, { passive: true });
const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: .08 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

if (page === 'events') {
  const regionalPhotos = [photo('youth-match-action'), photo('youth-girls-action'), photo('youth-goalmouth'), full('youth-14'), full('youth-49'), full('youth-24'), full('youth-34'), full('youth-57')];
  const detailImage = e => e.id === 'senior-finals' ? full('clubs-43') : e.id === 'youth-finals' ? photo('youth-champions-yellow') : regionalPhotos[events.filter(x => x.type === 'Regional').indexOf(e) % regionalPhotos.length];
  let filter = 'all'; const results = document.getElementById('event-results'); const count = document.getElementById('event-count'); const search = document.getElementById('event-search');
  const show = () => { const query = search.value.trim().toLowerCase(); const found = events.filter(e => (filter === 'all' || e.type === filter) && `${e.title} ${e.region} ${dateLabel(e)}`.toLowerCase().includes(query)); results.innerHTML = found.length ? found.map(eventCard).join('') : '<div class="empty">No events match. Try another region or filter.</div>'; count.textContent = `${found.length} ${found.length === 1 ? 'event' : 'events'} shown`; };
  document.querySelectorAll('.event-filter').forEach(button => button.addEventListener('click', () => { filter = button.dataset.filter; document.querySelectorAll('.event-filter').forEach(b => b.setAttribute('aria-pressed', String(b === button))); show(); }));
  search.addEventListener('input', show); show();
  const selected = events.find(e => e.id === new URLSearchParams(location.search).get('event'));
  if (selected) { document.getElementById('event-detail').innerHTML = `<article class="event-detail"><div class="visual"><img src="${detailImage(selected)}" alt="${selected.id === 'senior-finals' ? alt.champsWomen : 'Young beach soccer players at an England Beach Soccer event'}"></div><div class="content"><span class="eyebrow red">${selected.type} / 2027</span><h2>${esc(selected.title)}</h2><p class="lead">${dateLabel(selected)} 2027 · ${esc(selected.region)}</p>${!selected.confirmed ? '<div class="notice red-notice"><strong>Date to be announced.</strong> This is a provisional weekend. The confirmed date will be published here.</div>' : ''}${selected.sessions?.map(s => `<div class="session"><strong>${s.date}</strong>${s.title}</div>`).join('') || ''}<div class="entry-action">${entryButton()}</div><a class="btn btn-blue" href="/events/">Back to all events ↗</a></div></article>`; document.getElementById('event-detail').scrollIntoView({ behavior: 'smooth', block: 'start' }); }
}
if (page === 'teams') {
  const setTeam = id => { const t = teamData[id]; document.getElementById('team-title').textContent = t.title; document.getElementById('team-copy').textContent = t.copy; const img = document.getElementById('team-image'); img.src = t.image; img.alt = `${t.title} beach soccer`; const link = document.getElementById('team-link'); link.href = t.href; link.textContent = `${t.link} ↗`; };
  const selected = new URLSearchParams(location.search).get('team'); if (selected && teamData[selected]) setTeam(selected);
  document.querySelectorAll('[data-team]').forEach(link => link.addEventListener('click', () => { setTeam(link.dataset.team); history.replaceState(null, '', `/teams/?team=${link.dataset.team}#team-spotlight`); }));
}
if (page === 'gallery') {
  const STEP = 24; let group = 'all', shown = STEP, current = 0;
  const grid = document.getElementById('gallery-grid'), count = document.getElementById('gallery-count'), more = document.getElementById('gallery-more');
  const lightbox = document.getElementById('lightbox'), big = document.getElementById('lb-img'), caption = document.getElementById('lb-cap');
  const altText = { women: 'England women’s beach soccer', men: 'England men’s beach soccer', youth: 'Young players at an England Beach Soccer event', clubs: 'Club and national championship beach soccer' };
  const order = ['youth', 'clubs', 'men', 'women'];
  const balanced = interleave([...gallery].sort((a, b) => order.indexOf(a[0]) - order.indexOf(b[0])));
  const list = () => group === 'all' ? balanced : gallery.filter(item => item[0] === group);
  const render = () => {
    const all = list();
    grid.innerHTML = all.slice(0, shown).map(([g, file, w, h], i) => `<button type="button" class="gallery-item" data-i="${i}" aria-label="Open photo ${i + 1} of ${all.length}"><img src="/assets/images/gallery/${file}-t.webp" width="${w}" height="${h}" alt="${altText[g]}" loading="lazy" decoding="async"></button>`).join('');
    count.textContent = `${Math.min(shown, all.length)} of ${all.length} photos`; more.hidden = shown >= all.length;
  };
  const open = index => {
    const all = list(); current = (index + all.length) % all.length; const [g, file] = all[current];
    big.src = `/assets/images/gallery/${file}.webp`; big.alt = altText[g]; caption.textContent = `${current + 1} of ${all.length}`;
    if (!lightbox.open) lightbox.showModal();
  };
  document.querySelectorAll('.gallery-filter').forEach(button => button.addEventListener('click', () => { group = button.dataset.group; shown = STEP; document.querySelectorAll('.gallery-filter').forEach(b => b.setAttribute('aria-pressed', String(b === button))); render(); }));
  more.addEventListener('click', () => { shown += STEP; render(); });
  grid.addEventListener('click', event => { const item = event.target.closest('.gallery-item'); if (item) open(Number(item.dataset.i)); });
  lightbox.querySelector('.lb-prev').addEventListener('click', () => open(current - 1));
  lightbox.querySelector('.lb-next').addEventListener('click', () => open(current + 1));
  lightbox.querySelector('.lb-close').addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });
  lightbox.addEventListener('keydown', event => { if (event.key === 'ArrowLeft') open(current - 1); if (event.key === 'ArrowRight') open(current + 1); });
  render();
}
if (page === 'news') {
  const search = document.getElementById('news-search');
  const year = document.getElementById('news-year');
  const results = document.getElementById('news-results');
  const count = document.getElementById('news-count');
  const more = document.getElementById('news-more');
  let visible = 24;
  const show = () => {
    const query = search.value.trim().toLocaleLowerCase('en-GB');
    const filtered = newsArchive.filter(item => (year.value === 'all' || item.date.startsWith(year.value)) && item.title.toLocaleLowerCase('en-GB').includes(query));
    results.innerHTML = filtered.length ? filtered.slice(0, visible).map(item => {
      const date = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${item.date}T12:00:00Z`));
      return `<a class="archive-item" href="${esc(item.href)}" target="_blank" rel="noopener" aria-label="Read ${esc(item.title)} on England Beach Soccer"><time datetime="${item.date}">${date}</time><h3>${esc(item.title)}</h3><span aria-hidden="true">↗</span></a>`;
    }).join('') : '<p class="empty">No stories match. Try another title or year.</p>';
    count.textContent = `Showing ${Math.min(visible, filtered.length)} of ${filtered.length} ${filtered.length === 1 ? 'story' : 'stories'}`;
    more.hidden = visible >= filtered.length;
  };
  search.addEventListener('input', () => { visible = 24; show(); });
  year.addEventListener('change', () => { visible = 24; show(); });
  more.addEventListener('click', () => { visible += 24; show(); });
  show();
}
