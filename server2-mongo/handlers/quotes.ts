import { MongoClient } from "../deps.ts"
import { Quote } from "../types/quote.ts"

const URI = 'mongodb://127.0.0.1:27017/'

const client = new MongoClient()

try {
   await client.connect(URI)
   console.log(`Base de datos conectada`) 
} catch (err) {
    console.log(err)
}

const db = client.database('quotesApp')
const quotes = db.collection<Quote>('quotes')

export const getQuotes = async ({ response }: { response: any }) => {
    try {
        
        const allQuotes = await quotes.find({}).toArray()
        console.log(allQuotes)

        if ( allQuotes ) {
            response.status = 200
            response.body = {
                success: true,
                data: allQuotes
            }
        } else {
            response.status = 404
            response.body = {
                success: false,
                msg: 'No hay productos'
            }
        }


    } catch (err) {
        response.status = 500
        response.body = {
            success: false,
            msg: err.toString()
        }
    }
}


export const getQuote = async ({ 
    params, response 
}: {
    params: {id: string},
    response: any
}) => {
    
    try {        
        
        console.log(params.id)
        const quote = await quotes.findOne({quoteID: params.id})        

        if ( quote ) {
            response.status = 200
            response.body = {
                success: true,
                data: quote
            }
        } else {
            response.status = 404
            response.body = {
                success: false,
                msg: 'No se encuentra el quote'
            }
        }


    } catch (err) {
        response.status = 500
        response.body = {
            success: false,
            msg: err.toString()
        }
    }

}


export const addQuote = async ({ request, response }: { request: any, response: any }) => {
    try {        
        console.log(request.hasBody)
        if ( !request.hasBody ) {
            response.status = 400
            response.body = {
                success: false,
                data: 'No data.'
            }
        } else {

            const body = await request.body()
            const quote = await body.value
            await quotes.insertOne(quote)

            response.status = 201 
            response.body = {
                success: true,
                data: quote,
                msg: 'Quote insertado'
            }
        }


    } catch (err) {
        response.status = 500
        response.body = {
            success: false,
            msg: err.toString()
        }
    }
}


export const updateQuote = async ({
    params,
    request, 
    response
}: {
    params: { id: string },
    request: any,
    response: any
}) => {
    try {
        
        const body = await request.body()
        const inputQuote = await body.value
        await quotes.updateOne(
            { quoteID: params.id },
            { $set: { quote: inputQuote.quote, author: inputQuote.author } }
        )

        const updateQuote = await quotes.findOne({ quoteID: params.id })
        response.status = 200 
        response.body = {
            success: true,
            data: updateQuote,
            msg: 'Quote actualizado.'
        }

    } catch (err) {
        response.status = 500
        response.body = {
            success: false,
            msg: err.toString()
        }
    }
}

export const deleteQuote = async ({
    params,
    response
}: {
    params: { id: string },
    response: any
}) => {
    try {

        await quotes.deleteQuote({ quoteID: params.id })
        response.status = 201 
        response.body = {
            success: true,
            msg: 'Quote borrado.'
        }

    } catch (err) {
        response.status = 500
        response.body = {
            success: false,
            msg: err.toString()
        }
    }
}



