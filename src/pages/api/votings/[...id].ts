import { getSession } from "auth-astro/server";
import { db } from "../../../lib/db";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params, request }) => {
    const { id } = params;

    const session = await getSession(request);
    const userid = session?.user?.email;

    if (!userid) return new Response("Unauthorized", { status: 401 });

    try {
        await db.query("BEGIN");

        const voting = (
            await db.query("SELECT * FROM votings WHERE id = $1", [id])
        ).rows[0];

        if (!voting) return new Response("Not found", { status: 404 });

        if (voting.owner !== userid)
            return new Response("Unauthorized", { status: 401 });

        const options = (
            await db.query(
                "SELECT options.*, count(votes.id) as votes FROM options LEFT JOIN votes ON votes.option_id = options.id WHERE options.voting_id = $1 group by options.id",
                [id]
            )
        ).rows;

        return new Response(
            JSON.stringify({
                ...voting,
                options: options.map((o) => ({
                    ...o,
                    voting_id: undefined,
                    votes: parseInt(o.votes),
                })),
            }),
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (e) {
        console.error(e);
        return new Response("Internal server error", { status: 500 });
    }
};
