import React from "react";
import { graphql, PageProps, Link } from "gatsby";
import { Data } from "../utils/data";
import { rhythm, colors } from "../utils/typography";
import Layout from "../components/layout";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

const Blogs = ({ data }: Partial<PageProps<Data>>) => (
  <Layout>
    <div
      style={{
        flexGrow: 1,
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <Typography variant="h3">My Personal Blog</Typography>
      <Typography variant="body1">
        On this page, you'll find various articles that reflect my random
        thoughts and observations of the world.
      </Typography>
      <Grid container spacing={2}>
        {data.allMarkdownRemark.edges.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug;
          return (
            <Grid item xs={4} key={node.fields.slug}>
              <Card>
                <Container style={{ color: colors.quintary }}>
                  <header>
                    <Typography
                      variant="h5"
                      style={{
                        marginBottom: rhythm(1 / 4),
                      }}
                    >
                      <Link
                        style={{ boxShadow: `none`, color: colors.secondary }}
                        to={node.fields.slug}
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
          );
        })}
      </Grid>
    </div>
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
