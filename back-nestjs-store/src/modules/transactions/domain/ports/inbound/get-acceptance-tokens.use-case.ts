import { AcceptanceTokens } from "../../model/acceptance-tokens";

export interface GetAcceptanceTokensUseCase {
  execute(): Promise<AcceptanceTokens>;
}