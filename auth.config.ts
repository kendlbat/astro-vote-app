import { defineConfig } from "auth-astro";
import Entra from "@auth/core/providers/azure-ad";

export default defineConfig({
    providers: [
        Entra({
            clientId: import.meta.env.AUTH_MICROSOFT_ENTRA_ID_CLIENT_ID,
            clientSecret: import.meta.env.AUTH_MICROSOFT_ENTRA_ID_CLIENT_SECRET,
            tenantId: import.meta.env.AUTH_MICROSOFT_ENTRA_ID_TENANT_ID,
            redirectProxyUrl: import.meta.env
                .AUTH_MICROSOFT_ENTRA_ID_REDIRECT_PROXY_URL,
        }),
    ],
    debug: false,
    trustHost: true,
    secret: import.meta.env.AUTH_SECRET,
    redirectProxyUrl: import.meta.env.AUTH_REDIRECT_PROXY_URL,
});
