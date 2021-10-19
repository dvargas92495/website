import type React from "react";
import type ReactDOM from "react-dom";

declare global {
  interface Window {
    blogs: { name: string }[];
    React: typeof React;
    ReactDOM: typeof ReactDOM;
  }
}

const BlogPage = () => {
  return (
    <ul>
      {window.blogs.map(({ name }, i) => (
        <li key={i}>{name}</li>
      ))}
    </ul>
  );
};

window.ReactDOM.render(<BlogPage />, document.getElementById("page-root"));
