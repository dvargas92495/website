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
      <SEO title="Start Here" />
      <Box style={{ position: "relative" }}>
        <NoSsr>
          <Image
            src={data.landingImage.publicURL}
            aspectRatio={WIDTH / HEIGHT}
          />
        </NoSsr>
      </Box>
      <Container
        maxWidth="md"
        style={{ textAlign: "center", paddingTop: 32, paddingBottom: 32 }}
      >
        <Typography variant="h4" style={{ color: colors.primary }}>
          Nomad, Engineer, Optimist, Moron
        </Typography>
      </Container>
      <Container
        maxWidth="sm"
        style={{ textAlign: "justify", paddingTop: 24, paddingBottom: 24 }}
      >
        <Typography style={{ color: colors.primary }} variant="subtitle1">
          I travel from city to city, solve problems with software, inspire
          those around me to make the world a better place, and learn how I
          could better do all the above.
        </Typography>
      </Container>
      <Container
        maxWidth="md"
        style={{ textAlign: "center", paddingTop: 32, paddingBottom: 32 }}
      >
        <Typography variant="h5" style={{ color: colors.primary }}>
          Traveling to Different Cities as a Digital Nomad
        </Typography>
      </Container>
      <Container
        maxWidth="sm"
        style={{ textAlign: "justify", paddingTop: 24, paddingBottom: 24 }}
      >
        <Typography style={{ color: colors.primary }}>
          I do not have a permanent address. Instead, every month I, along with
          a few friends, choose a new city to live for the month. The world is
          moving fully online. I no longer need to live in the city I work
          because what I work on <i>is not defined by a city.</i> This allows me
          to become a <i>citizen of the world.</i>{" "}
          <Link href="https://chamilea.com" style={{ color: colors.secondary }}>
            You can follow our journey here.
          </Link>{" "}
          If I come to a city near you, feel free to reach out!
        </Typography>
      </Container>
      <Container
        maxWidth="md"
        style={{ textAlign: "center", paddingTop: 32, paddingBottom: 32 }}
      >
        <Typography variant="h5" style={{ color: colors.primary }}>
          Engineer specializing in serverless React Apps
        </Typography>
      </Container>
      <Container
        maxWidth="sm"
        style={{ textAlign: "justify", paddingTop: 24, paddingBottom: 24 }}
      >
        <Typography style={{ color: colors.primary }}>
          Check out the Projects tab above or on my GitHub link below to see
          what I'm currently working on. The technology landscape is changing
          rapidly, and transitioning to a world that allows app developers to
          focus more and more on their core value proposition. Serverless
          applications, especially when paired with React, are allowing
          companies and individuals to stand up a site in seconds with little to
          no cost. As these common backend problems continue to be solved, I'd
          like to focus my efforts on helping industries that have fallen behind
          technologically to finally catch up to the 21st century.
        </Typography>
      </Container>
      <Container
        maxWidth="md"
        style={{ textAlign: "center", paddingTop: 32, paddingBottom: 32 }}
      >
        <Typography variant="h5" style={{ color: colors.primary }}>
          Encourage others to be optimistic that all problems are solvable
        </Typography>
      </Container>
      <Container
        maxWidth="sm"
        style={{ textAlign: "justify", paddingTop: 24, paddingBottom: 24 }}
      >
        <Typography style={{ color: colors.primary }}>
          One could focus on being disheartened about all the problems we
          somehow still have to deal with. Poverty. Climate Change. Existential
          Risk of Artificial Intelligence. Or we could be amazed at all the
          progress we've already made as a species to inspire us to solve those
          that still lie ahead. I aim to achieve this through my writing and my
          daily interactions with others. Follow me on Twitter below!
        </Typography>
      </Container>
      <Container
        maxWidth="md"
        style={{ textAlign: "center", paddingTop: 32, paddingBottom: 32 }}
      >
        <Typography variant="h5" style={{ color: colors.primary }}>
          Accepting my lack of knowledge to always learn more
        </Typography>
      </Container>
      <Container
        maxWidth="sm"
        style={{ textAlign: "justify", paddingTop: 24, paddingBottom: 24 }}
      >
        <Typography style={{ color: colors.primary }}>
          It took until I graduated college to fully appreciate the value of
          learning. The value of always growing and looking for ways to self
          improve. I not only acknowledge that I'm a flawed human being, I
          RELISH in the opportunities this provides me to learn and improve. In
          doing so, my understanding of the world and myself also improves and
          leads me to living a happier life. Sign up for my newsletter below for
          updates on not only this site, but to also share in what I'm learning.
        </Typography>
      </Container>
    </Layout>
  );
};

export default Index;
