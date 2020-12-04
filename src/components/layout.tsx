import React, { useCallback, useState, useEffect } from "react";
import { BrowserView, MobileView } from "react-device-detect";
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
import Youtube from "@material-ui/icons/YouTube";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import { colors } from "../utils/typography";
import Container from "@material-ui/core/Container";
import SvgIcon from "@material-ui/core/SvgIcon";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";
import CancelIcon from "@material-ui/icons/Cancel";
import WorkIcon from "@material-ui/icons/Work";
import CreateIcon from "@material-ui/icons/Create";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import TrackChangesIcon from "@material-ui/icons/TrackChanges";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Icon, InlineIcon } from "@iconify/react";
import twitchIcon from "@iconify/icons-mdi/twitch";
import Helmet from "react-helmet";

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
  const [footerExpanded, setFooterExpanded] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const openDrawer = useCallback(() => setDrawerOpen(true), [setDrawerOpen]);
  const closeDrawer = useCallback(() => setDrawerOpen(false), [setDrawerOpen]);
  const expandFooter = useCallback(() => setFooterExpanded(true), [
    setFooterExpanded,
  ]);
  const collapseFooter = useCallback(() => setFooterExpanded(false), [
    setFooterExpanded,
  ]);
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
      <Helmet></Helmet>
      <AppBar position="sticky" style={{ backgroundColor: colors.primary }}>
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            style={{
              fontFamily: "'Merriweather','Georgia',serif",
            }}
          >
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
          <BrowserView>
            <Toolbar>
              <Link
                style={{ marginLeft: 8, color: colors.secondary }}
                to="/projects"
              >
                Projects
              </Link>
              <Link
                style={{ marginLeft: 8, color: colors.secondary }}
                to="/blog"
              >
                Blog
              </Link>
              <Link
                style={{ marginLeft: 8, color: colors.secondary }}
                to="/consulting"
              >
                Consulting
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
          </BrowserView>
          <MobileView>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={openDrawer}
              style={{
                color: colors.secondary,
              }}
            >
              <MenuIcon />
            </IconButton>
          </MobileView>
        </Toolbar>
      </AppBar>
      <main
        style={{
          flexGrow: 1,
          backgroundColor: colors.tertiary,
          paddingBottom: 32,
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
          <Typography
            variant="h6"
            style={{
              fontFamily: "'Merriweather','Georgia',serif",
            }}
          >
            Vargas Ventures
          </Typography>
          <Typography variant="subtitle2" style={{ marginBottom: 16 }}>
            Subscribe to my monthly newsletter below for updates on what I'm building,
            what I'm writing, and where I'm travelling. I also share the best
            podcasts that I listened to that month, each tagged with my personal
            takeaway. New issues on the 5th of each month!
          </Typography>
          <script data-uid="cd67433313"></script>
        </Container>
      </main>
      <Drawer
        variant="persistent"
        anchor="right"
        open={drawerOpen}
        PaperProps={{
          style: {
            backgroundColor: colors.primary,
          },
        }}
      >
        <div>
          <IconButton
            onClick={closeDrawer}
            style={{
              color: colors.secondary,
            }}
          >
            <CancelIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {[
            { text: "Projects", IconComponent: WorkIcon },
            { text: "Blog", IconComponent: CreateIcon },
            { text: "Consulting", IconComponent: VideoCallIcon },
            { text: "Interests", IconComponent: MenuBookIcon },
            { text: "Goals", IconComponent: TrackChangesIcon },
            { text: "Support", IconComponent: AttachMoneyIcon },
          ].map(({ text, IconComponent }, index) => (
            <Link
              style={{ color: colors.secondary }}
              to={`/${text.toLowerCase()}`}
              key={index}
            >
              <ListItem button key={text}>
                <ListItemIcon>
                  <IconComponent style={{ color: colors.secondary }} />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
      <footer
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 8,
          flexShrink: 0,
          backgroundColor: colors.primary,
          color: colors.tertiary,
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <span>
          <FooterIcon href="https://twitter.com/dvargas92495">
            <Twitter />
          </FooterIcon>
          <FooterIcon href="https://github.com/dvargas92495">
            <GitHub />
          </FooterIcon>
          <FooterIcon href="https://www.twitch.tv/dvargas92495">
            <Icon icon={twitchIcon} style={{ fontSize: "1.5rem" }} />
          </FooterIcon>
          <FooterIcon href="https://www.youtube.com/channel/UC6UVFCK1BcIMnT0XY4iUS_g">
            <Youtube />
          </FooterIcon>
          <FooterIcon href="mailto:dvargas92495@gmail.com">
            <Email />
          </FooterIcon>
          {footerExpanded ? (
            <>
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
                  <image
                    href={data.devto.publicURL}
                    style={{ height: "100%" }}
                  />
                </SvgIcon>
              </FooterIcon>
              <FooterIcon href="https://www.strava.com/athletes/dvargas92495">
                <SvgIcon>
                  <image
                    href={data.logo.publicURL}
                    style={{ height: "100%" }}
                  />
                </SvgIcon>
              </FooterIcon>
              <FooterIcon href="https://www.reddit.com/user/dvargas92495">
                <Reddit />
              </FooterIcon>
              <FooterIcon href="https://medium.com/@dvargas92495">
                <SvgIcon>
                  <image
                    href={data.medium.publicURL}
                    style={{ height: "100%" }}
                  />
                </SvgIcon>
              </FooterIcon>
              <FooterIcon href="https://instagram.com/dvargas92495">
                <Instagram />
              </FooterIcon>
              <FooterIcon href="https://linkedin.com/in/dvargas92495">
                <LinkedIn />
              </FooterIcon>
              <IconButton
                onClick={collapseFooter}
                style={{
                  color: colors.secondary,
                  margin: "0 8px",
                  padding: 0,
                  boxShadow: "none",
                  top: -8,
                }}
              >
                <ChevronLeft />
              </IconButton>
            </>
          ) : (
            <IconButton
              onClick={expandFooter}
              style={{
                color: colors.secondary,
                margin: "0 8px",
                padding: 0,
                boxShadow: "none",
                top: -8,
              }}
            >
              <ChevronRight />
            </IconButton>
          )}
        </span>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <span>© {new Date().getFullYear()} Vargas Arts LLC</span>
          <span>
            <Link to="/manifesto" style={{ color: colors.secondary, marginRight: 64 }}>
              Manifesto
            </Link>
          </span>
          <span>
            Built with
            {` `}
            <a
              href="https://www.gatsbyjs.org"
              style={{ color: colors.secondary }}
            >
              Gatsby
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
