"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  AMPERAGES,
  CIRCUIT_SUGGESTIONS,
  ROOMS,
  POLES,
  WIDTHS,
  defaultPolesForType,
  splitCircuitLabel,
  MODULE_TYPES,
  type ModuleType,
} from "@/lib/constants";
import { deleteModuleAction, saveModuleAction } from "@/app/actions";
import type { Module } from "@/lib/switchboard";
import TagPicker from "./TagPicker";

type Props = {
  rowId: number;
  module?: Module;
};

function defaultAmperageForType(type: ModuleType): number {
  return type === "differentiel" ? 40 : 16;
}

export default function ModuleEditor({ rowId, module }: Props) {
  const router = useRouter();
  const initial = splitCircuitLabel(module?.circuit);
  const initialCircuitTags = [
    ...(module?.label ? [module.label] : []),
    ...initial.types,
    ...initial.free,
  ];

  const [type, setType] = useState<ModuleType>((module?.type as ModuleType) ?? "disjoncteur");
  const [circuitTags, setCircuitTags] = useState<string[]>(initialCircuitTags);
  const [roomTags, setRoomTags] = useState<string[]>(initial.rooms);
  const [amperage, setAmperage] = useState<number | "">(
    module?.amperage ?? (module ? "" : defaultAmperageForType(type))
  );
  const [poles, setPoles] = useState<number>(module?.poles ?? defaultPolesForType(type));
  const [width, setWidth] = useState<number>(module?.width ?? defaultPolesForType(type));
  const [saving, setSaving] = useState(false);

  function handleTypeChange(value: ModuleType) {
    setType(value);
    if (!module) {
      const suggested = defaultPolesForType(value);
      setPoles(suggested);
      setWidth(suggested);
      setAmperage(defaultAmperageForType(value));
    }
  }

  function handlePolesChange(value: number) {
    setPoles(value);
    setWidth(value);
  }

  const usesCircuitDetails = type !== "differentiel";
  const finalCircuit = usesCircuitDetails
    ? [...circuitTags, ...roomTags].filter(Boolean).join(", ")
    : "";

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-3 sm:px-6">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-800"
        >
          ← Retour
        </button>
        <h1 className="text-base font-semibold text-gray-900">
          {module ? "Modifier le module" : "Ajouter un module"}
        </h1>
      </header>

      <form
        action={async (formData) => {
          setSaving(true);
          await saveModuleAction(formData);
          router.push("/");
        }}
        className="mx-auto max-w-2xl space-y-6 p-4 sm:p-6"
      >
        <input type="hidden" name="rowId" value={rowId} />
        {module && <input type="hidden" name="moduleId" value={module.id} />}
        <input type="hidden" name="circuit" value={finalCircuit} />

        <label className="block text-sm font-medium text-gray-900">
          Type de module
          <select
            name="type"
            value={type}
            onChange={(e) => handleTypeChange(e.target.value as ModuleType)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          >
            {MODULE_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </label>

        {usesCircuitDetails && (
          <>
            <TagPicker
              legend="Type de circuit"
              suggestions={CIRCUIT_SUGGESTIONS.map((c) => c.label)}
              selected={circuitTags}
              onChange={setCircuitTags}
            />

            <TagPicker
              legend="Pièce(s) / lieu(x)"
              suggestions={ROOMS}
              selected={roomTags}
              onChange={setRoomTags}
            />
          </>
        )}

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <label className="block text-sm font-medium text-gray-900">
            Calibre (A)
            <select
              name="amperage"
              value={amperage}
              onChange={(e) => setAmperage(e.target.value ? Number(e.target.value) : "")}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="">—</option>
              {AMPERAGES.map((a) => (
                <option key={a} value={a}>
                  {a} A
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm font-medium text-gray-900">
            Pôles
            <select
              name="poles"
              value={poles}
              onChange={(e) => handlePolesChange(Number(e.target.value))}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            >
              {POLES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm font-medium text-gray-900">
            Largeur (pas)
            <select
              name="width"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            >
              {WIDTHS.map((w) => (
                <option key={w} value={w}>
                  {w}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div>
            {module && (
              <button
                type="button"
                onClick={async () => {
                  await deleteModuleAction(module.id);
                  router.push("/");
                }}
                className="text-sm text-red-600 hover:underline"
              >
                Supprimer le module
              </button>
            )}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {saving ? "Enregistrement…" : "Enregistrer"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
