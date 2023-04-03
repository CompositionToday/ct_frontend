import { Opportunity } from "../components/opportunity/Opportunity";
import { auth } from "../Firebase";
import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export function MyPosts() {
  const [userUid, setUserUid] = useState("");
  const [pathName, setPathName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (!user.emailVerified) {
          navigate("/verify");
        }
        let temp = `posts/${user.uid}`;
        setPathName(temp);
      } else {
        navigate("/");
      }
    });
  }, []);

  useEffect(() => {
  }, [pathName]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Opportunity apiEndpoint={pathName} />
    </motion.div>
  );
}
