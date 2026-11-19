// Site-wide settings and the plain-English labels shown for data values.
export const SITE = {
  name: 'Common Ground',
  byline: 'A Global Look at AI Safety',
  editor: 'James Armitage',
  repo: 'https://github.com/JA1991-safety/AI-Safety-Atlas',
  // 'preview' shows a banner on every page saying content is a draft awaiting review.
  status: 'preview',
};

export const correctionUrl = (area, section) =>
  `${SITE.repo}/issues/new?template=correction.yml&title=${encodeURIComponent(`Correction: ${area}${section ? ` (${section})` : ''}`)}`;

export const LABELS = {
  footing: {
    binding: 'Backed by binding law',
    partly_binding: 'Partly backed by binding law',
    guidance_only: 'Guidance only',
  },
  improvement_kind: {
    legal_power: 'Legal powers',
    coverage: 'Coverage',
    capacity: 'Capacity',
    technical: 'Technical',
    redress: 'Redress',
  },
  contact_type: {
    government: 'Government',
    regulator: 'Regulator',
    research_institute: 'Research institute',
    university: 'University centre',
    civil_society: 'Civil society',
    network: 'Network',
  },
  regulatory_approach: {
    binding_horizontal: 'General AI law in force',
    sector_and_existing_law: 'Existing regulators and sector rules',
    voluntary_guidance: 'Voluntary guidance',
    strategy_only: 'Strategy only',
    none_found: 'No framework found',
  },
  safety_institute: {
    yes: 'Has an AI safety or security institute',
    equivalent: 'Has an equivalent body',
    no: 'No dedicated institute found',
  },
  frontier_developers: { yes: 'Hosts frontier AI developers', no: 'No frontier developers found' },
  national_polling: {
    yes: 'National polling available',
    international_only: 'Only international surveys',
    none_found: 'No polling found',
  },
  commitment: {
    bletchley_declaration: 'Bletchley Declaration (2023)',
    seoul_declaration: 'Seoul Declaration (2024)',
    coe_convention: 'Council of Europe AI Convention (2024)',
    paris_statement: 'Paris AI Action Summit statement (2025)',
    new_delhi_declaration: 'New Delhi Declaration on AI Impact (2026)',
  },
  commitment_status: {
    signed: 'Signed',
    ratified: 'Ratified',
    endorsed: 'Endorsed',
    not_signed: 'Did not sign',
    unknown: 'Not known',
  },
  origin: {
    inside: 'From inside the country',
    outside: 'From outside the country',
    international: 'International body',
  },
  origin_short: { inside: 'inside', outside: 'outside', international: 'international' },
  type: {
    government: 'government',
    legislation: 'legislation',
    parliament: 'parliament',
    regulator: 'regulator',
    poll: 'poll',
    academic: 'academic',
    industry: 'industry',
    journalism: 'journalism',
    civil_society: 'civil society',
    local_voice: 'local voice',
    international_body: 'international body',
  },
  evidence_depth: { rich: 'Rich evidence', moderate: 'Moderate evidence', limited: 'Limited evidence' },
  review: {
    draft: 'Draft, awaiting editor review',
    editor_approved: 'Approved by the editor',
    locally_reviewed: 'Approved by the editor and a local reviewer',
  },
  voice: {
    government: 'Government',
    parliament: 'Parliament',
    safety_research: 'Safety research',
    industry: 'Industry',
    civil_society: 'Civil society',
    labour: 'Workers and unions',
    creative_sector: 'Creative sector',
    public_body: 'Public body',
  },
  regulation_kind: {
    law: 'Law',
    bill: 'Bill or proposal',
    strategy: 'Strategy',
    guidance: 'Guidance or report',
    institution: 'Institution',
    international: 'International',
    machinery: 'Machinery of government',
    enforcement: 'Enforcement',
  },
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
/** Formats YYYY, YYYY-MM or YYYY-MM-DD as "2026", "Oct 2026" or "24 Oct 2026". */
export function fmtDate(d) {
  if (!d) return '';
  const [y, m, day] = String(d).split('-');
  if (!m) return y;
  if (!day) return `${MONTHS[Number(m) - 1]} ${y}`;
  return `${Number(day)} ${MONTHS[Number(m) - 1]} ${y}`;
}

export const LANGUAGE_NAMES = {
  en: 'English', es: 'Spanish', fr: 'French', de: 'German', it: 'Italian', pt: 'Portuguese', zh: 'Chinese',
  ja: 'Japanese', ko: 'Korean', hi: 'Hindi', ar: 'Arabic', sw: 'Swahili', ha: 'Hausa', yo: 'Yoruba', ig: 'Igbo',
  ms: 'Malay', ta: 'Tamil',
};
