"use client";
import React from "react";
import Image from "next/image";
import type { LngLat, SuggestResponse } from "@yandex/ymaps3-types";
import { Input } from "@/shared/ui/Input/Input";
import { SearchInputProps } from "./SearchInput.types";
import { Text } from "@/shared/ui/Typography/Typography";

export const SearchInput = ({
  onSelectAddress,
  className = "",
}: SearchInputProps) => {
  const [query, setQuery] = React.useState("");
  const [suggestions, setSuggestions] = React.useState<SuggestResponse>([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleChange = async (value: string) => {
    setQuery(value);

    if (!value) {
      setSuggestions([]);
      setIsOpen(false);
      onSelectAddress(null);
      return;
    }

    const results = await ymaps3.suggest({ text: value });
    setSuggestions(results);
    setIsOpen(true);
  };

  const handleSelect = async (item: SuggestResponse[number]) => {
    setQuery(item.title.text);
    setIsOpen(false);
    setSuggestions([]);

    const geocoded = await ymaps3.search({ text: item.title.text });
    const first = geocoded[0];
    if (first?.geometry) {
      onSelectAddress(first.geometry.coordinates as LngLat);
    }
  };

  const handleClear = () => {
    setQuery("");
    setSuggestions([]);
    setIsOpen(false);
    onSelectAddress(null);
  };

  return (
    <div ref={containerRef} className={className}>
      <div className="relative w-full">
        <Input
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => suggestions.length > 0 && setIsOpen(true)}
          placeholder="Введите адрес"
          className="relative bg-bg-base-light border-none h-11 !pl-8"
        />
        <Image
          src="/icons/search.svg"
          alt="Поиск"
          width={16}
          height={16}
          className="absolute left-2 top-[14px]"
        />
        {query && (
          <button
            type="button"
            className="right-1 top-[2px] cursor-pointer h-10 w-10 flex items-center justify-center absolute"
            onClick={handleClear}
          >
            <Image
              src="/icons/button-delete.svg"
              alt="Очистить"
              width={14}
              height={14}
            />
          </button>
        )}

        {isOpen && suggestions.length > 0 && (
          <ul className="absolute left-0 right-0 mt-1 max-h-72 overflow-y-auto rounded-xl bg-base shadow-[0px_4px_4px_0px_#3C3B3B29]">
            {suggestions.map((item, index) => (
              <li
                key={index}
                onClick={() => handleSelect(item)}
                className="w-full px-4 py-2 hover:bg-bg-base-light cursor-pointer flex flex-col"
              >
                <Text>{item.title.text}</Text>
                {item.subtitle && (
                  <Text variant="label-s-regular-12" className="opacity-60">
                    {item.subtitle.text}
                  </Text>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
