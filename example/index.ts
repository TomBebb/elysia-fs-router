import {Elysia} from 'elysia'

import fsRouter, {FsRouterType} from '../src/index'

const app = new Elysia()
    const router = await fsRouter({
        basePath:  "example/api",
        type: FsRouterType.NextStyle,
    });

router(app)
app.listen(8080)