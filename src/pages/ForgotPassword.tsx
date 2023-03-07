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
import { motion } from "framer-motion";

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
  const [validInput, setValidInput] = useState(false);

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value.trim());
  };

  const handlePasswordReset = async () => {
    try {
      if (email === "") {
        throw "Please input an email";
      }

      await sendPasswordResetEmail(auth, email);
      setErrorMessage("");
      setValidInput(true);
    } catch (err: unknown) {
      console.log(err);
      if (err instanceof FirebaseError) {
        if (authErrorList[err.code as keyof typeof authErrorList]) {
          setErrorMessage(
            authErrorList[err.code as keyof typeof authErrorList]
          );
        } else if (err.code === "auth/user-not-found") {
          console.log("here");
          setValidInput(true);
          setErrorMessage("");
          return;
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
      setValidInput(false);
    }
  };

  const refreshPage = () => {
    window.location.reload();
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
      }
    });
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
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
          {validInput && (
            <p>
              If this email is registered, an email has been sent to reset your
              password. Please make sure to also check your spam box!
            </p>
          )}
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
            {validInput && (
              <Anchor onClick={refreshPage}>Send to a different email?</Anchor>
            )}
            <Button
              className={classes.control}
              onClick={handlePasswordReset}
              disabled={validInput}
            >
              {validInput ? "✓" : "Reset password"}
            </Button>
          </Group>
        </Paper>
      </Container>
    </motion.div>
  );
}
