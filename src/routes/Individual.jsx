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
    const [avaliableClub, setAvaliableClub] = useState({});

    //check if user already login
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const Division = ["Recurve", "Compound", "Barebow"];

    const fetchAvaliableClub = async () => {
        const { data, error } = await supabase.from("clubs").select("*");
        if (error) {
            console.log(error);
        } else {
            setAvaliableClub(data);
            console.log(avaliableClub);
        }
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
            setName("");
            setSurname("");
            setClub("");
            setDivision("");
            setLoading(false);
            setMessage("");
            setAvaliableClub({});
            //fetch users data from supabase
            fetchUser(user);
            fetchAvaliableClub();
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
                            status_payment: "unpaid",
                        },
                    ]);
                //update status in users table
                const { data: data2, error: error2 } = await supabase
                    .from("users")
                    .update({ participate_individual: true })
                    .eq("id", user);
                if (error || error2) {
                    console.log(error);
                    console.log(error2);
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
                <Select
                    placeholder="Select club"
                    value={club}
                    onChange={(e) => setClub(e.target.value)}
                >
                    {Object.keys(avaliableClub).map((item) => (
                        <option key={item} value={avaliableClub[item].club}>
                            {avaliableClub[item].club}
                        </option>
                    ))}
                </Select>
            </FormControl>
            <Button onClick={handleSubmit}>Submit</Button>
            <Text>{message}</Text>
        </Container>
    );
}
