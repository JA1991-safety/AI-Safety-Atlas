// Data schema for Common Ground country profiles.
// One file per area: content/countries/<code>/profile.yaml
// The rule this schema enforces: no source, no claim.
import { z } from 'zod';

// Dates may be a year, a month or a day, because sources often give no more.
// A bare year such as 2026 is read from YAML as a number, so accept it and convert.
export const PartialDate = z.preprocess(
  (v) => (typeof v === 'number' ? String(v) : v),
  z.string().regex(/^\d{4}(-\d{2}(-\d{2})?)?$/, 'Use YYYY, YYYY-MM or YYYY-MM-DD')
);
export const FullDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use YYYY-MM-DD');

export const ORIGINS = ['inside', 'outside', 'international'];
export const SOURCE_TYPES = [
  'government',
  'legislation',
  'parliament',
  'regulator',
  'poll',
  'academic',
  'industry',
  'journalism',
  'civil_society',
  'local_voice',
  'international_body',
];
export const EVIDENCE_DEPTH = ['rich', 'moderate', 'limited'];
export const REVIEW_STATES = ['draft', 'editor_approved', 'locally_reviewed'];

export const Source = z
  .object({
    id: z.string().regex(/^[a-z0-9-]+$/, 'Source ids are lowercase-with-hyphens'),
    title: z.string().min(3),
    publisher: z.string().min(2),
    url: z.string().url().startsWith('https://', 'Use https links'),
    published: PartialDate.optional(), // leave out for undated pages; the site then shows the access date
    accessed: FullDate,
    origin: z.enum(ORIGINS),
    type: z.enum(SOURCE_TYPES),
    language: z.string().regex(/^[a-z]{2,3}$/, 'ISO 639 language code, e.g. en, zh, ja'),
    machine_translated: z.boolean().default(false),
    via: z.string().optional(), // e.g. syndicated from PA Media or the New York Times
    note: z.string().optional(),
  })
  .strict();

// A single sourced sentence or short paragraph.
export const Statement = z
  .object({
    text: z.string().min(10),
    sources: z.array(z.string()).min(1, 'Every statement needs at least one source'),
    date: PartialDate.optional(),
  })
  .strict();

export const SectionMeta = z
  .object({
    checked: FullDate, // when the section was last checked against sources
    evidence_depth: z.enum(EVIDENCE_DEPTH),
    review: z.enum(REVIEW_STATES),
    gaps: z.string().optional(), // what we looked for and could not find
  })
  .strict();

export const REGULATORY_APPROACHES = [
  'binding_horizontal', // a general AI law in force
  'sector_and_existing_law', // existing regulators apply principles; sector rules
  'voluntary_guidance',
  'strategy_only',
  'none_found',
];

export const COMMITMENT_KEYS = [
  'bletchley_declaration', // AI Safety Summit, UK, Nov 2023
  'seoul_declaration', // AI Seoul Summit, May 2024
  'coe_convention', // Council of Europe Framework Convention on AI, opened Sept 2024
  'paris_statement', // AI Action Summit statement, Feb 2025
  'new_delhi_declaration', // AI Impact Summit, Feb 2026
];

export const Commitment = z
  .object({
    key: z.enum(COMMITMENT_KEYS),
    status: z.enum(['signed', 'ratified', 'endorsed', 'not_signed', 'unknown']),
    date: PartialDate.optional(),
    sources: z.array(z.string()).min(1),
  })
  .strict();

export const Facets = z
  .object({
    regulatory_approach: z.enum(REGULATORY_APPROACHES),
    safety_institute: z
      .object({
        status: z.enum(['yes', 'equivalent', 'no']),
        name: z.string().optional(),
        sources: z.array(z.string()).min(1),
      })
      .strict(),
    frontier_developers: z
      .object({
        status: z.enum(['yes', 'no']),
        note: z.string(),
        sources: z.array(z.string()).min(1),
      })
      .strict(),
    national_polling: z.enum(['yes', 'international_only', 'none_found']),
    commitments: z.array(Commitment),
  })
  .strict();

export const HeadlineFigure = z
  .object({
    value: z.string().max(12), // e.g. "72%"
    label: z.string().min(10),
    question: z.string().optional(),
    fieldwork: z.string(),
    sample: z.string(),
    source: z.string(),
  })
  .strict();

export const RegulationItem = z
  .object({
    kind: z.enum(['law', 'bill', 'strategy', 'guidance', 'institution', 'international', 'machinery']),
    title: z.string(),
    date: PartialDate,
    status: z.string().optional(), // e.g. "In force", "Announced", "Second reading scheduled"
    text: z.string().min(10),
    sources: z.array(z.string()).min(1),
  })
  .strict();

export const OwnWords = z
  .object({
    quote: z.string().min(10),
    speaker: z.string(),
    role: z.string(),
    date: PartialDate.optional(), // leave out when the source is undated
    source: z.string(),
    original_language: z.string().default('en'),
    translation: z.string().optional(), // required when original_language is not English
    voice: z.enum(['government', 'parliament', 'safety_research', 'industry', 'civil_society', 'labour', 'creative_sector', 'public_body']),
  })
  .strict();

export const NewsItem = z
  .object({
    id: z.string().regex(/^[a-z0-9-]+$/),
    headline: z.string().min(10),
    date: PartialDate,
    kind: z.enum(['development', 'foundational']),
    summary: z.string().min(10),
    why_it_matters: z.string().min(10),
    sources: z.array(z.string()).min(1),
    topics: z.array(z.string()).default([]),
  })
  .strict();

export const Profile = z
  .object({
    code: z.string().regex(/^[A-Z]{2}$/),
    name: z.string(),
    status: z.enum(['draft', 'published']),
    last_reviewed: FullDate,
    editor_approved: z.boolean(),
    reviewers: z
      .array(
        z.object({ name: z.string().optional(), role: z.string(), anonymous: z.boolean().default(false) }).strict()
      )
      .default([]),
    summary: z
      .object({
        overview: z.array(Statement).min(1).max(4),
        regulation_line: Statement,
      })
      .strict(),
    facets: Facets,
    attitudes: z
      .object({
        meta: SectionMeta,
        headline_figures: z.array(HeadlineFigure).max(2),
        statements: z.array(Statement),
      })
      .strict(),
    regulation: z
      .object({
        meta: SectionMeta,
        items: z.array(RegulationItem).min(1),
      })
      .strict(),
    culture: z
      .object({
        meta: SectionMeta,
        limited_inside_sources: z.boolean().default(false),
        summary: z.array(Statement).min(1),
        own_words: z.array(OwnWords),
        outside_analysis: z.array(Statement).default([]),
      })
      .strict(),
    news: z
      .object({
        meta: SectionMeta,
        items: z.array(NewsItem).min(1),
      })
      .strict(),
    sources: z.array(Source).min(1),
  })
  .strict();

export const Area = z
  .object({
    code: z.string().regex(/^[A-Z]{2}$/),
    name: z.string(),
    region: z.string(),
    pilot: z.boolean(),
    // ISO 3166-1 numeric codes of the map shapes that make up this area
    map_ids: z.array(z.string().regex(/^\d{3}$/)).min(1),
    // small areas get a clickable dot as well as their outline
    marker: z.tuple([z.number(), z.number()]).optional(),
    languages: z.array(z.string()),
  })
  .strict();
