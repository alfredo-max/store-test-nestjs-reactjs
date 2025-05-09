
export interface StatusTransactionUseCase {
    execute(id: string): Promise<string>;
  }