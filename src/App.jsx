import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Register from "./routes/Register";
import Login from "./routes/Login";
import Dashboard from "./routes/Dashboard";
import Individual from "./routes/Individual";
import RoundTeam from "./routes/RoundTeam";
import CreateRoundTeam from "./routes/CreateRoundTeam";
import JoinRoundTeam from "./routes/JoinRoundTeam";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { UserProvider } from "./helper/UserContext";

export default function App() {
    return (
        <UserProvider>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/individual" element={<Individual />} />
                    <Route path="/roundteam" element={<RoundTeam />} />
                    <Route
                        path="/createroundteam"
                        element={<CreateRoundTeam />}
                    />
                    <Route path="/joinroundteam" element={<JoinRoundTeam />} />
                </Routes>
                <Footer />
            </Router>
        </UserProvider>
    );
}
