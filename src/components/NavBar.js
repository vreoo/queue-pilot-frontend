import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

import Dropdown from "react-bootstrap/Dropdown";

function NavBar() {
    const { currentUser, logout } = useContext(AuthContext);

    const navigate = useNavigate();

    const goToProfile = () => {
        navigate(`/profile/${currentUser.id}`);
    };

    const handleLogOut = async (e) => {
        e.preventDefault();
        try {
            await logout();
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        QueuePilot
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link
                                    className="nav-link active"
                                    aria-current="page"
                                    to="/"
                                >
                                    Home
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="d-flex">
                        {currentUser ? (
                            <Dropdown>
                                <Dropdown.Toggle
                                    variant="outline-primary"
                                    id="dropdown-basic"
                                >
                                    <img
                                        src={currentUser.avatar}
                                        alt="avatar"
                                        className="rounded-circle"
                                        style={{
                                            width: "30px",
                                            height: "30px",
                                        }}
                                    />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={goToProfile}>
                                        Profile
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={handleLogOut}>
                                        Log Out
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        ) : (
                            <div
                                className="d-flex align-items-center"
                                style={{ cursor: "pointer" }}
                            >
                                <Link
                                    className="btn btn-outline-primary"
                                    to="/login"
                                >
                                    Login
                                </Link>
                                <Link
                                    className="btn btn-outline-primary ms-2"
                                    to="/register"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default NavBar;
