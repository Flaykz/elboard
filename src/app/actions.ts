"use server";

import { revalidatePath } from "next/cache";
import * as sb from "@/lib/switchboard";

function parseAmperage(value: FormDataEntryValue | null): number | null {
  if (!value) return null;
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : null;
}

export async function addRowAction(formData: FormData) {
  const label = String(formData.get("label") ?? "").trim();
  sb.addRow(label);
  revalidatePath("/");
}

export async function deleteRowAction(rowId: number) {
  sb.deleteRow(rowId);
  revalidatePath("/");
}

export async function moveRowAction(rowId: number, direction: "up" | "down") {
  sb.moveRow(rowId, direction);
  revalidatePath("/");
}

export async function saveModuleAction(formData: FormData) {
  const moduleId = formData.get("moduleId");
  const rowId = Number(formData.get("rowId"));
  const input: sb.ModuleInput = {
    type: String(formData.get("type") ?? "disjoncteur"),
    label: String(formData.get("label") ?? "").trim(),
    amperage: parseAmperage(formData.get("amperage")),
    circuit: String(formData.get("circuit") ?? "").trim(),
    width: Number(formData.get("width") ?? 1) || 1,
    poles: Number(formData.get("poles") ?? 1) || 1,
  };

  if (moduleId) {
    sb.updateModule(Number(moduleId), input);
  } else {
    sb.addModule(rowId, input);
  }
  revalidatePath("/");
}

export async function deleteModuleAction(moduleId: number) {
  sb.deleteModule(moduleId);
  revalidatePath("/");
}

export async function moveModuleAction(moduleId: number, direction: "left" | "right") {
  sb.moveModule(moduleId, direction);
  revalidatePath("/");
}
