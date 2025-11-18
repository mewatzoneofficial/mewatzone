export function formatDMY(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

export function formatDMYShortMonth(dateString) {
  const date = new Date(dateString);
  if (isNaN(date)) return ""; // handle invalid dates
  const day = String(date.getDate()).padStart(2, '0');
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = months[date.getMonth()]; // get month name
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}
