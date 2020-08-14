const Stripe = require("stripe");
const { STRIPE_SECRET_KEY } = process.env;
const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2020-03-02",
});

exports.handler = async event => {
  const { email } = event.body;

  return stripe.customers
    .list()
    .then(customers => {
      const { data } = customers;
      const c = data.find(c => c.email === email);
      if (c) {
        return c;
      }
      const params = { email };
      return stripe.customers.create(params);
    })
    .then(customer =>
      stripe.billingPortal.sessions.create({
        customer: customer.id,
        return_url: "https://davidvargas.me",
      })
    )
    .then(session => ({
      statusCode: 302,
      location: session.url,
    }))
    .catch(e => ({
      statusCode: 500,
      body: e.message,
    }));
};
