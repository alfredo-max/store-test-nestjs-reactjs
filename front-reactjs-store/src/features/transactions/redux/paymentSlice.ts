import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from "../models/UserInfo";

interface CardInfo {
  cardNumber: string;
  expMonth: string;
  expYear: string;
  cvc: string;
  nameOnCard: string;
  idType: string;
  idNumber: string;
  installments: string;
  acceptedTerms: boolean;
  acceptedDataPolicy: boolean;
}

interface PaymentState{
    userInfo: UserInfo | null;
    cardInfo: CardInfo | null;
}

const initialState: PaymentState = {
  userInfo: null,
  cardInfo: null,
};

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setUserInfo: (state,action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    },
    setCardInfo: (state, action: PayloadAction<CardInfo>) => {
      state.cardInfo = action.payload;
    },
    resetPaymentData: () => initialState,
  },
});

export const { setUserInfo,setCardInfo,resetPaymentData } = paymentSlice.actions;

export default paymentSlice.reducer;
