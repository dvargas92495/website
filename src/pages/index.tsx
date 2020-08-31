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
          style={{ color: colors.primary, paddingTop: 32, paddingBottom: 32 }}
        >
          Nomad, Engineer, Writer
        </Typography>
        <Typography
          style={{ color: colors.primary, paddingTop: 24, paddingBottom: 24 }}
          variant="subtitle1"
        >
          Aspiring to become a public citizen of the world.
        </Typography>
        <Typography
          variant="h5"
          style={{ color: colors.primary, paddingTop: 32, paddingBottom: 32 }}
        >
          Traveling to Different Cities as a Digital Nomad
        </Typography>
        <Typography style={{ color: colors.primary }}>
          I do not have a permanent address
        </Typography>
        <Typography style={{ color: colors.primary }}>
          I choose a new city to live every month with a group of friends
        </Typography>
        <Typography style={{ color: colors.primary }}>
          <Link
            target="_blank"
            rel="noopener"
            href="https://covilla.life"
            style={{ color: colors.secondary }}
          >
            You can follow our journey here
          </Link>
        </Typography>
        <Typography style={{ color: colors.primary }}>
          If I come to a city near you, feel free to reach out!
        </Typography>
        <Typography
          variant="h5"
          style={{ color: colors.primary, paddingTop: 32, paddingBottom: 32 }}
        >
          Engineer Specializing in Technologically Poor Industries
        </Typography>
        <Typography style={{ color: colors.primary }}>
          React on the front end
        </Typography>
        <Typography style={{ color: colors.primary }}>
          Serverless on the back end
        </Typography>
        <Typography style={{ color: colors.primary }}>
          Github actions to automate all ends
        </Typography>
        <Typography style={{ color: colors.primary }}>
          Hoping to bring inefficiency to an end
        </Typography>
        <Typography
          variant="h5"
          style={{ color: colors.primary, paddingTop: 32, paddingBottom: 32 }}
        >
          Writing to Learn and Share my Thoughts with the World
        </Typography>
        <Typography style={{ color: colors.primary }}>
          I publish a blog post a couple times a week on this site
        </Typography>
        <Typography style={{ color: colors.primary }}>
          Sign up for my newsletter for updates on my site, what I learn, and
          what I find interesting
        </Typography>
        <Typography style={{ color: colors.primary }}>
          Writing spans topics that include engineering, the economy, self
          improvement, and my travels
        </Typography>
        <Typography style={{ color: colors.primary }}>
          I'm also active on Twitter and you can follow me below
        </Typography>
        <Typography
          variant="h5"
          style={{ color: colors.primary, paddingTop: 32, paddingBottom: 32 }}
        >
          This Intersection Makes Me <b>A Public Citizen of the World</b>
        </Typography>
        <Typography style={{ color: colors.primary }}>
          My address is planet earth
        </Typography>
        <Typography style={{ color: colors.primary }}>
          My software is open for anyone to use
        </Typography>
        <Typography style={{ color: colors.primary }}>
          My writing is available for anyone to see
        </Typography>
        <Typography style={{ color: colors.primary }}>
          All in an effort to make my home a better place
        </Typography>
      </Container>
    </Layout>
  );
};

export default Index;
