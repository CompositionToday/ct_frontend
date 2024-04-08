import {
  ActionIcon,
  createStyles,
  Menu,
  Chip,
  Flex,
  Tooltip,
  Text,
  Button,
} from "@mantine/core";
import { Input } from "@mantine/core";
import { IconSearch, IconFilter } from "@tabler/icons";
import React, { useState, useEffect } from "react";
import { PaginationScrapedSearchObject } from "../pagination/PaginationNavbarScraper";
import { ScrapedPost } from "./ScrapedPostHelper";
import { showNotification } from "@mantine/notifications";
import { openConfirmationModal } from "../modal/ConfirmationModal";
import { openDenyModal } from "./modals/DenyModal";

interface SearchAndFilterScrapedProp {
  setSearchObjs: React.Dispatch<React.SetStateAction<PaginationScrapedSearchObject>>;
  selectedRows: number[];
  onUpdateSelectedRows: (updatedRows: number[]) => void;
  onUpdate: () => void;
  rawData: ScrapedPost[];
}

const useStyles = createStyles((theme) => ({
  container: {
    padding: "0px",
    marginTop: "40px",
    

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
      flexBasis: "40%",
    },
  },
  buttonsContainer: {
    marginLeft: "auto",
    [theme.fn.smallerThan("md")]: {
      marginRight: "15px",
    },
  },
}));

const createSearchObj = (
  setSearchObjs: React.Dispatch<React.SetStateAction<PaginationScrapedSearchObject>>,
  searchKeyword: string,
) => {
  let searchObj: PaginationScrapedSearchObject = {
    keyword: searchKeyword,
  };

  // console.log(searchObj);

  setSearchObjs(searchObj);
};


export function SearchAndFilterScraped({
  setSearchObjs,
  selectedRows,
  onUpdateSelectedRows,
  onUpdate,
  rawData,
}: SearchAndFilterScrapedProp) {
  const { classes } = useStyles();
  const [adminChecked, setAdminChecked] = useState(false);
  const [bannedChecked, setBannedChecked] = useState(false);
  const [regularChecked, setRegularChecked] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [selectedPages, setselectedPages] = useState<number[]>([]);

  useEffect(() => {
    createSearchObj(
      setSearchObjs,
      searchKeyword,
    );
  }, [adminChecked, bannedChecked, regularChecked]);

  const isFilterEnabled = () => {
    return adminChecked || bannedChecked || regularChecked;
  };

  const handleEnterKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // console.log("loading set to true");
      createSearchObj(
        setSearchObjs,
        searchKeyword,        
      );
    }
  };


  const handleSelectAll = () => {
    
    const updatedSelectedRows = [...selectedRows];
    let page = false;
    for (let i = 0; i < rawData.length; i++) {
      if (!updatedSelectedRows.includes(rawData[i]?.idposts ?? -1)) {
        page = true;
        break;
      }
    }
  
    if (page) {
      // Add all elements from the current page to selectedRows
      for (let i = 0; i < rawData.length; i++) {
        if (!updatedSelectedRows.includes(rawData[i]?.idposts ?? -1)) {
          updatedSelectedRows.push(rawData[i]?.idposts ?? -1);
        }
      }
      // Add currentPage to selectedPages
      
      setSelectAll(true);
    } else {
      // Remove all elements from the current page from selectedRows
      for (let i = 0; i < rawData.length; i++) {
        const postId = rawData[i]?.idposts ?? -1;
        const index = updatedSelectedRows.indexOf(postId);
        if (index !== -1) {
          updatedSelectedRows.splice(index, 1);
        }
      }
      
      setSelectAll(false);
    }
    
    onUpdateSelectedRows(updatedSelectedRows);
  };
  

  

  const handleApprove = async () => {
    // console.log("Approved rows:", selectedRows);
    // Implement your approval logic here
    try {
      for (let i = 0; i < selectedRows.length; i++) {
        let requestOptions = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        };
  
        let response = await fetch(
          `https://oyster-app-7l5vz.ondigitalocean.app/compositiontoday/webscraping/approve/${selectedRows[i]}`,
          requestOptions
        );
        //let responseJson = await response.json();

      }

    
      showNotification({
        title: "Posts Approved",
        message: "Scraped posts have been added to the site",
        color: "green",
      });

      onUpdateSelectedRows([]);
      onUpdate();
      
    } catch (err) {
      // console.log(err);
      showNotification({
        title: "Error",
        message: "There was a problem, please try again later",
        color: "red",
      });
    }
  };
  useEffect(() => {
    allSelected();
  }, [rawData]);
  
  function allSelected(){
    setSelectAll(true);
    for (let i = 0; i < rawData.length; i++) {
      if (!selectedRows.includes(rawData[i]?.idposts ?? -1)) {
        setSelectAll(false);
        break;
      }
    }
    // console.log(selectAll);
  }

  function ApproveButton(){
    if (selectedRows.length == 0)
    {
      return(
        <Button onClick={handleApprove}
                style={{marginRight: '5%'}}
                disabled>
          Approve
        </Button>
      );

    }
    return(
      <Button onClick={handleApprove}
              style={{marginRight: '5%'}}
              color="green"
      >
        Approve
      </Button>
    )

  }

  function DenyButton(){
    if (selectedRows.length == 0)
    {
      return(
          <Button onClick={() => openDenyModal(selectedRows, onUpdateSelectedRows)}
              style={{marginRight: '20%'}}
              disabled
          >
            Deny
          </Button>
      );

    }
    return(
        <Button onClick={() => openDenyModal(selectedRows, onUpdateSelectedRows)}
            style={{marginRight: '20%', backgroundColor: "#fa5252"}}
        >
          Deny
        </Button>
    )

  }


  return (
    <Flex className={classes.container}>
      <Input
        icon={
          <ActionIcon color="dark.2">
            <IconSearch />
          </ActionIcon>
        }
        placeholder="Search"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchKeyword(e.target.value)
        }
        onKeyDown={handleEnterKeyDown}
        className={classes.search}
      />
      <Button onClick={handleSelectAll} style={{marginLeft: '0.5%'}}  variant="outline">
          {selectAll ? 'Deselect Page' : 'Select Page'}
          </Button>
        <Flex className={classes.buttonsContainer}>


          {/*<Button onClick={handleApprove} style={{marginRight: '5%'}}>*/}
          {/*  Approve*/}
          {/*</Button>*/}
          <ApproveButton></ApproveButton>
          <DenyButton></DenyButton>

          {/*<Button onClick={() =>*/}
          {/*  openDenyModal(selectedRows, onUpdateSelectedRows)*/}
          {/*  } style={{marginRight: '20%', backgroundColor: "#fa5252"}}>*/}
          {/*  Deny*/}
          {/*</Button>*/}

        </Flex>
      </Flex>
    
  );
}
