import React from "react";
import { isBrowser } from "react-device-detect";
import IframeResizer from "iframe-resizer-react";
import Image from "material-ui-image";
import Layout from "../components/layout";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { useStaticQuery, graphql } from "gatsby";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import NoSsr from "@material-ui/core/NoSsr";
import Card from "@material-ui/core/Card";
import { colors } from "../utils/typography";
import SEO from "../components/seo";

const Sponsor = ({
  title,
  url,
  imgSrc,
}: {
  imgSrc: string;
  title: string;
  url: string;
}) => (
  <Grid item xs={isBrowser ? 2 : 4}>
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

const Support = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          sponsors {
            title
            url
            imgSrc
          }
        }
      }
      allFile(filter: { sourceInstanceName: { eq: "sponsors" } }) {
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
      siteMetadata: { sponsors },
    },
    allFile,
  } = data;
  return (
    <Layout>
      <SEO title="Support" />
      <Container maxWidth={"md"}>
        <Typography
          variant="h3"
          style={{
            margin: "16px 0",
            fontFamily: "'Merriweather','Georgia',serif",
          }}
        >
          Support
        </Typography>
        <Typography variant="body1" style={{ margin: "16px 0" }}>
          In August 2020, I decided to start creating content full time. The
          best way to support my work is to sponsor me directly!
        </Typography>
        <Typography variant="body1" style={{ margin: "16px 0" }}>
          If you benefit from the software I create and are on GitHub, sponsor
          me there!
        </Typography>
        <iframe
          src="https://github.com/sponsors/dvargas92495/card"
          title="Sponsor dvargas92495"
          height="225"
          width="600"
          style={{ border: 0 }}
        />
        <Typography variant="body1" style={{ margin: "16px 0" }}>
          Otherwise, sponsor me using the widget below!
        </Typography>
        <IframeResizer
          src="https://givebutter.com/embed/c/dvargas92495"
          width="100%"
          height="775px"
          name="givebutter"
          frameBorder="0"
          scrolling={false}
          seamless
          allow="payment"
        />
        <script src="https://givebutter.com/js/widget.js"></script>
        <Typography
          variant="h3"
          style={{
            margin: "16px 0",
            fontFamily: "'Merriweather','Georgia',serif",
          }}
        >
          Thank You To My Sponsors!
        </Typography>
        <Typography variant="body1" style={{ margin: "16px 0" }}>
          I will be updating this page daily, so let me know if you don't see
          yourself here after sponsoring.
        </Typography>
        <Grid container style={{ margin: "16px 0" }} spacing={1}>
          {sponsors.map(({ title, imgSrc, url }, i) => (
            <Sponsor
              title={title}
              imgSrc={
                allFile.edges.find(l => l.node.publicURL.endsWith(imgSrc))?.node
                  ?.publicURL
              }
              url={url}
              key={i}
            />
          ))}
        </Grid>
      </Container>
    </Layout>
  );
};

export default Support;
