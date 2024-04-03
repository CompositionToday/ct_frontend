import { Opportunity } from "../components/opportunity/Opportunity";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

export function Jobs() {
  return (
    <>
      <Helmet>
          <title>Jobs | Composition Today</title>
          <meta name="description" content="The Jobs page for Composition Today!"/>
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Opportunity apiEndpoint="jobs" />
      </motion.div>
    </>
  );
}
