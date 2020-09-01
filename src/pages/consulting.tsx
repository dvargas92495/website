import React from "react";
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

const Thumbnail = ({ title, i }: { i: number; title: string }) => {
  const delay = (Math.floor(i / 3) + 1) * 500;
  // const socialImg = socialImagesByBlog[node.fields.slug];
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
      <Grid item xs={4}>
        <Card style={{ height: 400 }}>
          <div style={{ height: 200 }}>
            {/*
              socialImg && (
                <NoSsr>
                  <Image
                    src={socialImg.imgSrc}
                    aspectRatio={socialImg.aspectRatio}
                  />
                </NoSsr>
              )  */}
            Thumbnail Coming Soon...
          </div>
          <Container style={{ color: colors.primary, height: 200 }}>
            <header>
              <Typography variant="h5">
                {/*<Link
                    style={{ boxShadow: `none`, color: colors.primary }}
                    to={`/blog/${node.fields.slug.substring(10)}`}
                  >
                    {title}
                  </Link>*/}
                {title}
              </Typography>
            </header>
          </Container>
        </Card>
      </Grid>
    </Zoom>
  );
};

const Consulting = ({ data }) => (
  <Layout>
    <SEO title="Consulting" />

    <Container maxWidth={"md"}>
      <Typography variant="h2" style={{ margin: "16px 0" }}>
        Consulting
      </Typography>
      <Typography variant="body1" style={{ margin: "16px 0" }}>
        I offer consulting calls to give advice and insights on how to improve
        your Roam usage, general productivity tips, AWS help, React help, and
        more! If you are interested,{" "}
        <Link
          href="https://calendly.com/dvargas92495/consulting"
          style={{ color: colors.secondary }}
          target="_blank"
          rel="noopener"
        >
          book a slot on my calendly.
        </Link>{" "}
        With your permission, I'd like to publish as many of these consulting
        calls, in case someone else finds it helpful!
      </Typography>
      <Grid container spacing={2}>
        {data.site.siteMetadata.consulting.map(({ title }, i) => (
          <Thumbnail title={title} i={i} key={i} />
        ))}
      </Grid>
    </Container>
  </Layout>
);

export default Consulting;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        consulting {
          title
        }
      }
    }
  }
`;
