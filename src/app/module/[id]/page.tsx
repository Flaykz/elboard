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
  const module = getModule(Number(id));
  if (!module) notFound();
  return <ModuleEditor rowId={module.row_id} module={module} />;
}
