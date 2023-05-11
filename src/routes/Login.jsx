import React, { useState, useContext, useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";
import {
    Container,
    Heading,
    Text,
    FormControl,
    FormLabel,
    Input,
    Button,
} from "@chakra-ui/react";

import { supabase } from "../helper/supabase";
import Cookies from "js-cookie";

import { UserContext } from "../helper/UserContext";

export default function Login() {
    const [nationalId, setNationalId] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const cookie = Cookies.get("user");
        console.log("cookie", cookie);
        if (cookie) {
            setUser(cookie);
            navigate("/dashboard");
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        // Fetch the user's data
        const { data: user, error } = await supabase
            .from("users")
            .select("*")
            .eq("id", nationalId)
            .single();

        if (error || !user) {
            setMessage("User not found.");
            setLoading(false);
            return;
        }

        if (password != user.password) {
            setMessage("Invalid password.");
            setLoading(false);
            return;
        }

        // Store a cookie
        Cookies.set("user", nationalId);
        setUser(nationalId);

        navigate("/dashboard");

        setMessage("Logged in successfully!");
        setLoading(false);
    };

    return (
        <Container>
            <Heading>Login</Heading>
            <Text>Login to your account</Text>
            <FormControl id="nationalId" isRequired>
                <FormLabel>National ID</FormLabel>
                <Input
                    type="text"
                    placeholder="National ID"
                    onChange={(e) => setNationalId(e.target.value)}
                />
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </FormControl>
            <Button
                type="submit"
                colorScheme="teal"
                variant="outline"
                onClick={handleSubmit}
                isLoading={loading}
            >
                Login
            </Button>
            <Text>{message}</Text>
        </Container>
    );
}
