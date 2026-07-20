import { notFound } from "next/navigation";
import ModuleEditor from "@/components/ModuleEditor";
import { getModule } from "@/lib/switchboard";

export const dynamic = "force-dynamic";

export default async function EditModulePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const boardModule = getModule(Number(id));
  if (!boardModule) notFound();
  return <ModuleEditor rowId={boardModule.row_id} module={boardModule} />;
}
