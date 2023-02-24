import { Opportunity } from "../components/opportunity/Opportunity";
import { auth } from "../Firebase";
import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export function RecentPosts() {
  const url = "https://oyster-app-7l5vz.ondigitalocean.app/compositiontoday";
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
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
  });

  return (
    <div>
      <Opportunity apiEndpoint="posts" />
    </div>
  );
}
