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
          />
          <PasswordInput
            label="Password"
            placeholder="Enter a password"
            required
            mt="md"
          />
          <PasswordInput
            label="Confirm Password"
            placeholder="Retype your password"
            required
            mt="md"
          />
          <Button fullWidth mt="xl">
            Register
          </Button>
        </Paper>
      </Container>
    </Center>
  );
}
