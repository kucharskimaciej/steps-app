import moment from "moment";
import { format as formatDate } from "date-fns";

export function DateFilter(value: string | number, format = "dd MMM"): string {
  if (!value) {
    return "";
  }

  if (!isNaN(Number(value))) {
    value = Number(value);
  }

  return formatDate(new Date(value), format);
}

export function FullDateFilter(value: string | number): string {
  return DateFilter(value, "DD MMMM YYYY");
}

export function SmartDateFilter(value: string | number): string {
  if (value) {
    return moment.utc(value).fromNow();
  } else {
    return "";
  }
}
