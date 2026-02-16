// src/lib/utils.ts
import DOMPurify from 'dompurify'
import { base } from '@/lib/constants'
import { parse } from 'node-html-parser'

// Parse date into parts
export function parseDate(dateString: string) : [] {
    const dateParts = dateString.split('-');
    if (dateParts.length === 3) {
      const year:  number = parseInt(dateParts[0], 10);
      const month: number = parseInt(dateParts[1], 10);
      const day:   number = parseInt(dateParts[2], 10);
      return { year, month, day };
    } else {
      return null; // Invalid date format
    }
  }

// Return list of long month names
export function getLongMonthNames(): string[] {
  const monthNames: string[] = [];
  const tempDate = new Date(); // Create a temporary Date object

  for (let i = 0; i < 12; i++) {
    tempDate.setMonth(i); // Set the month of the Date object
    monthNames.push(tempDate.toLocaleString('default', { month: 'long' }));
  }

  return monthNames;
}

// Sanitize HTML - This may only work on client
export function sanitizeHTML(html: string): string {
    return DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });
}

// Add bas URL to image paths
export function fixUrls(body: string) : string {
		const regex = /\/sites/g
		return body.replaceAll(regex, base + "/sites");
}

// Format date string
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };
  return date.toLocaleDateString(undefined, options);
}

// HTML Parser
export function parseHtml(html: string) {
  const root = parse(html);

  // 1. Extract all Headers (h1, h2, h3)
  const headers = root.querySelectorAll('h1, h2, h3').map(h => h.text.trim());

  // 2. Extract Paragraphs
  const paragraphs = root.querySelectorAll('p').map(p => p.text.trim());

  // 3. Extract Image URLs from <img> tags
  const images = root.querySelectorAll('img').map(img => img.getAttribute('src'));

  // 4. Extract "Clean" text (no tags at all)
  const rawText = root.structuredText;

  return {
    headers,
    paragraphs,
    images,
    rawText
  };
}
