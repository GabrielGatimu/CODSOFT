#!/usr/bin/env node

const express = require('express')
const cors = require('cors')
require('dotenv').config()

const db = require('./models')
const {errorMiddleware} = require('./middleware')

const app = express()

// ----- CORS ---- //
const corsOptions = {
    origin: ['http://localhost:5173'],
    // credentials: true
}
app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// ---- Routes ---- //
const base_api = '/api/v1'
require('./routes')(app, base_api)

// ---- Error Middleware ---- //
app.use(errorMiddleware.notFound)
app.use(errorMiddleware.errorHandler)

const port = process.env['PORT'] || 5000
app.listen(port, async () => {
    console.log(`\tServer alive at port ${port}`)
    await db.sequelize.authenticate()
        .then(async () => {
            console.log(`\n\t connected to ${process.env['DB']} database \n\t syncing models...\n`)

            // sync DB
            await db.sequelize.sync({alter: true})
                .then(() => {
                    console.log(`\n\t models synchronized successfully \n`)

                    // -- called once --- //
                    // Job.bulkCreate(jobsData)
                    //     .then(() => {
                    //         console.log(`\n\t data inserted successfully \n`);
                    //     })
                    //     .catch(error => {
                    //         console.log(`\n\t failed to insert data! \n\t`, error);
                    //     });
                })
                .catch(error => {
                    console.log(`\n\t failed to sync models! \n\t`, error)
                })
        })
        .catch(error => {
            console.log(`\n\t failed to connect to ${process.env['DB']} database! \n\n\t`, error)
        })
})

