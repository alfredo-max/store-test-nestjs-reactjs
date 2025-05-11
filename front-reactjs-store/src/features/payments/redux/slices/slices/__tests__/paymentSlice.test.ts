import paymentReducer from '../paymentSlice';
import { resetPaymentState, setStatusState } from '../paymentSlice';
import { PaymentStatusEnum } from '../../../../enums/PaymentStatusEnum';
import { AcceptanceTokens } from '../../../../models/AcceptanceTokens';
import { fetchAcceptanceTokens } from '../../../thunks/acceptanceThunks';
import { tokenizeCard } from '../../../thunks/tokenizationThunks';
import { makePayment } from '../../../thunks/transactionThunks';
import { pollPaymentStatus } from '../../../thunks/pollingThunks';

type PaymentState = {
  acceptanceTokens: AcceptanceTokens | null;
  cardToken: string | null;
  transactionId: string | null;
  paymentStatus: PaymentStatusEnum | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: PaymentState = {
  acceptanceTokens: null,
  cardToken: null,
  transactionId: null,
  paymentStatus: PaymentStatusEnum.NO_STATUS,
  isLoading: false,
  error: null,
};

describe('paymentSlice', () => {
  const reducer = paymentReducer;

  describe('reducers', () => {
    describe('resetPaymentState', () => {
      it('should reset all payment state values', () => {
        const initialState: PaymentState = {
          acceptanceTokens: null,
          cardToken: null,
          transactionId: null,
          paymentStatus: PaymentStatusEnum.PENDING,
          isLoading: true,
          error: null
        };

        const newState = reducer(initialState, resetPaymentState());

        expect(newState).toEqual({
          acceptanceTokens: null,
          cardToken: null,
          transactionId: null,
          paymentStatus: PaymentStatusEnum.NO_STATUS,
          isLoading: false,
          error: null
        });
      });
    });

    describe('setStatusState', () => {
      it('should update payment status', () => {
        const initialState: PaymentState = {
          acceptanceTokens: null,
          cardToken: null,
          transactionId: null,
          paymentStatus: PaymentStatusEnum.NO_STATUS,
          isLoading: false,
          error: null
        };

        const newState = reducer(initialState, setStatusState(PaymentStatusEnum.APPROVED));

        expect(newState.paymentStatus).toBe(PaymentStatusEnum.APPROVED);
        expect(newState.isLoading).toBe(false);
        expect(newState.error).toBe(null);
      });
    });
  });

  describe('extraReducers', () => {
    describe('fetchAcceptanceTokens', () => {
      it('should handle pending state', () => {
        const initialState: PaymentState = {
          acceptanceTokens: null,
          error: 'previous error',
          cardToken: null,
          transactionId: null,
          paymentStatus: PaymentStatusEnum.NO_STATUS,
          isLoading: false
        };

        const newState = reducer(initialState, {
          type: fetchAcceptanceTokens.pending.type
        });

        expect(newState.error).toBeNull();
      });

      it('should handle fulfilled state', () => {
        const initialState: PaymentState = {
          acceptanceTokens: null,
          cardToken: null,
          transactionId: null,
          paymentStatus: null,
          isLoading: false,
          error: null
        };
        const tokens = { token: 'test-token' };

        const newState = reducer(initialState, {
          type: fetchAcceptanceTokens.fulfilled.type,
          payload: tokens
        });

        expect(newState.acceptanceTokens).toEqual(tokens);
      });

      it('should handle rejected state', () => {
        const initialState: PaymentState = {
          paymentStatus: PaymentStatusEnum.NO_STATUS,
          isLoading: false,
          error: null,
          acceptanceTokens: null,
          cardToken: null,
          transactionId: null
        };
        const error = 'Test error';

        const newState = reducer(initialState, {
          type: fetchAcceptanceTokens.rejected.type,
          payload: error
        });

        expect(newState.paymentStatus).toBe(PaymentStatusEnum.ERROR);
        expect(newState.error).toBe(error);
        expect(newState.isLoading).toBe(false);
      });
    });

    // Test tokenizeCard
    describe('tokenizeCard', () => {
      describe('pending', () => {
        it('should set loading to true and clear error', () => {
          const newState = reducer(initialState, {
            type: tokenizeCard.pending.type
          });

          expect(newState.isLoading).toBe(true);
          expect(newState.error).toBe(null);
        });
      });

      describe('fulfilled', () => {
        it('should set cardToken and clear error', () => {
          const cardToken = 'test-card-token';
          const newState = reducer(initialState, {
            type: tokenizeCard.fulfilled.type,
            payload: cardToken
          });

          expect(newState.cardToken).toBe(cardToken);
          expect(newState.error).toBe(null);
        });
      });

      describe('rejected', () => {
        it('should set error and payment status to ERROR', () => {
          const error = 'Test error';
          const newState = reducer(initialState, {
            type: tokenizeCard.rejected.type,
            payload: error
          });

          expect(newState.paymentStatus).toBe(PaymentStatusEnum.ERROR);
          expect(newState.error).toBe(error);
          expect(newState.isLoading).toBe(false);
        });
      });
    });

    // Test makePayment
    describe('makePayment', () => {
      describe('pending', () => {
        it('should clear error', () => {
          const newState = reducer(initialState, {
            type: makePayment.pending.type
          });

          expect(newState.error).toBe(null);
        });
      });

      describe('fulfilled', () => {
        it('should set transactionId and clear error', () => {
          const transactionId = 'test-transaction-id';
          const newState = reducer(initialState, {
            type: makePayment.fulfilled.type,
            payload: transactionId
          });

          expect(newState.transactionId).toBe(transactionId);
          expect(newState.error).toBe(null);
        });
      });

      describe('rejected', () => {
        it('should set error and payment status to ERROR', () => {
          const error = 'Test error';
          const newState = reducer(initialState, {
            type: makePayment.rejected.type,
            payload: error
          });

          expect(newState.paymentStatus).toBe(PaymentStatusEnum.ERROR);
          expect(newState.error).toBe(error);
          expect(newState.isLoading).toBe(false);
        });
      });
    });

    // Test pollPaymentStatus
    describe('pollPaymentStatus', () => {
      describe('pending', () => {
        it('should clear error', () => {
          const newState = reducer(initialState, {
            type: pollPaymentStatus.pending.type
          });

          expect(newState.error).toBe(null);
        });
      });

      describe('fulfilled', () => {
        it('should set paymentStatus and clear error', () => {
          const status = PaymentStatusEnum.PENDING;
          const newState = reducer(initialState, {
            type: pollPaymentStatus.fulfilled.type,
            payload: status
          });

          expect(newState.paymentStatus).toBe(status);
          expect(newState.error).toBe(null);
        });
      });

      describe('rejected', () => {
        it('should set error and payment status to ERROR', () => {
          const error = 'Test error';
          const newState = reducer(initialState, {
            type: pollPaymentStatus.rejected.type,
            payload: error
          });

          expect(newState.paymentStatus).toBe(PaymentStatusEnum.ERROR);
          expect(newState.error).toBe(error);
          expect(newState.isLoading).toBe(false);
        });
      });
    });
  });
});