import {
  OpportunityItem,
  PaginationNavbarContainer,
  jobType,
} from "../opportunity/OpportunityHelper";
import { RawUserData } from "../adminView/UsersList";
import React, { useState, useEffect } from "react";
import { MediaQuery, Pagination } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export interface PaginationNavbarProp {
  apiEndpointExtension: string;
  numberOfItemsPerPage: number;
  searchFilterObject?: PaginationSearchObject;
  setListOfObjects:
    | React.Dispatch<React.SetStateAction<RawUserData[]>>
    | React.Dispatch<React.SetStateAction<OpportunityItem[]>>;
}

export interface PaginationSearchObject {
  UID?: string;
  idposts?: number;
  title?: string;
  description?: string;
  link?: string;
  date_posted?: Date;
  city?: string;
  state?: string;
  organization?: string;
  end_date?: Date | string;
  salary?: string;
  job_type?: jobType | any;
  winner?: string | null;
  category?: string;
  address?: string;
  start_date?: Date | string;
  first_name?: string;
  last_name?: string;
  email?: string;
  is_admin?: number;
  is_banned?: number;
}

export function PaginationNavbar({
  // The string that is the api extension. Do NOT begin it with a "/".
  apiEndpointExtension,
  // The number of items you want to display on a page.
  // If the API has a set number of items it returns for 1 page, please put in that number here.
  numberOfItemsPerPage,
  // The setter of the useState that holds all the current items displayed on a page.
  setListOfObjects,
  // An optional object where the keys are the name of the attribute you want to search for and the value is the actual value of the key.
  searchFilterObject,
}: PaginationNavbarProp) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const medianScreen = useMediaQuery("(max-width: 992px)");
  const url = "https://oyster-app-7l5vz.ondigitalocean.app/compositiontoday";

  useEffect(() => {
    const getPageCount = async () => {
      try {
        const countUrl = new URL(`${url}/${apiEndpointExtension}/count`);
        if (searchFilterObject) {
          for (const [key, value] of Object.entries(searchFilterObject)) {
            countUrl.searchParams.set(key, String(value));
          }
        }

        let responseCount = await fetch(countUrl);

        let responseCountJson = await responseCount.json();
        let numberOfPage = Math.ceil(
          responseCountJson.count / numberOfItemsPerPage
        );
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
    const getCurrentPage = async () => {
      try {
        const getUrl = new URL(`${url}/${apiEndpointExtension}`);
        console.log(searchFilterObject);
        console.log(getUrl);
        if (searchFilterObject) {
          for (const [key, value] of Object.entries(searchFilterObject)) {
            getUrl.searchParams.set(key, String(value));
          }
        }

        getUrl.searchParams.set("page_number", String(currentPage));
        let response = await fetch(getUrl);

        let responseJson = await response.json();
        setListOfObjects(responseJson.listOfObjects);
        // setPaginationDisplayOpportunity(responseOpportunityJson.listOfObjects);
        // setCurrentOpportunity(responseOpportunityJson.listOfObjects[0]);
      } catch (err) {
        console.log(err);
      }
    };

    getCurrentPage();
  }, [currentPage, pageCount]);

  return (
    <PaginationNavbarContainer justify="center" align="flex-end">
      <Pagination
        page={currentPage}
        onChange={setCurrentPage}
        total={pageCount}
        size={medianScreen ? "sm" : "md"}
      />
    </PaginationNavbarContainer>
  );
}
