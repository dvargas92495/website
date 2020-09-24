import React, { useMemo, useState, useCallback, ChangeEvent } from "react";
import { isBrowser } from "react-device-detect";
import Image from "material-ui-image";
import { graphql, PageProps, Link } from "gatsby";
import { Data } from "../utils/data";
import { colors } from "../utils/typography";
import Layout from "../components/layout";
import Zoom from "@material-ui/core/Zoom";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import NoSsr from "@material-ui/core/NoSsr";
import Pagination from "@material-ui/lab/Pagination";
import SEO from "../components/seo";
import TextField from "@material-ui/core/TextField";

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

const PAGE_SIZE = 9;

const Blogs = ({ data }: Partial<PageProps<Data & ImageFileData>>) => {
  const socialImagesByBlog = useMemo(
    () =>
      Object.fromEntries(
        data.allFile.edges.map(({ node }) => [
          node.absolutePath.substring(
            node.absolutePath.indexOf("/content/blog/") + 13,
            node.absolutePath.indexOf("social.png")
          ),
          {
            imgSrc: node.publicURL,
            aspectRatio: node?.childImageSharp?.fluid?.aspectRatio || 1,
          },
        ])
      ),
    [data.allFile.edges]
  );
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const allBlogs = data.allMarkdownRemark.edges;
  const filteredBlogs = search
    ? allBlogs.filter(
        ({ node }) =>
          node.frontmatter.title.toLowerCase().indexOf(search.toLowerCase()) >
            -1 ||
          node.frontmatter.description
            .toLowerCase()
            .indexOf(search.toLowerCase()) > -1 ||
          !!(node.frontmatter.tags || "")
            .split(",")
            .find(
              t => t.trim().toLowerCase().indexOf(search.toLowerCase()) > -1
            )
      )
    : allBlogs;
  const total = filteredBlogs.length;
  const currentPage = Math.min(page, Math.ceil(total / PAGE_SIZE));

  const blogs = filteredBlogs.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );
  const onPageChange = useCallback((_, value) => setPage(value), [setPage]);
  const onSearchChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value),
    [setSearch]
  );
  return (
    <Layout>
      <SEO title="Blog" />
      <Container maxWidth={"md"}>
        <Typography
          variant="h3"
          style={{
            margin: "16px 0",
            fontFamily: "'Merriweather','Georgia',serif",
          }}
        >
          My Personal Blog
        </Typography>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="body1"
            style={{
              marginBottom: 16,
            }}
          >
            Articles reflecting the many lessons I've learned so far.
          </Typography>
          <TextField
            label="Search..."
            variant="outlined"
            style={{ width: 400 }}
            onChange={onSearchChange}
            value={search}
          />
        </div>
        <Pagination
          count={Math.ceil(total / PAGE_SIZE)}
          shape="rounded"
          onChange={onPageChange}
          page={currentPage}
          size="large"
        />
        <Grid container spacing={2}>
          {blogs.map(({ node }, i) => {
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
                <Grid item xs={isBrowser ? 4 : 12}>
                  <Card style={{ height: 400 }}>
                    <div style={{ height: isBrowser ? 200 : 225 }}>
                      {socialImg && (
                        <NoSsr>
                          <Image
                            src={socialImg.imgSrc}
                            aspectRatio={socialImg.aspectRatio}
                            style={{backgroundColor: 'transparent'}}
                            imageStyle={{maxHeight: isBrowser ? 200 : 225}}
                          />
                        </NoSsr>
                      )}
                    </div>
                    <Container
                      style={{
                        color: colors.primary,
                        height: isBrowser ? 200 : 175,
                      }}
                    >
                      <header>
                        <Typography
                          variant="h5"
                          style={{
                            fontFamily: "'Merriweather','Georgia',serif",
                          }}
                        >
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
            tags
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
