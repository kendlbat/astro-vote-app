import { defineAction, z } from "astro:actions";

export const server = {
    test: defineAction({
        handler: async () => {
            return "Hello World!";
        },
    }),
};
