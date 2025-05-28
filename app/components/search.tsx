import type { FuseResult } from "fuse.js";
import { SendHorizontal } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

import { ROUTE_LABEL_MAP } from "@/constants";
import { useInput } from "@/hooks/use-input";
import { searchSite } from "@/lib/site-search";
import { cn } from "@/lib/utils";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

function Search({ side = "bottom" }: { side?: "top" | "bottom" }) {
  const { value, onChange } = useInput("");
  const [searchedValues, setSearchedValues] = useState<FuseResult<SearchData>[]>([]);
  const [isOpen, setIsOpen] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const searchContentRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setSearchedValues(searchSite(value));
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContentRef.current && !searchContentRef.current.contains(event.target as Node) && !isFocused) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFocused]);

  const handleFocus = () => {
    setIsFocused(true);
    setIsOpen(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsOpen(false);
      setIsFocused(false);
    }, 150);
  };

  return (
    <div className="size-full flex justify-center items-center px-6">
      <div className="w-full h-14 rounded-full flex justify-center items-center shadow-input border-input shadow border relative">
        <div className="flex-1 h-full overflow-y-auto font-semibold">
          <Input
            type="text"
            value={value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={onChange}
            placeholder="궁금한 내용을 찾아보세요"
            className="pl-6 box-border w-full h-full min-h-auto resize-none shadow-none transition-none border-none focus-visible:outline-none focus-visible:border-none focus-visible:shadow-none focus-visible:ring-0"
          />
        </div>

        <Button size={null} variant={null} className="pr-6 h-full">
          <SendHorizontal className="text-primary size-6" />
        </Button>

        {/* 검색 미리보기 내용 */}
        {isOpen && (
          <ul
            ref={searchContentRef}
            className={cn(
              "w-full max-h-80 flex flex-col overflow-y-auto absolute bg-white rounded-sm shadow-[0_0_10px_rgba(0,0,0,0.1)]",
              side === "top" ? "-top-3 left-0 -translate-y-full" : "-bottom-3 left-0 translate-y-full",
            )}
          >
            {searchedValues.map(({ item, matches }, i) => {
              const textMatch = matches?.find((m) => m.key === "text");
              const highlightedText = textMatch ? highlightMatches(item.text, textMatch.indices) : item.text;

              const routeHierarchy = item.route
                .split("/")
                .filter(Boolean)
                .map((seg) => ROUTE_LABEL_MAP.get(seg) ?? seg);
              const hierarchy = [...routeHierarchy, ...item.headingHierarchy.slice(1)].join(" / ");

              return (
                <li key={i} className="py-2.5 px-4 hover:bg-muted border-b">
                  <a href={item.route + "#" + item.headingHierarchy.at(-1)} className="block">
                    <div className="text-xs font-bold mb-1">{hierarchy}</div>
                    <p className={cn(item.type === "heading" ? "underline" : "font-light")}>{highlightedText}</p>
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Search;

function highlightMatches(text: string, indices: readonly [number, number][]) {
  if (!indices.length) return text;

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;

  indices.forEach(([start, end], i) => {
    // 중간 일반 텍스트
    if (lastIndex < start) {
      parts.push(text.slice(lastIndex, start));
    }

    // 강조된 텍스트
    parts.push(
      <b key={i} className="font-bold text-primary">
        {text.slice(start, end + 1)}
      </b>,
    );
    lastIndex = end + 1;
  });

  // 나머지
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}
