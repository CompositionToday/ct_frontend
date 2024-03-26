import React, { useState, useEffect } from "react";
import { Pagination } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { ScrapedLink } from "../adminView/ScrapedLinkHelper";
import { PaginationNavbarContainer } from "../opportunity/OpportunityHelper";

export interface PaginationNavbarLinksProp {
  apiEndpointExtension: string;
  searchFilterObject?: PaginationLinksSearchObject;
  setListOfObjects: React.Dispatch<React.SetStateAction<ScrapedLink[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  recall?: number;
}

export interface PaginationLinksSearchObject {
  linkID?: string;
  keyword?: string;
  expirationDate?: Date | string | number;
  hasMultiplePosts?: number;
  hasNextPage?: number;
  hasScrollForMore?: number;
  hasInfinateScroll?: number;
  doesMorePostsUseClassName?: number;
  morePostsClassName?: string;
  currentPostsClassName?: string;
  currentPostsPrefixXpath?: string;
  currentPostsPostfixXpath?: string ;
  link?: string;
  doesCurrenPostsUseClassName?: number;
  title?: string;
  postType?: string;
  morePostsXpath?: string;
  currentPostsStartIndex?: number;
}

export function PaginationNavbarLinks({
  apiEndpointExtension,
  searchFilterObject,
  setListOfObjects,
  setLoading,
  recall = -99,
}: PaginationNavbarLinksProp) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const medianScreen = useMediaQuery("(max-width: 992px)");
  const [list, setList] = useState([])
  const numberOfItemsPerPage = 10; // Set your desired number of items per page here
  const timeOut = 450;
  const url = "https://oyster-app-7l5vz.ondigitalocean.app/compositiontoday/webscraping/links";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const countUrl = new URL(`${url}?post_type=${apiEndpointExtension}`);
        if (searchFilterObject) {
          for (const [key, value] of Object.entries(searchFilterObject)) {
            countUrl.searchParams.set(key, String(value));
          }
        }
        const response = await fetch(countUrl);
        const data = await response.json();
        setListOfObjects(data.listOfObjects);
        setList(data.listOfObjects);
        setLoading(false);
        //console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [apiEndpointExtension, searchFilterObject, setListOfObjects, setLoading]);

  useEffect(() => {
    const getPageCount = () => {
      const numberOfPages = Math.ceil(setListOfObjects.length / numberOfItemsPerPage);
      setPageCount(numberOfPages);
      console.log(numberOfPages);
    };
    getPageCount();
    
  }, [setListOfObjects]);

  useEffect(() => {
    const getCurrentPage = () => {
      setListOfObjects(list);
      console.log(list);
      const startIndex = (currentPage - 1) * numberOfItemsPerPage;
      const endIndex = startIndex + numberOfItemsPerPage;
      if (endIndex<=list.length){
        const currentObjects = list.slice(startIndex, endIndex);
        setListOfObjects(currentObjects);
      }
      else{
        const currentObjects = list.slice(startIndex, endIndex);
        console.log(currentObjects);
        setListOfObjects(list);
      }
      
    };
    getCurrentPage();
  }, [currentPage, setListOfObjects]);

  return (
    <div style={{ display: pageCount ? "block" : "none" }}>
      <PaginationNavbarContainer justify="center" align="flex-end">
      <Pagination
        page={currentPage}
        onChange={setCurrentPage}
        total={pageCount}
        size={medianScreen ? "xs" : "sm"}
        radius="xl"
      />
      </PaginationNavbarContainer>
    </div>
  );
}
