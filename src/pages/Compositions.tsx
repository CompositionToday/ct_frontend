import { Opportunity } from "../components/opportunity/Opportunity";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

export function Compositions() {
  return (
    <>
      <Helmet>
          <title>Compositions | Composition Today</title>
          <meta name="description" content="The Compositions page for Composition Today!"/>
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Opportunity apiEndpoint="compositions" />
      </motion.div>
  </>
  );
}
