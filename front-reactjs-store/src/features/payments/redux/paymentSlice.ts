import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface UserInfo {
    name: string;
    email: string;
    phone: string;
}

interface PaymentState{
    userInfo: UserInfo;
}
/*interface PaymentState {
  name: string;
  email: string;
  phone: string;
  cardNumber: string;
  acceptedTerms: boolean;
}*/

const initialState: PaymentState = {
    userInfo: {
        name: "",
        email: "",
        phone: "",
    },
};

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setUserInfo: (state,action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    },
    resetPaymentData: () => initialState,
  },
});

export const { setUserInfo, resetPaymentData } = paymentSlice.actions;

export default paymentSlice.reducer;
