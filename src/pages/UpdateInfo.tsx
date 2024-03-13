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
import { motion } from "framer-motion";
import { UserInfo } from "../FeaturedComposition";

export function UpdateInfo() {
  const navigate = useNavigate();
  const [link, setLink] = useState("");
  const [bio, setBio] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userUID, setUserUID] = useState("");
  const url = "https://oyster-app-7l5vz.ondigitalocean.app/compositiontoday";

  const handleLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value.trim());
  };

  const handleBio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBio(e.target.value); //.trim()
  };

  const handleUpdate = async () => {
    try {
      if (link == "" && bio == "") {
        throw "Please input at least either a biography or website link.";
      }
      if (userUID == "" || userUID == null) {
        throw "Don't have the UID yet";
      }
      // Here we need to call a function to pass the data to an api call
      // let requestOptions = {
      //   method: "PUT",
      //   headers: { "Content-Type": "application/json" },
      // };
      // let response = await fetch(
      //   `${url}/updateuser/${bio}/${link}/${userUID}`,
      //   requestOptions
      // );
      let x = new UserInfo(bio, link, userUID);
      let requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(x),
      };

      let response = await fetch(`${url}/updateuser`, requestOptions);
      let responseJson = await response.json();
      navigate("/");
    } catch (err: unknown) {
      // if (err instanceof FirebaseError) {
      //   if (authErrorList[err.code as keyof typeof authErrorList]) {
      //     setErrorMessage(
      //       authErrorList[err.code as keyof typeof authErrorList]
      //     );
      //   } else {
      //     setErrorMessage(defaultErrorMessage);
      //   }
      // } else if (typeof err === "string") {
      //   if (authErrorList[err as keyof typeof authErrorList]) {
      //     setErrorMessage(authErrorList[err as keyof typeof authErrorList]);
      //   } else {
      //     setErrorMessage(defaultErrorMessage);
      //   }
      // } else {
      //   setErrorMessage(defaultErrorMessage);
      // }
      //setErrorMessage(defaultErrorMessage);
      console.log(err);
    }
  };
  // Was used to navigate back to the main page after successfully logging in i believe
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserUID(user.uid);
      }
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Container size={1000} my={40}>
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Update Your Profile
        </Title>
        {/* <Text color="dimmed" size="sm" align="center" mt={5}>
            Don't have an account yet?{" "}
            <Anchor<"a"> size="sm" onClick={() => navigate("/register")}>
              Create account
            </Anchor>
          </Text> */}

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Biography"
            placeholder="Your biography"
            value={bio}
            onChange={handleBio}
          />
          <TextInput
            label="Link"
            placeholder="Your website link"
            mt="md"
            value={link}
            onChange={handleLink}
          />
          {/* <ErrorMessage error={!!errorMessage}>{errorMessage}</ErrorMessage> */}
          <Button fullWidth mt="xl" onClick={handleUpdate}>
            Update Profile
          </Button>
        </Paper>
      </Container>
    </motion.div>
  );
}
