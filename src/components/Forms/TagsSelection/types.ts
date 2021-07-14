export type OptionKey = string;
export type ValueType = 1 | 0 | -1;

export type OptionWithLabel = {
  key: OptionKey;
  label: string;
};
export type KeyValueTuple = [OptionKey, ValueType];
