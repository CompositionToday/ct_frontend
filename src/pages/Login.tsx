import {
  ErrorMessage,
  defaultErrorMessage,
  authErrorList,
} from "../components/login/profile";
import { useState, useEffect } from "react";
import { auth } from "../Firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { FirebaseError } from "@firebase/util";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Center,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      if (email === "") {
        throw "Please input an email";
      }

      if (password === "") {
        throw "Please input a password";
      }

      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        if (authErrorList[err.code as keyof typeof authErrorList]) {
          setErrorMessage(
            authErrorList[err.code as keyof typeof authErrorList]
          );
        } else {
          setErrorMessage(defaultErrorMessage);
        }
      } else if (typeof err === "string") {
        if (authErrorList[err as keyof typeof authErrorList]) {
          setErrorMessage(authErrorList[err as keyof typeof authErrorList]);
        } else {
          setErrorMessage(defaultErrorMessage);
        }
      } else {
        setErrorMessage(defaultErrorMessage);
      }
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
      }
    });
  }, []);

  return (
    <Center style={{ width: "100vw", height: "100vh" }}>
      <Container size={420} my={40} style={{ minWidth: 420 }}>
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Welcome back!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Don't have an account yet?{" "}
          <Anchor<"a"> href="#" size="sm" onClick={() => navigate("/register")}>
            Create account
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Email"
            placeholder="Your email"
            required
            value={email}
            onChange={handleEmail}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            value={password}
            onChange={handlePassword}
          />
          <ErrorMessage error={!!errorMessage}>{errorMessage}</ErrorMessage>
          <Group position="center" mt="md">
            <Anchor<"a">
              onClick={() => navigate("/forgotpassword")}
              href="#"
              size="sm"
            >
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" onClick={handleLogin}>
            Sign in
          </Button>
        </Paper>
      </Container>
    </Center>
  );
}
