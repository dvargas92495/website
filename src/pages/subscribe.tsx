import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { colors } from "../utils/typography";

const Subscribe = () => (
  <Layout>
    <SEO title="Subscribe" />
    <Container maxWidth="md" style={{ textAlign: "center" }}>
      <Typography
        variant="h5"
        style={{
          color: colors.primary,
          paddingTop: 32,
          paddingBottom: 32,
          fontFamily: "'Merriweather','Georgia',serif",
        }}
      >
        Join the other 42 subscribers and stay up to date on what I'm creating!
      </Typography>
    </Container>
  </Layout>
);

export default Subscribe;
