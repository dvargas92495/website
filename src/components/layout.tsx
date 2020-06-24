import React, { useEffect } from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import AppBar from "@material-ui/core/AppBar";
import Twitter from "@material-ui/icons/Twitter";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import { colors } from "../utils/typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

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
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://prodigious-trader-7332.ck.page/cd67433313/index.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      const otherScript = Array.from(
        document.getElementsByTagName("script")
      ).find(c => c.src.indexOf("convertkit") > -1);
      document.body.removeChild(otherScript);
    };
  }, []);
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AppBar position="sticky" style={{ backgroundColor: colors.primary }}>
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Typography variant="h6">
            <Link to="/">{title}</Link>
          </Typography>
          <Toolbar>
            <Link style={{ marginLeft: 8 }} to="/projects">
              Projects
            </Link>
            <Link style={{ marginLeft: 8 }} to="/blog">
              Blog
            </Link>
          </Toolbar>
        </Toolbar>
      </AppBar>
      <main style={{ flexGrow: 1 }}>
        {children}
        <Container maxWidth="xs">
          <script data-uid="cd67433313"></script>
        </Container>
      </main>
      <footer
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 8,
          bottom: 0,
          position: "sticky",
          right: 0,
          left: 0,
          flexShrink: 0,
          backgroundColor: colors.primary,
          color: colors.tertiary,
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
