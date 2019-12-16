import moment from "moment";

export function DateFilter(value: string, format: string = "DD MMM"): string {
    if (value) {
        return moment.utc(value).format(format);
    } else {
        return "";
    }
}

export function FullDateFilter(value: string): string {
    return DateFilter(value, "DD MMMM YYYY");
}

export function SmartDateFilter(value: string): string {
    if (value) {
        return moment.utc(value).fromNow();
    } else {
        return "";
    }
}
