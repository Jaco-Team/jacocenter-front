'use client';
import { Input } from "@/shared/ui/Input/Input";
import { Text } from "@/shared/ui/Typography/Typography";
import React, { useEffect, useRef, useState } from "react";
import { SearchInputProps } from "./InputSearch.type";

export const InputSearch = ({ options }: SearchInputProps) => {
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const filtered = options.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()));

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;

    if (e.key === "ArrowDown") {
      setActiveIndex(prev => Math.min(prev + 1, filtered.length - 1));
    }

    if (e.key === "ArrowUp") {
      setActiveIndex(prev => Math.max(prev - 1, 0));
    }

    if (e.key === "Enter" && activeIndex >= 0) {
      setValue(filtered[activeIndex].name);
      setIsOpen(false);
      setActiveIndex(-1);
    }

    if (e.key === "Escape") {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!listRef.current || activeIndex < 0) return;
    const activeItem = listRef.current.children[activeIndex] as HTMLElement;
    if (activeItem) {
      activeItem.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  return (
    <div ref={rootRef} onKeyDown={handleKeyDown}>
      <div className="rounded-xl bg-base relative text-text-secondary">
        <Input
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setIsOpen(true);
          }}
          placeholder="Все товары"
        ></Input>
        <button className="absolute p-3 top-0 right-0 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <div className="w-3 h-3 border-t border-l border-text-subtle rotate-[45deg] mt-1"></div> //стрелка вверх
          ) : (
            <div className="w-3 h-3 border-b border-l border-text-subtle rotate-[-45deg] mb-1"></div> //стрелка вниз
          )}           
        </button>
      </div>

      {isOpen && filtered.length > 0 && 
      (
        <ul 
          ref={listRef}
          className="max-h-[216px] bg-base rounded-xl overflow-auto mt-1 p-2 shadow-[0_4px_4px_rgba(60,59,59,0.16)] text-text-secondary">
          {filtered.map((item, index) => (
            <li
              key={item.id}
              onClick={() => {
                setValue(item.name);
                setIsOpen(false);
                setActiveIndex(-1);
              }}
              className={`h-10 px-2 flex items-center rounded-lg ${activeIndex === index ? "bg-bg-base-light text-text-base" : "hover:bg-bg-base-light"}`}
            >
              <Text>{item.name}</Text>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
