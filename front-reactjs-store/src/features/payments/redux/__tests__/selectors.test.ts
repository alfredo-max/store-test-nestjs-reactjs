import { describe, expect, it } from "vitest";
import { RootState } from "../../../../app/store";
import { PaymentStatusEnum } from "../../enums/PaymentStatusEnum";
import { selectAcceptanceTokens, selectCard, selectCardToken, selectError, selectIsLoading, selectPaymentError, selectPaymentStatus, selectTransactionId, selectUser } from "../selectors";

describe('Selectors', () => {
  const mockState: RootState = {
  products: {
    products: [],
    loading: false,
    error: null,
  },
  selectedProductPayment: {
    selectedProduct: null,
  },
  payment: {
    acceptanceTokens: {
      presigned_acceptance: {
        acceptance_token: 'token123',
        permalink: 'https://link.com/terms',
        type: 'terms',
      },
      presigned_personal_data_auth: {
        acceptance_token: 'token456',
        permalink: 'https://link.com/data',
        type: 'data',
      },
    },
    cardToken: 'card_tok_456',
    transactionId: 'tx_789',
    paymentStatus: PaymentStatusEnum.APPROVED,
    error: 'Some error',
    isLoading: true,
  },
  formPayment: {
    userInfo: {
        name: 'Alfredo',
        email: 'alfredo@example.com',
        phone: "75765675"
    },
    cardInfo: {
      cardNumber: '4111111111111111',
      expMonth: '12',
      expYear: '2025',
      cvc: '123',
      nameOnCard: 'Alfredo Almarales',
      idType: 'CC',
      idNumber: '1234567890',
      installments: '1',
      acceptedTerms: true,
      acceptedDataPolicy: true,
    },
  },
};

  it('selectAcceptanceTokens', () => {
    expect(selectAcceptanceTokens(mockState)).toEqual(mockState.payment.acceptanceTokens);
  });

  it('selectCardToken', () => {
    expect(selectCardToken(mockState)).toBe('card_tok_456');
  });

  it('selectTransactionId', () => {
    expect(selectTransactionId(mockState)).toBe('tx_789');
  });

  it('selectPaymentStatus', () => {
    expect(selectPaymentStatus(mockState)).toBe(PaymentStatusEnum.APPROVED);
  });

  it('selectPaymentError', () => {
    expect(selectPaymentError(mockState)).toBe('Some error');
  });

  it('selectIsLoading', () => {
    expect(selectIsLoading(mockState)).toBe(true);
  });

  it('selectError (duplicado)', () => {
    expect(selectError(mockState)).toBe('Some error');
  });

  it('selectUser', () => {
    expect(selectUser(mockState)).toEqual(mockState.formPayment.userInfo);
  });

  it('selectCard', () => {
    expect(selectCard(mockState)).toEqual(mockState.formPayment.cardInfo);
  });
});