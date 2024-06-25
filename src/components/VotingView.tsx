import {
    useQuery,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const VotingViewInternal: React.FC<{ id: string }> = ({ id }) => {
    const { data, error } = useQuery({
        queryKey: ["voting", id],
        queryFn: async () => {
            const res = await fetch(`/api/votings/${id}`);
            if (!res.ok) throw new Error("Network response was not ok");

            return res.json();
        },
        // Refetch every 5 seconds
        refetchInterval: 5000,
    });

    if (error) return <div>Error: {error.message}</div>;
    if (!data) return <div>Loading...</div>;

    return (
        <div>
            <Doughnut
                data={{
                    labels: data.options.map((o: any) => o.option),
                    datasets: [
                        {
                            data: data.options.map((o: any) => o.votes),
                            // Random colors
                            backgroundColor: [
                                "#FF6384",
                                "#36A2EB",
                                "#FFCE56",
                                "#4BC0C0",
                                "#9966FF",
                                "#FF9F40",
                                "#FFCD56",
                                "#4BC0C0",
                                "#9966FF",
                                "#FF9F40",
                            ],
                        },
                    ],
                }}
            />
        </div>
    );
};

export const VotingView: React.FC<{ id: string }> = ({ id }) => {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <VotingViewInternal id={id} key={id} />
        </QueryClientProvider>
    );
};
