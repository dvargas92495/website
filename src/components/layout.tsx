import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import { rhythm } from "../utils/typography";
import AppBar from "@material-ui/core/AppBar";
import Twitter from "@material-ui/icons/Twitter";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import { colors } from "../utils/typography";

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
      <AppBar
        position="sticky"
        style={{ backgroundColor: colors.primary }}
      >
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Typography variant="h6">
            <Link to="/">{title}</Link>
          </Typography>
          <Link to="/blog">Blog</Link>
        </Toolbar>
      </AppBar>
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
          <Twitter />
        </a>
      </footer>
    </div>
  );
};

export default Layout;
