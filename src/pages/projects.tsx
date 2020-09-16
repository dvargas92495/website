import React, { useState, useCallback } from "react";
import { isBrowser, BrowserView, MobileView } from "react-device-detect";
import Image from "material-ui-image";
import Layout from "../components/layout";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Slide from "@material-ui/core/Slide";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import NoSsr from "@material-ui/core/NoSsr";
import { colors } from "../utils/typography";
import { graphql } from "gatsby";
import SEO from "../components/seo";
import IconButton from "@material-ui/core/IconButton";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import ArrowDropUp from "@material-ui/icons/ArrowDropUp";

const Project = ({
  title,
  link,
  description,
  imgSrc,
  ltr,
}: {
  title: string;
  link: string;
  description: string;
  imgSrc: string;
  ltr: boolean;
}) => {
  const [showDescription, setShowDescription] = useState(false);
  const openDescription = useCallback(() => setShowDescription(true), [
    setShowDescription,
  ]);
  const closeDescription = useCallback(() => setShowDescription(false), [
    setShowDescription,
  ]);
  const imageGrid = (
    <Grid item xs={isBrowser ? 4 : 2}>
      <NoSsr>
        <Image src={imgSrc} aspectRatio={1} />
      </NoSsr>
    </Grid>
  );
  const contentGrid = (
    <Grid item xs={isBrowser ? 8 : 10} style={{ color: colors.primary }}>
      <Container style={{ textAlign: "center" }}>
        <Link href={link} target="_blank" rel="noopener">
          <Typography
            variant="h5"
            style={{
              fontFamily: "'Merriweather','Georgia',serif",
            }}
          >
            {title}
          </Typography>
        </Link>
      </Container>
      <Container style={{ textAlign: "justify" }}>
        <BrowserView>
          <Typography variant="body1" style={{ marginTop: 8 }}>
            {description}
          </Typography>
        </BrowserView>
        <MobileView>
          {showDescription ? (
            <>
              <Typography variant="body1" style={{ marginTop: 8 }}>
                {description}
              </Typography>
              <IconButton
                onClick={closeDescription}
                style={{ padding: 0, width: "100%", textAlign: "center" }}
              >
                <ArrowDropUp fontSize={"large"} />
              </IconButton>
            </>
          ) : (
            <IconButton
              onClick={openDescription}
              style={{ padding: 0, width: "100%", textAlign: "center" }}
            >
              <ArrowDropDown fontSize={"large"} />
            </IconButton>
          )}
        </MobileView>
      </Container>
    </Grid>
  );
  return (
    <Slide
      direction={ltr ? "left" : "right"}
      in={true}
      mountOnEnter
      unmountOnExit
    >
      <Paper elevation={3} style={{ marginTop: 16 }}>
        <Grid container>
          {ltr ? imageGrid : contentGrid}
          {ltr ? contentGrid : imageGrid}
        </Grid>
      </Paper>
    </Slide>
  );
};

const Projects = ({ data }) => (
  <Layout>
    <SEO title="Projects" />
    <Container maxWidth={"md"}>
      <Typography
        variant="h3"
        style={{
          margin: "16px 0",
          fontFamily: "'Merriweather','Georgia',serif",
        }}
      >
        Projects
      </Typography>
      <Typography variant="body1" style={{ margin: "16px 0" }}>
        This page lists all the projects that I am currently working on, I have
        worked on, and types of projects I am interested in working on. I
        consider places of employment both past and present as projects as well.
      </Typography>
    </Container>
    <Container maxWidth={"md"} style={{ marginBottom: 16 }}>
      <Typography
        variant="h4"
        style={{
          margin: "16px 0",
          fontFamily: "'Merriweather','Georgia',serif",
        }}
      >
        Current Projects
      </Typography>
      {data.site.siteMetadata.projects.current.map(
        ({ title, link, description, imgSrc }, i) => (
          <Project
            key={i}
            title={title}
            link={link}
            description={description}
            imgSrc={
              data.allFile.edges.find(l => l.node.publicURL.endsWith(imgSrc))
                ?.node.publicURL
            }
            ltr={i % 2 === 0}
          />
        )
      )}

      <Typography
        variant="h4"
        style={{
          margin: "16px 0",
          fontFamily: "'Merriweather','Georgia',serif",
        }}
      >
        Previous Projects
      </Typography>
      {data.site.siteMetadata.projects.previous.map(
        ({ title, link, description, imgSrc }, i) => (
          <Project
            key={i}
            title={title}
            link={link}
            description={description}
            imgSrc={
              data.allFile.edges.find(l => l.node.publicURL.endsWith(imgSrc))
                ?.node.publicURL
            }
            ltr={i % 2 === 0}
          />
        )
      )}
    </Container>
  </Layout>
);

export default Projects;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        projects {
          current {
            title
            description
            link
            imgSrc
          }
          previous {
            title
            description
            link
            imgSrc
          }
        }
      }
    }
    allFile(filter: { sourceInstanceName: { eq: "projects" } }) {
      edges {
        node {
          publicURL
        }
      }
    }
  }
`;
