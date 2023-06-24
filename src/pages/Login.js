import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

import NavBar from "../components/NavBar";

function Login() {
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });
    const [error, setErr] = useState(null);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const { login } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(inputs);
            navigate("/");
        } catch (error) {
            setErr(error.response.data);
        }
    };

    return (
        <div>
            <NavBar />
            <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
                <div className="w-25 bg-white rounded p-3">
                    <h3 className="text-center">Login</h3>
                    <form>
                        <div className="mb-3">
                            <input
                                type="text"
                                placeholder="Username"
                                name="username"
                                onChange={handleChange}
                                className="form-control mb-3"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange={handleChange}
                                className="form-control mb-3"
                            />
                        </div>
                        {error && (
                            <div className="alert alert-danger">{error}</div>
                        )}
                        <button
                            onClick={handleLogin}
                            className="btn btn-primary form-control mb-3"
                        >
                            Login
                        </button>

                        <p className="text-center">OR</p>
                        <Link
                            to="/register"
                            className="btn btn-secondary outline-secondary form-control"
                        >
                            Create an account
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
