import React, { useState, useEffect } from "react";
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
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { useLocation } from "react-router-dom";
import { IconMapPin, IconFilter, IconSearch } from "@tabler/icons";
import { OpportunityFilterForm } from "./OpportunityFilterForm";
import { OpportunityForm } from "./OpportunityForm";
import { FormHeader } from "./CreateOpportunityHelper";
import { fetchSignInMethodsForEmail } from "firebase/auth";

const greenTriangle = require("../../images/GreenTriangle.png");
const blueTriangle = require("../../images/BlueTriangle.png");

export function Opportunity() {
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
    is_flagged: "0",
    is_deleted: "0",
  });
  const url = "https://oyster-app-7l5vz.ondigitalocean.app/compositiontoday";
  const medianScreen = useMediaQuery("(max-width: 992px)");
  const [recall, setRecall] = useState(0);

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
    setSearchObj({ ...searchObj, keyword: keyword });
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

      delete tempOpportunity?.UID;
      delete tempOpportunity?.date_posted;

      tempOpportunity.end_date = tempOpportunity?.end_date?.toString();
      tempOpportunity.start_date = tempOpportunity?.start_date?.toString();
      tempOpportunity.salary = tempOpportunity?.salary?.toString();
      tempOpportunity.is_flagged = currentOpportunity?.is_flagged?.toString();
      tempOpportunity.is_deleted = currentOpportunity?.is_deleted ? "0" : "1";

      let responseJson = await editFunction(tempOpportunity);
      console.log("fake delete resposne: ", responseJson);
      setRecall(recall + 1);
      setDisplayOpportunityInfoModal(false);
      showNotification({
        title: "Opportunity Deleted",
        message: "Opportunity was deleted",
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
        title: "Success",
        message: "Your edits has been successfully made",
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
        title: "Opportunity Flagged",
        message: "Opportunity was flagged",
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

      // Delete any invalid keys (like undefined keys or keys with value of null) such that it doesn't crash the API
      for (let key in opportunity) {
        if (!opportunity[key as keyof typeof opportunity] && key !== "winner") {
          delete opportunity[key as keyof typeof opportunity];
        }
      }

      console.log(
        "edit button opportunity param: ",
        opportunity,
        currentOpportunity?.idposts
      );
      console.log("edit url: ", `${url}/${opportunityType}/${idpost}`);
      let requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(opportunity),
      };

      let response = await fetch(
        `${url}/${opportunityType}/${idpost}`,
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
        title: "User banned",
        message:
          "The user has been banned and all their postings has been removed",
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

  const handleFilterIconBackground = () => {
    return !!(
      searchObj.is_flagged !== "0" ||
      searchObj.is_deleted !== "0" ||
      !!searchObj.city ||
      !!searchObj.state ||
      !!searchObj.salary ||
      !!searchObj.category ||
      !!searchObj.job_type
    )
      ? "red"
      : "white";
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
              sx={{ minWidth: "400px" }}
            />
            {/* <SearchBar
            medianScreen={medianScreen}
            placeholder="Title or organization"
            rightSection={
              <IconSearch color="#808080" onClick={handleInputSubmit} />
            }
            value={keyword}
            onChange={handleSearchInput}
            onKeyDown={handleEnterKeyDown}
          /> */}
            <ActionIcon
              color="dark.2"
              size="lg"
              onClick={() => {
                setDisplayOpportunitySearchFilterModal(true);
              }}
              sx={{
                backgroundColor: handleFilterIconBackground(),
              }}
            >
              <IconFilter size={40} stroke={1.5} />
            </ActionIcon>
          </Group>
          {/* <FilterIconContainer
            onClick={() => {
              setDisplayOpportunitySearchFilterModal(true);
            }}
            color="dark.2"
            size="lg"
            sx={{
              backgroundColor: !!(
                searchObj.is_flagged !== "0" ||
                searchObj.is_deleted !== "0" ||
                !!searchObj.city ||
                !!searchObj.state ||
                !!searchObj.salary ||
                !!searchObj.category ||
                !!searchObj.job_type
              )
                ? "red"
                : "white",
            }}
          >
            <IconFilter size={40} color="#808080" />
          </FilterIconContainer> */}
        </SearchFilterContainer>
        <OpportunityGrid justify="center" medianScreen={medianScreen} grow>
          <OpportunityLeftColumnContainer span={4}>
            <OpportunityLeftColumnContent
              direction="column"
              gap={0}
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
                    {/* <CityStateContainer>
                      <Flex justify="center" align="center" gap="xs">
                        <img src={LocationIcon} style={{ height: "27px" }} />
                        <span>
                          {opportunity.city}, {opportunity.state}
                        </span>
                      </Flex>
                    </CityStateContainer> */}

                    <Badge
                      leftSection={
                        <IconMapPin
                          size={18}
                          color="#40C057"
                          style={{ marginBottom: "-3px" }}
                        />
                      }
                      color="gray"
                      sx={{ height: "25px" }}
                    >
                      {opportunity.city}, {opportunity.state}
                    </Badge>
                  </OpportunityCard>
                );
              })}
              <PaginationNavbar
                apiEndpointExtension={opportunityType}
                numberOfItemsPerPage={10}
                setListOfObjects={setDisplayOpportunityArray}
                searchFilterObject={searchObj}
                recall={recall}
              />
            </OpportunityLeftColumnContent>
          </OpportunityLeftColumnContainer>
          <MediaQuery smallerThan="md" styles={{ display: "none" }}>
            <OpportunityRightColumnContainer span={8}>
              <OpportunityInfo
                opportunity={currentOpportunity}
                opportunityType={opportunityType}
                setEditModal={setDisplayOpportunityEditModal}
                setDeleteModal={setDisplayDeleteConfirmationModal}
                setBannedModal={setDisplayBanConfirmationModal}
                setFlagModal={setDisplayFlagConfirmationModal}
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
        >
          <OpportunityInfo
            opportunity={currentOpportunity}
            opportunityType={opportunityType}
            setEditModal={setDisplayOpportunityEditModal}
            setDeleteModal={setDisplayDeleteConfirmationModal}
            setBannedModal={setDisplayBanConfirmationModal}
            setFlagModal={setDisplayFlagConfirmationModal}
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
          opportunityType={opportunityType}
          opportunity={currentOpportunity ? currentOpportunity : undefined}
          displayWinnerInput
          handleSubmission={handleEditButton}
        />
      </Modal>
      <Modal
        opened={displayDeleteConfirmationModal}
        onClose={() => setDisplayDeleteConfirmationModal(false)}
        fullScreen={medianScreen}
      >
        <FormHeader>
          Are you sure you want to {currentOpportunity?.is_deleted ? "un" : ""}
          delete this post?
        </FormHeader>
        <Flex justify="flex-end" gap={20} wrap="wrap">
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
      </Modal>
      <Modal
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
      </Modal>
    </OpportunityPageContainer>
  );
}
