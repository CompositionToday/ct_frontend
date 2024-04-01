import { useState, useRef, useEffect } from "react";
import {
    createStyles,
    Container,
    Button,
    Badge, ScrollArea,
} from "@mantine/core";
import { IconExternalLink, IconScubaMask } from "@tabler/icons";

// @ts-ignore
import { useWindowSize } from "@uidotdev/usehooks";

import React from "react";
import { FeaturedComposition } from "../../FeaturedComposition";
import genreIcon from "../../images/BigMusicNote.png";
import {Carousel} from "@mantine/carousel";
import {useColorScheme} from "@mantine/hooks";
import {AnimateIn} from "../animations/AnimateOnScroll";

let firstPass = true;
const url = "https://oyster-app-7l5vz.ondigitalocean.app/compositiontoday";
const useStyles = createStyles((theme) => ({
    inner: {
        display: "flex",
        justifyContent: "space-between",
        // paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl * 6,
    },

    content: {
        display: "flex",
        alignItems: "center",
        alignContent: "center",
        flexWrap: "wrap",

        maxWidth: 480,
        marginRight: theme.spacing.xl * 3,

        [theme.fn.smallerThan("md")]: {
            maxWidth: "100%",
            marginRight: 0,
        },
    },

    title: {
        color: 'White',
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontSize: 55,
        lineHeight: 1.2,
        fontWeight: 800,

        [theme.fn.smallerThan("sm")]: {
            fontSize: 36,
        },
    },

    card: {
        color: theme.white,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        borderRadius:"md",
        textAlign:"center",
    },

    control: {
        [theme.fn.smallerThan("xs")]: {
            flex: 1,
        },
    },

    carousel: {
        backgroundColor:theme.colorScheme !== "dark" ? theme.colors.gray[0] : "#454545"
    },

    image: {
        flex: 1,
        [theme.fn.smallerThan("md")]: {
            display: "none",
        },
    },

    highlight: {
        position: "relative",
        backgroundColor: theme.fn.variant({
            variant: "light",
            color: theme.primaryColor,
        }).background,
        borderRadius: theme.radius.sm,
        padding: "4px 12px",
    },

    textHighlight: {
        lineHeight: 0,
    },

    h3: {
        height: "2px",
        color: "#EEEEEE",
    },

    link: {
        color: "#90caf9",
        textDecoration: "underline",
        textDecorationColor:"#90caf9"
    },

    cardSubHeading:{
        color:"#90caf9"
    },

    h4: {
        height: "2px",
        fontSize: 12
    },

    container: {
        maxWidth: "75vw",

        [theme.fn.smallerThan("md")]: {
            maxWidth: "85vw",
        },
    },

    subheading: {
        fontSize: 25,

        [theme.fn.smallerThan("sm")]: {
            fontSize: 22,
        },
    },

    featuredList: {
        justifyContent: "center",
        background: theme.colorScheme !== "dark" ? theme.colors.dark[7] : "white",
    },
}));

