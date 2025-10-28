/**
 * Formats uptime in seconds to a human-readable string
 * @param uptimeSeconds - Uptime in seconds
 * @returns Formatted string like "5d 3h 24m 15s"
 */
export function formatUptime(uptimeSeconds: number): string {
  if (uptimeSeconds < 0) {
    return "Invalid uptime";
  }

  const days = Math.floor(uptimeSeconds / 86400);
  const hours = Math.floor((uptimeSeconds % 86400) / 3600);
  const minutes = Math.floor((uptimeSeconds % 3600) / 60);
  const seconds = Math.floor(uptimeSeconds % 60);

  const parts: string[] = [];

  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0 || parts.length === 0) parts.push(`${seconds}s`);

  return parts.join(" ");
}

/**
 * Formats ISO timestamp to a more readable format
 * @param isoTimestamp - ISO 8601 timestamp string
 * @returns Formatted date/time string
 */
export function formatTimestamp(isoTimestamp: string): string {
  try {
    const date = new Date(isoTimestamp);
    if (Number.isNaN(date.getTime())) {
      return "Invalid timestamp";
    }
    return date.toLocaleString("en-GB", {
      dateStyle: "medium",
      timeStyle: "medium",
    });
  } catch {
    return "Invalid timestamp";
  }
}
