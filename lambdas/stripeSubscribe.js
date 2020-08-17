const Stripe = require("stripe");
const { STRIPE_SECRET_KEY } = process.env;
const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2020-03-02",
});

exports.handler = async event => {
  const { customer, price, default_payment_method } = JSON.parse(event.body);

  return stripe.paymentMethods
    .attach(default_payment_method, { customer })
    .then(() =>
      stripe.subscriptions.create({
        customer,
        items: [{ price }],
        default_payment_method,
      })
    )
    .then(session => ({
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    }))
    .catch(e => ({
      statusCode: 500,
      body: e.message,
    }));
};
