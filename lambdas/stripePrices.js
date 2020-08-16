const Stripe = require("stripe");
const { STRIPE_SECRET_KEY } = process.env;
const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2020-03-02",
});

exports.handler = async () => {
  return stripe.products
    .list()
    .then(products => stripe.prices.list().then(prices => ({
      statusCode: 200,
      body: JSON.stringify(
        products.map(p => ({
          id: p.id,
          name: p.name,
          description: p.description,
          priceId: prices.find(s => s.product === p.id).id,
          price: prices.find(s => s.product === p.id).unit_amount/100,
        }))
      ),
    })))
    .catch(e => ({
      statusCode: 500,
      body: e.message,
    }));
};
