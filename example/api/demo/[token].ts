import {Handler, OverwritableTypeRoute} from "elysia";
type FsHandler = Handler<OverwritableTypeRoute>
const handler: FsHandler = (context) => {
    return context.params?.token;
}

export default handler;