export function FeaturedCompositions() {
    const { classes } = useStyles();
    const [heroImageClick, setHeroImageClick] = useState(0);
    const [featuredlist, setList] = useState<FeaturedComposition[]>([]);
    const windowSize = useWindowSize();


    function angle(cx: number, cy: number, ex: number, ey: number) {
        const dy = ey - cy;
        const dx = ex - cx;
        const rad = Math.atan2(dy, dx);
        const deg = (rad * 180) / Math.PI;
        return deg;
    }

    const handleMouseMove = (e: MouseEvent) => {
        const anchor = document.getElementById("anchor");
        const rect = anchor?.getBoundingClientRect();

        const anchorX = rect?.left! + rect?.width! / 2;
        const anchorY = rect?.top! + rect?.height! / 2;
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const angleDeg = angle(mouseX, mouseY, anchorX, anchorY);

        console.log("moving event mouse");
    };
    const getFeaturedList = async () => {
        let response = await fetch(`${url}/featuredcompositions`);
        let responseJson = await response.json();
        const deepCopyOfObject = JSON.parse(
            JSON.stringify(responseJson.listOfObjects)
        );
        let x = deepCopyOfObject.length;
        let list = new Array<FeaturedComposition>();

        for (let i = 0; i < x; i++) {
            let val = new FeaturedComposition(
                deepCopyOfObject[i].title,
                deepCopyOfObject[i].link,
                deepCopyOfObject[i].first_name,
                deepCopyOfObject[i].last_name,
                deepCopyOfObject[i].genre,
                deepCopyOfObject[i].description,
                null,
                i%2
            );
            console.log(val)
            list.push(val);
            
            setList([...featuredlist, ...list]);
        }
        console.log(featuredlist);
        console.log(featuredlist.length);
    };

    useEffect(() => {
        getFeaturedList();
    }, []);

    return (
        <div style={{
            backgroundColor:"#001e3c",
            borderBottom:"thick",
            borderBottomStyle:"solid",
            borderBottomWidth:"50",
            borderBottomColor:"#EEEEEE",
        }}>
            <Container className={classes.container}>

                <div style={{paddingTop:"3%", paddingBottom:"5%", width:"100%"}}>

                    <AnimateIn>
                        <div>
                            <h2 style={{ textAlign: "center" }} className={classes.title}>
                                Featured Compositions Of The Week
                            </h2>
                        </div>
                    </AnimateIn>

                    <AnimateIn>
                        <div>
                            <Carousel
                                sx={{
                                    width: "100%",
                                    height:"100%",
                                    paddingBottom: "6%",
                                }}
                                styles={
                                    {
                                        control: {
                                            '&[data-inactive]': {
                                                opacity: 0,
                                                cursor: 'default'
                                            },
                                            // eslint-disable-next-line react-hooks/rules-of-hooks
                                            color: "black",
                                            // backgroundColor: "gray"
                                            // eslint-disable-next-line react-hooks/rules-of-hooks
                                            backgroundColor: "white",
                                        },
                                        indicator: {
                                            // eslint-disable-next-line react-hooks/rules-of-hooks
                                            backgroundColor: "white"

                                        }
                                    }}
                                mx="auto"
                                withIndicators
                                height={350}
                                align={"start"}
                                slideSize="100%"
                                slideGap="xl"
                                // @ts-ignore
                                controlSize={Math.min(windowSize.width/25,40)}
                                // controlSize={20}
                            >
                                {featuredlist.map((featuredList) => (
                                    <Carousel.Slide
                                        sx={{
                                            width: "33.333%",
                                            height: "100%",
                                            paddingLeft:"10%",
                                            paddingRight:"10%",
                                            // eslint-disable-next-line react-hooks/rules-of-hooks
                                            // backgroundColor:featuredList.backgroundColor == 0 ? useMantineTheme().colors.dark[6] : useMantineTheme().colors.dark[7],
                                        }}
                                    >
                                        <ScrollArea
                                            h={250}
                                            scrollbarSize={4}
                                            type="hover"
                                            scrollHideDelay={100}
                                            styles={{
                                                scrollbar: {
                                                    color:"#EEEEEE",
                                                    thumbColor:"#EEEEEE",
                                                    '&[data-orientation="vertical"] .mantine-ScrollArea-thumb': {
                                                        backgroundColor: "#90caf9",
                                                    },
                                                    '&[data-orientation="horizontal"] .mantine-ScrollArea-thumb': {
                                                        backgroundColor: "transparent",
                                                    },
                                                },
                                            }}
                                        >
                                            <div key={featuredList.title} className={classes.card}>

                                                <a href={featuredList.link} className={classes.link}>
                                                    <h1 className={classes.cardSubHeading}>{featuredList.title}</h1>
                                                </a>

                                                {/*<h3 className={classes.h3}>*/}
                                                {/*    <Badge*/}
                                                {/*        leftSection={*/}
                                                {/*            <img src={genreIcon} width={"20px"} />*/}
                                                {/*        }*/}
                                                {/*        color="gray"*/}
                                                {/*        sx={{*/}
                                                {/*            height: "25px",*/}
                                                {/*            margin: "3px 5px 3px 0px",*/}
                                                {/*        }}*/}
                                                {/*    ></Badge>*/}
                                                {/*    {featuredList.genre}*/}
                                                {/*</h3>*/}

                                                {featuredList.awards ? (
                                                    <h3 className={classes.h3}>
                                                        Award/s: {featuredList.awards}
                                                    </h3>
                                                )
                                                    : null }

                                                {/*<h3 style={{ height: "10px" }}>*/}
                                                {/*    <a href={featuredList.link} target="blank">*/}
                                                {/*        <Button*/}
                                                {/*            radius="md"*/}
                                                {/*            sx={{*/}
                                                {/*                height: 30,*/}
                                                {/*                alignSelf: "flex-start",*/}
                                                {/*                margin: "15px 0px",*/}
                                                {/*            }}*/}
                                                {/*            size="sm"*/}
                                                {/*            rightIcon={*/}
                                                {/*                <IconExternalLink style={{ marginLeft: "-5px" }} />*/}
                                                {/*            }*/}
                                                {/*        >*/}
                                                {/*            Link*/}
                                                {/*        </Button>*/}
                                                {/*    </a>*/}
                                                {/*</h3>*/}

                                                <br />
                                                <h3 className={classes.h3}>
                                                    by {featuredList.firstName} {featuredList.lastName}
                                                </h3>

                                                <br />
                                                <h3 className={classes.h4}>{featuredList.description}</h3>

                                            </div>
                                        </ScrollArea>
                                </Carousel.Slide>))}
                            </Carousel>
                        </div>
                    </AnimateIn>
                </div>

                <div>

                </div>
            </Container>
        </div>
    );
}
