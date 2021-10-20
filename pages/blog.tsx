import type React from "react";
import type ReactDOM from "react-dom";
import { isBrowser } from "react-device-detect";
import Image from "material-ui-image";
import Zoom from "@material-ui/core/Zoom";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
import TextField from "@material-ui/core/TextField";
import datefnsParse from "date-fns/parse";

declare global {
  interface Window {
    blogs: { name: string; image: string; description: string; date: string }[];
    React: typeof React;
    ReactDOM: typeof ReactDOM;
  }
}

const PAGE_SIZE = 9;

const { useMemo, useCallback, useState } = window.React;

const BlogPage = () => {
  const allBlogs = useMemo(
    () =>
      window.blogs
        .map(({ name, image, ...rest }, i) => ({
          ...rest,
          image: /^!\[\]\((.*)\)$/.exec(image)?.[1] || "",
          name: name.replace(/^Blog\//, ""),
          dateValue: rest.date
            ? datefnsParse(rest.date, "MMMM do, yyyy", new Date())
            : new Date(9999, 0, i),
        }))
        .sort(
          ({ dateValue: a }, { dateValue: b }) => b.valueOf() - a.valueOf()
        ),
    []
  );
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const filteredBlogs = useMemo(
    () =>
      search
        ? allBlogs.filter(
            ({ name, description }) =>
              new RegExp(search, "i").test(name) ||
              new RegExp(search, "i").test(description)
          )
        : allBlogs,
    [search, allBlogs]
  );
  const total = filteredBlogs.length;
  const currentPage = Math.min(page, Math.ceil(total / PAGE_SIZE));

  const blogs = filteredBlogs.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );
  const onPageChange = useCallback((_, value) => setPage(value), [setPage]);
  const onSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value),
    [setSearch]
  );
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <TextField
        label="Search..."
        variant="outlined"
        style={{ width: 400 }}
        onChange={onSearchChange}
        value={search}
      />
      <Pagination
        count={Math.ceil(total / PAGE_SIZE)}
        shape="rounded"
        onChange={onPageChange}
        page={currentPage}
        size="large"
      />
      <Grid container spacing={2}>
        {blogs.map(({ name, image, date, description }, i) => {
          const delay = (Math.floor(i / 3) + 1) * 500;
          return (
            <Zoom
              in={true}
              mountOnEnter
              unmountOnExit
              timeout={{
                enter: delay,
                exit: delay,
              }}
              key={name}
            >
              <Grid item xs={isBrowser ? 4 : 12}>
                <Card style={{ height: 400, borderRadius: 8 }}>
                  <div style={{ height: isBrowser ? 200 : 225 }}>
                    {image && (
                      <Image
                        src={image}
                        aspectRatio={1}
                        style={{ backgroundColor: "transparent" }}
                        imageStyle={{
                          maxHeight: isBrowser ? 200 : 225,
                          boxShadow: "none",
                        }}
                      />
                    )}
                  </div>
                  <Container
                    style={{
                      color: "#3ba4dc",
                      height: isBrowser ? 200 : 175,
                      paddingTop: 16,
                    }}
                  >
                    <header>
                      <Typography
                        variant="h6"
                        style={{
                          fontFamily: "'Merriweather','Georgia',serif",
                          fontStyle: "normal",
                        }}
                      >
                        <a
                          style={{ boxShadow: `none`, color: "#3ba4dc" }}
                          href={`/blog/${name
                            .toLowerCase()
                            .replace(/ /g, "_")
                            .replace(/[",?#:$;@&=+'.|]/g, "")}`}
                        >
                          {name}
                        </a>
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        style={{ color: "#333333" }}
                      >
                        {date}
                      </Typography>
                    </header>
                    <section>
                      <Typography variant="body2" style={{ color: "#333333" }}>
                        {description}
                      </Typography>
                    </section>
                  </Container>
                </Card>
              </Grid>
            </Zoom>
          );
        })}
      </Grid>
    </div>
  );
};

window.ReactDOM.render(<BlogPage />, document.getElementById("page-root"));
