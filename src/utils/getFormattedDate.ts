export function getFormattedDate(): string {
  const today = new Date();

  // Get the year, month, and day
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // JavaScript months are 0-indexed
  const day = today.getDate();

  // Format the date as desired
  const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
  return formattedDate;
}
