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
    const [individual, setIndividual] = useState({
        club: "",
        division: "",
        status_payment: "",
    });
    const [participate_individual, setParticipate_individual] = useState(false);
    const [participate_round_team, setParticipate_round_team] = useState(false);
    const [round_team, setRound_team] = useState({});

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
            if (data.participate_individual) {
                fetchIndividual(id);
                setParticipate_individual(true);
            }
            if (data.participate_round_team) {
                fetchRoundTeam(id);
                setParticipate_round_team(true);
            }
        }
    };

    const fetchIndividual = async (id) => {
        const { data, error } = await supabase
            .from("individuals")
            .select("*")
            .eq("id", id)
            .single();
        if (error) {
            console.log(error);
        } else {
            setIndividual({
                club: data.club,
                division: data.division,
                status_payment: data.status_payment,
            });
        }
    };

    const fetchRoundTeam = async (id) => {
        const { data, error } = await supabase
            .from("round_team")
            .select("*")
            .or(`id1.eq.${id},id2.eq.${id},id3.eq.${id}`);
        console.log(data);
        if (error) {
            console.log(error);
        } else {
            setRound_team({
                team: data[0].team,
                team_shortname: data[0].short_team,
                id1: data[0].id1,
                id2: data[0].id2,
                id3: data[0].id3,
            });
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
                onClick={() => navigate("/roundteam")}
            >
                <Text>คลิกที่นี่เพื่อสมัครการแข่งขันประเภททีม</Text>
            </Button>
            {participate_individual ? (
                <Card>
                    <CardBody>
                        <Text>คุณได้สมัครการแข่งขันประเภทบุคคลทั่วไปแล้ว</Text>
                        <Text>รายละเอียดการสมัคร</Text>
                        <Text>ชื่อ: {name}</Text>
                        <Text>นามสกุล: {surname}</Text>
                        <Text>ชมรม: {individual.club}</Text>
                        <Text>ประเภท: {individual.division}</Text>
                        <Text>
                            สถานะการชำระเงิน: {individual.status_payment}
                        </Text>
                    </CardBody>
                </Card>
            ) : (
                <Card>
                    <CardBody>
                        <Text>
                            คุณยังไม่ได้สมัครการแข่งขันประเภทบุคคลทั่วไป
                        </Text>
                    </CardBody>
                </Card>
            )}
            {participate_round_team ? (
                <Card>
                    <CardBody>
                        <Text>คุณได้สมัครการแข่งขันประเภททีมแล้ว</Text>
                        <Text>รายละเอียดการสมัคร</Text>
                        <Text>ชื่อทีม: {round_team.team}</Text>
                        <Text>ชื่อย่อทีม: {round_team.team_shortname}</Text>
                        <Text>สมาชิกทีม</Text>
                        <Text>1. {round_team.id1}</Text>
                        <Text>2. {round_team.id2}</Text>
                        <Text>3. {round_team.id3}</Text>
                    </CardBody>
                </Card>
            ) : (
                <Card>
                    <CardBody>
                        <Text>คุณยังไม่ได้สมัครการแข่งขันประเภททีม</Text>
                    </CardBody>
                </Card>
            )}
            <Button onClick={handleLogout}>Logout</Button>
        </Container>
    );
}
