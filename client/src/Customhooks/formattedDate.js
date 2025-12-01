import dayjs from "dayjs";

/**
 * Formats a date from various input types without seconds
 * @param {string|object} dateInput - ISO string, Day.js/Moment object, or custom { combined } object
 * @param {string} format - optional, default "YYYY-MM-DD HH:mm" (no seconds)
 * @returns {string} formatted date
 */
export function formattedDate(dateInput, format = "YYYY MM DD - HH:mm") {
  if (!dateInput) return "";

  // Case 1: Custom object with .combined
  if (dateInput.combined && typeof dateInput.combined.format === "function") {
    return dateInput.combined.format(format);
  }

  // Case 2: Day.js / Moment object
  if (typeof dateInput.format === "function") {
    return dateInput.format(format);
  }

  // Case 3: ISO string or native Date
  try {
    return dayjs(dateInput).format(format);
  } catch (e) {
    return "";
  }
}
