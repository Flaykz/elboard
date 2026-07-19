export type ModuleType = "general" | "differentiel" | "disjoncteur" | "autre";

export const MODULE_TYPES: { value: ModuleType; label: string; color: string; swatch: string }[] = [
  { value: "general", label: "Disjoncteur général / de branchement", color: "border-red-500", swatch: "bg-red-500" },
  { value: "differentiel", label: "Interrupteur différentiel", color: "border-amber-500", swatch: "bg-amber-500" },
  { value: "disjoncteur", label: "Disjoncteur divisionnaire", color: "border-blue-500", swatch: "bg-blue-500" },
  { value: "autre", label: "Autre (parafoudre, contacteur...)", color: "border-gray-400", swatch: "bg-gray-400" },
];

export const AMPERAGES = [2, 10, 16, 20, 25, 32, 40, 45, 50, 63, 80, 100];

export const WIDTHS = [1, 2, 3, 4];

export const POLES = [1, 2, 3, 4];

export function defaultPolesForType(type: string): number {
  return type === "general" || type === "differentiel" ? 2 : 1;
}

export type CircuitSuggestion = { label: string; amperage: number };

export const CIRCUIT_SUGGESTIONS: CircuitSuggestion[] = [
  { label: "Éclairage", amperage: 16 },
  { label: "Prises de courant", amperage: 20 },
  { label: "Prises cuisine (spécialisées)", amperage: 20 },
  { label: "Four", amperage: 32 },
  { label: "Plaque de cuisson / induction", amperage: 32 },
  { label: "Lave-linge", amperage: 20 },
  { label: "Lave-vaisselle", amperage: 20 },
  { label: "Sèche-linge", amperage: 20 },
  { label: "Chauffe-eau (cumulus)", amperage: 25 },
  { label: "VMC", amperage: 2 },
  { label: "Volets roulants", amperage: 16 },
  { label: "Chauffage électrique", amperage: 20 },
  { label: "Portail / Motorisation", amperage: 16 },
  { label: "Pompe piscine", amperage: 20 },
  { label: "Climatisation", amperage: 20 },
  { label: "Recharge véhicule électrique (borne)", amperage: 32 },
];

export const ROOMS: string[] = [
  "Salon",
  "Séjour",
  "Cuisine",
  "Chambre 1",
  "Chambre 2",
  "Chambre 3",
  "Chambre parents",
  "Salle de bain",
  "WC",
  "Entrée",
  "Buanderie",
  "Garage",
  "Extérieur",
  "Bureau",
  "Cave / sous-sol",
];

export function moduleTypeMeta(type: string) {
  return MODULE_TYPES.find((t) => t.value === type) ?? MODULE_TYPES[3];
}

export function splitCircuitLabel(circuit: string | undefined) {
  const parts = (circuit ?? "")
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);
  const types = parts.filter((p) => CIRCUIT_SUGGESTIONS.some((c) => c.label === p));
  const rooms = parts.filter((p) => ROOMS.includes(p));
  const free = parts.filter(
    (p) => !CIRCUIT_SUGGESTIONS.some((c) => c.label === p) && !ROOMS.includes(p)
  );
  return { types, rooms, free };
}
