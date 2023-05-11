import React, { useState } from "react";
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

export default function Register() {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();
    const [surname, setSurname] = useState();
    const [id, setId] = useState();

    //create a new user
    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        //upload all data in form to supabase
        const { data, error } = await supabase.from("users").insert([
            {
                id: id,
                name: name,
                surname: surname,
                email: email,
                password: password,
            },
        ]);
        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            setData(data);
            setLoading(false);
        }
    };

    return (
        <Container>
            <Heading>Register</Heading>
            <Text>Register to create an account</Text>
            <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                    type="text"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                />
            </FormControl>
            <FormControl id="surname" isRequired>
                <FormLabel>Surname</FormLabel>
                <Input
                    type="text"
                    placeholder="Surname"
                    onChange={(e) => setSurname(e.target.value)}
                />
            </FormControl>
            <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
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
            <FormControl id="id" isRequired>
                <FormLabel>ID</FormLabel>
                <Input
                    type="text"
                    placeholder="ID"
                    onChange={(e) => setId(e.target.value)}
                />
            </FormControl>
            <br />
            <Button
                type="submit"
                colorScheme="teal"
                variant="outline"
                onClick={handleRegister}
                isLoading={loading}
            >
                Register
            </Button>
            {error && <Text>{error}</Text>}
        </Container>
    );
}
