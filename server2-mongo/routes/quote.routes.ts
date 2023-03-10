import { Router } from '../deps.ts'
import { addQuote, deleteQuote, getQuote, updateQuote } from '../handlers/quotes.ts'
import { getQuotes } from '../handlers/quotes.ts'

export const routerQuote = new Router()

routerQuote
    .get('/', ctx => {
        ctx.response.body = 'esto es la respuesta de quote'
    })
    .get("/api/quote", getQuotes)
    .get("/api/quote/:id", getQuote)
    .post("/api/quote", addQuote)
    .put("/api/quote/:id", updateQuote)
    .delete("/api/quote/:id", deleteQuote)