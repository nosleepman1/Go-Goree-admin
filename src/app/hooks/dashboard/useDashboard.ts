import { useQuery } from "@tanstack/react-query";
import { listVoyagesDuJour } from "../../services/voyages/voyagesService";
import { listPaiements } from "../../services/paiements/paiementsService";
import { getDashboardMetrics } from "../../services/analytics/analyticsService";

export interface DashboardData {
  ticketData: any;
  monthlyData: any;
  pieData: any;
  voyages: any;
  transactions: any;
  overview?: any;
}

