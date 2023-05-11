import {
    Button,
    Center,
    Container,
    Heading,
    Link,
    HStack,
    VStack,
    Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import useWindowDimensions from "../helper/dimensions";

export default function Home() {
    const [count, setCount] = useState(0);
    const { width, height } = useWindowDimensions();

    return (
        <Container>
            {
                //create greetings message for go in to registration page
            }

            <VStack spacing={"2"}>
                <Center>
                    <Heading>ArrowHitz Tueng Tueng 2023</Heading>
                </Center>

                <Text>Click Button Below to Register</Text>
            </VStack>

            <Center mt={2}>
                <Button colorScheme="teal" width={width * 0.9}>
                    <Link href="/register">Register</Link>
                </Button>
            </Center>
            <Center mt={2}>
                <Button colorScheme="teal" width={width * 0.9}>
                    <Link href="/login">Login</Link>
                </Button>
            </Center>
        </Container>
    );
}
