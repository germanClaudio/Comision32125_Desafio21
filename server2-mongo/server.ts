import { Application, config } from "./deps.ts";

import { logger } from "./logger/logger.ts";

import { routerQuote } from "./routes/quote.routes.ts";
import { routerUser } from "./routes/user.ts";

const configData = await config()
const PORT = configData['PORT'] || 8080

const app = new Application();

app.use(logger)
app.use(routerUser.routes())
//_____________________________________________

app.use(routerQuote.routes())
app.use(routerQuote.allowedMethods())

//_____________________________________________


console.log(`Escuchando en el puerto ${PORT}`)

await app.listen({ port: Number(PORT) })