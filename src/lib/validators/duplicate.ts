import { DuplicateLocator } from "@/lib/duplicateLocator.interface";

export function duplicate<ElementType, KeyType>(
  locator: DuplicateLocator<ElementType, KeyType>,
  ignoreId?: string
) {
  console.log("validator instanced");
  return (value: KeyType) => {
    console.log("validator runs");
    return !locator.isDuplicate(value, ignoreId);
  };
}
