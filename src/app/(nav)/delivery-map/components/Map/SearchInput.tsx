"use client";
import React from "react";
import Image from "next/image";
import type { LngLat, SuggestResponse } from "ymaps3";
import { Input } from "@/shared/ui/Input/Input";
import { SearchInputProps } from "./SearchInput.types";
import { Text } from "@/shared/ui/Typography/Typography";

export const SearchInput = ({
  onSelectAddress,
  externalError,
  className = "",
}: SearchInputProps) => {
  const [query, setQuery] = React.useState("");
  const [suggestions, setSuggestions] = React.useState<SuggestResponse>([]);
  const [isAddressFound, setIsAddressFound] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const debounceRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      clearTimeout(debounceRef.current);
    };
  }, []);

  const handleChange = (value: string) => {
    setQuery(value);
    setIsAddressFound(false);
    clearTimeout(debounceRef.current);

    if (!value) {
      setSuggestions([]);

      onSelectAddress(null);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      const results = await ymaps3.suggest({ text: value });
      setSuggestions(results);
    }, 300);
  };

  const handleSelect = async (item: SuggestResponse[number]) => {
    const address = item.title.text;
    const fullText = [address, item.subtitle?.text].filter(Boolean).join(", ");

    setQuery(address);

    setSuggestions([]);
    onSelectAddress(null);

    const geocoded = await ymaps3.search({ text: fullText });
    const coords = geocoded[0]?.geometry?.coordinates as LngLat | undefined;
    if (coords) {
      setIsAddressFound(true);
      onSelectAddress({ coords, address });
    }
  };

  const handleClear = () => {
    setQuery("");
    setSuggestions([]);
    setIsAddressFound(false);
    onSelectAddress(null);
  };

  return (
    <div className={className}>
      <div ref={containerRef} className="relative w-full">
        <Input
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Введите адрес"
          helperText={isAddressFound && !externalError ? "Адрес входит в зону доставки" : undefined}
          error={externalError ?? undefined}
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

        {suggestions.length > 0 && (
          <ul className="absolute left-0 right-0 top-full mt-1 max-h-72 overflow-y-auto rounded-xl bg-base py-2 shadow-[0px_4px_4px_0px_#3C3B3B29]">
            {suggestions.map((item, index) => (
              <li
                key={index}
                onClick={() => handleSelect(item)}
                className="cursor-pointer px-4 py-2 hover:bg-bg-base-light"
              >
                <Text className="text-text-secondary">{item.title.text}</Text>
                {item.subtitle?.text && (
                  <Text className="text-text-secondary opacity-60">
                    , {item.subtitle.text}
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
