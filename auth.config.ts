import { defineConfig } from "auth-astro";
import Entra from "@auth/core/providers/microsoft-entra-id";

export default defineConfig({
    providers: [Entra],
    debug: false,
    trustHost: true,
    secret: import.meta.env.AUTH_SECRET,
});
