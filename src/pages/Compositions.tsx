import { Opportunity } from "../components/opportunity/Opportunity";
import { motion } from "framer-motion";

export function Compositions() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Opportunity apiEndpoint="compositions" />
    </motion.div>
  );
}
