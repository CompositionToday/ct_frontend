import { Opportunity } from "../components/opportunity/Opportunity";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

export function Concerts() {
  return (
    <>
      <Helmet>
          <title>Concerts | Composition Today</title>
          <meta name="description" content="The Concerts page for Composition Today!"/>
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Opportunity apiEndpoint="concerts" />
      </motion.div>
    </>
  );
}
