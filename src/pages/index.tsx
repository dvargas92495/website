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

const WIDTH = 1527;
const HEIGHT = 562;

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
          This site is a portal into my thoughts, ongoings, projects, and
          lessons I've learned. I consider myself an engineer, an optimist, and
          a moron. It's what allows me to always be looking to learn, know that
          there are solutions to the problems we face, and think through how to
          finally go about solving them.
        </Typography>
      </Container>
      <Container
        maxWidth="xs"
        style={{ textAlign: "justify", paddingTop: 24, paddingBottom: 24 }}
      >
        <Typography style={{ color: colors.primary }}>
          I will soon become a Digital Nomad. That is, I will no longer have a
          permanent address. Instead, every month I, along with a few friends,
          will choose a new city to live. If I stop by a city near you, feel
          free to reach out! I am eager to meet new people and make new friends
          :). You could also see what we're up to at{" "}
          <Link href="https://chamilea.com" style={{ color: colors.secondary }}>
            https://chamilea.com
          </Link>
          .
        </Typography>
      </Container>
      <Container
        maxWidth="xs"
        style={{ textAlign: "justify", paddingTop: 24, paddingBottom: 24 }}
      >
        <Typography style={{ color: colors.primary }}>
          Started in June 2020, I am actively adding to this site and it will
          continue to evolve over time. Not sure what the newsletter will be
          yet, but if you are interested in being updated anyway, add your email
          below!
        </Typography>
      </Container>
    </Layout>
  );
};

export default Index;
