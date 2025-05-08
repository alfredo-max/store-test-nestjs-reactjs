import { PresignedToken } from "./PresignedToken";

export interface AcceptanceTokens {
  presigned_acceptance: PresignedToken;
  presigned_personal_data_auth: PresignedToken;
}