import Link from "next/link";
import type { Row } from "@/lib/switchboard";
import ModuleCard from "./ModuleCard";
import RowControls from "./RowControls";

export default function RowSection({ row, index }: { row: Row; index: number }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-gray-600">
          Rangée {index + 1}
          {row.label ? ` — ${row.label}` : ""}
        </span>
        <RowControls rowId={row.id} />
      </div>
      <div className="flex flex-wrap gap-2 items-stretch">
        {row.modules.map((module) => (
          <ModuleCard key={module.id} module={module} />
        ))}
        <Link
          href={`/module/new?rowId=${row.id}`}
          className="w-16 min-h-[3.5rem] shrink-0 rounded-md border-2 border-dashed border-gray-300 flex items-center justify-center text-2xl text-gray-400 hover:border-blue-400 hover:text-blue-500 transition-colors"
        >
          +
        </Link>
      </div>
    </div>
  );
}
