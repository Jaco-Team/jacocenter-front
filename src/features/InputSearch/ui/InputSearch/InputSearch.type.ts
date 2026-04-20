export type OptionItem = {
  id: string,
  name: string,
};

export type SearchInputProps<T extends OptionItem> = {
  options: T[];
  onSelect?: (item: T) => void;
};