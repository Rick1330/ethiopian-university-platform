/**
 * Ethiopian Calendar utilities for date conversion and formatting
 * Based on the Ethiopian calendar system (13 months)
 */

export interface EthiopianDate {
  year: number;
  month: number;
  day: number;
}

export interface GregorianDate {
  year: number;
  month: number;
  day: number;
}

// Ethiopian month names in Amharic
export const ETHIOPIAN_MONTHS_AM = [
  'መስከረም', 'ጥቅምት', 'ህዳር', 'ታህሳስ', 'ጥር', 'የካቲት',
  'መጋቢት', 'ሚያዝያ', 'ግንቦት', 'ሰኔ', 'ሐምሌ', 'ነሐሴ', 'ጳጉሜን'
];

// Ethiopian month names in English
export const ETHIOPIAN_MONTHS_EN = [
  'Meskerem', 'Tikimt', 'Hidar', 'Tahsas', 'Tir', 'Yekatit',
  'Megabit', 'Miazia', 'Ginbot', 'Sene', 'Hamle', 'Nehase', 'Pagumen'
];

/**
 * Simple Ethiopian to Gregorian date conversion
 * Note: This is a simplified implementation for demonstration
 * Production use should include proper leap year calculations
 */
export function ethiopianToGregorian(ethDate: EthiopianDate): GregorianDate {
  // Simplified conversion - Ethiopian New Year starts around Sept 11
  const baseYear = ethDate.year + 7; // Ethiopian year is ~7-8 years behind
  const baseMonth = ethDate.month + 8; // Rough month offset
  
  let year = baseYear;
  let month = baseMonth;
  let day = ethDate.day;
  
  // Handle month overflow
  if (month > 12) {
    month -= 12;
    year += 1;
  }
  
  return { year, month, day };
}

/**
 * Simple Gregorian to Ethiopian date conversion
 */
export function gregorianToEthiopian(gregDate: GregorianDate): EthiopianDate {
  // Simplified conversion
  const baseYear = gregDate.year - 7;
  const baseMonth = gregDate.month - 8;
  
  let year = baseYear;
  let month = baseMonth;
  let day = gregDate.day;
  
  // Handle month underflow
  if (month <= 0) {
    month += 12;
    year -= 1;
  }
  
  return { year, month, day };
}

/**
 * Format Ethiopian date for display
 */
export function formatEthiopianDate(
  ethDate: EthiopianDate,
  locale: 'am' | 'en' = 'en'
): string {
  const months = locale === 'am' ? ETHIOPIAN_MONTHS_AM : ETHIOPIAN_MONTHS_EN;
  const monthName = months[ethDate.month - 1] || months[0];
  
  return `${ethDate.day} ${monthName} ${ethDate.year}`;
}

/**
 * Get current Ethiopian date
 */
export function getCurrentEthiopianDate(): EthiopianDate {
  const now = new Date();
  const gregDate: GregorianDate = {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate()
  };
  
  return gregorianToEthiopian(gregDate);
}

/**
 * Check if a year is a leap year in Ethiopian calendar
 */
export function isEthiopianLeapYear(year: number): boolean {
  // Ethiopian leap year calculation
  return (year % 4) === 3;
}

/**
 * Get number of days in Ethiopian month
 */
export function getDaysInEthiopianMonth(year: number, month: number): number {
  if (month >= 1 && month <= 12) {
    return 30; // First 12 months have 30 days
  } else if (month === 13) {
    return isEthiopianLeapYear(year) ? 6 : 5; // Pagumen has 5 or 6 days
  }
  return 0;
}
