import { Opportunity } from "../components/opportunity/Opportunity";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

export function Competitions() {
  return (
    <>
      <Helmet>
          <title>Competitions | Composition Today</title>
          <meta name="description" content="The Competitions page for Composition Today!"/>
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Opportunity apiEndpoint="competitions" />
      </motion.div>
    </>
  );
}
