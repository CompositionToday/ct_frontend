import React, { FC, useState, useEffect } from "react";
import {
  GridContainer,
  PaginationGrid,
  OpportunityPageContainer,
  opportunityItem,
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
  const [currentPost, setCurrentPost] = useState<opportunityItem | null>(null);
  const [paginationDisplayPost, setPaginationDisplayPost] = useState<
    opportunityItem[]
  >([]);
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

        // let responsePost = await fetch(
        //   `https://oyster-app-7l5vz.ondigitalocean.app/compositiontoday/jobs?page_number=1`
        // );

        // let responsePostJson = await responsePost.json();
        // console.log(responsePostJson);
        // setPaginationDisplayPost(responsePostJson.listOfJobs);
      } catch (err) {
        console.log(err);
      }
    };
    getPageCount();
  }, []);

  useEffect(() => {
    const getCurrentPostPage = async () => {
      let responsePost = await fetch(
        `https://oyster-app-7l5vz.ondigitalocean.app/compositiontoday/${opportunityType}?page_number=${currentPage}`
      );

      let responsePostJson = await responsePost.json();
      // FIXME: Need to update the key here to be generic when the backend people changes the APIs
      setPaginationDisplayPost(responsePostJson.listOfObjects);
      setCurrentPost(responsePostJson.listOfObjects[0]);
    };

    getCurrentPostPage();
  }, [currentPage, pageCount]);

  useEffect(() => {
    setCurrentPost(paginationDisplayPost[0]);
  }, [paginationDisplayPost]);

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

  const handlePostClick = (post: opportunityItem) => {
    setCurrentPost(post);
    setDisplayModal(true);
  };

  const handleCloseModal = () => {
    setDisplayModal(false);
  };

  // const renderCurrentPagePost: FC = () => {
  //   return paginationDisplayPost.map((post: exampleItem) => (
  //     <div onClick={() => handlePostClick(post)}>
  //       <h1>Number: {post.id}</h1>
  //       <p>{post.value}</p>
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
              {paginationDisplayPost?.map((post: opportunityItem) => {
                return (
                  <div onClick={() => handlePostClick(post)}>
                    <h1>{post.title}</h1>
                  </div>
                );
              })}
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
              <PaginationOpportunityInfo />
            </PaginationRightColumnContainer>
          </MediaQuery>
        </PaginationGrid>
      </GridContainer>
      <MediaQuery largerThan="md" styles={{ display: "none" }}>
        <Modal opened={displayModal} onClose={handleCloseModal} fullScreen>
          <PaginationOpportunityInfo />
        </Modal>
      </MediaQuery>
    </OpportunityPageContainer>
  );
}
