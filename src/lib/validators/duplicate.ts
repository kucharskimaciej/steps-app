import { DuplicateLocator } from "@/lib/duplicateLocator.interface";

export function duplicate<ElementType, KeyType>(
  locator: DuplicateLocator<ElementType, KeyType>,
  ignoreId?: string
) {
  return (value: KeyType) => !locator.isDuplicate(value, ignoreId);
}
