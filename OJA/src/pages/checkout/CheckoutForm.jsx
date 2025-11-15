import React from "react";
import SectionTitle from "./SectionTitle";
import FormField from "./FormField";

function CheckoutForm() {
  return (
    <form>
      <SectionTitle title="Billing Information" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="First Name" name="firstName" />
        <FormField label="Last Name" name="lastName" />
        <FormField label="Email Address" name="email" type="email" />
        <FormField label="Phone Number" name="phone" />
      </div>

      <SectionTitle title="Shipping Address" className="mt-10" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Street Address" name="address" />
        <FormField label="City" name="city" />
        <FormField label="State/Province" name="state" />
        <FormField label="Postal Code" name="postalCode" />
      </div>

      <SectionTitle title="Payment Method" className="mt-10" />
      <div className="space-y-6">
        <FormField label="Cardholder Name" name="cardName" />
        <FormField label="Card Number" name="cardNumber" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Expiry Date" name="expiryDate" placeholder="MM/YY" />
          <FormField label="CVV" name="cvv" />
        </div>
      </div>

      <button
        type="submit"
        className="mt-10 w-full bg-primary text-white font-semibold py-4 rounded-xl hover:bg-primary/90 transition"
      >
        Place Order
      </button>
    </form>
  );
}

export default CheckoutForm;
