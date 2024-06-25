import { defineAction, z } from "astro:actions";
import { getSession } from "auth-astro/server";

export const server = {
    test: defineAction({
        handler: async () => {
            return "Hello World!";
        },
    }),
    vote: defineAction({
        accept: "form",
        input: z.object({ option: z.number() }),
        handler: async ({ option }, ctx) => {
            const session = await getSession(ctx.request);
            const userid = session?.user?.id;
            if (!userid) return new Response("Unauthorized", { status: 401 });

            console.log(option);
        },
    }),
};
