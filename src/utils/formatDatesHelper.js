export default function formatDateHelper(fullDate) {
  const [year, month, date] = fullDate.split("T")[0].split("-");

  return new Date(year, month - 1, date);
}
