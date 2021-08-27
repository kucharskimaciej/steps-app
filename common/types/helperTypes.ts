export type ReadonlyRecord<
  KeyType extends string | number | symbol,
  ValueType
> = Readonly<Record<KeyType, ValueType>>;

export type TagMatcherDefinitionTuple = [string, string[]];
