/**
 * Format a given ISO date string into a string in the format DD-MM-YYYY
 * @param {string} isoDate - The ISO date string to be formatted
 * @returns {string} - The formatted date string
 * @throws {Error} - If the given date string is invalid
 */
export function formatIsoDate(isoDate: string) {
  const date = new Date(isoDate);

  // Validate date
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format");
  }

  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();

  return `${day}-${month}-${year}`;
}
/**
 * Returns the trend direction based on a given percentage.
 * If the percentage is greater than 0, returns "UP".
 * If the percentage is less than 0, returns "DOWN".
 * If the percentage is 0, returns "NEUTRAL".
 * @param {number} percentage - The percentage to determine the trend direction
 * @returns {string} - The trend direction
 */
export const getTrendDirection = (percentage: number) => {
  if (Number(percentage) > 0) return "UP";
  if (Number(percentage) < 0) return "DOWN";
  return "NEUTRAL";
};
/**
 * Generates a list of years from a given minimum year to a maximum year.
 * If the minimum year is not provided, the list will contain only the maximum year.
 * If the maximum year is not provided, the function returns an empty array.
 * @param {number | null} minYear - The minimum year to generate in the list
 * @param {number} maxYear - The maximum year to generate in the list
 * @returns {number[]} - The list of years from minYear to maxYear (inclusive)
 **/
export function generateYearList(
  minYear: number | null,
  maxYear: number
): number[] {
  if (!maxYear) return [];
  if (!minYear) {
    return [maxYear]; // Only max year available
  }
  const years: number[] = [];
  for (let y = maxYear; y >= minYear; y--) {
    years.push(y);
  }
  return years;
}
