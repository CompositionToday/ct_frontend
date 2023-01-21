import React, { FC, useState, useEffect } from "react";
import {
  GridContainer,
  PaginationGrid,
  OpportunityPageContainer,
  OpportunityItem,
  PaginationLeftColumnContent,
  PaginationLeftColumnContainer,
  PaginationRightColumnContainer,
} from "./PaginationHelper";
import { PaginationOpportunityInfo } from "./PaginationOpportunityInfo";
import { MediaQuery, Pagination, Modal, Flex } from "@mantine/core";
import { useLocation } from "react-router-dom";

export function PaginationOpportunity() {
  const [opportunityType, setOpportunityType] = useState(
    useLocation().pathname.slice(1)
  );
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentOpportunity, setCurrentOpportunity] =
    useState<OpportunityItem | null>(null);
  const [paginationDisplayOpportunity, setPaginationDisplayOpportunity] =
    useState<OpportunityItem[]>([]);
  const [displayModal, setDisplayModal] = useState(false);

  useEffect(() => {
    const getPageCount = async () => {
      try {
        let responseCount = await fetch(
          `https://oyster-app-7l5vz.ondigitalocean.app/compositiontoday/${opportunityType}/count`
        );

        let responseCountJson = await responseCount.json();
        console.log("API COUNT: ", responseCountJson.count);
        let numberOfPage = Math.ceil(responseCountJson.count / 4);
        setPageCount(numberOfPage);

        // let responseOpportunity = await fetch(
        //   `https://oyster-app-7l5vz.ondigitalocean.app/compositiontoday/jobs?page_number=1`
        // );

        // let responseOpportunityJson = await responseOpportunity.json();
        // console.log(responseOpportunityJson);
        // setPaginationDisplayOpportunity(responseOpportunityJson.listOfJobs);
      } catch (err) {
        console.log(err);
      }
    };
    getPageCount();
  }, []);

  useEffect(() => {
    const getCurrentOpportunityPage = async () => {
      let responseOpportunity = await fetch(
        `https://oyster-app-7l5vz.ondigitalocean.app/compositiontoday/${opportunityType}?page_number=${currentPage}`
      );

      let responseOpportunityJson = await responseOpportunity.json();
      setPaginationDisplayOpportunity(responseOpportunityJson.listOfObjects);
      setCurrentOpportunity(responseOpportunityJson.listOfObjects[0]);
    };

    getCurrentOpportunityPage();
  }, [currentPage, pageCount]);

  useEffect(() => {
    setCurrentOpportunity(paginationDisplayOpportunity[0]);
  }, [paginationDisplayOpportunity]);

  const foo = async () => {
    try {
      let foo = await fetch(
        `https://oyster-app-7l5vz.ondigitalocean.app/compositiontoday/${opportunityType}?page_number=1`
      );
      let foobar = await foo.json();
      console.log(foobar);
    } catch (err) {
      console.log(err);
    }
  };

  const handleOpportunityClick = (opportunity: OpportunityItem) => {
    setCurrentOpportunity(opportunity);
    setDisplayModal(true);
  };

  const handleCloseModal = () => {
    setDisplayModal(false);
  };

  // const renderCurrentPageOpportunity: FC = () => {
  //   return paginationDisplayOpportunity.map((opportunity: exampleItem) => (
  //     <div onClick={() => handleOpportunityClick(opportunity)}>
  //       <h1>Number: {opportunity.id}</h1>
  //       <p>{opportunity.value}</p>
  //     </div>
  //   ));
  // };

  return (
    <OpportunityPageContainer>
      {/* <NavBar links={navItems.links} /> */}
      <GridContainer>
        <PaginationGrid justify="center" grow>
          <PaginationLeftColumnContainer span={5}>
            <PaginationLeftColumnContent
              justify="space-around"
              direction="column"
            >
              {paginationDisplayOpportunity?.map(
                (opportunity: OpportunityItem) => {
                  return (
                    <div onClick={() => handleOpportunityClick(opportunity)}>
                      <h1>{opportunity.title}</h1>
                    </div>
                  );
                }
              )}
              <Flex justify="center">
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
              </Flex>
            </PaginationLeftColumnContent>
          </PaginationLeftColumnContainer>
          <MediaQuery smallerThan="md" styles={{ display: "none" }}>
            <PaginationRightColumnContainer span={7}>
              <PaginationOpportunityInfo opportunity={currentOpportunity} />
            </PaginationRightColumnContainer>
          </MediaQuery>
        </PaginationGrid>
      </GridContainer>
      <MediaQuery largerThan="md" styles={{ display: "none" }}>
        <Modal opened={displayModal} onClose={handleCloseModal} fullScreen>
          <PaginationOpportunityInfo opportunity={currentOpportunity} />
        </Modal>
      </MediaQuery>
    </OpportunityPageContainer>
  );
}
