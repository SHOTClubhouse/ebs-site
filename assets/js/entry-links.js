// Team entry payment links. Written by `node scripts/create-entry-links.mjs --write` once England Beach
// Soccer's Stripe account is connected. While a link is empty the site shows an enquiry link instead.
// The invitation-only early bird link is never stored here: it is printed once and sent by invitation.
export const entryLinks = { standard: '', late: '' };

// The late entry price applies from this date (inclusive).
export const lateFrom = '2027-05-02';

// Returns the Stripe payment link that applies on `today` (YYYY-MM-DD), or '' when none is set or the value is not a Stripe link.
export function pickEntryLink(links, today, from = lateFrom) {
  const link = today >= from ? links.late : links.standard;
  return /^https:\/\/(buy|book)\.stripe\.com\/[A-Za-z0-9_]+/.test(link || '') ? link : '';
}
