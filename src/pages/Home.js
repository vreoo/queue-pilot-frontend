import React, { useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

function Home() {
    const { currentUser } = useContext(AuthContext);

    return (
        <div className="d-flex flex-column justify-content-center align-items-center text-center vh-100">
            Home
        </div>
    );
}

export default Home;
