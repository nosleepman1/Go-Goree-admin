import { laravelClient } from "../../api/laravelClient";
import type { WalletInfo } from "../../types/wallet";

export async function getWalletInfo(): Promise<WalletInfo> {
  const response = await laravelClient.get("/v1/analytics/dashboard");
  const metrics = response.data ?? {};
  // Clés réelles du backend : wallet_overview.{soldeGlobal, walletsActifs, rechargementsMois}
  // (fallback overview.solde_global_wallet). L'ancienne clé `revenus_totaux` n'existe pas.
  const wallet = metrics.wallet_overview ?? {};
  const soldeGlobal = Number(wallet.soldeGlobal ?? metrics.overview?.solde_global_wallet ?? 0);
  return {
    soldeGlobal: `${soldeGlobal.toLocaleString("fr-FR")} FCFA`,
    walletsActifs: Number(wallet.walletsActifs ?? 0),
    rechargementsMois: Number(wallet.rechargementsMois ?? 0),
  };
}

