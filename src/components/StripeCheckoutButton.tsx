import React, { useState } from "react";
import { IonButton } from "@ionic/react";
import { Stripe } from "@capacitor-community/stripe";

const StripeCheckoutButton: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        "http://192.168.1.56:3000/create-payment-intent",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: 1000, currency: "usd" }),
        }
      );

      const data = await response.json();
      console.log("PaymentIntent client secret:", data.clientSecret);

      await Stripe.createPaymentSheet({
        paymentIntentClientSecret: data.clientSecret,
        merchantDisplayName: "Inclusive Innovation Incubator",
      });

      const { paymentResult } = await Stripe.presentPaymentSheet();
      console.log(paymentResult);
      // } else {
      //   // gets a credit card to use for a payment
      //   await Stripe.createPaymentFlow({
      //     paymentIntentClientSecret: data.clientSecret,
      //     merchantDisplayName: "Inclusive Innovation Incubator",
      //   });

      //   const { cardNumber } = await Stripe.presentPaymentFlow();
      //   console.log(cardNumber);
      //   console.log("Payment succeeded:", cardNumber);

      //   const { paymentResult } = await Stripe.confirmPaymentFlow();
      //   console.log("Payment succeeded:", paymentResult);
      // }
    } catch (error) {
      console.error("Payment failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonButton onClick={handleCheckout} disabled={loading}>
      {loading ? "Loading..." : "Checkout - Payment Sheet"}
    </IonButton>
  );
};

export default StripeCheckoutButton;
