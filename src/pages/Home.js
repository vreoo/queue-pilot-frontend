import React, { useState } from "react";
import axios from "axios";

import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

function Home() {
    const [queue, setQueue] = useState({
        name: "",
        status: "Open",
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        setQueue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const createQueue = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8800/api/queues/create", queue);
            setError(null);
            setSuccess("Queue created successfully!");
        } catch (error) {
            setError(error.response.data);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center w-100 p-5">
            {/* Create two cards beside each other */}
            <Card className="w-50 mb-3">
                <Card.Header className="text-center" as="h5">
                    Queue
                </Card.Header>
                <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted text-center">
                        Create a queue and share it with your friends.
                    </Card.Subtitle>
                    {/* Create a form to create a queue (name, status) */}
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Queue Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                name="name"
                                onChange={handleChange}
                            />
                        </Form.Group>

                        {/* Status Group (Select) */}
                        <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Select name="status" onChange={handleChange}>
                                <option>Open</option>
                                <option>Closed</option>
                            </Form.Select>
                        </Form.Group>

                        {error && (
                            <div className="alert alert-danger">{error}</div>
                        )}
                        {success && (
                            <div className="alert alert-success">{success}</div>
                        )}
                        {/* Create Queue Button */}
                        <button
                            className="btn btn-primary w-100"
                            onClick={createQueue}
                            disabled={queue.name === ""}
                        >
                            Create Queue
                        </button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Home;
