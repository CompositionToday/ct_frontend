import { useState, useEffect } from "react";
import { auth } from "../Firebase";
import {
  authErrorList,
  ErrorMessage,
  defaultErrorMessage,
} from "../components/login/profile";
import { sendPasswordResetEmail, onAuthStateChanged } from "firebase/auth";
import { FirebaseError } from "@firebase/util";
import {
  createStyles,
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Container,
  Group,
  Anchor,
  Center,
  Box,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 26,
    fontWeight: 900,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  controls: {
    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column-reverse",
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      width: "100%",
      textAlign: "center",
    },
  },
}));

export function ForgotPassword() {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordReset = async () => {
    try {
      if (email === "") {
        throw "Please input an email";
      }

      await sendPasswordResetEmail(auth, email);
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
  });

  return (
    <Container size={460} my={30}>
      <Title className={classes.title} align="center">
        Forgot your password?
      </Title>
      <Text color="dimmed" size="sm" align="center">
        Enter your email to get a reset link
      </Text>

      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <TextInput
          label="Your email"
          placeholder="me@mantine.dev"
          required
          value={email}
          onChange={handleEmail}
        />
        <ErrorMessage error={!!errorMessage}>{errorMessage}</ErrorMessage>
        <Group position="apart" mt="lg" className={classes.controls}>
          <Anchor
            color="dimmed"
            size="sm"
            className={classes.control}
            onClick={() => navigate("/login")}
          >
            <Center inline>
              <IconArrowLeft size={12} stroke={1.5} />
              <Box ml={5}>Back to login page</Box>
            </Center>
          </Anchor>
          <Button className={classes.control} onClick={handlePasswordReset}>
            Reset password
          </Button>
        </Group>
      </Paper>
    </Container>
  );
}
