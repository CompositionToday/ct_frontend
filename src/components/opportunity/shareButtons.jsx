import { Button } from "@mantine/core";
import React from "react";
import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon } from "react-share";
import { OpportunityItem } from "./OpportunityHelper";
import infoicon from "../../../src/images/info-square.png";
const ShareButtons = ({value, userUID}) => {
  const shareUrl = "https://compositiontoday.net/#/compositions"; // Get the current URL
  let eventDetails = "test";
  userUID === value?.UID ? (eventDetails = "Check out my composition, " + value.title + ", at CompositionToday! #CompositionToday") : (eventDetails = "Check out this composition called " + value.title + " at compositiontoday.com! #CompositionToday");

  return (
    <div style={{display: "grid", gridAutoFlow: "column", gridColumnGap: "7px"}}>
      <span style={{width:"30px", margin: "0 0 20 0"}}>
      <FacebookShareButton url={shareUrl} hashtag={eventDetails} subject={eventDetails} quote={"Testing"}>
        <FacebookIcon width={"25px"} viewBox="0 40 64 64"/>
      </FacebookShareButton>
      </span>
      <span style={{margin: "auto"}}>
      <TwitterShareButton
        url={shareUrl}
        title={eventDetails}
      >
        <TwitterIcon width={"25px"} viewBox="0 40 64 64"/>
      </TwitterShareButton>
      </span>
    </div>
  );
};

export default ShareButtons;
