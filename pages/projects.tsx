import type React from "react";
import type ReactDOM from "react-dom";
import { isBrowser, BrowserView, MobileView } from "react-device-detect";
import Image from "material-ui-image";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Slide from "@material-ui/core/Slide";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import ArrowDropUp from "@material-ui/icons/ArrowDropUp";
import Card from "@material-ui/core/Card";

type Projects = {
  name: string;
  url: string;
  description?: string;
  image?: string;
}[];

const PROJECT_KINDS = ["apps", "npm", "tf", "sponsors"] as const;

declare global {
  interface Window {
    [k: string]: Projects;
    React: typeof React;
    ReactDOM: typeof ReactDOM;
  }
}

const Sponsor = ({
  title,
  url,
  imgSrc,
}: {
  imgSrc: string;
  title: string;
  url: string;
}) => (
  <Grid item xs={4}>
    <Card
      style={{
        textAlign: "center",
        minHeight: 250,
      }}
    >
      <Image
        src={imgSrc}
        aspectRatio={1}
        style={{ borderRadius: 8 }}
        imageStyle={{ boxShadow: "unset" }}
      />
      <Typography
        variant="h6"
        style={{
          margin: "16px 0",
          padding: "0 4px",
        }}
      >
        {url ? (
          <Link href={url} target="_blank" rel="noopener">
            {title}
          </Link>
        ) : (
          title
        )}
      </Typography>
    </Card>
  </Grid>
);

const Package = ({
  title,
  url,
  description,
}: {
  description: string;
  title: string;
  url: string;
}) => (
  <Grid item xs={isBrowser ? 3 : 4}>
    <Card
      style={{
        textAlign: "center",
        minHeight: 250,
        padding: 8,
      }}
    >
      <Typography
        variant="h6"
        style={{
          margin: "16px 0",
          padding: "0 4px",
          minHeight: 64,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          wordBreak: "break-all",
        }}
      >
        {url ? (
          <Link href={url} target="_blank" rel="noopener">
            {title}
          </Link>
        ) : (
          title
        )}
      </Typography>
      <Typography variant="subtitle1" style={{ fontSize: 12 }}>
        {description}
      </Typography>
    </Card>
  </Grid>
);

const Project = ({
  title,
  link,
  description,
  imgSrc,
  ltr,
}: {
  title: string;
  link: string;
  description: string;
  imgSrc: string;
  ltr: boolean;
}) => {
  const [showDescription, setShowDescription] = window.React.useState(false);
  const openDescription = window.React.useCallback(
    () => setShowDescription(true),
    [setShowDescription]
  );
  const closeDescription = window.React.useCallback(
    () => setShowDescription(false),
    [setShowDescription]
  );
  const imageGrid = (
    <Grid item xs={isBrowser ? 4 : 2}>
      <Image src={imgSrc} aspectRatio={1} style={{ borderRadius: 8 }} />
    </Grid>
  );
  const contentGrid = (
    <Grid item xs={isBrowser ? 8 : 10}>
      <Container style={{ textAlign: "center" }}>
        <Link href={link} target="_blank" rel="noopener">
          <Typography
            variant="h5"
            style={{
              margin: 16,
            }}
          >
            {title}
          </Typography>
        </Link>
      </Container>
      <Container style={{ textAlign: "justify" }}>
        <BrowserView>
          <Typography variant="body1" style={{ marginTop: 8 }}>
            {description}
          </Typography>
        </BrowserView>
        <MobileView>
          {showDescription ? (
            <>
              <Typography variant="body1" style={{ marginTop: 8 }}>
                {description}
              </Typography>
              <IconButton
                onClick={closeDescription}
                style={{ padding: 0, width: "100%", textAlign: "center" }}
              >
                <ArrowDropUp fontSize={"large"} />
              </IconButton>
            </>
          ) : (
            <IconButton
              onClick={openDescription}
              style={{ padding: 0, width: "100%", textAlign: "center" }}
            >
              <ArrowDropDown fontSize={"large"} />
            </IconButton>
          )}
        </MobileView>
      </Container>
    </Grid>
  );
  return (
    <Grid item xs={12}>
      <Slide
        direction={ltr ? "left" : "right"}
        in={true}
        mountOnEnter
        unmountOnExit
      >
        <Paper elevation={3} style={{ marginTop: 16, borderRadius: 8 }}>
          <Grid container>
            {ltr ? imageGrid : contentGrid}
            {ltr ? contentGrid : imageGrid}
          </Grid>
        </Paper>
      </Slide>
    </Grid>
  );
};

const ProjectsPage = ({ projects }: { projects: Projects }) => (
  <Grid container style={{ margin: "16px 0" }} spacing={1}>
    {projects.map(({ name, url, description, image }, i) =>
      image && description ? (
        <Project
          key={i}
          title={name}
          link={url}
          description={description}
          imgSrc={image}
          ltr={i % 2 === 0}
        />
      ) : description ? (
        <Package key={i} title={name} url={url} description={description} />
      ) : image ? (
        <Sponsor title={name} imgSrc={image} url={url} key={i} />
      ) : (
        <div>{name} is Invalid</div>
      )
    )}
  </Grid>
);

Array.from(document.getElementsByClassName("page-root")).forEach(d => {
  (d as HTMLDivElement).style.paddingTop = "0";
  window.ReactDOM.render(
    <ProjectsPage projects={window[d.id] as Projects} />,
    d
  );
});
