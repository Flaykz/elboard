import db from "./db";

export type Module = {
  id: number;
  row_id: number;
  position: number;
  type: string;
  label: string;
  amperage: number | null;
  circuit: string;
  width: number;
  poles: number;
};

export type Row = {
  id: number;
  position: number;
  label: string;
  modules: Module[];
};

export function getBoard(): Row[] {
  const rows = db
    .prepare(`SELECT * FROM rows ORDER BY position ASC`)
    .all() as Omit<Row, "modules">[];

  const modules = db
    .prepare(`SELECT * FROM modules ORDER BY position ASC`)
    .all() as Module[];

  return rows.map((row) => ({
    ...row,
    modules: modules.filter((m) => m.row_id === row.id),
  }));
}

export function addRow(label: string) {
  const { count } = db
    .prepare(`SELECT COUNT(*) as count FROM rows`)
    .get() as { count: number };
  db.prepare(`INSERT INTO rows (position, label) VALUES (?, ?)`).run(count, label);
}

export function deleteRow(rowId: number) {
  db.prepare(`DELETE FROM rows WHERE id = ?`).run(rowId);
}

export function moveRow(rowId: number, direction: "up" | "down") {
  const rows = db.prepare(`SELECT id, position FROM rows ORDER BY position ASC`).all() as {
    id: number;
    position: number;
  }[];
  const idx = rows.findIndex((r) => r.id === rowId);
  const swapIdx = direction === "up" ? idx - 1 : idx + 1;
  if (idx === -1 || swapIdx < 0 || swapIdx >= rows.length) return;

  const a = rows[idx];
  const b = rows[swapIdx];
  const update = db.prepare(`UPDATE rows SET position = ? WHERE id = ?`);
  const tx = db.transaction(() => {
    update.run(b.position, a.id);
    update.run(a.position, b.id);
  });
  tx();
}

export type ModuleInput = {
  type: string;
  label: string;
  amperage: number | null;
  circuit: string;
  width: number;
  poles: number;
};

export function addModule(rowId: number, input: ModuleInput) {
  const { count } = db
    .prepare(`SELECT COUNT(*) as count FROM modules WHERE row_id = ?`)
    .get(rowId) as { count: number };
  db.prepare(
    `INSERT INTO modules (row_id, position, type, label, amperage, circuit, width, poles)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    rowId,
    count,
    input.type,
    input.label,
    input.amperage,
    input.circuit,
    input.width,
    input.poles
  );
}

export function updateModule(moduleId: number, input: ModuleInput) {
  db.prepare(
    `UPDATE modules SET type = ?, label = ?, amperage = ?, circuit = ?, width = ?, poles = ? WHERE id = ?`
  ).run(
    input.type,
    input.label,
    input.amperage,
    input.circuit,
    input.width,
    input.poles,
    moduleId
  );
}

export function getModule(moduleId: number): Module | undefined {
  return db.prepare(`SELECT * FROM modules WHERE id = ?`).get(moduleId) as Module | undefined;
}

export function deleteModule(moduleId: number) {
  db.prepare(`DELETE FROM modules WHERE id = ?`).run(moduleId);
}

export function moveModule(moduleId: number, direction: "left" | "right") {
  const boardModule = db.prepare(`SELECT * FROM modules WHERE id = ?`).get(moduleId) as Module;
  if (!boardModule) return;

  const siblings = db
    .prepare(`SELECT id, position FROM modules WHERE row_id = ? ORDER BY position ASC`)
    .all(boardModule.row_id) as { id: number; position: number }[];

  const idx = siblings.findIndex((m) => m.id === moduleId);
  const swapIdx = direction === "left" ? idx - 1 : idx + 1;
  if (idx === -1 || swapIdx < 0 || swapIdx >= siblings.length) return;

  const a = siblings[idx];
  const b = siblings[swapIdx];
  const update = db.prepare(`UPDATE modules SET position = ? WHERE id = ?`);
  const tx = db.transaction(() => {
    update.run(b.position, a.id);
    update.run(a.position, b.id);
  });
  tx();
}
