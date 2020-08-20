import React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import { rhythm, scale } from "../utils/typography";
import Container from "@material-ui/core/Container";

const BlogPostTemplate = ({ data, pageContext }) => {
  const post = data.markdownRemark;
  const { previous, next } = pageContext;
  const social = data.social?.childImageSharp?.fluid?.src;
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
                  content: social,
                },
                {
                  name: "twitter:image",
                  content: social,
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
              }}
            >
              <i> {post.frontmatter.acknowledgement}</i>
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
        fluid(maxWidth: 400, maxHeight: 250) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
