"use client";

import { useState } from "react";

type Props = {
  legend: string;
  suggestions: string[];
  selected: string[];
  onChange: (next: string[]) => void;
};

export default function TagPicker({ legend, suggestions, selected, onChange }: Props) {
  const [draft, setDraft] = useState("");

  function remove(tag: string) {
    onChange(selected.filter((t) => t !== tag));
  }

  function add(tag: string) {
    const value = tag.trim();
    if (!value || selected.includes(value)) return;
    onChange([...selected, value]);
  }

  function addDraft() {
    add(draft);
    setDraft("");
  }

  const availableSuggestions = suggestions.filter((s) => !selected.includes(s));

  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium text-gray-900">{legend}</legend>

      {selected.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-1.5">
          {selected.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => remove(tag)}
              className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
            >
              {tag}
              <span aria-hidden className="text-blue-200">
                ×
              </span>
            </button>
          ))}
        </div>
      )}

      {availableSuggestions.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-1.5">
          {availableSuggestions.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => add(tag)}
              className="rounded-full border border-gray-300 px-3 py-1.5 text-sm text-gray-600 hover:border-blue-400 hover:text-blue-600"
            >
              + {tag}
            </button>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addDraft();
            }
          }}
          placeholder="Ajouter un élément personnalisé..."
          className="min-w-0 flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
        <button
          type="button"
          onClick={addDraft}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
        >
          Ajouter
        </button>
      </div>
    </fieldset>
  );
}
