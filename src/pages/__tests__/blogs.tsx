import React from "react";
import { render } from "@testing-library/react";
import Blogs from "../blogs";

test("Render the Blog Page", () => {
  const { container } = render(<Blogs />);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div>
        <h1>
          My Personal Blog
        </h1>
      </div>
    </div>
  `);
});
