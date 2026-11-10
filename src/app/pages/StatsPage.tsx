import { PageHeader, Btn, Card, ChartCard, Table, Loader, EmptyState } from "@/app/components/ui/Shared";
import { C, StatusBadge } from "@/app/components/layout/common";
import { Ticket, Banknote, Activity, Star, Download } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, LineChart, Line, PieChart as RPieChart, Pie, Cell, Legend, Bar } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { getDashboardMetrics } from "@/app/services/analytics/analyticsService";

/** Valeur affichée tant que l'API n'a rien fourni — jamais un chiffre inventé. */
const ND = "—";

export default function StatsPage({ sub }: { sub: string }) {
  const { data: metrics, isLoading, isError } = useQuery({
    queryKey: ["dashboard", "analytics"],
    queryFn: getDashboardMetrics,
    staleTime: 60000,
  });

  // Aucun repli sur des données de démonstration : séries vides et KPI à « — »
  // tant que l'API n'a pas répondu.
  const monthlyData = metrics?.monthly_data ?? [];
  const pieData = metrics?.visitor_categories ?? [];
  const paiementData = metrics?.payment_methods ?? [];
  const hourlyData = metrics?.hourly_boardings ?? [];
  const chaloupesData = metrics?.chaloupes_occupations ?? [];
  const validation = metrics?.validation_qr ?? null;
  const controleurs = validation?.par_controleur ?? [];

  const feedback = <Loader isLoading={isLoading} isError={isError} />;

  if (sub === "billets" || sub === "recettes") {
  return <div className='p-6'>{feedback}</div>;
}
