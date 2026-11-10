import { laravelClient } from "../../api/laravelClient";
import type { NotificationItem } from "../../types/notifications";

function mapNotification(backendItem: any): NotificationItem {
  return {
    id: backendItem.id,
    canal: backendItem.canal || "IN_APP",
    type: backendItem.type || "—",
    lu: Boolean(backendItem.lu_a),
    date: backendItem.created_at
      ? new Date(backendItem.created_at).toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "—",
  };
}

