import { getBoard } from "@/lib/switchboard";
import RowSection from "@/components/RowSection";
import AddRowForm from "@/components/AddRowForm";
import { MODULE_TYPES } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default function Home() {
  const rows = getBoard();

  return (
    <div className="min-h-screen bg-zinc-50 py-6 px-3 sm:px-6">
      <main className="mx-auto max-w-screen-2xl space-y-6">
        <header>
          <h1 className="text-2xl font-bold text-gray-900">⚡ Elboard</h1>
          <p className="text-sm text-gray-500">
            Inventaire de votre tableau électrique
          </p>
        </header>

        <div className="flex flex-wrap gap-3 text-xs">
          {MODULE_TYPES.map((t) => (
            <span key={t.value} className="flex items-center gap-1.5">
              <span className={`inline-block w-3 h-3 rounded-sm border-2 ${t.color} bg-white`} />
              {t.label}
            </span>
          ))}
        </div>

        <section className="space-y-3">
          {rows.length === 0 && (
            <p className="text-sm text-gray-500 italic">
              Aucune rangée pour l&apos;instant. Ajoutez votre première rangée ci-dessous.
            </p>
          )}
          {rows.map((row, index) => (
            <RowSection key={row.id} row={row} index={index} />
          ))}
        </section>

        <AddRowForm />
      </main>
    </div>
  );
}
