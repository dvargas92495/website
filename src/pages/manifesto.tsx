import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { colors } from "../utils/typography";

const Manifesto = () => (
  <Layout>
    <SEO title="Manifesto" />
    <Container maxWidth="md">
      <Typography
        variant="h4"
        style={{
          color: colors.primary,
          fontFamily: "'Merriweather','Georgia',serif",
          textAlign: "center",
          padding: '16px 0'
        }}
      >
        Manifesto
      </Typography>
      <Typography
        variant="h5"
        style={{
          color: colors.primary,
          padding: '16px 0',
          fontFamily: "'Merriweather','Georgia',serif",
        }}
      >
        Mission
      </Typography>
      <Typography
        variant="subtitle1"
        style={{
          color: colors.primary,
          paddingBottom: '16px'
        }}
      >
        Nomad, Engineer, and Writer aspiring to become a Public Citizen of the
        World
      </Typography>
      <Typography
        variant="body1"
        style={{
          color: colors.primary,
        }}
      >
        The current state of my personal monopoly is the intersection between
        digital nomading, open source engineering, and online writing. The
        combination will allow me to be a public citizen of the world - a member
        of society that views the whole world as his home, employer, and primary
        client.
      </Typography>
      <Typography
        variant="h5"
        style={{
          color: colors.primary,
          padding: '16px 0',
          fontFamily: "'Merriweather','Georgia',serif",
        }}
      >
        Nomad
      </Typography>
      <Typography
        variant="body1"
        style={{
          color: colors.primary,
        }}
      >
        I will be choosing a new city and Airbnb to stay in every month. Unlike
        most digital nomads, this will not be a solo venture. It is an explicit
        goal of mine to ensure that there is a community of people that stays
        with me in the place we stay in each month. I find that we do our most
        creative work in the presence of others and other people add to the
        serendipity I experience. I have a network of friends from MIT that have
        committed already to the first few months. For future months, I plan to
        book a place for around 6-12 people and reach out to those friends,
        friends of friends, and family to see who would want to commit for the
        stay. Splitting rentals across multiple people allow us to save money on
        location, food, and other necessities, allowing us to also increase our
        quality of life. If I build a strong enough network of travelers, then
        we could create a system where any given month we have N groups of
        people travelling to N different cities, all sharing our experiences and
        way of life.
      </Typography>
      <Typography
        variant="h5"
        style={{
          color: colors.primary,
          padding: '16px 0',
          fontFamily: "'Merriweather','Georgia',serif",
        }}
      >
        Engineer
      </Typography>
      <Typography
        variant="body1"
        style={{
          color: colors.primary,
        }}
      >
        The majority of my professional experience has been in engineering. But
        you wouldn’t be able to tell if you looked at my portfolio - almost all
        projects I’ve worked on were school projects that are now deleted or
        company projects that are now private to those organizations. I want to
        devote the majority of my creativity focus to building microtools -
        applying the system I developed in Write of Passage towards Engineering
        projects. I would define microtool as something with a narrow enough
        focus that could be built within a month. I want to find existing
        communities that I’m interested in, and build small tools that extend
        their lifestyle in ways they find valuable. Some of these communities
        include the roam cult, nodejs open source, digital nomads, and writers.
        I want to use my information capture to generate ideas towards what I’m
        interested in, narrow the scope to be shiny dimes, publish consistently,
        and share my progress with the world.
      </Typography>
      <Typography
        variant="h5"
        style={{
          color: colors.primary,
          padding: '16px 0',
          fontFamily: "'Merriweather','Georgia',serif",
        }}
      >
        Writing
      </Typography>
      <Typography
        variant="body1"
        style={{
          color: colors.primary,
        }}
      >
        The early days of my blog have been mostly focused on sharing personal
        stories that give insight on lessons that others could learn from. This
        writing will evolve to share more insight into how I want to build my
        digital nomading community and share the tools that I’m building. I have
        established a system for publishing two articles a week and a newsletter
        on Sundays. I feel very confident that I will keep this momentum going.
      </Typography>
    </Container>
  </Layout>
);

export default Manifesto;
