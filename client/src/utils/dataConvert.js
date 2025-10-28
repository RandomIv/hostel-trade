export function convertDate(data) {
  const date = new Date(data);
  return date.toLocaleDateString();
}
