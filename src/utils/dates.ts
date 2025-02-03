import dayjs from "dayjs";

export function formatDate(dateString: string | null) {
  if (dateString === null) return "----";

  return dayjs(dateString).format("DD/MM/YYYY");
}

export function formatDateTime(dateString: string | null) {
  if (dateString === null) return "----";

  return dayjs(dateString).format("DD/MM/YYYY HH:mm:ss");
}
