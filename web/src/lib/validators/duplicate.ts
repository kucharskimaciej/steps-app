import { DuplicateLocator } from "@/lib/duplicateLocator.interface";

export function duplicate<T>(locator: DuplicateLocator<T, string>) {
    return (value: string) => !locator.isDuplicate(value);
}
