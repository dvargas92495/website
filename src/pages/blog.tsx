import React from "react";
import { graphql, PageProps, Link } from "gatsby";
import { Data } from "../utils/data";
import { rhythm, colors } from "../utils/typography";
import Layout from "../components/layout";
import Zoom from "@material-ui/core/Zoom";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

const Blogs = ({ data }: Partial<PageProps<Data>>) => (
  <Layout>
    <Container maxWidth={"md"}>
      <Typography variant="h2" style={{ margin: "16px 0" }}>
        My Personal Blog
      </Typography>
      <Typography variant="body1" style={{ marginBottom: 16 }}>
        On this page, you'll find various articles that reflect my random
        thoughts and observations of the world.
      </Typography>
      <Grid container spacing={2}>
        {data.allMarkdownRemark.edges.map(({ node }, i) => {
          const title = node.frontmatter.title || node.fields.slug;
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
              key={node.fields.slug}
            >
              <Grid item xs={4}>
                <Card style={{ height: 200 }}>
                  <Container style={{ color: colors.primary }}>
                    <header>
                      <Typography
                        variant="h5"
                        style={{
                          marginBottom: rhythm(1 / 4),
                        }}
                      >
                        <Link
                          style={{ boxShadow: `none`, color: colors.primary }}
                          to={`/blog${node.fields.slug}`}
                        >
                          {title}
                        </Link>
                      </Typography>
                      <Typography variant="subtitle2">
                        {node.frontmatter.date}
                      </Typography>
                    </header>
                    <section>
                      <Typography variant="body2">
                        {node.frontmatter.description}
                      </Typography>
                    </section>
                  </Container>
                </Card>
              </Grid>
            </Zoom>
          );
        })}
      </Grid>
    </Container>
  </Layout>
);

export default Blogs;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`;
