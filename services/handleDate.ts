import { format, isThisWeek, isThisYear, isToday, isYesterday } from "date-fns";

export function formatUserChatTime(dateString: string | null): string {
  if (!dateString) return "";

  const date = new Date(dateString);

  if (isToday(date)) {
    return format(date, "p");
  }

  if (isYesterday(date)) {
    return "Yesterday " + format(date, "p");
  }

  if (isThisWeek(date)) {
    return format(date, "EEEE") + " " + format(date, "p");
  }

  if (isThisYear(date)) {
    return format(date, "MMM d") + " " + format(date, "p");
  }

  return format(date, "yyyy MMM d") + " " + format(date, "p");
}

export function formatChat(dateString: string | null): string {
  if (!dateString) return "";

  const date = new Date(dateString);

  return format(date, "p");
}

export function displayDateOnce(dateString: string | null) {
  if (!dateString) return "";

  const date = new Date(dateString);

  if (isToday(date)) {
    return "Today";
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

export function groupMessagesByDay(messages: MessageComp[] | null): CurrentSection[] {
  if (!messages) return [];
  const sections: CurrentSection[] = [];
  let currentSection: CurrentSection | null = null;

  messages.forEach((m) => {
    const d = m.created_at ? new Date(m.created_at) : new Date();
    const dayKey = format(d, "yyyy-MM-dd");

    if (!currentSection || currentSection.key !== dayKey) {
      currentSection = {
        key: dayKey,
        title: displayDateOnce(m.created_at),
        data: []
      };
      sections.push(currentSection);
    }

    currentSection.data.push(m);
  });

  return sections;
}
