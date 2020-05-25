import React from "react";
import { render } from "@testing-library/react";
import Bio from "../bio";
import { useStaticQuery } from "gatsby";

const mockUseStaticQuery = useStaticQuery as jest.Mock<any>;

test("Renders bio", () => {
  mockUseStaticQuery.mockImplementation(() => ({
    site: {
      siteMetadata: {
        author: {
          name: "Test Author Name",
          summary: "Test Author Summary",
        },
        social: {
          twitter: "TestTwitter",
        },
      },
    },
    avatar: {
      childImageSharp: {
        fixed: {
          width: 50,
          height: 50,
          base64: "",
          src: "",
          srcSet: "",
        },
      },
    },
  }));
  const { container } = render(<Bio />);
  expect(container).toBeInTheDocument();
});
