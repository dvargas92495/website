import React, { useEffect } from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import AppBar from "@material-ui/core/AppBar";
import Email from "@material-ui/icons/Email";
import GitHub from "@material-ui/icons/GitHub";
import Instagram from "@material-ui/icons/Instagram";
import LinkedIn from "@material-ui/icons/LinkedIn";
import Twitter from "@material-ui/icons/Twitter";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import { colors } from "../utils/typography";
import Container from "@material-ui/core/Container";

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
            <Link
              to="/"
              style={{
                marginLeft: 8,
                color: colors.secondary,
                boxShadow: "none",
              }}
            >
              {title}
            </Link>
          </Typography>
          <Toolbar>
            <Link
              style={{ marginLeft: 8, color: colors.secondary }}
              to="/projects"
            >
              Projects
            </Link>
            <Link style={{ marginLeft: 8, color: colors.secondary }} to="/blog">
              Blog
            </Link>
          </Toolbar>
        </Toolbar>
      </AppBar>
      <main style={{ flexGrow: 1, backgroundColor: colors.tertiary }}>
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
          <a
            href="https://www.gatsbyjs.org"
            style={{ color: colors.secondary }}
          >
            Gatsby
          </a>
        </span>
        <span>
          <a
            href="https://twitter.com/dvargas92495"
            style={{
              color: colors.secondary,
              margin: "0 8px",
              boxShadow: "none",
            }}
          >
            <Twitter />
          </a>
          <a
            href="https://github.com/dvargas92495"
            style={{
              color: colors.secondary,
              margin: "0 8px",
              boxShadow: "none",
            }}
          >
            <GitHub />
          </a>
          <a
            href="mailto:dvargas92495@gmail.com"
            style={{
              color: colors.secondary,
              margin: "0 8px",
              boxShadow: "none",
            }}
          >
            <Email />
          </a>
          <a
            href="https://instagram.com/dvargas92495"
            style={{
              color: colors.secondary,
              margin: "0 8px",
              boxShadow: "none",
            }}
          >
            <Instagram />
          </a>
          <a
            href="www.linkedin.com/in/dvargas92495"
            style={{
              color: colors.secondary,
              margin: "0 8px",
              boxShadow: "none",
            }}
          >
            <LinkedIn />
          </a>
        </span>
      </footer>
    </div>
  );
};

export default Layout;
