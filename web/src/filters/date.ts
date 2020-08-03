import moment from "moment";

export function DateFilter(value: string | number, format = "DD MMM"): string {
  if (value) {
    return moment.utc(value).format(format);
  } else {
    return "";
  }
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
