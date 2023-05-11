import {Context} from "elysia";

export default async function (ctx: Context) {
    return ctx.params!.token;
};