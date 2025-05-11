import { formPaymentSlice} from '../formPaymentSlice';
import { UserInfo } from "../../../../models/UserInfo";
import { CardFormData } from "../../../../models/CardFormData";

describe('formPaymentSlice', () => {
  const { reducer, actions } = formPaymentSlice;
  const { setUserInfo, setCardInfo, resetPaymentData } = actions;

  describe('setUserInfo', () => {
    it('should set user info correctly', () => {
      const userInfo: UserInfo = {
        name: 'Test User',
        email: 'test@example.com',
        phone: '1234567890'
      };

      const state = { userInfo: null, cardInfo: null };
      const newState = reducer(state, setUserInfo(userInfo));

      expect(newState.userInfo).toEqual(userInfo);
      expect(newState.cardInfo).toBeNull();
    });
  });

  describe('setCardInfo', () => {
    it('should set card info correctly', () => {
      const cardInfo: CardFormData = {
        cardNumber: '4111111111111111',
        expMonth: '12',
        expYear: '2025',
        cvc: '123',
        nameOnCard: 'Test User',
        idType: 'DNI',
        idNumber: '12345678',
        installments: '1',
        acceptedTerms: true,
        acceptedDataPolicy: true
      };

      const state = { userInfo: null, cardInfo: null };
      const newState = reducer(state, setCardInfo(cardInfo));

      expect(newState.cardInfo).toEqual(cardInfo);
      expect(newState.userInfo).toBeNull();
    });
  });

  describe('resetPaymentData', () => {
    it('should reset the state to initial values', () => {
      const state = {
        userInfo: { name: 'Test', email: 'test@example.com', phone: '1234567890' },
        cardInfo: { cardNumber: '4111111111111111', expMonth: '12', expYear: '2025', cvc: '123', nameOnCard: 'Test User', idType: 'DNI', idNumber: '12345678', installments: '1', acceptedTerms: true, acceptedDataPolicy: true }
      };

      const newState = reducer(state, resetPaymentData());

      expect(newState).toEqual({
        userInfo: null,
        cardInfo: null
      });
    });
  });
});
