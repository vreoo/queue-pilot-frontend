import React from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../axios";
import { useLocation } from "react-router-dom";

function Profile() {
    const queryClient = useQueryClient();

    const userId = parseInt(useLocation().pathname.split("/")[2]);
    const { isLoading, error, data } = useQuery(["user"], () =>
        makeRequest.get("/users/find/" + userId).then((res) => {
            return res.data;
        })
    );

    // queueId is the id of the queue that the user is joining
    const { mutate } = useMutation(
        (queueId) => makeRequest.post("/users/join/" + queueId),
        {
            onSuccess: () => {
                queryClient.invalidateQueries("user");
            },
        }
    );

    return (
        <div>
            {/* Build User Profile UI */}
            {isLoading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {data && (
                <div>
                    <h1>{data.username}</h1>
                    <h2>{data.email}</h2>

                    <h3>My Queues</h3>
                    {/* <ul>
                        {data.queues.map((queue) => (
                            <li key={queue.id}>{queue.name}</li>
                        ))}
                    </ul> */}

                    <h3>My Tickets</h3>
                    {/* <ul>
                        {data.tickets.map((ticket) => (
                            <li key={ticket.id}>{ticket.name}</li>
                        ))}
                    </ul> */}
                </div>
            )}
        </div>
    );
}

export default Profile;
