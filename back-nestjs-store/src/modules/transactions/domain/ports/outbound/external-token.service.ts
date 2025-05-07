import { AcceptanceTokens } from "../../model/acceptance-tokens";

export interface ExternalTokenService {
  getAcceptanceTokens(): Promise<AcceptanceTokens>;
}