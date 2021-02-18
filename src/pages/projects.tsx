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
import Card from "@material-ui/core/Card";

const Sponsor = ({
  title,
  url,
  imgSrc,
}: {
  imgSrc: string;
  title: string;
  url: string;
}) => (
  <Grid item xs={isBrowser ? 3 : 4}>
    <Card
      style={{
        backgroundColor: colors.tertiary,
        textAlign: "center",
        minHeight: 250,
      }}
    >
      <NoSsr>
        <Image src={imgSrc} aspectRatio={1} />
      </NoSsr>
      <Typography
        variant="h6"
        style={{
          margin: "16px 0",
          padding: "0 4px",
          fontFamily: "'Merriweather','Georgia',serif",
        }}
      >
        {url ? (
          <Link href={url} target="_blank" rel="noopener">
            {title}
          </Link>
        ) : (
          title
        )}
      </Typography>
    </Card>
  </Grid>
);

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
      {data.site.siteMetadata.projects.map(
        ({ title, link, description, imgSrc }, i) => (
          <Project
            key={i}
            title={title}
            link={link}
            description={description}
            imgSrc={
              data.projects.edges.find(l => l.node.publicURL.endsWith(imgSrc))
                ?.node.publicURL
            }
            ltr={i % 2 === 0}
          />
        )
      )}
      <Typography
        variant="h3"
        style={{
          margin: "16px 0",
          fontFamily: "'Merriweather','Georgia',serif",
        }}
      >
        Thank You!
      </Typography>
      <Typography variant="body1" style={{ margin: "16px 0" }}>
        In August 2020, I left my job to start pursuing open source projects
        independently. I'm forever grateful for the friends and family who
        supported me early on.
      </Typography>
      <Grid container style={{ margin: "16px 0" }} spacing={1}>
        {data.site.siteMetadata.sponsors.map(({ title, imgSrc, url }, i) => (
          <Sponsor
            title={title}
            imgSrc={
              data.sponsors.edges.find(l => l.node.publicURL.endsWith(imgSrc))
                ?.node?.publicURL
            }
            url={url}
            key={i}
          />
        ))}
      </Grid>
    </Container>
  </Layout>
);

export default Projects;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        projects {
          title
          description
          link
          imgSrc
        }
        sponsors {
          title
          url
          imgSrc
        }
      }
    }
    projects: allFile(filter: { sourceInstanceName: { eq: "projects" } }) {
      edges {
        node {
          publicURL
        }
      }
    }
    sponsors: allFile(filter: { sourceInstanceName: { eq: "sponsors" } }) {
      edges {
        node {
          publicURL
        }
      }
    }
  }
`;
