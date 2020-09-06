import React, { useState } from "react";
import Image from "material-ui-image";
import { useStaticQuery, graphql } from "gatsby";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { colors } from "../utils/typography";
import Fade from "@material-ui/core/Fade";
import NoSsr from "@material-ui/core/NoSsr";
import Link from "@material-ui/core/Link";
import Grow from "@material-ui/core/Grow";

type SelectedPodcast = {
  title: string;
  description: string;
  url: string;
  index: number;
};

const Podcast = ({
  title,
  description,
  url,
  imgSrc,
  index,
  selected,
  setSelected,
}: SelectedPodcast & {
  imgSrc: string;
  selected?: SelectedPodcast;
  setSelected: (i?: SelectedPodcast) => void;
}) => (
  <>
    <Fade
      in={true}
      mountOnEnter
      unmountOnExit
      timeout={{
        enter: (Math.floor(index / 6) + 1) * 500,
        exit: (Math.floor(index / 6) + 1) * 500,
      }}
    >
      <Grid item xs={2}>
        <NoSsr>
          <Image
            src={imgSrc}
            aspectRatio={1}
            style={{ cursor: "pointer" }}
            onClick={() =>
              selected?.index === index
                ? setSelected()
                : setSelected({ index, title, description, url })
            }
          />
        </NoSsr>
      </Grid>
    </Fade>
  </>
);

const Podcasts = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          interests {
            podcasts {
              title
              url
              description
              imgSrc
            }
          }
        }
      }
      allFile(filter: { sourceInstanceName: { eq: "podcasts" } }) {
        edges {
          node {
            publicURL
          }
        }
      }
    }
  `);
  const [selected, setSelected] = useState(undefined);
  const { site, allFile } = data;
  return (
    <>
      <Container maxWidth={"md"}>
        <Typography variant="h4" style={{ margin: "16px 0" }}>
          Podcasts
        </Typography>
        <Typography variant="body1">
          Podcasts are the best way to familiarize myself with the people I
          follow. These are the shows that I'm currently subscribed to and you
          could see broken down in my weekly newsletter.
        </Typography>
        <Grid container style={{ padding: "24px 0" }}>
          {site.siteMetadata.interests.podcasts.map(
            ({ title, description, url, imgSrc }, i) => (
              <React.Fragment key={i}>
                <Podcast
                  title={title}
                  description={description}
                  url={url}
                  imgSrc={
                    allFile.edges.find(l => l.node.publicURL.endsWith(imgSrc))
                      ?.node.publicURL
                  }
                  index={i}
                  selected={selected}
                  setSelected={setSelected}
                />
                {selected &&
                  (i % 6 === 5 ||
                    i === site.siteMetadata.interests.podcasts.length - 1) &&
                  selected.index <= i &&
                  selected.index >= Math.floor(i / 6) * 6 && (
                    <Grow in={true} mountOnEnter unmountOnExit>
                      <Grid
                        item
                        xs={12}
                        style={{
                          padding: "8px 0",
                          background: colors.tertiary,
                        }}
                      >
                        <Container style={{ textAlign: "center" }}>
                          <Typography variant="h4">{selected.title}</Typography>
                        </Container>
                        <Container style={{ textAlign: "center" }}>
                          <Link
                            href={selected.url}
                            target="_blank"
                            rel="noopener"
                          >
                            Home Page
                          </Link>
                        </Container>
                        <Container
                          style={{ marginTop: 8, textAlign: "center" }}
                          maxWidth={"md"}
                        >
                          <Typography variant="body1">
                            {selected.description}
                          </Typography>
                        </Container>
                      </Grid>
                    </Grow>
                  )}
              </React.Fragment>
            )
          )}
        </Grid>
      </Container>
    </>
  );
};

export default Podcasts;
