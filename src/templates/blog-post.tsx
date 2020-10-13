import React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import { rhythm, scale } from "../utils/typography";
import Container from "@material-ui/core/Container";
import MaterialLink from "@material-ui/core/Link";

const BlogPostTemplate = ({ data, pageContext }) => {
  const post = data.markdownRemark;
  const { previous, next } = pageContext;
  const social = data.social?.childImageSharp?.fluid?.src;
  const editorByName = Object.fromEntries(
    data.site.siteMetadata.editors.map(e => [e.name, e.url])
  );
  const acks = post.frontmatter.acknowledgement
    ? post.frontmatter.acknowledgement.split(", ")
    : [];
  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        meta={[
          {
            name: "monetization",
            content: "$ilp.uphold.com/kJfRG8LxiaAy",
          },
          ...(social
            ? [
                {
                  name: "og:image",
                  content: `https://davidvargas.me/${social}`,
                },
                {
                  name: "twitter:image",
                  content: `https://davidvargas.me/${social}`,
                },
              ]
            : []),
        ]}
      />
      <Container maxWidth={"md"}>
        <article>
          <header>
            <h1
              style={{
                marginTop: rhythm(1),
                marginBottom: 0,
              }}
            >
              {post.frontmatter.title}
            </h1>
            <p
              style={{
                ...scale(-1 / 5),
                display: `block`,
                marginBottom: rhythm(1),
              }}
            >
              {post.frontmatter.date}
            </p>
          </header>
          <section dangerouslySetInnerHTML={{ __html: post.html }} />
          {post.frontmatter.acknowledgement && (
            <p
              style={{
                marginBottom: 16,
                fontSize: 12,
              }}
            >
              <i>
                A special thanks to my friends for help with this article:
                {acks.map((name, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && acks.length > 2 && ","}
                    {i > 0 && i === acks.length - 1 && " and"}
                    {" "}
                    <MaterialLink
                      href={editorByName[name]}
                      target="_blank"
                      rel="noopener"
                    >
                      {name}
                    </MaterialLink>
                  </React.Fragment>
                ))}
              </i>
            </p>
          )}
          <hr
            style={{
              marginBottom: rhythm(1),
            }}
          />
        </article>
        <nav>
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
              marginLeft: 0,
            }}
          >
            <li>
              {previous && (
                <Link
                  to={`/blog/${previous.fields.slug.substring(10)}`}
                  rel="prev"
                >
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={`/blog/${next.fields.slug.substring(10)}`} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </Container>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!, $socialImage: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        acknowledgement
      }
    }
    social: file(absolutePath: { regex: $socialImage }) {
      childImageSharp {
        fluid(maxWidth: 2000, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    site {
      siteMetadata {
        editors {
          name
          url
        }
      }
    }
  }
`;
