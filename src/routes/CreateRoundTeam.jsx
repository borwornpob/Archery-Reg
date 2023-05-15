import React, { useContext, useState, useEffect } from "react";
import {
    Container,
    Heading,
    Text,
    Button,
    FormControl,
    Input,
} from "@chakra-ui/react";
import { supabase } from "../helper/supabase";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../helper/UserContext";

export default function CreateRoundTeam() {
    const [roundTeamName, setRoundTeamName] = useState("");
    const [roundTeamShortName, setRoundTeamShortName] = useState("");
    const [roundTeamPassword, setRoundTeamPassword] = useState("");

    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase
            .from("round_team")
            .insert([
                {
                    team: roundTeamName,
                    short_team: roundTeamShortName,
                    password: roundTeamPassword,
                    id1: user,
                },
            ])
            .single();
        //update status in users table
        const { data: data2, error: error2 } = await supabase
            .from("users")
            .update({ participate_round_team: true })
            .eq("id", user);
        if (error || error2) {
            alert(error.message);
            alert(error2.message);
        } else {
            alert("Round Team created successfully");
            navigate("/dashboard");
        }
    };

    return (
        <Container>
            <Heading>Create Round Team</Heading>
            <FormControl>
                <Input
                    placeholder="Round Team Name"
                    value={roundTeamName}
                    onChange={(e) => setRoundTeamName(e.target.value)}
                />
                <Input
                    placeholder="Round Team Short Name"
                    value={roundTeamShortName}
                    onChange={(e) => setRoundTeamShortName(e.target.value)}
                />
                <Input
                    placeholder="Round Team Password"
                    value={roundTeamPassword}
                    onChange={(e) => setRoundTeamPassword(e.target.value)}
                />
                <Button onClick={handleSubmit}>Create Round Team</Button>
            </FormControl>
        </Container>
    );
}
