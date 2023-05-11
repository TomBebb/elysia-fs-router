import {Elysia} from 'elysia'

import fsRouter, {FsRouterType} from '../src/index'
import * as process from "process";

const app = new Elysia()
const router = await fsRouter({
    basePath: "example/api",
    servePath: "api",
    type: FsRouterType.NextStyle,
});
router(app)
const port = parseInt(process.env.PORT ?? "8080")
app.listen(port)
console.log(`Server listening at http://localhost:${port}`)