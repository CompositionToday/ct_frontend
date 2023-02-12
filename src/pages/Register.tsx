import {
  ErrorMessage,
  defaultErrorMessage,
  authErrorList,
} from "../components/login/profile";
import { useState, useEffect } from "react";
import { auth } from "../Firebase";
import { FirebaseError } from "@firebase/util";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
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
import { TwoInputRow } from "../components/opportunity/OpportunityFormHelper";

export function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const url = "https://oyster-app-7l5vz.ondigitalocean.app/compositiontoday";

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleRegister = async () => {
    try {
      if (email === "") {
        throw "Please input an email";
      }

      if (firstName === "" || lastName === "") {
        throw "Please give a name";
      }

      if (password === "" || confirmPassword === "") {
        throw "Please input a password";
      }

      if (password !== confirmPassword) {
        throw "Passwords do not match";
      }

      let userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      let user = userCredential.user;

      let requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          UID: user.uid,
          first_name: firstName,
          last_name: lastName,
          email: email,
        }),
      };

      let response = await fetch(`${url}/users`, requestOptions);

      let responseJson = await response.json();

      console.log("POST user response json: ", responseJson);

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

      console.log(err);
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
    <Center style={{ height: "100%" }}>
      <Container size={420} my={40} style={{ minWidth: 420 }}>
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
          <Anchor<"a"> size="sm" onClick={() => navigate("/login")}>
            Login
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Email"
            placeholder="Enter an email"
            required
            value={email}
            onChange={handleEmail}
          />
          <TwoInputRow display gap="10px">
            <TextInput
              label="First name"
              placeholder="Enter your first name"
              required
              value={firstName}
              onChange={handleFirstName}
            />
            <TextInput
              label="Last Name"
              placeholder="Enter your last name"
              required
              value={lastName}
              onChange={handleLastName}
            />
          </TwoInputRow>
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
          <ErrorMessage error={!!errorMessage}>{errorMessage}</ErrorMessage>
          <Button fullWidth mt="xl" onClick={handleRegister}>
            Register
          </Button>
        </Paper>
      </Container>
    </Center>
  );
}
