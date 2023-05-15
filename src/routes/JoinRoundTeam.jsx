import React, { useState, useEffect, useContext } from "react";
import {
    Container,
    Button,
    Text,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Select,
    FormHelperText,
    FormErrorMessage,
    Box,
    Flex,
    Spacer,
    Center,
    VStack,
    HStack,
} from "@chakra-ui/react";
import { supabase } from "../helper/supabase";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../helper/UserContext";

export default function JoinRoundTeam() {
    const [roundTeam, setRoundTeam] = useState("");
    const [roundTeamList, setRoundTeamList] = useState([]);
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetchRoundTeam();
    }, []);

    const fetchRoundTeam = async () => {
        const { data: roundTeam, error } = await supabase
            .from("round_team")
            .select("*");
        if (error) {
            console.log(error);
        } else {
            setRoundTeamList(roundTeam);
            console.log(roundTeam);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        //update round team with user id in the round team table if password is correct and id field is empty
        const { data: roundTeamData, error } = await supabase
            .from("round_team")
            .select("*")
            .eq("team", roundTeam)
            .single();
        if (error) {
            console.log(error);
        }
        if (roundTeamData.password != password) {
            setMessage("Invalid password.");
            setLoading(false);
            return;
        }
        if (
            roundTeamData.id1 != null &&
            roundTeamData.id2 != null &&
            roundTeamData.id3 != null
        ) {
            setMessage("Round Team is full.");
            setLoading(false);
            return;
        }
        if (roundTeamData.id2 == null) {
            const { data, error: updateError } = await supabase
                .from("round_team")
                .update({ id2: user })
                .eq("team", roundTeam);
            if (updateError) {
                console.log(updateError);
            } else {
                setMessage("Round Team Joined Successfully");
                const { data: data2, error: error2 } = await supabase
                    .from("users")
                    .update({ participate_round_team: true })
                    .eq("id", user);
                if (error2) {
                    console.log(error2);
                }
            }
        } else {
            const { data, error: updateError } = await supabase
                .from("round_team")
                .update({ id3: user })
                .eq("team", roundTeam);
            if (updateError) {
                console.log(updateError);
            } else {
                setMessage("Round Team Joined Successfully");
            }
        }
    };

    return (
        <Container>
            <Heading>Join Round Team</Heading>
            <FormControl>
                <FormLabel>Round Team</FormLabel>
                <Select
                    placeholder="Select Round Team"
                    onChange={(e) => setRoundTeam(e.target.value)}
                    value={roundTeam}
                >
                    {roundTeamList.map((roundTeam) => (
                        <option key={roundTeam.team} value={roundTeam.team}>
                            {roundTeam.team}
                        </option>
                    ))}
                </Select>
                <Input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <Button
                    colorScheme="teal"
                    variant="outline"
                    onClick={handleSubmit}
                >
                    Join
                </Button>
            </FormControl>
            <Text>{message}</Text>
        </Container>
    );
}
