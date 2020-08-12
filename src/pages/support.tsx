import React from "react";
import Layout from "../components/layout";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { colors } from "../utils/typography";

const Support = () => {
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
        <form method="POST" action="/.netlify/functions/stripeSubscribe">
          <TextField
            defaultValue={""}
            placeholder="email"
            required={true}
            style={{ width: 300 }}
          />
          <Button
            style={{
              background: colors.primary,
              color: colors.tertiary,
              marginLeft: 16,
            }}
            type="submit"
          >
            SPONSOR ME!
          </Button>
        </form>
      </Container>
    </Layout>
  );
};

export default Support;
