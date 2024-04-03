import {
  OpportunityItem,
  PaginationNavbarContainer,
} from "../opportunity/OpportunityHelper";
import { RawUserData } from "../adminView/UsersList";
import React, { useState, useEffect } from "react";
import { Pagination } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export interface PaginationNavbarProp {
  apiEndpointExtension: string;
  numberOfItemsPerPage: number;
  searchFilterObject?: PaginationSearchObject;
  setListOfObjects:
    | React.Dispatch<React.SetStateAction<RawUserData[]>>
    | React.Dispatch<React.SetStateAction<OpportunityItem[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  recall?: number;
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
  end_date?: Date | string | number;
  salary?: number;
  job_type?: string;
  winner?: string | null;
  job_category?: string;
  competition_category?: string;
  address?: string;
  start_date?: Date | string | number;
  type?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  keyword?: string;
  is_deleted?: string | number;
  is_flagged?: string | number;
  is_expired?: string | number;
  is_admin?: string;
  is_banned?: string;
  is_regular?: string;
  is_winner?: string;
  current_email?: string;
  start_time?: Date | string | number | null;
  author?: string;
  fee?: string | number;
  sort?: string | number;
  deadline?: Date | string | number;
  genre?: string;
  hasbeenfeatured?: boolean;
  likecount?: number;
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
  setLoading,
  recall = -99,
}: PaginationNavbarProp) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const medianScreen = useMediaQuery("(max-width: 992px)");
  const url = "https://oyster-app-7l5vz.ondigitalocean.app/compositiontoday";

  const timeOut = 450;

  useEffect(() => {
    const getPageCount = async () => {
      try {
        setLoading(true);
        // console.log("searchFilterObj", searchFilterObject);
        const countUrl = new URL(`${url}/${apiEndpointExtension}/count`);
        if (searchFilterObject) {
          for (const [key, value] of Object.entries(searchFilterObject)) {
            countUrl.searchParams.set(key, String(value));
          }
        }

        let responseCount = await fetch(countUrl);
        // console.log(responseCount);
        let responseCountJson = await responseCount.json();
        // console.log(
        //   "number of " + apiEndpointExtension + " count",
        //   responseCountJson.count
        // );
        let numberOfPage = Math.ceil(
          responseCountJson.count / numberOfItemsPerPage
        );
        setPageCount(numberOfPage);
        // console.log("number of pages", numberOfPage);
        setTimeout(() => {
          setLoading(false);
        }, timeOut);
      } catch (err) {
        // console.log(err);
      } finally {
        setCurrentPage(1);
        // console.log(recall);
      }
    };
    getPageCount();
  }, [searchFilterObject, recall, apiEndpointExtension]);

  useEffect(() => {
    const getCurrentPage = async () => {
      try {
        setLoading(true);
        const getUrl = new URL(`${url}/${apiEndpointExtension}`);
        if (searchFilterObject) {
          for (const [key, value] of Object.entries(searchFilterObject)) {
            getUrl.searchParams.set(key, String(value));
          }
        }

        getUrl.searchParams.set("page_number", String(currentPage));
        // console.log("geturl: ", getUrl.toString());
        let response = await fetch(getUrl);

        let responseJson = await response.json();
        setListOfObjects(responseJson.listOfObjects || []);
        setTimeout(() => {
          setLoading(false);
        }, timeOut);
        // console.log("res", responseJson);
      } catch (err) {
        // console.log(err);
      }
    };

    getCurrentPage();
  }, [
    currentPage,
    pageCount,
    searchFilterObject,
    recall,
    apiEndpointExtension,
  ]);

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
