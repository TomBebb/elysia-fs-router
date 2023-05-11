import {Elysia} from 'elysia'

import {nextRouter} from '../src'
import * as process from "process";

const app = new Elysia()
app.use(nextRouter({
    basePath: "example/api",
    servePath: "api",
}))
const port = parseInt(process.env.PORT ?? "8080")
app.listen(port)
console.log(`Server listening at http://localhost:${port}`)