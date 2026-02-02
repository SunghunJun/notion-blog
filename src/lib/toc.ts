/**
 * Table of Contents utilities
 * Extracts headings from markdown content and generates TOC structure
 */

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

/**
 * Generate URL-friendly slug from text
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9가-힣\s-]/g, '') // Keep Korean characters too
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Extract headings from markdown content
 * @param content - Markdown string
 * @returns Array of TOC items with id, text, and level
 */
export function extractHeadings(content: string): TocItem[] {
  if (!content) return [];

  const headings: TocItem[] = [];
  const seenIds = new Set<string>();

  // Match markdown headings (## and ###)
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;

  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2]
      .trim()
      // Remove markdown formatting
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*]+)\*/g, '$1')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

    // Generate unique ID
    let id = generateSlug(text);
    let counter = 1;
    const baseId = id;

    // Handle duplicate headings
    while (seenIds.has(id)) {
      id = `${baseId}-${counter}`;
      counter++;
    }
    seenIds.add(id);

    headings.push({ id, text, level });
  }

  return headings;
}

/**
 * Check if content has enough headings to warrant a TOC
 */
export function shouldShowToc(content: string, minHeadings: number = 3): boolean {
  const headings = extractHeadings(content);
  return headings.length >= minHeadings;
}
