tAt

# Elysia Filesustem Router

A plugin for [Elysia.js](https://elysiajs.com/) for server-side APIs

This works similarly to NextJS Router. Routes are created in an API directory

## Installation:

```bash
bun add @tophattedcoder/elysia-fs-router
```

## Usage

/index.ts

```typescript
import {Elysia} from 'elysia'
import {nextRouter} from '@tophattedcoder/elysia-fs-router'

const app = new Elysia()
router(nextRouter())
app.listen(8080)
console.log("Server listening at http://localhost:8080")
```

/api/[id]/info

```typescript
import {Context} from "elysia";

export default async function (ctx: Context) {
    return ctx.params!.id;
};
```