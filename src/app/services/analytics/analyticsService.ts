import { laravelClient } from "../../api/laravelClient";

export async function getDashboardMetrics(): Promise<any> {
  const response = await laravelClient.get("/v1/analytics/dashboard");
  return response.data;
}

