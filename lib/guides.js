import fs from "fs";
import path from "path";
import matter from "gray-matter";

const GUIDES_DIR = path.join(process.cwd(), "content/guides");
const FIELD_CARDS_DIR = path.join(process.cwd(), "content/field-cards");

/**
 * Parse a markdown file and return frontmatter + raw content
 */
function parseContentFile(filePath) {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { frontmatter: data, content };
}

/**
 * Get all guides (type: "guide") sorted by date descending
 */
export function getAllGuides() {
  if (!fs.existsSync(GUIDES_DIR)) return [];

  const slugs = fs.readdirSync(GUIDES_DIR).filter((entry) => {
    const fullPath = path.join(GUIDES_DIR, entry);
    return fs.statSync(fullPath).isDirectory();
  });

  const guides = slugs
    .map((slug) => {
      const mdPath = path.join(GUIDES_DIR, slug, "guide.md");
      if (!fs.existsSync(mdPath)) return null;

      const { frontmatter } = parseContentFile(mdPath);
      return {
        slug,
        type: "guide",
        ...frontmatter,
      };
    })
    .filter(Boolean)
    .filter((g) => g.status !== "draft");

  // Sort by date descending
  guides.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  return guides;
}

/**
 * Get all field cards (type: "field-card") sorted by date descending
 */
export function getAllFieldCards() {
  if (!fs.existsSync(FIELD_CARDS_DIR)) return [];

  const slugs = fs.readdirSync(FIELD_CARDS_DIR).filter((entry) => {
    const fullPath = path.join(FIELD_CARDS_DIR, entry);
    return fs.statSync(fullPath).isDirectory();
  });

  const cards = slugs
    .map((slug) => {
      const mdPath = path.join(FIELD_CARDS_DIR, slug, "card.md");
      if (!fs.existsSync(mdPath)) return null;

      const { frontmatter } = parseContentFile(mdPath);
      return {
        slug,
        type: "field-card",
        ...frontmatter,
      };
    })
    .filter(Boolean)
    .filter((c) => c.status !== "draft");

  cards.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  return cards;
}

/**
 * Get all content (guides + field cards) combined
 */
export function getAllContent() {
  return [...getAllGuides(), ...getAllFieldCards()];
}

/**
 * Get a single guide by slug, with full markdown content
 */
export function getGuideBySlug(slug) {
  const mdPath = path.join(GUIDES_DIR, slug, "guide.md");
  if (!fs.existsSync(mdPath)) return null;

  const { frontmatter, content } = parseContentFile(mdPath);
  return {
    slug,
    type: "guide",
    ...frontmatter,
    content,
  };
}

/**
 * Get a single field card by slug, with full markdown content
 */
export function getFieldCardBySlug(slug) {
  const mdPath = path.join(FIELD_CARDS_DIR, slug, "card.md");
  if (!fs.existsSync(mdPath)) return null;

  const { frontmatter, content } = parseContentFile(mdPath);
  return {
    slug,
    type: "field-card",
    ...frontmatter,
    content,
  };
}

/**
 * Get any content piece by slug (checks guides first, then field cards)
 */
export function getContentBySlug(slug) {
  return getGuideBySlug(slug) || getFieldCardBySlug(slug);
}

/**
 * Get related content pieces by slug array
 */
export function getRelatedContent(slugs = []) {
  return slugs.map((s) => getContentBySlug(s)).filter(Boolean);
}

/**
 * Extract table of contents from markdown content
 * Returns array of { text, slug, level }
 */
export function extractTOC(content) {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const toc = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const slug = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    toc.push({ text, slug, level });
  }

  return toc;
}
