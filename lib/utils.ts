import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function getDateDifferenceInDays(
  date1: Date | string,
  date2: Date | string
): number {
  // Convert inputs to Date objects if they are strings
  const d1 = typeof date1 === "string" ? new Date(date1) : date1;
  const d2 = typeof date2 === "string" ? new Date(date2) : date2;

  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
    throw new Error("Invalid date(s) provided.");
  }

  // Calculate the difference in milliseconds
  const diffInMs = Math.abs(d1.getTime() - d2.getTime());

  // Convert milliseconds to days
  return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
}
