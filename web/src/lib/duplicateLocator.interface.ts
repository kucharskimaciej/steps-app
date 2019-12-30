export interface DuplicateLocator<ElementType, KeyType> {
    isDuplicate(key: KeyType, ignoreId?: string): boolean;
    getDuplicate(key: KeyType, ignoreId?: string): ElementType | void;
}
