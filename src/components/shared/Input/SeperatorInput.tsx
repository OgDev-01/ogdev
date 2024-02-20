"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { cn } from "@/libs/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../PopOver/PopOver";

interface TCProps {
  tags: string[];
  onRemove(idx: number): void;
}

interface DefaultProps extends React.ComponentPropsWithoutRef<"input"> {
  label: string;
  hint?: string;
  isError?: boolean;
  hintIcon?: React.ReactNode | true;
  labelClass?: string;
  hintClass?: string;
  parentClass?: string;
  tags: string[];
  onTagsChange(tags: string[]): void;
}
type Props = Omit<DefaultProps, "value" | "defaultValue" | "onChange" | "type">;

const TagsContainer = ({ tags, onRemove }: TCProps) =>
  tags.map((tag, idx) => (
    <button
      className="flex h-full items-center justify-center gap-1 whitespace-nowrap rounded-lg bg-midpup px-2 py-1.5 text-[11px] bg-primary-button/20"
      key={tag}
      onClick={() => onRemove(idx)}
      type="button"
    >
      {tag}
      <span>&times;</span>
    </button>
  ));

const SeperatorInput = (props: Props) => {
  const [shouldPopOver, setShouldPopOver] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const popOverContentRef = useRef<HTMLDivElement>(null);
  const [hasSeenToast, setHasSeenToast] = useState(false);

  const {
    tags,
    onTagsChange,
    isError,
    labelClass,
    label,
    className,
    placeholder,
    name,
    id,
    ...prop
  } = props;

  /** 16 is an arbitrary number */
  const popoverWidth = (wrapperRef.current?.offsetWidth ?? 200) - 32;

  const handleContentOverflow = () => {
    if (wrapperRef.current) {
      const { offsetWidth, scrollWidth } = wrapperRef.current;
      if (scrollWidth - 20 >= offsetWidth) {
        setShouldPopOver(true);
        if (!hasSeenToast) {
          toast.info("Click on the ... to expand view");
          setHasSeenToast(true);
        }
      }
    }
  };
  const handleRemoveTag = (idx: number) => {
    onTagsChange(tags.filter((_, i) => i !== idx));
    if (popOverContentRef.current) {
      const { offsetWidth } = popOverContentRef.current;

      /** 35 is also an arbitrary number */
      if (offsetWidth < popoverWidth - 35) {
        setShouldPopOver(false);
      }
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    handleContentOverflow();
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const value = e.currentTarget.value.trim().toLocaleLowerCase() ?? "";
      if (value) {
        onTagsChange([...tags, value]);

        if (inputRef.current) {
          inputRef.current.value = "";
        }
      }
    } else if (e.key === "Backspace" && e.currentTarget.value === "") {
      if (!shouldPopOver) {
        onTagsChange(tags.slice(0, -1));
      }
    }
  };

  return (
    <label
      className={cn("grid grid-cols-1 gap-2 text-sm text-black", labelClass)}
    >
      <span className="font-semibold text-base">{label}</span>
      {/** for some weird reasons, click events affect TagsContainer component and is being passed down to them */}
      <div
        onClick={(e) => e.preventDefault()}
        className={cn(
          "flex h-14 items-center gap-1 overflow-hidden rounded-lg border-2 border-black/30 p-4 py-3 outline-transparent placeholder:text-pale-black focus-within:border-primary focus-visible:outline-none",
          isError && "border-danger-1",
          className
        )}
        ref={wrapperRef}
      >
        {!shouldPopOver ? (
          <div className="flex items-center gap-1">
            <TagsContainer tags={tags} onRemove={handleRemoveTag} />
          </div>
        ) : (
          <div className="mr-1">
            <Popover>
              <PopoverTrigger>
                <div
                  className="text-light-slate-9 flex h-full w-full items-center gap-4 rounded-md bg-slate-200 px-2 text-base"
                  aria-label="view tags"
                  // using this to trigger an animation each time content changes
                  key={tags.length}
                >
                  ...
                </div>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                className="w-full max-w-full bg-white p-4"
                style={{
                  width: popoverWidth,
                }}
              >
                <div
                  ref={popOverContentRef}
                  className="flex max-w-fit flex-wrap gap-2"
                >
                  <TagsContainer tags={tags} onRemove={handleRemoveTag} />
                </div>
              </PopoverContent>
            </Popover>
          </div>
        )}
        <input
          {...prop}
          placeholder={
            tags.length < 1
              ? placeholder ?? "Separate your tags with a comma"
              : undefined
          }
          className="h-full w-full min-w-[150px] border-none outline-none"
          ref={inputRef}
          type="text"
          name={name}
          onKeyDown={handleKeyDown}
          id={id ?? name}
        />
      </div>
    </label>
  );
};

export default SeperatorInput;
