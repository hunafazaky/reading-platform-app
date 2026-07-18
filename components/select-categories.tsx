"use client";

import Select, { MultiValue } from "react-select";

const options = [
  // Core Categories
  { value: "fiction", label: "Fiction" },
  { value: "non-fiction", label: "Non-Fiction" },

  // Literary & Formats
  { value: "poetry", label: "Poetry" },
  { value: "short-story", label: "Short Story" },
  { value: "essay", label: "Essay" },
  { value: "opinion", label: "Opinion / Op-Ed" },
  { value: "article", label: "Article" },
  { value: "book-review", label: "Book Review" },

  // Popular Fiction Genres
  { value: "fantasy", label: "Fantasy" },
  { value: "sci-fi", label: "Science Fiction" },
  { value: "mystery", label: "Mystery" },
  { value: "thriller", label: "Thriller & Suspense" },
  { value: "romance", label: "Romance" },
  { value: "historical-fiction", label: "Historical Fiction" },
  { value: "horror", label: "Horror" },
  { value: "adventure", label: "Action & Adventure" },
  { value: "slice-of-life", label: "Slice of Life" },

  // Academic & Real-Life
  { value: "biography", label: "Biography / Memoir" },
  { value: "history", label: "History" },
  { value: "philosophy", label: "Philosophy" },
  { value: "self-help", label: "Self-Help / Development" },
  { value: "science-tech", label: "Science & Tech" },
];

interface OptionProps {
  value: string;
  label: string;
}

interface SelectProps {
  value: string[];
  onChange: (tags: string[]) => void;
}

export default function SelectCategories({ value, onChange }: SelectProps) {
  const handleSelectChange = (newValue: MultiValue<OptionProps>) => {
    const stringArray = newValue.map((option) => option.value);
    onChange(stringArray);
  };

  return (
    <Select
      instanceId="select-categories"
      isMulti
      name="categories"
      options={options}
      onChange={handleSelectChange}
      placeholder="Select Categories"
      value={options.filter((option) => value.includes(option.value))}
      closeMenuOnSelect={false}
      className="text-sm"
      styles={{
        control: (styles, state) => ({
          ...styles,
          backgroundColor: "var(--popover)",
          borderColor: state.isFocused ? "var(--ring)" : "var(--input)",
          color: "var(--foreground)",
        }),
        menu: (styles) => ({
          ...styles,
          backgroundColor: "var(--popover)",
          border: "1px solid var(--border)",
        }),
        option: (styles, state) => ({
          ...styles,
          backgroundColor: state.isSelected
            ? "var(--foreground)"
            : state.isFocused
              ? "var(--accent)"
              : "transparent",
          color: state.isSelected ? "var(--background)" : "var(--foreground)",
        }),
        multiValue: (styles) => ({
          ...styles,
          backgroundColor: "var(--accent)",
        }),
        multiValueLabel: (styles) => ({
          ...styles,
          color: "var(--foreground)",
        }),
        multiValueRemove: (styles) => ({
          ...styles,
          color: "var(--foreground)",
          ":hover": {
            color: "var(--destructive)",
          },
        }),
        input: (styles) => ({
          ...styles,
          color: "var(--foreground)",
        }),
        placeholder: (styles) => ({
          ...styles,
          color: "var(--muted-foreground)",
        }),
      }}
    />
  );
}
