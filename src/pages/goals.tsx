import React, { useState, useCallback } from "react";
import Image from "material-ui-image";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Layout from "../components/layout";
import Paper from "@material-ui/core/Paper";
import { colors } from "../utils/typography";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useStaticQuery, graphql } from "gatsby";
import { groupBy, keys } from "lodash";
import Grid from "@material-ui/core/Grid";
import Fade from "@material-ui/core/Fade";
import Card from "@material-ui/core/Card";
import Check from "@material-ui/icons/Check";
import Close from "@material-ui/icons/Close";
import LinearProgress from "@material-ui/core/LinearProgress";
import SEO from "../components/seo";
import NoSsr from "@material-ui/core/NoSsr";

const bodies = {
  Life: "Evergreen objectives that express what I am working towards.",
  "2020":
    "The set of goals I set when I was working full time at Mark43 and exploring additional streams of income.",
};

const Goals = () => {
  const [tabValue, setTabValue] = useState(0);
  const onChange = useCallback(
    (_, newValue: number) => {
      setTabValue(newValue);
    },
    [setTabValue]
  );
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          goals {
            year
            title
            description
            status
            imgSrc
          }
        }
      }
      allFile(filter: { sourceInstanceName: { eq: "goals" } }) {
        edges {
          node {
            publicURL
            absolutePath
            childImageSharp {
              fluid {
                aspectRatio
              }
            }
          }
        }
      }
    }
  `);
  const {
    site: {
      siteMetadata: { goals },
    },
  } = data;
  const imagesByName = Object.fromEntries(
    data.allFile.edges.map(({ node }) => [
      node.absolutePath.substring(
        node.absolutePath.indexOf("/content/goals/") + 15
      ),
      {
        imgSrc: node.publicURL,
        aspectRatio: node.childImageSharp.fluid.aspectRatio,
      },
    ])
  );
  const goalsByYear = groupBy(goals, "year");
  const years = keys(goalsByYear).sort().reverse();
  return (
    <Layout>
      <SEO title="Goals" />
      <Container maxWidth={"md"}>
        <Typography variant="h3" style={{ margin: "16px 0" }}>
          Goals
        </Typography>
        <Typography variant="body1" style={{ margin: "16px 0" }}>
          I started setting yearly goals in 2020, as well as took a stab at life
          goals.
        </Typography>
      </Container>
      <Container maxWidth={"md"}>
        <Paper
          style={{
            flexGrow: 1,
            backgroundColor: colors.quartery,
            color: colors.quintary,
          }}
        >
          <AppBar position="static" style={{ backgroundColor: colors.primary }}>
            <Tabs
              value={tabValue}
              onChange={onChange}
              style={{ color: colors.secondary }}
              TabIndicatorProps={{
                style: { backgroundColor: colors.secondary },
              }}
              centered
            >
              {years.map(y => (
                <Tab label={`${y} Goals`} key={y} />
              ))}
            </Tabs>
          </AppBar>
          <Container maxWidth={"md"}>
            <Typography variant="h4" style={{ margin: "16px 0" }}>
              {`${years[tabValue]} Goals`}
            </Typography>
            <Typography variant="body1">{bodies[years[tabValue]]}</Typography>
          </Container>
          <Container maxWidth={"md"}>
            <Grid container style={{ padding: "24px 0" }} spacing={2}>
              {goalsByYear[years[tabValue]].map((g, index) => (
                <Grid
                  item
                  xs={12}
                  style={{ color: colors.primary }}
                  key={g.title}
                >
                  <Fade
                    in={true}
                    mountOnEnter
                    unmountOnExit
                    timeout={{
                      enter: (index + 1) * 500,
                      exit: (index + 1) * 500,
                    }}
                  >
                    <Card style={{ backgroundColor: colors.tertiary }}>
                      <Grid container>
                        <Grid item xs={2}>
                          <NoSsr>
                            <Image
                              src={imagesByName[g.imgSrc]?.imgSrc}
                              aspectRatio={imagesByName[g.imgSrc]?.aspectRatio}
                              height="100%"
                            />
                          </NoSsr>
                        </Grid>
                        <Grid
                          item
                          xs={10}
                          style={{ color: colors.primary, padding: "16px 0" }}
                        >
                          <Container>
                            <Typography variant="h4">{g.title}</Typography>
                          </Container>
                          <Container style={{ textAlign: "center" }}>
                            {g.status === "Success" ? (
                              <>
                                <Check style={{ color: "green" }} />
                                <LinearProgress
                                  variant="determinate"
                                  value={100}
                                />
                              </>
                            ) : g.status === "Fail" ? (
                              <>
                                <Close style={{ color: "red" }} />
                                <LinearProgress
                                  variant="determinate"
                                  value={0}
                                />
                              </>
                            ) : (
                              <>
                                <Typography variant="subtitle1">
                                  {`${g.status}%`}
                                </Typography>
                                <LinearProgress
                                  variant="determinate"
                                  value={g.status}
                                />
                              </>
                            )}
                          </Container>
                          <Container style={{ marginTop: 8 }}>
                            <Typography variant="body1">
                              {g.description}
                            </Typography>
                          </Container>
                        </Grid>
                      </Grid>
                    </Card>
                  </Fade>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Paper>
      </Container>
    </Layout>
  );
};

export default Goals;
