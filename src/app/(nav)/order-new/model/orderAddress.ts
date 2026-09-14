export type ParsedOrderAddress = { street: string; home: string };

/** Parses the existing combined “street house” input without changing its UI shape. */
export function splitStreetAndHome(value: string): ParsedOrderAddress | null {
  const normalized = value.trim().replace(/,\s*$/, '')
    .replace(/(\d+)\s*(?:корп(?:ус)?\.?|к)\s*(\d+)/giu, '$1к$2')
    .replace(/(\d+)\s*(?:стр(?:оение)?\.?|с)\s*(\d+)/giu, '$1с$2');
  const match = normalized.match(/^(.+?)[,\s]+(\d+(?:(?:к|с)\s*\d+[A-Za-zА-Яа-я]?|[A-Za-zА-Яа-я])*(?:[/-]\d+[A-Za-zА-Яа-я]?)?)$/iu);
  if (!match) return null;
  const street = match[1].trim().replace(/,\s*$/, '').trim();
  return street ? { street, home: match[2] } : null;
}

export function normalizeHome(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, '');
}
