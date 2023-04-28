import React, { useState } from "react";
import {
  Container,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

export default function Register() {
  const [data, setData] = useState();

  return (
    <Container>
      <Heading>Register</Heading>

      <FormControl>
        <FormLabel>First Name</FormLabel>
        <Input type="text" placeholder="First Name" />
      </FormControl>
      <FormControl>
        <FormLabel>Last Name</FormLabel>
        <Input type="text" placeholder="Last Name" />
      </FormControl>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input type="email" placeholder="Email" />
      </FormControl>
    </Container>
  );
}
