import { Opportunity } from "../components/opportunity/Opportunity";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

  
export function ResearchPapers() {
  return (
    <>
      <Helmet>
          <title>Research Papers | Composition Today</title>
          <meta name="description" content="The Research Papers page for Composition Today!"/>
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Opportunity apiEndpoint="research" />
      </motion.div>
    </>
  );
}
