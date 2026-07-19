import type {FC, PropsWithChildren} from "hono/jsx";
import { html } from "hono/html";
import {Header} from "./Header";
import {Footer} from "./Footer";

export const Layout: FC<PropsWithChildren> = ({ children }) => (
  <>
    {html`<!DOCTYPE html>`}
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>AgentClinic</title>
        <link rel="stylesheet" href="/static/pico.min.css" />
        <link rel="stylesheet" href="/static/style.css" />
      </head>
      <body>
        <a href="#main" class="skip-link">Skip to main content</a>
        <Header />
        <main id="main" class="container">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  </>
);