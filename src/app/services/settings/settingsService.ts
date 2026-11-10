import { laravelClient } from "../../api/laravelClient";

export async function getSettings(): Promise<Record<string, any>> {
  const response = await laravelClient.get("/v1/settings");
  return response.data || {};
}

export async function updateSettings(payload: Record<string, any>): Promise<Record<string, any>> {
  const response = await laravelClient.put("/v1/settings", payload);
  return response.data || {};
}

export async function listActivityLogs(): Promise<any> {
  const response = await laravelClient.get("/v1/logs");
  return response.data || { data: [] };
}

