import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grow from "@material-ui/core/Grow";
import Grid from "@material-ui/core/Grid";
import { colors } from "../utils/typography";
import { graphql, useStaticQuery } from "gatsby";
import Card from "@material-ui/core/Card";

const Book = ({
  title,
  description,
  author,
  index,
}: {
  title: string;
  description: string;
  author: string;
  index: number;
}) => (
  <Grid item xs={4} style={{ color: colors.primary }}>
    <Grow
      in={true}
      mountOnEnter
      unmountOnExit
      timeout={{
        enter: (Math.floor(index / 3) + 1) * 500,
        exit: (Math.floor(index / 3) + 1) * 500,
      }}
    >
      <Card style={{ backgroundColor: colors.tertiary }}>
        <Container style={{ textAlign: "center" }}>
          <Typography variant="h6">{title}</Typography>
        </Container>
        <Container style={{ textAlign: "center" }}>
          <Typography variant="subtitle1">{author}</Typography>
        </Container>
        <Container style={{ marginTop: 8 }}>
          <Typography variant="body1">{description}</Typography>
        </Container>
      </Card>
    </Grow>
  </Grid>
);

const Books = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          interests {
            books {
              title
              description
              author
            }
          }
        }
      }
    }
  `);
  return (
    <>
      <Container maxWidth={"md"}>
        <Typography variant="h2" style={{ margin: "16px 0" }}>
          Books
        </Typography>
        <Typography variant="body1">
          Before the year 2020, I could count the number of books I read on my
          own volition on one hand. I then discovered something incredible about
          books: I could read to learn the lessons other people have learned
          without having to go through the pain of learning myself. I could then
          learn with this starting place in mind, instead of starting from
          scratch. To that end, I read mostly non-fiction. I hope that one of
          these books that have been really impactful for me will be for you
          too.
        </Typography>
      </Container>
      <Container maxWidth={"md"}>
        <Grid container style={{ marginBottom: 16 }} spacing={2}>
          {data.site.siteMetadata.interests.books.map(
            ({ title, description, author }, i) => (
              <Book
                key={i}
                title={title}
                description={description}
                author={author}
                index={i}
              />
            )
          )}
        </Grid>
      </Container>
    </>
  );
};

export default Books;
