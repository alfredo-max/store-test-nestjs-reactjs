import { PresignedToken } from "./presigned-token.model";

export class AcceptanceTokens {
    constructor(
      public readonly presigned_acceptance: PresignedToken,
      public readonly presigned_personal_data_auth: PresignedToken,
    ) {}
  }
  