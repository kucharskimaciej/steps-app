import { startOfDay } from "date-fns";

export function day(date: Date | number): number {
  return startOfDay(date).valueOf();
}

export function today(): number {
  return day(new Date());
}
