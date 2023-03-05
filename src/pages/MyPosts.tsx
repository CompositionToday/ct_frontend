import { Opportunity } from "../components/opportunity/Opportunity";
import { auth } from "../Firebase";
import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export function MyPosts() {
  const [userUid, setUserUid] = useState("");
  const [pathName, setPathName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        let tempApiEndpoint = `posts/${user.uid}`;
        setPathName(tempApiEndpoint);
      } else {
        navigate("/");
      }
    });
  }, []);

  useEffect(() => {
    console.log("pathname: ", pathName);
  }, [pathName]);

  return (
    <div>
      <Opportunity apiEndpoint={pathName} />
    </div>
  );
}
