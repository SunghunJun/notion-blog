/**
 * Calculate estimated reading time for content
 *
 * Uses average reading speed of 200 words per minute (WPM)
 * - 200 WPM is conservative and accounts for technical content
 * - Most adults read 200-300 WPM for non-fiction
 */

const WORDS_PER_MINUTE = 200;

/**
 * Calculate reading time from text content
 * @param content - The text content (markdown or plain text)
 * @returns Object with minutes and formatted display string
 */
export function calculateReadingTime(content: string): {
  minutes: number;
  text: string;
} {
  if (!content || content.trim().length === 0) {
    return { minutes: 0, text: "0 min read" };
  }

  // Remove markdown syntax for more accurate word count
  const cleanContent = content
    // Remove code blocks
    .replace(/```[\s\S]*?```/g, "")
    // Remove inline code
    .replace(/`[^`]*`/g, "")
    // Remove images
    .replace(/!\[.*?\]\(.*?\)/g, "")
    // Remove links but keep text
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    // Remove HTML tags
    .replace(/<[^>]*>/g, "")
    // Remove markdown headers
    .replace(/#{1,6}\s*/g, "")
    // Remove bold/italic markers
    .replace(/[*_]{1,3}/g, "")
    // Remove blockquote markers
    .replace(/^\s*>\s*/gm, "")
    // Remove horizontal rules
    .replace(/^[-*_]{3,}\s*$/gm, "")
    // Normalize whitespace
    .replace(/\s+/g, " ")
    .trim();

  // Count words (split by whitespace)
  const wordCount = cleanContent.split(/\s+/).filter(Boolean).length;

  // Calculate minutes, minimum 1 minute
  const minutes = Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));

  return {
    minutes,
    text: `${minutes} min read`,
  };
}
