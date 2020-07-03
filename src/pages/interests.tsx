import React, { useState, useCallback } from "react";
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
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import CoreBeliefs from "../components/CoreBeliefs";
import Books from "../components/Books";

const Interest = ({
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
  const imageGrid = (
    <Grid item xs={4}>
      <NoSsr>
        <Image src={imgSrc} aspectRatio={1} />
      </NoSsr>
    </Grid>
  );
  const contentGrid = (
    <Grid item xs={8} style={{ color: colors.primary }}>
      <Container style={{ textAlign: "center" }}>
        <Typography variant="h4">{title}</Typography>
      </Container>
      <Container style={{ textAlign: "center" }}>
        <Link href={link} target="_blank" rel="noopener">
          {link}
        </Link>
      </Container>
      <Container style={{ marginTop: 8 }}>
        <Typography variant="body1">{description}</Typography>
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

const tabContent = [
  <CoreBeliefs />,
  <Books />,
  "Coming soon...",
  "Coming soon...",
];

const Interests = () => {
  const [tabValue, setTabValue] = useState(0);
  const onChange = useCallback(
    (_, newValue: number) => {
      setTabValue(newValue);
    },
    [setTabValue]
  );
  return (
    <Layout>
      <Container maxWidth={"md"}>
        <Typography variant="h2" style={{ margin: "16px 0" }}>
          Interests
        </Typography>
        <p>
          This page lists all of my various interests and content that are
          actively influencing me. My hope is that you could find something here
          that is of interest to you too!
        </p>
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
              <Tab label="Core Beliefs" />
              <Tab label="Books" />
              <Tab label="Podcasts" />
              <Tab label="Charities" />
            </Tabs>
          </AppBar>
          {tabContent[tabValue]}
        </Paper>
      </Container>
    </Layout>
  );
};

export default Interests;
