import { motion } from "framer-motion";
import {CreateBlogOpportunity} from "../components/opportunity/CreateBlogOpportunity";

export function CreateBlogOpportunityPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <CreateBlogOpportunity />
    </motion.div>
  );
}
