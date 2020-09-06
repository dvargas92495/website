import React from "react";
import { isBrowser } from "react-device-detect";
import Image from "material-ui-image";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { colors } from "../utils/typography";
import { graphql } from "gatsby";
import Zoom from "@material-ui/core/Zoom";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import NoSsr from "@material-ui/core/NoSsr";

const Thumbnail = ({
  title,
  i,
  url,
  thumbnailImage,
}: {
  i: number;
  title: string;
  url: string;
  thumbnailImage: {
    imgSrc: string;
    aspectRatio: number;
  };
}) => {
  const delay = (Math.floor(i / 3) + 1) * 500;
  return (
    <Zoom
      in={true}
      mountOnEnter
      unmountOnExit
      timeout={{
        enter: delay,
        exit: delay,
      }}
    >
      <Grid item xs={isBrowser ? 4 : 12}>
        <Card style={{ height: 300 }}>
          <div style={{ height: 200 }}>
            {thumbnailImage ? (
              <NoSsr>
                <Image
                  src={thumbnailImage.imgSrc}
                  aspectRatio={thumbnailImage.aspectRatio}
                />
              </NoSsr>
            ) : (
              "Thumbnail Image Coming Soon..."
            )}
          </div>
          <Container style={{ color: colors.primary, height: 100 }}>
            <header>
              <Typography variant="h5">
                <Link
                  style={{ boxShadow: `none`, color: colors.secondary }}
                  href={url}
                  target="_blank"
                  rel="noopener"
                >
                  {title}
                </Link>
              </Typography>
            </header>
          </Container>
        </Card>
      </Grid>
    </Zoom>
  );
};

const Consulting = ({ data }) => {
  const thumbnailImagesByVideo = Object.fromEntries(
    data.allFile.edges.map(({ node }) => [
      node.absolutePath.substring(
        node.absolutePath.indexOf("/content/consulting/") + 20
      ),
      {
        imgSrc: node.publicURL,
        aspectRatio: node.childImageSharp.fluid.aspectRatio,
      },
    ])
  );
  return (
    <Layout>
      <SEO title="Consulting">
        <link
          href="https://assets.calendly.com/assets/external/widget.css"
          rel="stylesheet"
        />
        <script
          type="text/javascript"
          src="https://assets.calendly.com/assets/external/widget.js"
        />
      </SEO>

      <Container maxWidth={"md"}>
        <Typography variant="h3" style={{ margin: "16px 0" }}>
          Consulting
        </Typography>
        <Typography variant="body1" style={{ margin: "16px 0" }}>
          I offer consulting calls to give advice and insights on how to improve
          your Roam usage, general productivity tips, AWS help, React help, and
          more! If you are interested,{" "}
          <Link
            onClick={() =>
              Calendly.initPopupWidget({
                url: "https://calendly.com/dvargas92495/consulting",
              })
            }
            style={{ color: colors.secondary, cursor: "pointer" }}
          >
            book a slot on my calendly.
          </Link>{" "}
          With your permission, I'd like to publish as many of these consulting
          calls, in case someone else finds it helpful!
        </Typography>
        <Grid container spacing={2}>
          {data.site.siteMetadata.consulting.map(
            ({ title, imgSrc, url }, i) => (
              <Thumbnail
                title={title}
                i={i}
                key={i}
                thumbnailImage={thumbnailImagesByVideo[imgSrc]}
                url={url}
              />
            )
          )}
        </Grid>
      </Container>
    </Layout>
  );
};

export default Consulting;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        consulting {
          title
          imgSrc
          url
        }
      }
    }
    allFile(filter: { sourceInstanceName: { eq: "consulting" } }) {
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
`;
