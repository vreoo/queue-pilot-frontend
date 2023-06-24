import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import NavBar from "../components/NavBar";

function Register() {
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
        phone: "",
    });
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:8800/api/auth/register", inputs);
            navigate("/login");
        } catch (err) {
            setError(err.response.data);
        }
    };

    return (
        <div>
            <NavBar />
            <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
                <div className="w-25 bg-white rounded p-3">
                    <h3 className="text-center">Register</h3>
                    <form>
                        <div className="mb-3">
                            <input
                                type="text"
                                placeholder="Username"
                                name="username"
                                className="form-control mb-3"
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                placeholder="Email"
                                name="email"
                                className="form-control mb-3"
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                placeholder="Phone"
                                name="phone"
                                className="form-control mb-3"
                                onChange={handleChange}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                className="form-control mb-3"
                                onChange={handleChange}
                            />
                        </div>

                        <button
                            type="submit"
                            onClick={handleClick}
                            className="btn btn-primary form-control"
                        >
                            Register
                        </button>
                        {error && (
                            <div className="alert alert-danger mt-3">
                                {error}
                            </div>
                        )}

                        <p className="text-center mt-3">
                            ALready have an account?
                        </p>
                        <Link
                            to="/login"
                            className="btn btn-secondary outline-secondary form-control"
                        >
                            Login
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
