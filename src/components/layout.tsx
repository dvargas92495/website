import React, { useEffect } from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import AppBar from "@material-ui/core/AppBar";
import Email from "@material-ui/icons/Email";
import GitHub from "@material-ui/icons/GitHub";
import Instagram from "@material-ui/icons/Instagram";
import LinkedIn from "@material-ui/icons/LinkedIn";
import Twitter from "@material-ui/icons/Twitter";
import Reddit from "@material-ui/icons/Reddit";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import { colors } from "../utils/typography";
import Container from "@material-ui/core/Container";
import SvgIcon from "@material-ui/core/SvgIcon";

const FooterIcon = ({ children, href }) => (
  <a
    href={href}
    style={{
      color: colors.secondary,
      margin: "0 8px",
      boxShadow: "none",
    }}
    target="_blank"
    rel="noopener"
  >
    {children}
  </a>
);

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query LayoutQuery {
      site {
        siteMetadata {
          title
        }
      }
      logo: file(absolutePath: { regex: "/StravaLogo.png/" }) {
        publicURL
      }

      medium: file(absolutePath: { regex: "/medium.png/" }) {
        publicURL
      }

      indieHacker: file(absolutePath: { regex: "/indie-hacker.png/" }) {
        publicURL
      }

      devto: file(absolutePath: { regex: "/devto.png/" }) {
        publicURL
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
            <Link
              style={{ marginLeft: 8, color: colors.secondary }}
              to="/interests"
            >
              Interests
            </Link>
            <Link
              style={{ marginLeft: 8, color: colors.secondary }}
              to="/goals"
            >
              Goals
            </Link>
            <Link
              style={{ marginLeft: 8, color: colors.secondary }}
              to="/support"
            >
              Support
            </Link>
          </Toolbar>
        </Toolbar>
      </AppBar>
      <main
        style={{
          flexGrow: 1,
          backgroundColor: colors.tertiary,
          marginBottom: 32,
        }}
      >
        {children}
        <Container
          maxWidth="sm"
          style={{
            marginTop: 32,
            textAlign: "center",
            border: `dashed 1px ${colors.primary}`,
            borderRadius: 32,
          }}
        >
          <Typography variant="h6">Strava Listens</Typography>
          <Typography variant="subtitle2" style={{ marginBottom: 16 }}>
            Every morning I go on a run, I listen to a podcast and tag my run on
            Strava with my main takeaway. Subscribe to my newsletter below to
            see me expand on these takeaways, as well as some personal updates.
            New issues Sunday mornings!
          </Typography>
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
          © {new Date().getFullYear()} Vargas Arts, LLC, Built with
          {` `}
          <a
            href="https://www.gatsbyjs.org"
            style={{ color: colors.secondary }}
          >
            Gatsby
          </a>
        </span>
        <span>
          <FooterIcon href="https://twitter.com/dvargas92495">
            <Twitter />
          </FooterIcon>
          <FooterIcon href="https://github.com/dvargas92495">
            <GitHub />
          </FooterIcon>
          <FooterIcon href="mailto:dvargas92495@gmail.com">
            <Email />
          </FooterIcon>
          <FooterIcon href="https://www.indiehackers.com/dvargas92495">
            <SvgIcon>
              <image
                href={data.indieHacker.publicURL}
                style={{ height: "100%" }}
              />
            </SvgIcon>
          </FooterIcon>
          <FooterIcon href="https://dev.to/dvargas92495">
            <SvgIcon>
              <image href={data.devto.publicURL} style={{ height: "100%" }} />
            </SvgIcon>
          </FooterIcon>
          <FooterIcon href="https://www.strava.com/athletes/dvargas92495">
            <SvgIcon>
              <image href={data.logo.publicURL} style={{ height: "100%" }} />
            </SvgIcon>
          </FooterIcon>
          <FooterIcon href="https://www.reddit.com/user/dvargas92495">
            <Reddit />
          </FooterIcon>
          <FooterIcon href="https://medium.com/@dvargas92495">
            <SvgIcon>
              <image href={data.medium.publicURL} style={{ height: "100%" }} />
            </SvgIcon>
          </FooterIcon>
          <FooterIcon href="https://instagram.com/dvargas92495">
            <Instagram />
          </FooterIcon>
          <FooterIcon href="https://linkedin.com/in/dvargas92495">
            <LinkedIn />
          </FooterIcon>
        </span>
      </footer>
    </div>
  );
};

export default Layout;
