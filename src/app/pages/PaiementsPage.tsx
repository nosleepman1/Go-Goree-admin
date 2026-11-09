import { PageHeader, Btn, Card, Table, SearchBar , Loader } from "@/app/components/ui/Shared";
import { C, StatusBadge } from "@/app/components/layout/common";
import { Download, Filter, Eye } from "lucide-react";
import { usePaiements } from "@/app/hooks/paiements/usePaiements";

export default function PaiementsPage({ sub }: { sub: string }) {
  const { data: transactions = [], isLoading, isError } = usePaiements();

  // Répartition par méthode calculée depuis les transactions réelles (mode = enum backend).
  const MODE_META: Record<string, { label: string; color: string }> = {
    WAVE: { label: "Wave", color: "#1E3A8A" },
    ORANGE_MONEY: { label: "Orange Money", color: "#EA580C" },
    YAS: { label: "Yas", color: C.teal },
    CARTE_BANCAIRE: { label: "Carte", color: C.ocean },
    PORTEFEUILLE: { label: "Wallet", color: "#10B981" },
    PAYDUNYA: { label: "PayDunya", color: "#7C3AED" },
  };

  const paiementData = (() => {
    const counts: Record<string, number> = {};
    transactions.forEach((t: any) => {
      const m = t.mode || "—";
      counts[m] = (counts[m] || 0) + 1;
    });
    const total = transactions.length || 1;
    return Object.entries(counts)
      .map(([mode, n]) => ({
        name: MODE_META[mode]?.label ?? mode,
        value: Math.round((n / total) * 100),
        color: MODE_META[mode]?.color ?? C.ocean,
      }))
      .sort((a, b) => b.value - a.value);
  })();

  const feedback = (
    <div className="space-y-2 mb-4">
      {isError && (
        <div className="rounded-lg border border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/30 px-4 py-2.5 text-sm text-amber-700 dark:text-amber-400">
          Données indisponibles — affichage des dernières données connues.
        </div>
      )}
      {isLoading && (
        <div className="h-1 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
          <div className="h-full w-1/3 animate-pulse rounded-full bg-slate-400" />
        </div>
      )}
    </div>
  );
  return <div className='p-6'>{feedback}</div>;
}
