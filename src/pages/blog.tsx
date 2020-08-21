import React from "react";
import Image from "material-ui-image";
import { graphql, PageProps, Link } from "gatsby";
import { Data } from "../utils/data";
import { rhythm, colors } from "../utils/typography";
import Layout from "../components/layout";
import Zoom from "@material-ui/core/Zoom";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import NoSsr from "@material-ui/core/NoSsr";
import SEO from "../components/seo";

type ImageFileData = {
  allFile: {
    edges: {
      node: {
        publicURL: string;
        absolutePath: string;
        childImageSharp: {
          fluid: {
            aspectRatio: number;
          };
        };
      };
    }[];
  };
};

const Blogs = ({ data }: Partial<PageProps<Data & ImageFileData>>) => {
  const socialImagesByBlog = Object.fromEntries(
    data.allFile.edges.map(({ node }) => [
      node.absolutePath.substring(
        node.absolutePath.indexOf("/content/blog/") + 13,
        node.absolutePath.indexOf("social.png")
      ),
      {
        imgSrc: node.publicURL,
        aspectRatio: node.childImageSharp.fluid.aspectRatio,
      },
    ])
  );
  return (
    <Layout>
      <SEO title="Blog" />
      <Container maxWidth={"md"}>
        <Typography variant="h2" style={{ margin: "16px 0" }}>
          My Personal Blog
        </Typography>
        <Typography variant="body1" style={{ marginBottom: 16 }}>
          Articles reflecting the many lessons I've learned so far.
        </Typography>
        <Grid container spacing={2}>
          {data.allMarkdownRemark.edges.map(({ node }, i) => {
            const title = node.frontmatter.title || node.fields.slug;
            const delay = (Math.floor(i / 3) + 1) * 500;
            const socialImg = socialImagesByBlog[node.fields.slug];
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
                  <Card style={{ height: 400 }}>
                    <div style={{ height: 200 }}>
                      {socialImg && (
                        <NoSsr>
                          <Image
                            src={socialImg.imgSrc}
                            aspectRatio={socialImg.aspectRatio}
                          />
                        </NoSsr>
                      )}
                    </div>
                    <Container style={{ color: colors.primary, height: 200 }}>
                      <header>
                        <Typography variant="h5">
                          <Link
                            style={{ boxShadow: `none`, color: colors.primary }}
                            to={`/blog/${node.fields.slug.substring(10)}`}
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
};

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
    allFile(filter: { relativePath: { regex: "/social.png/" } }) {
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
