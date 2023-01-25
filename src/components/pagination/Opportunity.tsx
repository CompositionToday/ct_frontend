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
} from "./OpportunityHelper";
import { OpportunityTitle } from "./OpportunityInfoHelper";
import { OpportunityInfo } from "./OpportunityInfo";
import { PaginationNavbar } from "./PaginationNavbar";
import LocationIcon from "./LocationIcon.svg";
import {
  MediaQuery,
  Pagination,
  Modal,
  Flex,
  Badge,
  ActionIcon,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useLocation } from "react-router-dom";
import { IconMapPin } from "@tabler/icons";

export function Opportunity() {
  const [opportunityType, setOpportunityType] = useState(
    useLocation().pathname.slice(1)
  );
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentOpportunity, setCurrentOpportunity] =
    useState<OpportunityItem | null>(null);
  const [displayOpportunityArray, setDisplayOpportunityArray] = useState<
    OpportunityItem[]
  >([]);
  const [displayModal, setDisplayModal] = useState(false);
  const medianScreen = useMediaQuery("(max-width: 992px)");

  // useEffect(() => {
  //   const getPageCount = async () => {
  //     try {
  //       let responseCount = await fetch(
  //         `https://oyster-app-7l5vz.ondigitalocean.app/compositiontoday/${opportunityType}/count`
  //       );

  //       let responseCountJson = await responseCount.json();
  //       console.log("API COUNT: ", responseCountJson.count);
  //       let numberOfPage = Math.ceil(responseCountJson.count / 4);
  //       setPageCount(numberOfPage);

  //       // let responseOpportunity = await fetch(
  //       //   `https://oyster-app-7l5vz.ondigitalocean.app/compositiontoday/jobs?page_number=1`
  //       // );

  //       // let responseOpportunityJson = await responseOpportunity.json();
  //       // console.log(responseOpportunityJson);
  //       // setDisplayOpportunityArray(responseOpportunityJson.listOfJobs);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getPageCount();
  // }, []);

  // useEffect(() => {
  //   const getCurrentOpportunityPage = async () => {
  //     let responseOpportunity = await fetch(
  //       `https://oyster-app-7l5vz.ondigitalocean.app/compositiontoday/${opportunityType}?page_number=${currentPage}`
  //     );

  //     let responseOpportunityJson = await responseOpportunity.json();
  //     setDisplayOpportunityArray(responseOpportunityJson.listOfObjects);
  //     setCurrentOpportunity(responseOpportunityJson.listOfObjects[0]);
  //     console.log(typeof responseOpportunityJson.listOfObjects[0].end_date);
  //   };

  //   getCurrentOpportunityPage();
  // }, [currentPage, pageCount]);

  useEffect(() => {
    if (displayOpportunityArray.length >= 0) {
      setCurrentOpportunity(displayOpportunityArray[0]);
    } else {
      setCurrentOpportunity(null);
    }
  }, [displayOpportunityArray]);

  const handleOpportunityClick = (opportunity: OpportunityItem) => {
    setCurrentOpportunity(opportunity);
    setDisplayModal(true);
  };

  const handleCloseModal = () => {
    setDisplayModal(false);
  };

  return (
    <OpportunityPageContainer>
      <GridContainer medianScreen={medianScreen}>
        <OpportunityGrid justify="center" grow>
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
                    <p>{opportunity.organization}</p>
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
                        <ActionIcon color="green">
                          <IconMapPin size={20} />
                        </ActionIcon>
                      }
                      color="gray"
                      sx={{ marginBottom: "15px" }}
                    >
                      {opportunity.city}, {opportunity.state}
                    </Badge>
                  </OpportunityCard>
                );
              })}
              {/* <PaginationNavbarContainer justify="center" align="center">
                <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
                  <Pagination
                    page={currentPage}
                    onChange={setCurrentPage}
                    total={pageCount}
                    size="lg"
                  />
                </MediaQuery>
                <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                  <Pagination
                    page={currentPage}
                    onChange={setCurrentPage}
                    total={pageCount}
                    size="xs"
                  />
                </MediaQuery>
              </PaginationNavbarContainer> */}
              <PaginationNavbar
                apiEndpointExtension={opportunityType}
                numberOfItemsPerPage={4}
                setListOfObjects={setDisplayOpportunityArray}
              />
            </OpportunityLeftColumnContent>
          </OpportunityLeftColumnContainer>
          <MediaQuery smallerThan="md" styles={{ display: "none" }}>
            <OpportunityRightColumnContainer span={8}>
              <OpportunityInfo
                opportunity={currentOpportunity}
                opportunityType={opportunityType}
              />
            </OpportunityRightColumnContainer>
          </MediaQuery>
        </OpportunityGrid>
      </GridContainer>
      <MediaQuery largerThan="md" styles={{ display: "none" }}>
        <Modal opened={displayModal} onClose={handleCloseModal} fullScreen>
          <OpportunityInfo
            opportunity={currentOpportunity}
            opportunityType={opportunityType}
          />
        </Modal>
      </MediaQuery>
    </OpportunityPageContainer>
  );
}
