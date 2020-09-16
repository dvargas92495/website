import React from "react";
import { isBrowser, BrowserView } from "react-device-detect";
import Image from "material-ui-image";
import { useStaticQuery, graphql } from "gatsby";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Fade from "@material-ui/core/Fade";
import Card from "@material-ui/core/Card";
import { colors } from "../utils/typography";
import NoSsr from "@material-ui/core/NoSsr";
import Link from "@material-ui/core/Link";

const Charity = ({
  title,
  description,
  url,
  imgSrc,
  index,
}: {
  title: string;
  description: string;
  url: string;
  imgSrc: string;
  index: number;
}) => (
  <Grid item xs={12} style={{ color: colors.primary }}>
    <Fade
      in={true}
      mountOnEnter
      unmountOnExit
      timeout={{ enter: (index + 1) * 500, exit: (index + 1) * 500 }}
    >
      <Card style={{ backgroundColor: colors.tertiary }}>
        <Grid container>
          <Grid item xs={isBrowser ? 4 : 2}>
            <NoSsr>
              <Image src={imgSrc} aspectRatio={1.5} />
            </NoSsr>
          </Grid>
          <Grid item xs={isBrowser ? 8 : 10} style={{ color: colors.primary }}>
            <Container style={{ textAlign: "center" }}>
              <Link href={url} target="_blank" rel="noopener">
                <Typography
                  variant="h6"
                  style={{
                    fontFamily: "'Merriweather','Georgia',serif",
                  }}
                >
                  {title}
                </Typography>
              </Link>
            </Container>
            <BrowserView>
              <Container style={{ marginTop: 8, textAlign: "center" }}>
                <Typography variant="body1">{description}</Typography>
              </Container>
            </BrowserView>
          </Grid>
        </Grid>
      </Card>
    </Fade>
  </Grid>
);

const Charities = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          interests {
            charities {
              title
              url
              description
              imgSrc
            }
          }
        }
      }
      allFile(filter: { sourceInstanceName: { eq: "charities" } }) {
        edges {
          node {
            publicURL
          }
        }
      }
    }
  `);
  const {
    site: {
      siteMetadata: {
        interests: { charities },
      },
    },
    allFile,
  } = data;
  return (
    <>
      <Container maxWidth={"md"}>
        <Typography
          variant="h4"
          style={{
            margin: "16px 0",
            fontFamily: "'Merriweather','Georgia',serif",
          }}
        >
          Charities
        </Typography>
        <Typography variant="body1">
          There's only a limited set of problems we could invest our time into
          solving. For the rest, we could use money. I'm currently only donating
          1% of my income to charity, and hope to increase this number every
          year. Here are the charities I've found tackling the problems I care
          most about eradicating, hoping that it inspires others to do so too.
        </Typography>
        <Grid container style={{ padding: "24px 0" }} spacing={2}>
          {charities.map(({ title, description, url, imgSrc }, i) => (
            <Charity
              title={title}
              description={description}
              url={url}
              imgSrc={
                allFile.edges.find(l => l.node.publicURL.endsWith(imgSrc))?.node
                  .publicURL
              }
              key={i}
              index={i}
            />
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Charities;
