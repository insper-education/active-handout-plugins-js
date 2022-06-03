export function dateWithTimeSeconds(date?: Date | null) {
  if (!date) return "";
  return date
    ? `${date.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      })} (${date.toLocaleString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })})`
    : "";
}
