import ModuleEditor from "@/components/ModuleEditor";

export default async function NewModulePage({
  searchParams,
}: {
  searchParams: Promise<{ rowId?: string }>;
}) {
  const { rowId } = await searchParams;
  return <ModuleEditor rowId={Number(rowId)} />;
}
