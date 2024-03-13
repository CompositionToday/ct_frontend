import React, { useState, useEffect, useRef } from "react";
import {
  GridContainer,
  OpportunityGrid,
  OpportunityPageContainer,
  OpportunityItem,
  OpportunityLeftColumnContent,
  OpportunityLeftColumnContainer,
  OpportunityRightColumnContainer,
  OpportunityCard,
  OpportunityPaginationNavbarContainer,
} from "./OpportunityHelper";
import { OpportunityTitle } from "./OpportunityInfoHelper";
import { OpportunityInfo } from "./OpportunityInfo";
import {
  PaginationNavbar,
  PaginationSearchObject,
} from "../pagination/PaginationNavbar";
import {
  Image,
  createStyles,
  Input,
  MediaQuery,
  Modal,
  Flex,
  ActionIcon,
  Badge,
  LoadingOverlay,
  Skeleton,
  Container,
  Divider,
  Tooltip,
  Grid,
  Button,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { useLocation } from "react-router-dom";
import {
  IconFilter,
  IconSearch,
  IconTrophy,
  IconArrowLeft,
} from "@tabler/icons";
import { OpportunityFilterForm } from "./OpportunityFilterForm";
import { OpportunityForm } from "./OpportunityForm";
import { FormHeader } from "./CreateOpportunityHelper";
import { onAuthStateChanged } from "firebase/auth";
import { SpecificOpportunityBadges } from "./SpecificOpportunityBadges";
import { auth } from "../../Firebase";

interface OpportunityProp {
  apiEndpoint: string;
}

const greenTriangle = require("../../images/GreenTriangle.png");
const blueTriangle = require("../../images/BlueTriangle.png");

const useStyles = createStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 40,
    marginBottom: 20,
  },

  searchAndFilterContainer: {
    padding: "0px",
    // marginTop: "40px",
    // marginBottom: "20px",
    flexGrow: 1,

    [theme.fn.smallerThan("md")]: {
      marginLeft: "15px",
      marginRight: "15px",
    },
  },

  search: {
    borderColor: "#939393",

    flexBasis: "100%",
    marginRight: "15px",

    [theme.fn.largerThan("md")]: {
      flexBasis: "450px",
    },
  },

  winnersBtn: {
    [theme.fn.smallerThan("md")]: {
      marginRight: "15px",
    },
  },
}));

