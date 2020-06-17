import React from "react";
import { render } from "@testing-library/react";
import Index from "..";

test("Testing the Home Page", () => {
  const { container } = render(<Index />);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        style="margin-left: auto; margin-right: auto; max-width: 42rem; padding: 2.625rem 1.3125rem;"
      >
        <header>
          <h3
            style="font-family: Montserrat, sans-serif; margin-top: 0px;"
          >
            <a
              href="/"
              style="box-shadow: none;"
            />
          </h3>
        </header>
        <main>
          <div
            style="display: flex; margin-bottom: 4.375rem;"
          >
            <p>
              Written by 
              <strong />
               
               
              <a
                href="https://twitter.com/undefined"
              >
                You should follow him on Twitter
              </a>
            </p>
          </div>
        </main>
        <footer>
          © 
          2020
          , Built with
           
          <a
            href="https://www.gatsbyjs.org"
          >
            Gatsby
          </a>
        </footer>
      </div>
    </div>
  `);
});
