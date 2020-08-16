import React, { useState, useCallback } from "react";
import Layout from "../components/layout";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { colors } from "../utils/typography";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import NoSsr from "@material-ui/core/NoSsr";

const stripePromise = loadStripe(
  "pk_test_51HERaHFHEvC1s7vkxMfTOWuGCHWCyukcRbwF5WNOUgeWWkAUHj2btlzxGhO1NjEfW4VXGc22j0InqJHAWF2zhc7h004fnwZ3uE"
);

const SupportComponent = () => {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState("");

  const handleSubmit = useCallback(
    event => {
      setLoading(true);
      event.preventDefault();
      return stripe
        .createPaymentMethod({
          type: "card",
          card: elements.getElement(CardElement),
          billing_details: { email },
        })
        .then(() => setLoading(false));
    },
    [elements, stripe, email]
  );

  return (
    <Layout>
      <Container maxWidth={"md"}>
        <Typography variant="h2" style={{ margin: "16px 0" }}>
          Support [PAGE STILL UNDER DEVELOPMENT]
        </Typography>
        <Typography variant="body1" style={{ margin: "16px 0" }}>
          In August 2020, I decided to start creating content full time. This
          content includes the blog on this site, the newsletter I send, and the
          personal engineering projects I take on and contribute to open source.
          If you get value out of this content, it would mean the world to me to
          subscribe below and support me in my dream to become a public citizen
          of the world.
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="email"
            name="email"
            required={true}
            style={{ width: 300 }}
          />
          <CardElement />
          <Button
            style={{
              background: colors.primary,
              color: colors.tertiary,
              marginLeft: 16,
              display: "inline-block",
            }}
            type="submit"
            disabled={!stripe}
          >
            SPONSOR ME!
          </Button>
          {loading && (
            <Typography
              variant="body1"
              style={{ margin: "0 16px", display: "inline-block" }}
            >
              Loading...
            </Typography>
          )}
        </form>
      </Container>
    </Layout>
  );
};

const Support = () => (
  <Elements stripe={stripePromise}>
    <NoSsr>
      <SupportComponent />
    </NoSsr>
  </Elements>
);

export default Support;
