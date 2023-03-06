import { Opportunity } from "../components/opportunity/Opportunity";
import { motion } from "framer-motion";

export function Festivals() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Opportunity apiEndpoint="festivals" />
    </motion.div>
  );
}
