import { VideoItem } from '../types';

/**
 * Extracts YouTube ID from various URL formats.
 * Supports: youtube.com/watch?v=ID, youtu.be/ID, embed/ID
 */
function getYoutubeId(url: string): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

/**
 * Parses a standard CSV string into VideoItem objects.
 * Expected columns: title, link, level
 * Supports comma (,) and semicolon (;) delimiters.
 */
export function parseCSV(csvText: string): VideoItem[] {
  const lines = csvText.split(/\r?\n/);
  
  if (lines.length < 2) return [];

  // Detect delimiter from the first line
  const firstLine = lines[0];
  const delimiter = firstLine.includes(';') ? ';' : ',';

  // Helper to split line by delimiter respecting quotes
  const splitLine = (text: string): string[] => {
    // Regex to match fields: Quoted "..." OR Non-quoted [^delimiter]*
    // We need to construct regex dynamically based on delimiter
    const re = new RegExp(`("\\s*[^"]*\\s*"|[^${delimiter}\\s][^${delimiter}]*|[^${delimiter}]+)`, 'g');
    
    // This simple regex approach can be flaky for complex CSVs, 
    // but works for standard "Title, Link, Level" cases.
    // If the line is simple (no quotes), just split.
    if (!text.includes('"')) {
      return text.split(delimiter).map(s => s.trim());
    }
    
    // For quoted content, we need a slightly more robust parser or just simple split if we assume no commas in titles
    // Let's stick to simple split for robustness if regex fails, or use a basic tokenizing approach
    
    // Basic tokenizer for quoted CSV
    const result: string[] = [];
    let current = '';
    let inQuote = false;
    
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char === '"') {
        inQuote = !inQuote;
      } else if (char === delimiter && !inQuote) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    return result.map(s => s.replace(/^"|"$/g, '').trim());
  };

  const headers = splitLine(firstLine.toLowerCase());
  
  const titleIndex = headers.indexOf('title');
  const linkIndex = headers.indexOf('link');
  const levelIndex = headers.indexOf('level');

  if (titleIndex === -1 || linkIndex === -1) {
    throw new Error(`CSV must contain 'title' and 'link' columns. Detected headers: ${headers.join(', ')}`);
  }

  const items: VideoItem[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const cols = splitLine(line);

    // Ensure we have enough columns for the required fields
    if (cols.length <= Math.max(titleIndex, linkIndex)) continue;

    const link = cols[linkIndex];
    const title = cols[titleIndex];
    const level = levelIndex !== -1 ? cols[levelIndex] : undefined;
    
    const youtubeId = getYoutubeId(link);

    if (youtubeId) {
      items.push({
        id: i,
        youtubeId,
        title: title || `Video ${i}`,
        // Use high-res thumbnail by default
        imageUrl: `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`,
        level: level,
        startAt: 0
      });
    }
  }

  return items;
}