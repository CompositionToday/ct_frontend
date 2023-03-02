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
  PaginationNavbarContainer,
  CityStateContainer,
  SearchBar,
  SearchFilterContainer,
} from "./OpportunityHelper";
import { OpportunityTitle } from "./OpportunityInfoHelper";
import { OpportunityInfo } from "./OpportunityInfo";
import {
  PaginationNavbar,
  PaginationSearchObject,
} from "../pagination/PaginationNavbar";
import LocationIcon from "./LocationIcon.svg";
import {
  Image,
  Group,
  Input,
  MediaQuery,
  Pagination,
  Modal,
  Flex,
  Badge,
  ActionIcon,
  Button,
  Tooltip,
  Textarea,
  Text,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { useLocation } from "react-router-dom";
import { IconMapPin, IconFilter, IconSearch } from "@tabler/icons";
import { OpportunityFilterForm } from "./OpportunityFilterForm";
import { OpportunityForm } from "./OpportunityForm";
import { FormHeader } from "./CreateOpportunityHelper";
import { fetchSignInMethodsForEmail, onAuthStateChanged } from "firebase/auth";
import { SpecificOpportunityBadges } from "./SpecificOpportunityBadges";
import { auth } from "../../Firebase";

interface OpportunityProp {
  apiEndpoint: string;
}

const greenTriangle = require("../../images/GreenTriangle.png");
const blueTriangle = require("../../images/BlueTriangle.png");

export function Opportunity({ apiEndpoint }: OpportunityProp) {
  // const [opportunityType, setOpportunityType] = useState(
  //   useLocation().pathname.slice(1)
  // );
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
  const medianScreen = useMediaQuery("(max-width: 992px)");
  const [recall, setRecall] = useState(0);
  const [helperDeleteComment, setHelperDeleteComment] = useState("");
  const deleteComment = useRef("");
  const [userUid, setUserUid] = useState("");

  const handleOpportunityClick = (opportunity: OpportunityItem) => {
    setCurrentOpportunity(opportunity);
    setDisplayOpportunityInfoModal(true);
  };

  const handleCloseModal = () => {
    setDisplayOpportunityInfoModal(false);
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

  useEffect(() => {
    console.log("apiEndpoint prop: ", apiEndpoint);
  }, []);

  const deleteCurrentPost = async () => {
    try {
      let tempOpportunity = currentOpportunity;

      if (!tempOpportunity) {
        throw "There is not an opportunity selected";
      }

      delete tempOpportunity?.UID;
      delete tempOpportunity?.date_posted;

      console.log(
        "dlete mark: ",
        currentOpportunity?.is_deleted,
        currentOpportunity?.is_deleted === 0,
        tempOpportunity?.is_deleted,
        deleteComment
      );
      console.log("delete comment value inside function:", deleteComment);

      if (currentOpportunity?.is_deleted === 0) {
        console.log("in the first if");
        if (userUid === currentOpportunity?.UID) {
          tempOpportunity.deleted_comment = "Author has deleted this post";
        } else {
          tempOpportunity.deleted_comment =
            deleteComment.current || "Your post has been deleted";
        }
      } else {
        tempOpportunity.deleted_comment =
          "default message for not becoming undeleted";
      }

      tempOpportunity.end_date = tempOpportunity?.end_date?.toString();
      tempOpportunity.start_date = tempOpportunity?.start_date?.toString();
      tempOpportunity.salary = tempOpportunity?.salary?.toString();
      tempOpportunity.is_flagged = currentOpportunity?.is_flagged?.toString();
      tempOpportunity.is_deleted = currentOpportunity?.is_deleted ? "0" : "1";

      console.log("delete function params before calling edit: ", {
        ...tempOpportunity,
      });
      let responseJson = await editFunction(tempOpportunity);
      console.log("fake delete resposne: ", responseJson);
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

      // Format any number keys as strings since the APIs only accept strings for the request body
      opportunity.end_date = opportunity.end_date?.toString();
      opportunity.start_date = opportunity.start_date?.toString();
      opportunity.salary = opportunity.salary?.toString();

      console.log("opportunity in opportunity: ", opportunity);

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
        title: "Edits Made",
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

  const handleFlagButton = async () => {
    try {
      let tempOpportunity = currentOpportunity;

      if (!tempOpportunity) {
        throw "There is not an opportunity selected";
      }

      delete tempOpportunity?.UID;
      delete tempOpportunity?.date_posted;

      // Format any number keys as strings since the APIs only accept strings for the request body
      tempOpportunity.end_date = tempOpportunity?.end_date?.toString();
      tempOpportunity.start_date = tempOpportunity?.start_date?.toString();
      tempOpportunity.salary = tempOpportunity?.salary?.toString();
      tempOpportunity.is_flagged = currentOpportunity?.is_flagged ? "0" : "1";
      tempOpportunity.is_deleted = currentOpportunity?.is_deleted?.toString();

      let responseJson = await editFunction(tempOpportunity);
      console.log("fake flag resposne: ", responseJson);
      setRecall(recall + 1);
      setDisplayOpportunityInfoModal(false);
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
    } finally {
      setDisplayFlagConfirmationModal(false);
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

      console.log("before purge:", opportunity.deleted_comment);
      for (let key in opportunity) {
        if (
          !opportunity[key as keyof typeof opportunity] &&
          key !== "winner" &&
          key !== "city" &&
          key !== "state"
        ) {
          delete opportunity[key as keyof typeof opportunity];
        }
      }

      console.log(
        "edit button opportunity param: ",
        opportunity,
        currentOpportunity?.idposts
      );
      console.log("edit url: ", `${url}/${currentOpportunity?.type}/${idpost}`);
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
      console.log("put response: ", responseJson);

      let editedOpportunity = responseJson.listOfObjects[0];

      return editedOpportunity;
    } catch (err) {
      console.log(err);
    }
  };

  // FIXME: need to implement this after the backend people will allow me to ban a user based on UID, or I have a way to get the email based on the UID on the frontend
  const handleBanButton = async () => {
    try {
      console.log("handleBanButton function");
      console.log("current opportuntiy: ", currentOpportunity);

      let responseUser = await fetch(`${url}/users/${currentOpportunity?.UID}`);
      let responseUserJson = await responseUser.json();

      console.log(responseUserJson);

      if (responseUserJson.listOfObjects.length < 1) {
        throw "Auther of post does not exist in database";
      }

      let authorOfCurrentOpportunity = responseUserJson.listOfObjects[0];

      console.log("author: ", authorOfCurrentOpportunity.email);

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
      console.log("ban responseJson: ", responseJson);
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
    !!searchObj.job_type
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
    console.log("searchobj: ", searchObj);
  }, [searchObj]);

  useEffect(() => {
    console.log("apiEndpiont in oppo: ", apiEndpoint);
  }, [apiEndpoint]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      try {
        if (user) {
          setUserUid(user.uid);
        }
      } catch (err) {
        console.log(err);
      }
    });
  }, []);

  // useEffect(() => {
  //   console.log("delete message in opp file:", helperDeleteComment);
  //   setDeleteComment(helperDeleteComment);
  // }, [helperDeleteComment]);

  useEffect(() => {
    console.log("real delete comment:", deleteComment);
  }, [deleteComment]);

  return (
    <OpportunityPageContainer>
      <Image
        src={String(blueTriangle)}
        style={{
          width: "24%",
          position: "absolute",
          right: "0px",
        }}
      />
      <Image
        src={String(greenTriangle)}
        style={{ width: "24%", position: "absolute", bottom: "0px" }}
      />
      <GridContainer medianScreen={medianScreen}>
        <SearchFilterContainer align="center">
          <Group>
            <Input
              icon={
                <ActionIcon color="dark.2" onClick={handleInputSubmit}>
                  <IconSearch />
                </ActionIcon>
              }
              placeholder="Search"
              onChange={handleSearchInput}
              onKeyDown={handleEnterKeyDown}
              value={keyword}
              sx={{ minWidth: medianScreen ? "300px" : "400px" }}
            />
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
          </Group>
        </SearchFilterContainer>
        <OpportunityGrid
          justify="center"
          medianScreen={medianScreen}
          grow={medianScreen}
        >
          <OpportunityLeftColumnContainer span={4}>
            <OpportunityLeftColumnContent
              direction="column"
              // gap={0}
              columnGap={0}
            >
              {displayOpportunityArray?.map((opportunity: OpportunityItem) => {
                return (
                  <OpportunityCard
                    selected={
                      currentOpportunity?.idposts === opportunity.idposts &&
                      !medianScreen
                    }
                    onClick={() => handleOpportunityClick(opportunity)}
                  >
                    <OpportunityTitle>{opportunity.title}</OpportunityTitle>
                    <p style={{ fontSize: "14px" }}>
                      {opportunity.organization}
                    </p>
                    <SpecificOpportunityBadges
                      opportunity={opportunity}
                      opportunityType={opportunity?.type}
                    ></SpecificOpportunityBadges>
                  </OpportunityCard>
                );
              })}
              <div>
                <PaginationNavbar
                  apiEndpointExtension={apiEndpoint}
                  numberOfItemsPerPage={10}
                  setListOfObjects={setDisplayOpportunityArray}
                  searchFilterObject={searchObj}
                  recall={recall}
                />
              </div>
            </OpportunityLeftColumnContent>
          </OpportunityLeftColumnContainer>
          <MediaQuery smallerThan="md" styles={{ display: "none" }}>
            <OpportunityRightColumnContainer span={8}>
              <OpportunityInfo
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
                deleteComment={deleteComment}
                // setHelperDeleteComment={setHelperDeleteComment}
              />
            </OpportunityRightColumnContainer>
          </MediaQuery>
        </OpportunityGrid>
      </GridContainer>
      <MediaQuery largerThan="md" styles={{ display: "none" }}>
        <Modal
          opened={displayOpportunityInfoModal}
          onClose={handleCloseModal}
          fullScreen
          sx={{ overflow: "hidden" }}
        >
          <OpportunityInfo
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
        fullScreen={medianScreen}
        size="80%"
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
        fullScreen={medianScreen}
        size="80%"
      >
        <FormHeader>Edit Opportunity</FormHeader>
        <OpportunityForm
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
      {/* <Modal
        opened={displayDeleteConfirmationModal}
        onClose={() => setDisplayDeleteConfirmationModal(false)}
        fullScreen={medianScreen}
        title="Delete Post"
        centered
      >
        <Text size="sm">
          Are you sure you want to delete{" "}
          {userUid !== currentOpportunity?.UID ? "the" : "your"} post titled "
          <span style={{ fontWeight: 700 }}>{currentOpportunity?.title}</span>"?
        </Text>
        <Textarea
          value={deleteComment.current}
          onChange={(e) => deleteComment.current}
          placeholder="Tell the user why you deleted their post"
          label="Why are you deleting this post?"
          sx={{ marginTop: "20px" }}
        />
        <Flex
          justify="flex-end"
          gap={20}
          wrap="wrap"
          sx={{ marginTop: "16px" }}
        >
          <Button
            color="gray"
            onClick={() => setDisplayDeleteConfirmationModal(false)}
          >
            Cancel
          </Button>
          <Button color="red" onClick={deleteCurrentPost}>
            {currentOpportunity?.is_deleted ? "Und" : "D"}elete
          </Button>
        </Flex>
      </Modal> */}
      {/* <Modal
        opened={displayBanConfirmationModal}
        onClose={() => setDisplayBanConfirmationModal(false)}
        fullScreen={medianScreen}
      >
        <FormHeader>
          Are you sure you want to ban this user? Banning a user also deletes
          all their post
        </FormHeader>
        <Flex justify="flex-end" gap={20} wrap="wrap">
          <Button
            color="gray"
            onClick={() => setDisplayBanConfirmationModal(false)}
          >
            Cancel
          </Button>
          <Button color="red" onClick={handleBanButton}>
            Ban
          </Button>
        </Flex>
      </Modal>
      <Modal
        opened={displayFlagConfirmationModal}
        onClose={() => setDisplayFlagConfirmationModal(false)}
        fullScreen={medianScreen}
      >
        <FormHeader>
          Are you sure you want to {currentOpportunity?.is_flagged ? "un" : ""}
          flag this post?
        </FormHeader>
        <Flex justify="flex-end" gap={20} wrap="wrap">
          <Button
            color="gray"
            onClick={() =>
              setDisplayFlagConfirmationModal(!displayFlagConfirmationModal)
            }
          >
            Cancel
          </Button>
          <Button color="red" onClick={handleFlagButton}>
            {currentOpportunity?.is_flagged ? "Unf" : "F"}lag
          </Button>
        </Flex>
      </Modal> */}
    </OpportunityPageContainer>
  );
}
