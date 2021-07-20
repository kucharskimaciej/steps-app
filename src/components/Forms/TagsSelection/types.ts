export type OptionKey = string;
export type ValueType = 1 | 0 | -1;

export type OptionWithLabel<TKey = OptionKey> = {
  key: TKey;
  label: string;
};
export type KeyValueTuple<TKey = OptionKey> = [TKey, ValueType];
