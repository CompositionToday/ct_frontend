import { Title } from "@mantine/core";
import { Opportunity } from "../components/opportunity/Opportunity";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
    Image,
  } from "@mantine/core";

export function UCF() {
    const quote = require("../images/quote.png");

    const ucf = require("../images/ucf.png");

    return (
    <div style={{justifyContent: "center", display:"flex", flexDirection:"column"}}>
        <Image src={String(quote)} width={"1000px"}></Image>
        <Image src={String(ucf)} width={"1000px"}></Image>
    </div>
    );
}
