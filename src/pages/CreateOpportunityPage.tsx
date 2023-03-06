import { CreateOpportunity } from "../components/opportunity/CreateOpportunity";
import { motion } from "framer-motion";

export function CreateOpportunityPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <CreateOpportunity />
    </motion.div>
  );
}
