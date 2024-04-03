import {Button, Tooltip, useMantineColorScheme} from "@mantine/core";
import React from "react";
import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon } from "react-share";
import { OpportunityItem } from "./OpportunityHelper";
import infoicon from "../../../src/images/info-square.png";
import { IconBrandFacebook, IconBrandX } from '@tabler/icons-react';

const ShareButtons = ({value, userUID}) => {
  const shareUrl = "https://compositiontoday.net/#/compositions"; // Get the current URL
  let eventDetails = "test";
  userUID === value?.UID ? (eventDetails = "Check out my composition, " + value.title + ", at CompositionToday! #CompositionToday") : (eventDetails = "Check out this composition called " + value.title + " at compositiontoday.com! #CompositionToday");

  return (
    <div style={{display: "grid", gridAutoFlow: "column", gridColumnGap: "7px"}}>
      <span style={{width:"30px", margin: "0 0 20 0"}}>
          <Tooltip label="Share on Facebook">
              <FacebookShareButton
                  url={shareUrl}
                  title={eventDetails}
              >
                {/*<FacebookIcon width={"25px"} viewBox="0 40 64 64"/>*/}
                <IconBrandFacebook style={{marginTop:"2px"}} stroke={2} color={"#1DA1F2"}/>
            </FacebookShareButton>
          </Tooltip>
      </span>

      <span style={{margin: "auto"}}>
          <Tooltip label="Share on X">
              <TwitterShareButton
                url={shareUrl}
                title={eventDetails}
              >
            {/*<TwitterIcon width={"25px"} viewBox="0 40 64 64"/>*/}
            <IconBrandX stroke={2}
                color={useMantineColorScheme().colorScheme === 'dark' ? "#FFFFFF" : "#222222"}
                style={{marginTop:"2px"}}
            />
            </TwitterShareButton>
          </Tooltip>
      </span>
    </div>
  );
};

export default ShareButtons;
