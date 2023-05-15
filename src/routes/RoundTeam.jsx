import React, { useState, useEffect, useContext } from "react";
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

export default function RoundTeam() {
    const navigate = useNavigate();

    return (
        <Container>
            <Heading>Round Team</Heading>
            <Button
                onClick={() => {
                    navigate("/createroundteam");
                }}
            >
                <Text>Create Round Team here</Text>
            </Button>
            <Button
                onClick={() => {
                    navigate("/joinroundteam");
                }}
            >
                <Text>Join Round Team here</Text>
            </Button>
        </Container>
    );
}
