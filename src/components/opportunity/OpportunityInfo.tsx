import {
  OpportunityInfoProp,
  OpportunityInfoContainer,
  MoreInfoOpportunityTitle,
  ButtonsContainer,
  DescriptionContainer,
  Label,
  DescriptionContent,
} from "./OpportunityInfoHelper";
import { auth } from "../../Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import {
  Flex,
  Button,
  ActionIcon,
  Tooltip,
  Badge,
  Alert,
  Text,
  Center,
  createStyles,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import {
  IconExternalLink,
  IconFlag,
  IconPencil,
  IconTrash,
  IconUser,
  IconBan,
  IconAlertCircle,
  IconSquareNumber0,
  IconMoodSad,
} from "@tabler/icons";
import { SpecificOpportunityInfo } from "./SpecificOpportunityInfo";
import { openDeletePostModal } from "./modals/DeletePostModal";
import { openBanPostModal } from "./modals/BanPostModal";
import { openFlagPostModal } from "./modals/FlagPostModal";
import { openResetFlagCountPostModal } from "./modals/ResetReportCountModal";
import { openLikePostModal } from "./modals/LikePostModal";
import heart from "./likeButton.png";
import filledHeart from "./filledLike.png";
import { openComposerModal } from "./modals/ComposerInfoModal";
import { FeaturedComposition } from "../../FeaturedComposition";
import infoicon from "../../../src/images/info-square.png";
import ShareButtons from "./shareButtons";

