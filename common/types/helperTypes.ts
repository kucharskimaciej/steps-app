export type ReadonlyRecord<
  KeyType extends string | number | symbol,
  ValueType
> = Readonly<Record<KeyType, ValueType>>;
