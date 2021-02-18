import React from "react";
import Image from "material-ui-image";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { useStaticQuery, graphql } from "gatsby";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { colors } from "../utils/typography";
import Box from "@material-ui/core/Box";
import NoSsr from "@material-ui/core/NoSsr";
import Link from "@material-ui/core/Link";

const Index = () => {
  const data = useStaticQuery(graphql`
    query IndexQuery {
      landingImage: file(absolutePath: { regex: "/landing-image.png/" }) {
        publicURL
        childImageSharp {
          fluid {
            aspectRatio
          }
        }
      }
    }
  `);
  return (
    <Layout>
      <SEO title="Start Here" />
      <Box style={{ position: "relative" }}>
        <NoSsr>
          <Image
            src={data.landingImage.publicURL}
            aspectRatio={data.landingImage.childImageSharp.fluid.aspectRatio}
          />
        </NoSsr>
      </Box>
      <Container maxWidth="md" style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{
            color: colors.primary,
            paddingTop: 32,
            paddingBottom: 32,
            fontFamily: "'Merriweather','Georgia',serif",
          }}
        >
          Nomad | Engineer | Writer
        </Typography>
        <Typography style={{ color: colors.primary }}>
          Traveling with a group of friends as part of{" "}
          <Link
            target="_blank"
            rel="noopener"
            href="https://covilla.life"
            style={{ color: colors.secondary }}
          >
            Covilla
          </Link>
        </Typography>
        <Typography style={{ color: colors.primary }}>
          Software Engineer working exclusively in{" "}
          <Link
            target="_blank"
            rel="noopener"
            href="https://github.com/dvargas92495"
            style={{ color: colors.secondary }}
          >
            Open Source
          </Link>
        </Typography>
        <Typography style={{ color: colors.primary }}>
          Writing about what I learn on this site
        </Typography>
      </Container>
    </Layout>
  );
};

export default Index;
