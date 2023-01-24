export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleString("ru", { day: "2-digit", month: "2-digit" })
}