export function Opportunity({ apiEndpoint }: OpportunityProp) {
  const { classes } = useStyles();

  const opportunityType = useLocation().pathname.slice(1);
  const [currentOpportunity, setCurrentOpportunity] =
    useState<OpportunityItem | null>(null);
  const [displayOpportunityArray, setDisplayOpportunityArray] = useState<
    OpportunityItem[]
  >([]);
  const [displayOpportunityInfoModal, setDisplayOpportunityInfoModal] =
    useState(false);
  const [
    displayOpportunitySearchFilterModal,
    setDisplayOpportunitySearchFilterModal,
  ] = useState(false);
  const [displayOpportunityEditModal, setDisplayOpportunityEditModal] =
    useState(false);
  const [displayDeleteConfirmationModal, setDisplayDeleteConfirmationModal] =
    useState(false);
  const [displayBanConfirmationModal, setDisplayBanConfirmationModal] =
    useState(false);
  const [displayFlagConfirmationModal, setDisplayFlagConfirmationModal] =
    useState(false);
  const [keyword, setKeyword] = useState("");
  const [searchObj, setSearchObj] = useState<PaginationSearchObject>({
    keyword: "",
  });
  const url = "https://oyster-app-7l5vz.ondigitalocean.app/compositiontoday";
  const smallerScreen = useMediaQuery("(max-width: 992px)");
  const mobileScreen = useMediaQuery("(max-width: 36em)");

  const [recall, setRecall] = useState(0);
  const deleteComment = useRef("");
  const [userUid, setUserUid] = useState("");
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const [winnersShown, setWinnersShown] = useState(false);

  const handleOpportunityClick = (opportunity: OpportunityItem) => {
    setCurrentOpportunity(opportunity);
    setDisplayOpportunityInfoModal(true && smallerScreen);
  };

  const handleCloseModal = () => {
    setDisplayOpportunityInfoModal(false && smallerScreen);
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    console.log(e.target.value);
  };

  const handleInputSubmit = () => {
    console.log(keyword);
    if (keyword) {
      setSearchObj({ ...searchObj, keyword: keyword });
    } else {
      let tempSearchObj = searchObj;
      delete tempSearchObj.keyword;
      setSearchObj({ ...tempSearchObj });
    }
  };

  const handleEnterKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleInputSubmit();
    }
  };

  const deleteCurrentPost = async () => {
    try {
      let tempOpportunity = currentOpportunity;

      if (!tempOpportunity) {
        throw "There is not an opportunity selected";
      }

      let authorUID = tempOpportunity?.UID;
      delete tempOpportunity?.UID;
      delete tempOpportunity?.date_posted;

      console.log("checking author", userUid, authorUID);
      if (currentOpportunity?.is_deleted === 0) {
        if (userUid === authorUID) {
          tempOpportunity.deleted_comment = "Author has deleted this post";
          tempOpportunity.is_deleted = "2";
        } else {
          tempOpportunity.deleted_comment =
            deleteComment.current || "Your post has been deleted";
          tempOpportunity.is_deleted = "1";
        }
      } else {
        tempOpportunity.deleted_comment =
          "default message for not becoming undeleted";
        tempOpportunity.is_deleted = "0";
      }

      tempOpportunity.end_date = tempOpportunity?.end_date?.toString();
      tempOpportunity.start_date = tempOpportunity?.start_date?.toString();
      tempOpportunity.salary = tempOpportunity?.salary?.toString();
      tempOpportunity.is_flagged = currentOpportunity?.is_flagged?.toString();

      console.log("delete function params before calling edit: ", {
        ...tempOpportunity,
      });
      let responseJson = await editFunction(tempOpportunity);
      setRecall(recall + 1);
      setDisplayOpportunityInfoModal(false);
      showNotification({
        title: "Opportunity Deleted",
        message: "Opportunity was deleted",
        color: "green",
      });
    } catch (err) {
      console.log(err);
      showNotification({
        title: "Error",
        message: "Something went wrong, please try again later",
        color: "red",
      });
    } finally {
      setDisplayDeleteConfirmationModal(false);
    }
  };

  const handleEditButton = async (opportunity: OpportunityItem) => {
    try {
      delete opportunity.UID;
      delete opportunity.date_posted;

      // Format any keys of type number to be as type strings since the APIs only accept strings for the request body
      opportunity.end_date = opportunity.end_date?.toString();
      opportunity.start_date = opportunity.start_date?.toString();
      opportunity.deadline = opportunity.deadline?.toString();
      opportunity.salary = opportunity.salary?.toString();
      opportunity.fee = opportunity.fee?.toString();

      let editedOpportunity = await editFunction(opportunity);

      for (let i = 0; i < displayOpportunityArray.length; i++) {
        if (displayOpportunityArray[i].idposts === editedOpportunity.idposts) {
          let tempArray = displayOpportunityArray;
          tempArray[i] = editedOpportunity;
          setDisplayOpportunityArray([...tempArray]);
          break;
        }
      }

      showNotification({
        title: "Edits Applied",
        message: "Your changes have been applied",
        color: "green",
      });
      setDisplayOpportunityEditModal(false);
    } catch (err) {
      console.log(err);
      showNotification({
        title: "Error",
        message: "There was a problem, please try again later",
        color: "red",
      });
    }
  };

  // const handleFlagButton = async () => {
  //   try {
  //     let tempOpportunity = currentOpportunity;

  //     if (!tempOpportunity) {
  //       throw "There is not an opportunity selected";
  //     }

  //     delete tempOpportunity?.UID;
  //     delete tempOpportunity?.date_posted;

  //     // Format any number keys as strings since the APIs only accept strings for the request body
  //     tempOpportunity.end_date = tempOpportunity?.end_date?.toString();
  //     tempOpportunity.start_date = tempOpportunity?.start_date?.toString();
  //     tempOpportunity.salary = tempOpportunity?.salary?.toString();
  //     tempOpportunity.is_flagged = currentOpportunity?.is_flagged ? "0" : "1";
  //     tempOpportunity.is_deleted = currentOpportunity?.is_deleted?.toString();

  //     let responseJson = await editFunction(tempOpportunity);
  //     console.log("fake flag resposne: ", responseJson);
  //     setRecall(recall + 1);
  //     setDisplayOpportunityInfoModal(false);
  //     showNotification({
  //       title: "Post Reported",
  //       message:
  //         "You reported this post. It will be reviewed by an administrator",
  //       color: "green",
  //     });
  //   } catch (err) {
  //     console.log(err);
  //     showNotification({
  //       title: "Error",
  //       message: "Something went wrong, please try again later",
  //       color: "red",
  //     });
  //   } finally {
  //     setDisplayFlagConfirmationModal(false);
  //   }
  // };

  const handleFlagButton = async () => {
    try {
      let requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      };

      let response = await fetch(
        `${url}/posts/flag/${currentOpportunity?.idposts}`,
        requestOptions
      );

      let responseJson = await response.json();
      console.log("put flag response: ", responseJson.listOfObjects[0]);

      let tempCurrentOpportunity = {
        ...currentOpportunity,
        is_flagged: currentOpportunity?.is_flagged
          ? (currentOpportunity?.is_flagged as number) + 1
          : 1,
      };

      setCurrentOpportunity(tempCurrentOpportunity);

      let tempDisplayOpportunityArray = displayOpportunityArray;

      for (let i = 0; i < tempDisplayOpportunityArray.length; i++) {
        if (
          tempDisplayOpportunityArray[i].idposts ===
          tempCurrentOpportunity.idposts
        ) {
          tempDisplayOpportunityArray[i] = tempCurrentOpportunity;
          break;
        }
      }

      setDisplayOpportunityArray(tempDisplayOpportunityArray);

      showNotification({
        title: "Post Reported",
        message:
          "You reported this post. It will be reviewed by an administrator",
        color: "green",
      });
    } catch (err) {
      console.log(err);
      showNotification({
        title: "Error",
        message: "Something went wrong, please try again later",
        color: "red",
      });
    }
  };

  const handleResetReportCountButton = async () => {
    try {
      let requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      };

      let response = await fetch(
        `${url}/posts/flag/reset/${currentOpportunity?.idposts}`,
        requestOptions
      );

      let responseJson = await response.json();
      console.log("put flag response: ", responseJson.listOfObjects[0]);
      showNotification({
        title: "Flag Count Reseted",
        message: "You have successfully reset the flag count on this post",
        color: "green",
      });

      setRecall(recall + 1);
    } catch (err) {
      console.log(err);
      showNotification({
        title: "Error",
        message: "Something went wrong, please try again later",
        color: "red",
      });
    }
  };

  const editFunction = async (opportunity: OpportunityItem) => {
    try {
      let idpost = currentOpportunity?.idposts;
      // Delete the idposts in the opportunity such that the backend doesn't actually update the idpost column in mySQL.
      // This shouldn't be necessary to do at all but have it here just in-case the idposts here is some how different from the idposts in the url parameters and/or in mySQL
      delete opportunity.idposts;
      delete opportunity.first_name;
      delete opportunity.last_name;
      delete opportunity.email;
      delete opportunity.is_banned;
      delete opportunity.is_admin;
      delete opportunity.ban_message;

      for (let key in opportunity) {
        if (
          !opportunity[key as keyof typeof opportunity] &&
          key !== "winner" &&
          key !== "city" &&
          key !== "state" &&
          key !== "address"
        ) {
          delete opportunity[key as keyof typeof opportunity];
        }
      }

      console.log("formatted edit body:", opportunity);

      let requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(opportunity),
      };

      let response = await fetch(
        `${url}/${currentOpportunity?.type}/${idpost}`,
        requestOptions
      );

      let responseJson = await response.json();

      let editedOpportunity = responseJson.listOfObjects[0];

      return editedOpportunity;
    } catch (err) {
      console.log(err);
    }
  };

  // FIXME: need to implement this after the backend people will allow me to ban a user based on UID, or I have a way to get the email based on the UID on the frontend
  const handleBanButton = async () => {
    try {
      let responseUser = await fetch(`${url}/users/${currentOpportunity?.UID}`);
      let responseUserJson = await responseUser.json();

      console.log(responseUserJson);

      if (responseUserJson.listOfObjects.length < 1) {
        throw "Auther of post does not exist in database";
      }

      let authorOfCurrentOpportunity = responseUserJson.listOfObjects[0];

      let requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_banned: "1" }),
      };

      let response = await fetch(
        `${url}/users/${authorOfCurrentOpportunity.email}`,
        requestOptions
      );

      let responseJson = await response.json();
      setRecall(recall + 1);
      showNotification({
        title: "User Banned",
        message:
          "The user has been banned and all of their posts have been deleted",
        color: "green",
      });
    } catch (err) {
      console.log(err);
      showNotification({
        title: "Error",
        message: "There was a problem, please try again later",
        color: "red",
      });
    } finally {
      setDisplayBanConfirmationModal(false);
    }
  };

  const areFiltersEnabled = () => {
    return !!((searchObj.is_flagged && searchObj.is_flagged !== "0") ||
    (searchObj.is_deleted && searchObj.is_deleted !== "0") ||
    !!searchObj.city ||
    !!searchObj.state ||
    !!searchObj.salary ||
    !!searchObj.competition_category ||
    !!searchObj.job_category ||
    !!searchObj.job_type ||
    !!searchObj.type ||
    !!searchObj.is_banned ||
    !!searchObj.is_deleted ||
    !!searchObj.is_expired ||
    !!searchObj.author ||
    !!searchObj.sort
      ? true
      : false);
  };

  useEffect(() => {
    if (displayOpportunityArray.length >= 0) {
      setCurrentOpportunity(displayOpportunityArray[0]);
    } else {
      setCurrentOpportunity(null);
    }
  }, [displayOpportunityArray]);

  useEffect(() => {
    if (opportunityType === "competitions") {
      setSearchObj({
        ...searchObj,
        is_winner: winnersShown ? "1" : "",
      });
    }
  }, [winnersShown]);

  // useEffect(() => {
  //   console.log("searchObj now", searchObj);
  // }, [searchObj]);

  const getUserInfo = async () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserUid(user.uid);

        try {
          let response = await fetch(
            `${url}/users?keyword=${user.email}&page_number=1`
          );
          let responseJson = await response.json();
          if (responseJson.listOfObjects[0].is_admin === 1) {
            setIsAdmin(true);
          }
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      await getUserInfo();
    });

    if (opportunityType === "my-posts") {
      console.log("in my post");
      setSearchObj({ ...searchObj, is_deleted: "0", is_expired: "0" });
    } else if (
      opportunityType === "competitions" ||
      opportunityType === "festivals" ||
      opportunityType === "concerts"
    ) {
      setSearchObj({ ...searchObj, sort: "0" });
    }
  }, []);

  useEffect(() => {
    setDisplayOpportunitySearchFilterModal(false);
  }, [searchObj]);

  const leftSkeleton = [1, 2, 3, 4, 5].map((item, idx) => (
    <>
      <Skeleton height={12} mt={6} width="80%" radius="xl" />
      <Skeleton height={8} mt={20} width="40%" radius="xl" />
      <Flex>
        <Skeleton height={14} mt={12} mr={6} width="30%" radius="xl" />
        <Skeleton height={14} mt={12} mr={6} width="30%" radius="xl" />
      </Flex>
      <Divider sx={{ margin: "30px 0px" }} />
    </>
  ));

  const rightSkeleton = [1].map((item, idx) => (
    <>
      <Skeleton height={15} mt={6} width="80%" radius="xl" />
      <Skeleton height={8} mt={18} width="30%" radius="xl" />
      <Skeleton height={8} mt={18} width="35%" radius="xl" />
      <Skeleton height={8} mt={18} width="25%" radius="xl" />

      <Skeleton height={20} mt={20} width="20%" radius="xl" />

      <Skeleton height={8} mt={20} width="95%" radius="xl" />
      <Skeleton height={8} mt={10} width="90%" radius="xl" />
      <Skeleton height={8} mt={10} width="85%" radius="xl" />
      <Skeleton height={8} mt={10} width="100%" radius="xl" />
      <Skeleton height={8} mt={10} width="95%" radius="xl" />
      <Skeleton height={8} mt={10} width="85%" radius="xl" />
      <Skeleton height={8} mt={10} width="85%" radius="xl" />
      <Skeleton height={8} mt={10} width="100%" radius="xl" />
      <Skeleton height={8} mt={10} width="95%" radius="xl" />
      <Skeleton height={8} mt={10} width="85%" radius="xl" />
      <Skeleton height={8} mt={10} width="85%" radius="xl" />
      <Skeleton height={8} mt={10} width="100%" radius="xl" />
    </>
  ));

  const isExpired = (endDate: string | number | Date) => {
    let currDate = new Date();
    return (endDate.valueOf() as number) <= currDate.valueOf();
  };

  return (
    <OpportunityPageContainer>
      <MediaQuery smallerThan="md" styles={{ display: "none" }}>
        <Image
          src={String(blueTriangle)}
          style={{
            width: "24%",
            position: "absolute",
            right: "0px",
          }}
        />
      </MediaQuery>
      <MediaQuery smallerThan="md" styles={{ display: "none" }}>
        <Image
          src={String(greenTriangle)}
          style={{ width: "24%", position: "absolute", bottom: "0px" }}
        />
      </MediaQuery>
      <GridContainer medianScreen={smallerScreen}>
        <div className={classes.container}>
          <Flex className={classes.searchAndFilterContainer}>
            <Input
              icon={
                <ActionIcon color="dark.2" onClick={handleInputSubmit}>
                  <IconSearch />
                </ActionIcon>
              }
              placeholder={`Search ${
                apiEndpoint.includes("posts/") ? "my posts" : apiEndpoint
              }`}
              onChange={handleSearchInput}
              onKeyDown={handleEnterKeyDown}
              value={keyword}
              className={classes.search}
            />
            <Tooltip label="Filter">
              <ActionIcon
                color={areFiltersEnabled() ? "blue" : "dark.2"}
                size="lg"
                variant={areFiltersEnabled() ? "light" : "subtle"}
                onClick={() => {
                  setDisplayOpportunitySearchFilterModal(true);
                }}
              >
                <IconFilter size={40} stroke={1.5} />
              </ActionIcon>
            </Tooltip>
          </Flex>
          {mobileScreen ? (
            <Button
              variant="light"
              color={winnersShown ? "blue" : "yellow"}
              sx={{
                display: opportunityType === "competitions" ? "block" : "none",
              }}
              className={classes.winnersBtn}
              onClick={() => setWinnersShown((e) => !e)}
            >
              {winnersShown ? <IconArrowLeft /> : <IconTrophy />}
            </Button>
          ) : (
            <Button
              rightIcon={winnersShown ? <IconArrowLeft /> : <IconTrophy />}
              variant="light"
              color={winnersShown ? "blue" : "yellow"}
              sx={{
                display: opportunityType === "competitions" ? "block" : "none",
              }}
              className={classes.winnersBtn}
              onClick={() => setWinnersShown((e) => !e)}
            >
              {winnersShown
                ? "See Current Competitions"
                : "See Previous Winners"}
            </Button>
          )}
        </div>

        <OpportunityGrid
          justify="center"
          medianScreen={smallerScreen}
          grow={smallerScreen}
        >
          <LoadingOverlay
            visible={loading}
            overlayOpacity={0.2}
            overlayBlur={0.2}
            radius="lg"
            zIndex={1}
          />
          <OpportunityLeftColumnContainer span={4} medianScreen={smallerScreen}>
            <OpportunityLeftColumnContent
              direction="column"
              columnGap={0}
              medianScreen={smallerScreen}
            >
              {loading ? (
                <Container
                  sx={{
                    margin: "50px 20px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {leftSkeleton}
                </Container>
              ) : (
                <>
                  {displayOpportunityArray?.map(
                    (opportunity: OpportunityItem) => {
                      return (
                        <OpportunityCard
                          selected={
                            currentOpportunity?.idposts ===
                              opportunity.idposts && !smallerScreen
                          }
                          onClick={() => handleOpportunityClick(opportunity)}
                        >
                          {apiEndpoint.includes("posts") && (
                            <Badge sx={{ margin: "15px 5px 3px 0px" }}>
                              {opportunity.type?.substring(
                                0,
                                opportunity.type?.length
                              )}
                            </Badge>
                          )}
                          {opportunity.UID === userUid && (
                            <Badge
                              sx={{ margin: "15px 5px 3px 0px" }}
                              color="green"
                            >
                              My Post
                            </Badge>
                          )}
                          {opportunity.is_deleted &&
                          apiEndpoint.includes("posts") ? (
                            <Badge
                              sx={{ margin: "15px 5px 3px 0px" }}
                              color="red"
                            >
                              Deleted
                            </Badge>
                          ) : null}
                          {opportunity.end_date &&
                          isExpired(opportunity.end_date) &&
                          apiEndpoint.includes("posts") ? (
                            <Badge
                              sx={{ margin: "15px 5px 3px 0px" }}
                              color="orange"
                            >
                              Expired
                            </Badge>
                          ) : null}
                          {opportunity.is_flagged && isAdmin ? (
                            <Badge
                              sx={{ margin: "15px 5px 3px 0px" }}
                              color="yellow"
                            >
                              {opportunity?.is_flagged} Reported
                            </Badge>
                          ) : null}
                          <OpportunityTitle>
                            {opportunity.title}
                          </OpportunityTitle>
                          <p
                            style={{
                              fontSize: "14px",
                              wordWrap: "break-word",
                            }}
                          >
                            {opportunity.organization}
                          </p>
                          <SpecificOpportunityBadges
                            opportunity={opportunity}
                            opportunityType={opportunity?.type}
                          ></SpecificOpportunityBadges>
                        </OpportunityCard>
                      );
                    }
                  )}
                </>
              )}
              <OpportunityPaginationNavbarContainer
                align="flex-end"
                justify="flex-end"
              >
                <Container sx={{ margin: "30px 0px" }}>
                  <PaginationNavbar
                    apiEndpointExtension={apiEndpoint}
                    numberOfItemsPerPage={10}
                    setListOfObjects={setDisplayOpportunityArray}
                    searchFilterObject={searchObj}
                    setLoading={setLoading}
                    recall={recall}
                  />
                </Container>
              </OpportunityPaginationNavbarContainer>
            </OpportunityLeftColumnContent>
          </OpportunityLeftColumnContainer>
          <MediaQuery smallerThan="md" styles={{ display: "none" }}>
            <OpportunityRightColumnContainer span={8}>
              {loading ? (
                <Container
                  sx={{
                    margin: "50px 20px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {rightSkeleton}
                </Container>
              ) : (
                <OpportunityInfo
                  apiEndpoint={apiEndpoint}
                  opportunity={currentOpportunity}
                  opportunityType={
                    currentOpportunity && currentOpportunity.type
                      ? currentOpportunity.type
                      : opportunityType
                  }
                  setEditModal={setDisplayOpportunityEditModal}
                  setDeleteModal={setDisplayDeleteConfirmationModal}
                  setBannedModal={setDisplayBanConfirmationModal}
                  setFlagModal={setDisplayFlagConfirmationModal}
                  handleDeletePost={deleteCurrentPost}
                  handleBanPost={handleBanButton}
                  handleFlagPost={handleFlagButton}
                  handleResetReportCount={handleResetReportCountButton}
                  deleteComment={deleteComment}
                />
              )}
            </OpportunityRightColumnContainer>
          </MediaQuery>
        </OpportunityGrid>
      </GridContainer>
      <MediaQuery largerThan="md" styles={{ display: "none" }}>
        <Modal
          opened={displayOpportunityInfoModal}
          onClose={handleCloseModal}
          fullScreen
          sx={{ overflow: "hidden", zIndex: 1 }}
        >
          <OpportunityInfo
            apiEndpoint={apiEndpoint}
            opportunity={currentOpportunity}
            opportunityType={
              currentOpportunity && currentOpportunity.type
                ? currentOpportunity.type
                : opportunityType
            }
            setEditModal={setDisplayOpportunityEditModal}
            setDeleteModal={setDisplayDeleteConfirmationModal}
            setBannedModal={setDisplayBanConfirmationModal}
            setFlagModal={setDisplayFlagConfirmationModal}
            handleDeletePost={deleteCurrentPost}
            handleBanPost={handleBanButton}
            handleFlagPost={handleFlagButton}
            handleResetReportCount={handleResetReportCountButton}
            deleteComment={deleteComment}
            // setHelperDeleteComment={setHelperDeleteComment}
          />
        </Modal>
      </MediaQuery>
      <Modal
        opened={displayOpportunitySearchFilterModal}
        onClose={() => {
          setDisplayOpportunitySearchFilterModal(false);
        }}
        fullScreen={smallerScreen}
        size="50%"
      >
        <OpportunityFilterForm
          searchObj={searchObj}
          setSearchObj={setSearchObj}
          keyword={keyword}
          setKeyword={setKeyword}
        />
      </Modal>
      <Modal
        opened={displayOpportunityEditModal}
        onClose={() => {
          setDisplayOpportunityEditModal(false);
        }}
        fullScreen={smallerScreen}
        size="60%"
      >
        <FormHeader>
          {opportunityType === "blog" ? "Edit Blog Post" : "Edit Post"}
        </FormHeader>
        <OpportunityForm
          edit={true}
          opportunityType={
            currentOpportunity && currentOpportunity.type
              ? currentOpportunity.type
              : opportunityType
          }
          opportunity={currentOpportunity ? currentOpportunity : undefined}
          displayWinnerInput
          handleSubmission={handleEditButton}
        />
      </Modal>
    </OpportunityPageContainer>
  );
}
