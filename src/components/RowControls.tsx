"use client";

import { deleteRowAction, moveRowAction } from "@/app/actions";

export default function RowControls({ rowId }: { rowId: number }) {
  return (
    <div className="flex items-center gap-2 text-xs text-gray-400">
      <button
        type="button"
        onClick={() => moveRowAction(rowId, "up")}
        className="hover:text-gray-700"
        aria-label="Monter la rangée"
      >
        ↑
      </button>
      <button
        type="button"
        onClick={() => moveRowAction(rowId, "down")}
        className="hover:text-gray-700"
        aria-label="Descendre la rangée"
      >
        ↓
      </button>
      <button
        type="button"
        onClick={() => {
          if (confirm("Supprimer cette rangée et tous ses modules ?")) {
            deleteRowAction(rowId);
          }
        }}
        className="hover:text-red-600"
        aria-label="Supprimer la rangée"
      >
        Supprimer
      </button>
    </div>
  );
}
