import Typography from "@material-ui/core/Typography";
import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not Found" />
    <Typography
      variant="h1"
      style={{
        fontFamily: "'Merriweather','Georgia',serif",
      }}
    >
      Not Found
    </Typography>
    <Typography variant="body1">
      You just hit a route that doesn&#39;t exist... the sadness.
    </Typography>
  </Layout>
);

export default NotFoundPage;
