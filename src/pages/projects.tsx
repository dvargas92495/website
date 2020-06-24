import React from "react";
import { rhythm } from "../utils/typography";
import Layout from "../components/layout";

const Projects = () => (
  <Layout>
    <div
      style={{
        flexGrow: 1,
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <h1>Projects</h1>
      <p>
        I like to group the projects I'm involved with into two categories:
        those I invest my time on and those I invest money in. If you have an
        idea that you are particularly passionate about, I'd love to chat to see
        how we could make it happen! You could see the set of projects I'm
        involved with below:
      </p>
    </div>
  </Layout>
);

export default Projects;
