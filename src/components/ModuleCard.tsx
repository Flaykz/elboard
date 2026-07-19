"use client";

import Link from "next/link";
import { moduleTypeMeta, splitCircuitLabel } from "@/lib/constants";
import type { Module } from "@/lib/switchboard";
import { moveModuleAction } from "@/app/actions";

const WIDTH_CLASS: Record<number, string> = {
  1: "w-16",
  2: "w-28",
  3: "w-40",
  4: "w-52",
};

function amperageLabel(module: Module) {
  if (!module.amperage) return "—";
  if (module.poles > 1) return `${module.poles} X ${module.amperage}A`;
  if (module.type === "disjoncteur") return `C${module.amperage}`;
  return `${module.amperage}A`;
}

export default function ModuleCard({ module }: { module: Module }) {
  const meta = moduleTypeMeta(module.type);
  const { types, rooms, free } = splitCircuitLabel(module.circuit);
  const usage = [...types, ...free];

  return (
    <div className="flex flex-col items-stretch gap-1">
      <Link
        href={`/module/${module.id}`}
        className={`${WIDTH_CLASS[module.width] ?? "w-16"} flex-1 shrink-0 rounded-md border ${meta.color} bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden`}
      >
        <div className={`h-2 ${meta.swatch}`} />
        <div className="p-1 text-[11px] leading-tight">
          <div className="text-center font-bold text-gray-900 text-xs">
            {amperageLabel(module)}
          </div>
          {module.label && (
            <div className="text-center text-[9px] text-gray-500 truncate">{module.label}</div>
          )}
          {usage.length > 0 && (
            <div className="mt-1 text-gray-700 whitespace-normal break-words">
              {usage.join(", ")}
            </div>
          )}
          {rooms.length > 0 && (
            <div className="mt-1 pt-1 border-t border-gray-100 text-gray-500 whitespace-normal break-words">
              {rooms.join(", ")}
            </div>
          )}
        </div>
      </Link>
      <div className="flex justify-between text-[10px] text-gray-400 px-0.5">
        <button
          type="button"
          onClick={() => moveModuleAction(module.id, "left")}
          className="hover:text-gray-700"
          aria-label="Déplacer à gauche"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => moveModuleAction(module.id, "right")}
          className="hover:text-gray-700"
          aria-label="Déplacer à droite"
        >
          →
        </button>
      </div>
    </div>
  );
}
