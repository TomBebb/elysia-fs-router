import Elysia from "elysia";
import * as fs from "fs/promises";
import * as path from "path";

/**
 * The type of Filesystem Router
 */
export const enum FsRouterType {
    /**
     * A NextJS style router:
     *
     * Takes params inside square brackets, e.g.: `/api/[param]`
     */
    NextStyle = "next",
}

export interface FsRouterOptions {
    /**
     * The Filesystem Router type
     */
    type: FsRouterType
    /**
     * The directory to scan for APIs
     *
     * default: "/api/"
     */
    basePath?: string
    /**
     * The base directory to serve APIs at
     *
     * defaults to basePath or "/api/"
     */
    servePath?: string
}


async function scanFiles(dir: string): Promise<string[]> {
    const left = [dir]
    const  files: string[] = []
    while(left.length > 0) {
        const curr = left.pop()!
        console.log('readdir', curr)
        const results = await fs.readdir(curr)
        for(const resRaw of results) {
            const res = path.join(curr, resRaw)
            const st =await fs.stat(res)
            if (st.isFile()) {
                files.push(res)
            } else {
                left.push(res)
            }
        }
    }
    return files
}
const nextRouterRegex = /\[([^\]]+)\]/g;
const withExtRegex = /([^\.]+)\..*/;

function removeExt(path: string) {
    return path.replace(withExtRegex, "$1")
}
async function plugin(options: FsRouterOptions) {
    const basePath = options.basePath ?? "api";
    const servePath = options.servePath ?? basePath
    const baseDir = (path.join(process.cwd(), basePath))
    const files =  await scanFiles(baseDir)
    const toImportPath = (p: string) =>  removeExt( path.relative(__dirname, p))
    const toRouterPath = (p: string) =>
        path.join(servePath, path.relative(baseDir, removeExt(p).replaceAll(nextRouterRegex, ":$1")));

    const scannedData = files.map(p => ({import: toImportPath(p), router: toRouterPath(p)}))


    return (app: Elysia) => {
        for(const data of scannedData) {
            app.all(data.router, async context => {
                const {default: handler} = await import (data.import);
                return await handler(context)
            })
            console.log('done setting up '+data.router)
        }
    }
}

export const nextRouter = (options: Exclude<FsRouterOptions, "type">) =>
    plugin({ ...options, type: FsRouterType.NextStyle,})

export default plugin;