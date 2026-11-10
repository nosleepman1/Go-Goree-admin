import { useState } from "react";
import { PageHeader, Btn, Card, Table , Loader } from "@/app/components/ui/Shared";
import { FileText, Download, Plus } from "lucide-react";
import { useRapports, useGenerateRapport } from "@/app/hooks/rapports/useRapports";
import { laravelClient } from "@/app/api/laravelClient";
import { toast } from "sonner";

export default function RapportsPage({ sub }: { sub: string }) {
  const { data: rapportsData = {}, isLoading, isError } = useRapports();
  const generateMutation = useGenerateRapport();

  const rapports = rapportsData?.data || [];

  // Form states
  const [type, setType] = useState("Synthèse mensuelle");
  const [mois, setMois] = useState("Juillet 2026");
  const [format, setFormat] = useState("PDF");

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

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Pick the most adequate format: PDF for summaries/synthese, Excel/CSV for logs/financials
      const selectedFormat = type.toLowerCase().includes("financier") || type.toLowerCase().includes("passagers") ? "xlsx" : "pdf";
      
      await generateMutation.mutateAsync({
        type,
        mois,
        format: selectedFormat,
      });
      toast.success("Rapport généré avec succès.");
    } catch (err) {
      toast.error("Erreur lors de la génération du rapport.");
    }
  };

  const handleDownload = async (id: string, filename: string) => {
  return <div className='p-6'>{feedback}</div>;
}
