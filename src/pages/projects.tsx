import React from "react";
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
import { graphql, useStaticQuery } from "gatsby";

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
  return (
    //<Slide direction={ltr ? "left" : "right"} mountOnEnter unmountOnExit>
    <Paper>
      <Grid container>
        <Grid item xs={4}>
          <NoSsr>
            <Image src={imgSrc} aspectRatio={1} />
          </NoSsr>
        </Grid>
        <Grid item xs={8} style={{ color: colors.primary }}>
          <Container>
            <Typography variant="h4">{title}</Typography>
          </Container>
          <Container>
            <Link href={link}>{link}</Link>
          </Container>
          <Container>
            <Typography variant="body1">{description}</Typography>
          </Container>
        </Grid>
      </Grid>
    </Paper>
    //</Slide>
  );
};

const Projects = ({ data }) => (
  <Layout>
    <Container maxWidth={"md"}>
      <Typography variant="h2" style={{ margin: "16px 0" }}>
        Projects
      </Typography>
      <p>
        This page lists all the projects that I am currently working on, I have
        worked on, and types of projects I am interested in working on. I
        consider places of employment both past and present as projects as well.
      </p>
    </Container>
    <Container maxWidth={"md"}>
      <Typography variant="h3" style={{ margin: "16px 0" }}>
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
