import { Card } from "../models/Card";
import { CardFormData } from "../models/CardFormData";
import { UserInfo } from "../models/UserInfo";
import { tokenizeCardService } from "./paymentService";

export const tokenizeAndPay = async (cardInfoCard: CardFormData, userData: UserInfo) => {
    const card: Card = {
        cvc: cardInfoCard.cvc,
        exp_month: cardInfoCard.expMonth,
        exp_year: cardInfoCard.expYear,
        number: cardInfoCard.cardNumber,
        card_holder: userData.name
    };
    const tokenResponse = await tokenizeCardService(card);
    const token = tokenResponse.data.id;

    /*const paymentResponse = await createTransaction({
      token,
      ...userData,
    });*/

    return token;
};