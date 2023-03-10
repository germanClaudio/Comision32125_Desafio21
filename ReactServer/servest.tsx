// @deno-types="https://deno.land/x/servest@v1.3.3/types/react/index.d.ts"
import React from "https://esm.sh/react";
// @deno-types="https://deno.land/x/servest/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js";

import { createApp } from "https://deno.land/x/servest/mod.ts";

const app = createApp();
app.handle("/", async (req) => {
  await req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "text/html; charset=UTF-8",
    }),
    body: ReactDOMServer.renderToString(
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>servest</title>
        </head>
        <body>Hello Servest!</body>
      </html>
    ),
  });
});
app.listen({ port: 8888 });
