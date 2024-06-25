import { defineConfig } from "auth-astro";
import Entra from "@auth/core/providers/microsoft-entra-id";

export default defineConfig({
    providers: [
        Entra({
            clientId: import.meta.env.AUTH_MICROSOFT_ENTRA_ID_CLIENT_ID,
            clientSecret: import.meta.env.AUTH_MICROSOFT_ENTRA_ID_CLIENT_SECRET,
            // redirectUri: import.meta.env.AUTH_MICROSOFT_ENTRA_ID_REDIRECT_URI,
            tenantId: import.meta.env.AUTH_MICROSOFT_ENTRA_ID_TENANT_ID,
        }),
    ],
    debug: false,
    redirectProxyUrl: import.meta.env.AUTH_REDIRECT_PROXY_URL,
});
