import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from "../../../models/UserInfo";

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

interface FormPaymentState{
    userInfo: UserInfo | null;
    cardInfo: CardInfo | null;
}

const initialState: FormPaymentState = {
  userInfo: null,
  cardInfo: null,
};

export const formPaymentSlice = createSlice({
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

export const { setUserInfo,setCardInfo,resetPaymentData } = formPaymentSlice.actions;

export default formPaymentSlice.reducer;
