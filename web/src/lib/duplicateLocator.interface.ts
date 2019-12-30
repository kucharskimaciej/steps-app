export interface DuplicateLocator<ElementType, KeyType> {
    isDuplicate(key: KeyType): boolean;
    getDuplicate(key: KeyType): ElementType | void;
}
