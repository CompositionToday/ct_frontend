import { Opportunity } from "../components/opportunity/Opportunity";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

export function Festivals() {
  return (
    <>
      <Helmet>
          <title>Festivals | Composition Today</title>
          <meta name="description" content="The Festivals page for Composition Today!"/>
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Opportunity apiEndpoint="festivals" />
      </motion.div>
    </>
  );
}
