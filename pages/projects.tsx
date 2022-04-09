import React from "react";
import type ReactDOM from "react-dom";

type Projects = {
  name: string;
  url: string;
  description?: string;
  image: string;
}[];

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
  <div
    style={{
      margin: "0px 4px",
      boxSizing: "border-box",
      flexGrow: 0,
      maxWidth: "10%",
      flexBasis: "10%",
      padding: 4,
      borderRadius: 8,
      boxShadow:
        "0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)",
      width: "10%",
      display: "flex",
      flexWrap: "wrap",
    }}
  >
    <img
      src={imgSrc}
      width={"100%"}
      style={{ borderRadius: 8, boxShadow: "none", height: "unset" }}
    />
    <h6
      style={{
        margin: "16px 0",
        padding: "0 4px",
        fontSize: "8px",
      }}
    >
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener"
          style={{ textDecoration: "none" }}
        >
          {title}
        </a>
      ) : (
        title
      )}
    </h6>
  </div>
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
  const imageGrid = (
    <div style={{ flexGrow: 0, flexBasis: "25%", maxWidth: "25%", margin: 0 }}>
      <img
        src={imgSrc}
        height={"100%"}
        width={"100%"}
        style={{ borderRadius: 8, boxShadow: "none" }}
      />
    </div>
  );
  const contentGrid = (
    <div
      style={{
        maxWidth: "75%",
        flexBasis: "75%",
        flexGrow: 0,
        margin: 0,
        paddingLeft: 24,
        paddingRight: 24,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          textAlign: "center",
          width: "100%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <a
          href={link}
          target="_blank"
          rel="noopener"
          style={{
            textDecoration: "none",
            color: "#3ba4dc",
            margin: 16,
            fontSize: "1.5rem",
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            fontWeight: 400,
          }}
        >
          {title}
        </a>
      </div>
      <div
        style={{
          textAlign: "justify",
          width: "100%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <p style={{ marginTop: 8 }}>{description}</p>
      </div>
    </div>
  );
  return (
    <div
      style={{
        margin: "8px 0",
        boxSizing: "border-box",
        flexGrow: 0,
        maxWidth: "100%",
        flexBasis: "100%",
        borderRadius: 8,
        boxShadow:
          "0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)",
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {ltr ? imageGrid : contentGrid}
      {ltr ? contentGrid : imageGrid}
    </div>
  );
};

const ProjectsPage = ({ projects }: { projects: Projects }) => (
  <div
    style={{
      margin: "16px 0",
      width: "100%",
      display: "flex",
      flexWrap: "wrap",
      boxSizing: "border-box",
    }}
  >
    {projects.map(({ name, url, description, image }, i) =>
      description ? (
        <Project
          key={i}
          title={name}
          link={url}
          description={description}
          imgSrc={image}
          ltr={i % 2 === 0}
        />
      ) : (
        <Sponsor title={name} imgSrc={image} url={url} key={i} />
      )
    )}
  </div>
);

Array.from(document.getElementsByClassName("page-root")).forEach((d) => {
  (d as HTMLDivElement).style.paddingTop = "0";
  window.ReactDOM.render(
    <ProjectsPage projects={window[d.id] as Projects} />,
    d
  );
});
