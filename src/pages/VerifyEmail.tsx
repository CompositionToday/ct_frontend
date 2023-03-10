import react, { useState, useEffect } from "react";
import {
  createStyles,
  Image,
  Container,
  Title,
  Text,
  Button,
  SimpleGrid,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import image from "../images/EmailGirlFormatted.png";
import { auth } from "../Firebase";
import {
  onAuthStateChanged,
  sendEmailVerification,
  User,
  sendSignInLinkToEmail,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },

  title: {
    fontWeight: 900,
    fontSize: 34,
    marginBottom: theme.spacing.md,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 32,
    },
  },

  control: {
    [theme.fn.smallerThan("sm")]: {
      width: "100%",
    },
  },

  mobileImage: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  desktopImage: {
    maxWidth: 400,
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
}));

export function VerifyEmail() {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [disableButton, setDisableButton] = useState(false);

  const onSubmit = async () => {
    try {
      setDisableButton(true);
      const actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be in the authorized domains list in the Firebase Console.
        url:
          window.location.hostname === "localhost" ||
          window.location.hostname === "127.0.0.1"
            ? "http://localhost:3000/"
            : "http://compositiontoday.net/",
        // url: "http://compositiontoday.net/",
        // This must be true.
        // handleCodeInApp: true,
        // iOS: {
        //   bundleId: "com.example.ios",
        // },
        // android: {
        //   packageName: "com.example.android",
        //   installApp: true,
        //   minimumVersion: "12",
        // },
        // dynamicLinkDomain: "compositiontoday.net",
      };

      console.log("user email", currentUser?.email);
      await sendEmailVerification(currentUser!, actionCodeSettings);
      // await sendSignInLinkToEmail(
      //   auth,
      //   currentUser?.email!,
      //   actionCodeSettings
      // );
      console.log("after await");

      showNotification({
        title: "Email Verification Sent",
        message: "An email to verify your account has been sent",
        color: "green",
      });

      setTimeout(() => setDisableButton(false), 5000);
    } catch (err) {
      console.log(err);
      showNotification({
        title: "Error",
        message: "Something went wrong, please try again later",
        color: "red",
      });
      setDisableButton(false);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(`${user?.email}`);
        setCurrentUser(user);
      } else {
        navigate("/");
      }
    });

    console.log("location host", window.location.hostname);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Container className={classes.root}>
        <SimpleGrid
          spacing={80}
          cols={2}
          breakpoints={[{ maxWidth: "sm", cols: 1, spacing: 40 }]}
        >
          <Image src={image} className={classes.mobileImage} />
          <div>
            <Title className={classes.title}>Verify Email</Title>
            <Text color="dimmed" size="lg">
              In order to proceed to the next page, please verify your email.
            </Text>
            <Text color="dimmed" size="lg">
              Please note that after verifying your email, if you keep seeing
              the this page, you may need to manually sign out and then re-login
              again
            </Text>
            <Button
              variant="outline"
              size="md"
              mt="xl"
              className={classes.control}
              disabled={disableButton}
              onClick={onSubmit}
            >
              {disableButton
                ? "Please wait 5 seconds before getting another link"
                : "Send Email Verification"}
            </Button>
          </div>
          <Image src={image} className={classes.desktopImage} />
        </SimpleGrid>
      </Container>
    </motion.div>
  );
}
