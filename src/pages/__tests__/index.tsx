import React from "react";
import { render } from "@testing-library/react";

test("Testing the Home Page", () => {
  const { container } = render(<div />);
  expect(container).toBeInTheDocument();
});
