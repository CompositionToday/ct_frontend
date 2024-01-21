import { Opportunity } from "../../components/opportunity/Opportunity";
import { auth } from "../../Firebase";
import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export function Reported() {
  const url = "https://oyster-app-7l5vz.ondigitalocean.app/compositiontoday";
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (!user.emailVerified) {
          navigate("/verify");
        }
        let response = await fetch(
          `${url}/users?page_number=1&keyword=${user.email}`
        );

        let responseJson = await response.json();

        let userData = responseJson.listOfObjects[0];

        if (!userData.is_admin) {
          navigate("/");
        }
      } else {
        navigate("/");
      }
    });
  }, []);

  // useEffect(() => {
  //   const getReported = async() => {
  //     try {
  //       let requestOptions = {
  //         method: "GET",
  //         headers: { "Content-Type": "application/json" },
  //       };
  //       let response = await fetch(
  //         `${url}/posts/reported`,
  //         requestOptions
  //       );
  //       let responseJson = await response.json();
  //     } catch(error) {
  //       throw(error);
  //     }
  //   }
  //   getReported();
  // }, []);
    
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Opportunity apiEndpoint="posts/reported" />
    </motion.div>
  );
}