const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    // paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl * 6,
  },

  content: {
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    flexWrap: "wrap",

    maxWidth: 480,
    marginRight: theme.spacing.xl * 3,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : "#454545",
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 55,
    lineHeight: 1.2,
    fontWeight: 800,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 36,
    },
  },
  control: {
    [theme.fn.smallerThan("xs")]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,
    // maxWidth: "40vw",
    // marginLeft: 40,

    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  highlight: {
    position: "relative",
    backgroundColor: theme.fn.variant({
      variant: "light",
      color: theme.primaryColor,
    }).background,
    borderRadius: theme.radius.sm,
    padding: "4px 12px",
  },

  textHighlight: {
    lineHeight: 0,
  },

  container: {
    maxWidth: "75vw",

    [theme.fn.smallerThan("md")]: {
      maxWidth: "85vw",
    },
  },

  subheading: {
    fontSize: 22,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    [theme.fn.smallerThan("sm")]: {
      fontSize: 19,
    },
  },
  text: {
    fontSize: 15,
    [theme.fn.smallerThan("sm")]: {
      fontSize: 10,
    },
  },
  featuredList: {
    justifyContent: "center",
    background: "white",
  },
  modalTitle: {
    fontSize: 25,
    color: "#228be6",
  },
}));
export function OpportunityInfo({
  apiEndpoint,
  opportunity,
  opportunityType,
  setEditModal,
  setDeleteModal,
  handleDeletePost,
  handleBanPost,
  handleFlagPost,
  handleLikeButton,
  handleResetReportCount,
  deleteComment,
}: // setHelperDeleteComment,
OpportunityInfoProp) {
  const [userUID, setUserUID] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [liked, setLiked] = useState(false);
  const [firstRender, setFirstRender] = useState(true);
  const { classes } = useStyles();
  const [endDate, setEndDate] = useState(
    typeof opportunity?.end_date === "number"
      ? new Date(opportunity?.end_date)
      : new Date()
  );
  const [startDate, setStartDate] = useState(
    typeof opportunity?.start_date === "number"
      ? new Date(opportunity?.start_date)
      : new Date()
  );
  const [composerName, setComposerName] = useState("");
  const getLiked = async () => {
    // console.log("called getliked");
    let request1 = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    let likedresponse = await fetch(
      `${url}/liked/${userUID}/${opportunity?.idposts}`,
      request1
    );
    let jsonLiked = await likedresponse.json();
    const deepCopyOfObject = JSON.parse(
      JSON.stringify(jsonLiked.listOfObjects)
    );
    // console.log(deepCopyOfObject.length);
    if (deepCopyOfObject.length == 1) setLiked(true);
    else setLiked(false);
    // console.log(liked);
    // Get the composer information
    let response = await fetch(`${url}/getcomposer/${opportunity?.UID}`);
    let responseJson = await response.json();
    // Store the information in a parsed object
    const deepCopyOfObject2 = JSON.parse(
      JSON.stringify(responseJson.listOfObjects)
    );
    // Get the necessary info
    let fullName = deepCopyOfObject2[0].first_name + " " + deepCopyOfObject2[0].last_name;
    setComposerName(fullName);
  };
  const url = "https://oyster-app-7l5vz.ondigitalocean.app/compositiontoday";
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserUID(user.uid);
        try {
          let response = await fetch(`${url}/users/${user.uid}`);
          let responseJson = await response.json();

          let userData = responseJson.listOfObjects[0];

          if (userData.is_admin) {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
          // console.log(
          //   "get users signed info",
          //   responseJson,
          //   responseJson.listOfObjects[0],
          //   responseJson.listOfObjects[0].is_admin === 1
          // );
          // if (responseJson.listOfObjects[0].is_admin === 1) {
          //   setIsAdmin(true);
          // }
        } catch (err) {
          // console.log(err);
        }
      }
    });

    setStartDate(
      typeof opportunity?.start_date === "number"
        ? new Date(opportunity?.start_date)
        : new Date()
    );
    setEndDate(
      typeof opportunity?.end_date === "number"
        ? new Date(opportunity?.end_date)
        : new Date()
    );
  }, []);
  useEffect(() => {
    // console.log("Users Uid: ", userUID);
    // console.log("isAdmin: ", isAdmin);
  }, [userUID, isAdmin]);
  useEffect(() => {
    // console.log("start: ", startDate);
    // console.log("end: ", endDate);
    // console.log(opportunity);
    // console.log(typeof opportunity?.end_date);
    if (userUID != "" && userUID != null) getLiked();
  }, [endDate, startDate, opportunity]);
  if (!opportunity) {
    return (
      <Center sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <Text color="dimmed" size={30} mb={15}>
          No results found
        </Text>
        <IconMoodSad size={45} color="#868E96" />
      </Center>
    );
  }

  const isExpired = (endDate: string | number | Date) => {
    let currDate = new Date();
    return (endDate.valueOf() as number) <= currDate.valueOf();
  };

  return (
    <OpportunityInfoContainer>
      <ButtonsContainer
        justify="flex-end"
        gap="sm"
        wrap="wrap"
        direction={"row"}
      >
        <div
          style={{
            display: opportunity.UID === userUID || isAdmin ? "block" : "none",
          }}
        >
          <Tooltip label="Edit Post" withArrow>
            <ActionIcon
              color="green"
              sx={{
                height: 30,
                alignSelf: "flex-start",
                display:
                  opportunity.UID === userUID || isAdmin ? "block" : "none",
              }}
              onClick={() => {
                setEditModal(true);
              }}
            >
              <IconPencil />
            </ActionIcon>
          </Tooltip>
        </div>
        <div
          style={{
            display:
              (opportunity.UID === userUID || isAdmin) &&
              opportunity.is_deleted === 0
                ? "block"
                : "none",
          }}
        >
          <Tooltip label="Delete Post" withArrow>
            <ActionIcon
              color="red"
              sx={{
                height: 30,
                alignSelf: "flex-start",
                display:
                  (opportunity.UID === userUID || isAdmin) &&
                  opportunity.is_deleted === 0
                    ? "block"
                    : "none",
              }}
              onClick={() =>
                openDeletePostModal(
                  opportunity?.title ? opportunity.title : "",
                  handleDeletePost
                    ? handleDeletePost
                    : () => console.log("No delete function passed"),
                  isAdmin && opportunity.UID !== userUID ? true : false,
                  deleteComment
                )
              }
            >
              <IconTrash />
            </ActionIcon>
          </Tooltip>
        </div>
        <div
          style={{
            display:
              isAdmin && opportunity.UID !== userUID && !opportunity.is_banned
                ? "block"
                : "none",
          }}
        >
          <Tooltip label="Ban User" withArrow>
            <ActionIcon
              color="red"
              sx={{
                height: 30,
                alignSelf: "flex-start",
                display:
                  isAdmin &&
                  opportunity.UID !== userUID &&
                  !opportunity.is_banned
                    ? "block"
                    : "none",
              }}
              onClick={() =>
                openBanPostModal(
                  opportunity?.title ? opportunity.title : "",
                  handleBanPost
                    ? handleBanPost
                    : () => console.log("No ban function passed")
                )
              }
            >
              <IconBan />
            </ActionIcon>
          </Tooltip>
        </div>
        <div
          style={{ display: opportunity.UID !== userUID ? "block" : "none" }}
        >
          <Tooltip label="Report Post" withArrow>
            <ActionIcon
              color="yellow"
              sx={{
                height: 30,
                alignSelf: "flex-start",
                display: opportunity.UID !== userUID ? "block" : "none",
              }}
              onClick={() => {
                openFlagPostModal(
                  opportunity?.title ? opportunity.title : "",
                  handleFlagPost
                    ? handleFlagPost
                    : () => console.log("No flag function passed")
                );
              }}
            >
              <IconFlag />
            </ActionIcon>
          </Tooltip>
        </div>
        <div></div>
        <div
          style={{ display: opportunity.UID !== userUID ? "block" : "none" }}
        >
          <Tooltip label="Like Composition" withArrow>
            <ActionIcon
              color="blue"
              sx={{
                height: 30,
                alignSelf: "flex-start",
                display: opportunityType === "compositions" &&
                  userUID !== null &&
                  userUID !== ""
                    ? "block"
                    : "none",
              }}
              onLoad={() => {
                if (userUID != "" && userUID != null) getLiked();
                // console.log("onLoad called, liked = " + liked);
              }}
              disabled={userUID == "" || userUID == null}
              onClick={async () => {
                // console.log("clicked like button");
                // console.log(liked);
                openLikePostModal(
                  opportunity?.title ? opportunity.title : "",
                  handleLikeButton
                    ? handleLikeButton
                    : () => console.log("No like function passed"),
                  liked
                );
              }}
            >
              {liked ? (
                <img src={filledHeart} width={"25px"} />
              ) : (
                <img src={heart} width="25px" />
              )}
              {/* <IconFlag /> */}
            </ActionIcon>
          </Tooltip>
        </div>
        <div style={{ display: isAdmin ? "block" : "none" }}>
          <Tooltip label="Reset Report Count" withArrow>
            <ActionIcon
              color="yellow"
              sx={{
                height: 30,
                alignSelf: "flex-start",
                display: isAdmin ? "block" : "none",
              }}
              onClick={() => {
                openResetFlagCountPostModal(
                  opportunity?.title ? opportunity.title : "",
                  handleResetReportCount
                    ? handleResetReportCount
                    : () => console.log("No flag function passed")
                );
              }}
            >
              <IconSquareNumber0 />
            </ActionIcon>
          </Tooltip>
        </div>
        <div style={{ display: "block" }}>
          <Tooltip label="Composer Information">
            <ActionIcon
              color="blue"
              sx={{
                height: 30,
                alignSelf: "flex-start",
                display: opportunityType === "compositions" ? "block" : "none",
              }}
              onClick={async () => {
                // Get the composer information
                let response = await fetch(
                  `${url}/getcomposer/${opportunity?.UID}`
                );
                let responseJson = await response.json();
                // Store the information in a parsed object
                const deepCopyOfObject = JSON.parse(
                  JSON.stringify(responseJson.listOfObjects)
                );
                // Get the list of awards from the composer's submitted songs
                let awardsresponse = await fetch(
                  `${url}/getawards/${opportunity?.UID}`
                );
                let awardsJson = await awardsresponse.json();
                // Store the information in a parsed object
                const awardsDeepCopyOfObject = JSON.parse(
                  JSON.stringify(awardsJson.listOfObjects)
                );
                let awards = new Array<FeaturedComposition>();
                for (let i = 0; i < awardsDeepCopyOfObject.length; i++) {
                  awards.push(
                    new FeaturedComposition(
                      awardsDeepCopyOfObject[i].title,
                      awardsDeepCopyOfObject[i].link,
                      awardsDeepCopyOfObject[i].first_name,
                      awardsDeepCopyOfObject[i].last_name,
                      awardsDeepCopyOfObject[i].genre,
                      awardsDeepCopyOfObject[i].description,
                      awardsDeepCopyOfObject[i].awards
                    )
                  );
                }
                // Get the necessary info
                let fullName =
                  deepCopyOfObject[0].first_name +
                  " " +
                  deepCopyOfObject[0].last_name;
                // Get the bio and link of the composer
                // Get the list of awards from the composer's submitted songs
                let inforesponse = await fetch(
                  `${url}/userinfo/${opportunity?.UID}`
                );
                let infoJson = await inforesponse.json();
                // Store the information in a parsed object
                const infoObj = JSON.parse(
                  JSON.stringify(infoJson.listOfObjects)
                );
                let bio = infoObj[0].bio;
                let link = infoObj[0].link;
                if (bio == "") bio = null;
                if (link == "") link = null;
                // console.log("Bio: " + bio + ", Link: " + link);
                // Open the modal
                openComposerModal(
                  opportunity?.UID,
                  fullName,
                  awards,
                  bio,
                  link,
                  classes
                );
                //opportunity?.title ? opportunity.title : "",
              }}
            >
              <img src={infoicon} height={"25px"} width={"25px"}/>
            </ActionIcon>
          </Tooltip>
        </div>
        <div>
          <Tooltip
            label="Share"
            sx={{
              alignSelf: "flex-start",
              verticalAlign: "top",
            }}
          >
            <ShareButtons value={opportunity} userUID={userUID}></ShareButtons>
          </Tooltip>
        </div>
      </ButtonsContainer>
      {opportunity.is_deleted ? (
        <Alert
          icon={<IconAlertCircle size={16} />}
          title="Post Deleted"
          color="red"
          radius="md"
          sx={{ marginTop: "20px" }}
        >
          <p>
            {opportunity.deleted_comment
              ? opportunity.deleted_comment
              : "Your post has been deleted"}
          </p>
        </Alert>
      ) : null}
      {apiEndpoint.includes("posts") && (
        <Badge sx={{ margin: "15px 5px 3px 0px" }}>
          {opportunity.type?.substring(0, opportunity.type?.length)}
        </Badge>
      )}
      {opportunity.UID === userUID && (
        <Badge sx={{ margin: "15px 5px 3px 0px" }} color="green">
          My Post
        </Badge>
      )}
      {opportunity.is_deleted && apiEndpoint.includes("posts") ? (
        <Badge sx={{ margin: "15px 5px 3px 0px" }} color="red">
          Deleted
        </Badge>
      ) : null}
      {opportunity.end_date &&
      isExpired(opportunity.end_date) &&
      apiEndpoint.includes("posts") ? (
        <Badge sx={{ margin: "15px 5px 3px 0px" }} color="orange">
          Expired
        </Badge>
      ) : null}
      {opportunity.is_flagged && isAdmin ? (
        <Badge sx={{ margin: "15px 5px 3px 0px" }} color="yellow">
          {opportunity?.is_flagged} Reported
        </Badge>
      ) : null}
      <MoreInfoOpportunityTitle>{opportunity.title}</MoreInfoOpportunityTitle>
      <MoreInfoOpportunityTitle style={{display: opportunityType === "compositions" ? "block" : "none",}}>{composerName}</MoreInfoOpportunityTitle>
      {opportunity.organization && (
        <Text mb={15}>{opportunity.organization}</Text>
      )}
      {/* <Flex direction="column"> */}
      {/* {isAdmin && (
          <Tooltip label="Amount of Flags">
            <Flex align="center">
              <IconFlag size={30} color="#40C057" />
              <span style={{ fontSize: "17px", marginLeft: "10px" }}>
                {opportunity?.is_flagged}
              </span>
            </Flex>
          </Tooltip>
        )} */}
      {opportunity?.first_name && opportunity?.last_name && opportunity?.email && (
        <Tooltip label="Author" position="top-start">
          <Flex align="center">
            <IconUser size={30} color="#40C057" />
            <span style={{ fontSize: "17px", marginLeft: "10px" }}>
              {opportunity?.first_name} {opportunity?.last_name}:{" "}
              {opportunity?.email}
            </span>
          </Flex>
        </Tooltip>
      )}
      <SpecificOpportunityInfo
        opportunity={opportunity}
        opportunityType={opportunityType}
      />
      {/* </Flex> */}
      {opportunityType !== 'blog' ?
          <a href={opportunity.link} target="blank">

            <Button
                radius="md"
                sx={{ height: 30, alignSelf: "flex-start", margin: "15px 0px" }}
                size="md"
                rightIcon={<IconExternalLink style={{ marginLeft: "-5px" }} />}
            >
              {opportunityType === "competitions" || opportunityType === "jobs" ? "Apply" : "More Info"}
            </Button>

          </a>
          :
          <a></a>
      }
      <DescriptionContainer>
        <Label>{opportunityType === "blog" ? "" : "Description:"}</Label>
        <DescriptionContent>{opportunity.description}</DescriptionContent>
      </DescriptionContainer>
    </OpportunityInfoContainer>
  );
}
