import { AnimateIn } from "../animations/AnimateOnScroll";

import {
    createStyles,
    Image,
    Container,
    Title,
    Text,
    Button,
    SimpleGrid,
} from "@mantine/core";
import image from "../../images/SignUp.png";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
    root: {
        paddingTop: 150,
        paddingBottom: 150,
        maxWidth: 1080,
    },

    title: {
        fontWeight: 900,
        fontSize: 44,
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
        maxWidth: 450,
        [theme.fn.smallerThan("sm")]: {
            display: "none",
        },
    },

    centerText: {
        display: "flex",
        alignItems: "center",
        alignContent: "center",
        flexWrap: "wrap",
    },

    centerImage: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
}));

export function RegisterCTA() {
    const { classes } = useStyles();
    const navigate = useNavigate();

    return (
        <Container className={classes.root}>
            <AnimateIn>

                <SimpleGrid
                    spacing={80}
                    cols={2}
                    breakpoints={[{ maxWidth: "sm", cols: 1, spacing: 40 }]}
                >
                    <Image src={image} className={classes.mobileImage} />
                    <div className={classes.centerText}>
                        <Title className={classes.title}>
                            Want to contribute?
                        </Title>
                        <Text color="dimmed" size={25}>
                            Create an account with us today to post opportunities you've come across.
                        </Text>
                        <Button
                            variant="outline"
                            size="xl"
                            mt="xl"
                            className={classes.control}
                            onClick={() => navigate("/register")}
                        >
                            Create an Account
                        </Button>
                    </div>
                    <div className={classes.centerImage}>
                        <Image src={image} className={classes.desktopImage} />
                    </div>
                </SimpleGrid>
            </AnimateIn>
        </Container>
    );
}
