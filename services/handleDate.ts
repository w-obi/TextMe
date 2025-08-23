import { format, formatDistanceToNow, isThisWeek, isThisYear, isToday, isYesterday } from "date-fns";

export function formatUserChatTime(dateString: string | null): string {
  if (!dateString) return "";

  const date = new Date(dateString);

  if (isToday(date)) {
    return formatDistanceToNow(date, { addSuffix: true });
  }

  if (isYesterday(date)) {
    return "Yesterday";
  }

  if (isThisWeek(date)) {
    return format(date, "EEEE");
  }

  if (isThisYear(date)) {
    return format(date, "MMM d");
  }

  return format(date, "yyyy MMM d");
}
