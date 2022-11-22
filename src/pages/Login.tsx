import { useState, useEffect } from "react";
import { auth } from "../Firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
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

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);
    }, [email, password]);

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
                    <Anchor<"a">
                        href="#"
                        size="sm"
                        onClick={() => navigate("/register")}
                    >
                        Create account
                    </Anchor>
                </Text>

                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                    <TextInput
                        label="Email"
                        placeholder="you@mantine.dev"
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
                    <Group position="apart" mt="md">
                        <Checkbox label="Remember me" />
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
