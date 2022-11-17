import { useState, useEffect } from "react";
import { auth } from "../Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Group,
  Center,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";

export function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  }

  const handleRegister = async () => {
    try {
      console.log("Trying to login");
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Registered user");
      navigate("/");
    }
    catch (err: unknown) {
      console.log(err);
    }
    
  }

  useEffect(() => {
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    console.log(`confirmPassowrd: ${confirmPassword}`);
  }, [email, password, confirmPassword]);


  return (
    <Center style={{ width: "100vw", height: "100vh" }}>
      <Container size={420} my={40}>
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Create an account!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Already have an account?{" "}
          <Anchor<"a"> href="#" size="sm" onClick={() => navigate("/login")}>
            Login
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Group position="apart" noWrap>
            <TextInput label="First Name" placeholder="John" required />
            <TextInput label="Last Name" placeholder="Doe" required />
          </Group>

          <TextInput
            label="Email"
            placeholder="example@gmail.com"
            required
            mt="md"
            value={email}
            onChange={handleEmail}
          />
          <PasswordInput
            label="Password"
            placeholder="Enter a password"
            required
            mt="md"
            value={password}
            onChange={handlePassword}
          />
          <PasswordInput
            label="Confirm Password"
            placeholder="Retype your password"
            required
            mt="md"
            value={confirmPassword}
            onChange={handleConfirmPassword}
          />
          <Button fullWidth mt="xl" onClick={handleRegister}>
            Register
          </Button>
        </Paper>
      </Container>
    </Center>
  );
}
