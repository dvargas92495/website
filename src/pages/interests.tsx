import React, { useState, useCallback } from "react";
import Image from "material-ui-image";
import Layout from "../components/layout";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { colors } from "../utils/typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import CoreBeliefs from "../components/CoreBeliefs";
import Books from "../components/Books";
import Podcasts from "../components/Pocasts";
import Charities from "../components/Charities";
import SEO from "../components/seo";

const tabContent = [<CoreBeliefs />, <Books />, <Podcasts />, <Charities />];

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
      <SEO title="Interests" />
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
