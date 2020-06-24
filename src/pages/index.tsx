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

const WIDTH = 1527;
const HEIGHT = 692;

const Index = () => {
  const data = useStaticQuery(graphql`
    query IndexQuery {
      landingImage: file(absolutePath: { regex: "/landing-image.png/" }) {
        publicURL
      }
    }
  `);
  return (
    <Layout>
      <SEO title="All posts" />
      <Box style={{ position: "relative" }}>
        <NoSsr>
          <Image
            src={data.landingImage.publicURL}
            aspectRatio={WIDTH / HEIGHT}
          />
        </NoSsr>
        <div
          style={{
            position: "absolute",
            top: 32,
            left: 32,
            fontStyle: "italic",
            textAlign: "center",
          }}
        >
          <Typography variant="h2" style={{ color: colors.primary }}>
            HEY, I'M
          </Typography>
          <Typography variant="h1" style={{ color: colors.primary }}>
            VARGAS
          </Typography>
        </div>
      </Box>
      <Container
        maxWidth="xs"
        style={{ textAlign: "center", paddingTop: 32, paddingBottom: 32 }}
      >
        <Typography variant="h6" style={{ color: colors.primary }}>
          Welcome to the one stop shop of everything about me!
        </Typography>
      </Container>
      <Container
        maxWidth="xs"
        style={{ textAlign: "justify", paddingTop: 24, paddingBottom: 24 }}
      >
        <Typography style={{ color: colors.primary }}>
          Through this site, I am looking to become more of a citizen of the
          world. I love being an absolute moron, learning from others, and now I
          want to share more of what I learn. This site will act as a portal
          into my thoughts, ongoings, projects, and lessons I've learned.
        </Typography>
      </Container>
      <Container
        maxWidth="xs"
        style={{ textAlign: "justify", paddingTop: 24, paddingBottom: 24 }}
      >
        <Typography style={{ color: colors.primary }}>
          I will soon become a Digital Nomad. That is, I will no longer have a
          permanent address. Instead, every month I will choose a new city to
          live. If I stop by a city near you, feel free to reach out! I am eager
          to meet new people and make new friends :).
        </Typography>
      </Container>
      <Container
        maxWidth="xs"
        style={{ textAlign: "justify", paddingTop: 24, paddingBottom: 24 }}
      >
        <Typography style={{ color: colors.primary }}>
          I am still actively developing this site. In the meantime, feel free
          to follow me on Twitter below.
        </Typography>
      </Container>
    </Layout>
  );
};

export default Index;
