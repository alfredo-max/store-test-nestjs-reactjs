export class PresignedToken {
  constructor(
    public readonly acceptance_token: string,
    public readonly permalink: string,
    public readonly type: string,
  ) {}
}