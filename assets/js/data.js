export const events = [
  { id: 'sussex-april', title: 'Sussex FA', region: 'South East', start: '2027-04-24', end: '2027-04-25', type: 'Regional', confirmed: true },
  { id: 'sussex-may', title: 'Sussex FA', region: 'South East', start: '2027-05-15', end: '2027-05-16', type: 'Regional', confirmed: true },
  { id: 'london', title: 'London FA', region: 'London', start: '2027-05-29', end: '2027-05-30', type: 'Regional', confirmed: false },
  { id: 'cornwall', title: 'Cornwall FA', region: 'South West', start: '2027-06-05', end: '2027-06-06', type: 'Regional', confirmed: false },
  { id: 'essex', title: 'Essex FA', region: 'East', start: '2027-06-05', end: '2027-06-06', type: 'Regional', confirmed: false },
  { id: 'devon', title: 'Devon FA', region: 'South West', start: '2027-06-19', end: '2027-06-20', type: 'Regional', confirmed: true },
  { id: 'east-riding', title: 'East Riding FA', region: 'Yorkshire', start: '2027-06-26', end: '2027-06-27', type: 'Regional', confirmed: true },
  { id: 'northumberland', title: 'Northumberland FA', region: 'North East', start: '2027-07-03', end: '2027-07-04', type: 'Regional', confirmed: true },
  { id: 'senior-finals', title: 'Senior & U18 National Finals', region: 'Hampshire & Isle of Wight', start: '2027-07-17', end: '2027-07-18', type: 'National Finals', confirmed: true, sessions: [
    { date: 'Saturday 17 July', title: 'U18 Boys & Women’s Championships' },
    { date: 'Sunday 18 July', title: 'U18 Girls & Men’s Championships' }
  ] },
  { id: 'youth-finals', title: 'Youth National Finals', region: 'Hampshire & Isle of Wight', start: '2027-07-24', end: '2027-07-25', type: 'National Finals', confirmed: true, sessions: [
    { date: 'Saturday 24 July', title: 'U7, U8, U9 Mixed; U10, U12, U14, U16 Girls' },
    { date: 'Sunday 25 July', title: 'U10, U11, U12, U13, U14, U16 Boys' }
  ] }
];

export const news = [
  { category: 'National Championships', title: 'A landmark weekend for beach soccer', summary: 'A look back at the 2026 national championships and the teams who made the sand their stage.', image: '/assets/images/photos/youth-champions-blue.webp', href: 'https://www.englandbeachsoccer.org/post/national-championships-2026' },
  { category: 'Pathway', title: 'The North East steps onto the sand', summary: 'Community, development and competition meet at the Longsands Beach Soccer Cups.', image: '/assets/images/photos/youth-goalmouth.webp', href: 'https://www.englandbeachsoccer.org/post/north-east-beach-soccer' },
  { category: 'International', title: 'English clubs on the European stage', summary: 'Isle of Wight and Portsmouth represented England at the Euro Winners Cup.', image: '/assets/images/photos/club-euro-winners.webp', href: 'https://www.englandbeachsoccer.org/post/european-club-championships-report' }
];

export function dateLabel(event) {
  const a = new Date(`${event.start}T12:00:00Z`);
  const b = new Date(`${event.end}T12:00:00Z`);
  const month = new Intl.DateTimeFormat('en-GB', { month: 'short', timeZone: 'UTC' }).format(a);
  return `${a.getUTCDate()}–${b.getUTCDate()} ${month}`;
}
