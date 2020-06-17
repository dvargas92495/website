import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useStaticQuery, graphql } from "gatsby";
import { rhythm } from "../utils/typography";
import { IoLogoTwitter } from "react-icons/io";

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query LayoutQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  const { title } = data.site.siteMetadata;
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">{title}</Navbar.Brand>
        <Nav>
          <Nav.Link href="/blog">Blog</Nav.Link>
        </Nav>
      </Navbar>
      <main
        style={{
          flexGrow: 1,
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        {children}
      </main>
      <footer
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 8,
        }}
      >
        <span>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </span>
        <a href="https://twitter.com/dvargas92495">
          <IoLogoTwitter />
        </a>
      </footer>
    </div>
  );
};

export default Layout;
