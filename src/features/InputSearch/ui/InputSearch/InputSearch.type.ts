export type OptionItem = {
  id: string;
  name: string;
};

export type SearchInputProps<T extends OptionItem> = {
  options?: T[];
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onSelect?: (item: T) => void;
};
