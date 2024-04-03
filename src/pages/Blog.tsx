import { Title } from "@mantine/core";
import { Opportunity } from "../components/opportunity/Opportunity";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

export function Blog() {
    return (
    <>
        <Helmet>
            <title>Blog | Composition Today</title>
            <meta name="description" content="The Blog page for Composition Today!"/>
        </Helmet>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <Opportunity apiEndpoint="blog" />
        </motion.div>
    </>
    );
}
