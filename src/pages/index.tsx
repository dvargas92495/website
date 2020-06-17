import React from "react";
import Bio from "../components/bio";
import Layout from "../components/layout";
import SEO from "../components/seo";

const Index = () => {
  return (
    <Layout>
      <SEO title="All posts" />
      <Bio />
    </Layout>
  );
};

export default Index;
