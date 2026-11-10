import { useState, useEffect } from "react";
import { PageHeader, Btn, Card } from "@/app/components/ui/Shared";
import { C, cn } from "@/app/components/layout/common";
import { CheckCircle } from "lucide-react";
import { useSettings, useUpdateSettings } from "@/app/hooks/settings/useSettings";
import { toast } from "sonner";

export default function ParamsPage() {
  const { data: settings = {} } = useSettings();
  const updateSettingsMutation = useUpdateSettings();

  // General Settings inputs
  const [serviceName, setServiceName] = useState("Go Gorée");
  const [operator, setOperator] = useState("Société de Navigation de Gorée");
  const [route, setRoute] = useState("Dakar Port ↔ Île de Gorée");
  const [duration, setDuration] = useState("20 minutes");
  const [timezone, setTimezone] = useState("Africa/Dakar (UTC+0)");
  const [currency, setCurrency] = useState("Franc CFA (FCFA / XOF)");

  // Sync general settings from loaded data
  useEffect(() => {
    if (settings.serviceName) setServiceName(settings.serviceName);
    if (settings.operator) setOperator(settings.operator);
    if (settings.route) setRoute(settings.route);
    if (settings.duration) setDuration(settings.duration);
    if (settings.timezone) setTimezone(settings.timezone);
    if (settings.currency) setCurrency(settings.currency);
  }, [settings]);

  const handleSaveSettings = async () => {
    try {
      await updateSettingsMutation.mutateAsync({
        serviceName,
        operator,
        route,
        duration,
        timezone,
        currency
      });
      toast.success("Paramètres généraux sauvegardés avec succès.");
    } catch (err) {
      toast.error("Erreur de sauvegarde des paramètres.");
    }
  };

  return (
  return <div className='p-6'>Param�tres</div>;
}
