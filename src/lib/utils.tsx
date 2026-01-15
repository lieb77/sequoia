/* /lib/utils */
import { base } from "@/lib/api"

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

export function getLongMonthNames(): string[] {
  const monthNames: string[] = [];
  const tempDate = new Date(); // Create a temporary Date object

  for (let i = 0; i < 12; i++) {
    tempDate.setMonth(i); // Set the month of the Date object
    monthNames.push(tempDate.toLocaleString('default', { month: 'long' }));
  }

  return monthNames;
}


export function fixUrls(body: string) : string {
		const regex = /\/sites/g
		return body.replaceAll(regex, base + "/sites");
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };
  return date.toLocaleDateString(undefined, options);
}

export const currentYear: number = new Date().getFullYear()

export const minYear: number = 2004
