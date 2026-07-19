"use client";

import { useRef, useState } from "react";
import { addRowAction } from "@/app/actions";

export default function AddRowForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        setPending(true);
        setError(null);
        try {
          await addRowAction(formData);
          formRef.current?.reset();
        } catch {
          setError("Échec de l'ajout de la rangée. Réessayez.");
        } finally {
          setPending(false);
        }
      }}
      className="flex flex-col gap-2"
    >
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          name="label"
          type="text"
          placeholder="Nom de la rangée (optionnel, ex: Rangée du bas)"
          className="min-w-0 flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60 disabled:cursor-wait whitespace-nowrap"
        >
          {pending ? "Ajout…" : "+ Ajouter une rangée"}
        </button>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </form>
  );
}
