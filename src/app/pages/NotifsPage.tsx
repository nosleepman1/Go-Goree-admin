import { useState } from "react";
import { PageHeader, Btn, Card, Table , Loader } from "@/app/components/ui/Shared";
import { C, Badge } from "@/app/components/layout/common";
import { Smartphone, Mail, Bell, MessageSquare, Send, BellRing, Download } from "lucide-react";
import { useNotifications, useBroadcastNotification } from "@/app/hooks/notifications/useNotifications";
import { toast } from "sonner";

export default function NotifsPage({ sub }: { sub: string }) {
  const { data: notifications = [], isLoading, isError } = useNotifications();
  const broadcastMutation = useBroadcastNotification();

  const [message, setMessage] = useState("");
  const [canal, setCanal] = useState("IN_APP"); // Default to IN_APP (in app + real-time reverb)
  const [titre, setTitre] = useState("");
  const [destinataires, setDestinataires] = useState("Tous les passagers");

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

  const handleBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titre.trim()) {
      toast.error("Veuillez saisir un titre.");
      return;
    }
    if (!message.trim()) {
      toast.error("Veuillez saisir un message.");
      return;
    }

    try {
      const res = await broadcastMutation.mutateAsync({
        titre: titre.trim(),
        message: message.trim(),
        canal,
        destinataires,
      });
      const nb = res?.destinataires_contactes;
      toast.success(
        typeof nb === "number"
          ? `Notification diffusée à ${nb} destinataire${nb > 1 ? "s" : ""}.`
          : "Campagne de notification diffusée avec succès !"
      );
      setMessage("");
      setTitre("");
    } catch (err) {
      toast.error("Impossible de diffuser la notification.");
    }
  };

  const handleUseTemplate = (title: string, msg: string) => {
    setTitre(title);
    setMessage(msg);
  return <div className='p-6'>{feedback}</div>;
}
