import React, { useContext, useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { UserContext } from "../helper/UserContext";
import {
    Container,
    Heading,
    Text,
    Button,
    Card,
    CardBody,
} from "@chakra-ui/react";
import { supabase } from "../helper/supabase";

export default function Dashboard() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [name, setName] = useState("name");
    const [surname, setSurname] = useState("Surname");
    const [individual, setIndividual] = useState();

    const handleLogout = () => {
        // Remove the cookie and clear the user from context
        Cookies.remove("user");
        setUser(null);

        // Redirect to the login page
        navigate("/login");
    };

    const fetchUser = async (id) => {
        const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("id", id)
            .single();
        if (error) {
            console.log(error);
        } else {
            console.log(data.name);
            setName(data.name);
            setSurname(data.surname);
        }
    };

    useEffect(() => {
        if (!user) {
            navigate("/login");
        } else {
            //fetch users data from supabase
            fetchUser(user);
        }
    }, []);

    return (
        <Container>
            <Heading>Dashboard</Heading>
            <Text>
                Welcome, {name} {surname}
            </Text>
            <Button
                colorScheme="teal"
                variant="solid"
                onClick={() => navigate("/individual")}
            >
                <Text>คลิกที่นี่เพื่อสมัครการแข่งขันประเภทบุคคลทั่วไป</Text>
            </Button>
            <Button
                colorScheme="teal"
                variant="solid"
                onClick={() => navigate("/individual")}
            >
                <Text>คลิกที่นี่เพื่อสมัครการแข่งขันประเภททีม</Text>
            </Button>
            <Button onClick={handleLogout}>Logout</Button>
        </Container>
    );
}
