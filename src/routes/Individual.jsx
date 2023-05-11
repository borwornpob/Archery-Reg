import React, { useState, useEffect, useContext } from "react";
import {
    Container,
    Heading,
    Text,
    Button,
    Select,
    FormControl,
    Input,
} from "@chakra-ui/react";
import { supabase } from "../helper/supabase";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../helper/UserContext";

export default function Individual() {
    //TODO requirement for individual
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [club, setClub] = useState("");
    const [division, setDivision] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    //check if user already login
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const Division = ["Recurve", "Compound", "Barebow"];

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        //check if user already register
        const { data, error } = await supabase
            .from("individuals")
            .select("*")
            .eq("id", user);
        if (error) {
            console.log(error);
        } else {
            if (data.length > 0) {
                setMessage("You've already registered for this event.");
            } else {
                //register user
                const { data, error } = await supabase
                    .from("individuals")
                    .insert([
                        {
                            id: user,
                            name: name,
                            surname: surname,
                            club: club,
                            division: division,
                        },
                    ]);
                if (error) {
                    console.log(error);
                } else {
                    setMessage("Successfully registered.");
                }
            }
        }
    };

    return (
        <Container>
            <Heading>Individual</Heading>
            <Text>
                Welcome, {name} {surname}
            </Text>
            <FormControl>
                <Text>ประเภท</Text>
                <Select
                    placeholder="Select division"
                    value={division}
                    onChange={(e) => setDivision(e.target.value)}
                >
                    {Division.map((item) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </Select>
            </FormControl>
            <FormControl>
                <Text>สังกัด</Text>
                <Input
                    placeholder="Club"
                    value={club}
                    onChange={(e) => setClub(e.target.value)}
                />
            </FormControl>
            <Button onClick={handleSubmit}>Submit</Button>
            <Text>{message}</Text>
        </Container>
    );
}
