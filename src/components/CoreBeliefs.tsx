import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import { colors } from "../utils/typography";
import { graphql, useStaticQuery } from "gatsby";
import Card from "@material-ui/core/Card";

const CoreBelief = ({
  title,
  description,
  index,
}: {
  title: string;
  description: string;
  index: number;
}) => (
  <>
    <Grid item xs={12} style={{ color: colors.primary }}>
      <Fade
        in={true}
        mountOnEnter
        unmountOnExit
        timeout={{ enter: (index + 1) * 500, exit: (index + 1) * 500 }}
      >
        <Card style={{ backgroundColor: colors.tertiary }}>
          <Container style={{ textAlign: "center" }}>
            <Typography
              variant="h6"
              style={{
                fontFamily: "'Merriweather','Georgia',serif",
              }}
            >
              {title}
            </Typography>
          </Container>
          <Container style={{ marginTop: 8 }}>
            <Typography variant="body1">{description}</Typography>
          </Container>
        </Card>
      </Fade>
    </Grid>
  </>
);

const CoreBeliefs = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          interests {
            coreBeliefs {
              title
              description
            }
          }
        }
      }
    }
  `);
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
          Core Beliefs
        </Typography>
        <Typography variant="body1" style={{ margin: "16px 0" }}>
          I'd like to consider myself a rational person that's open minded to
          new perspectives. Despite this, I do think it's valuable to have a
          couple of fundamental principles that anchor you. This allows you to
          build out the rest of your value set. These are mine. I consider them
          beliefs, because they are axioms that cannot be proven or disproven.
          They are my religion.
        </Typography>
        <Grid container style={{ marginBottom: 16 }} spacing={2}>
          {data.site.siteMetadata.interests.coreBeliefs.map(
            ({ title, description }, i) => (
              <CoreBelief
                key={i}
                title={title}
                description={description}
                index={i}
              />
            )
          )}
        </Grid>
      </Container>
    </>
  );
};

export default CoreBeliefs;
