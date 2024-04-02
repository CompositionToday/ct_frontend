import {
  ActionIcon,
  createStyles,
  Menu,
  Chip,
  Flex,
  Tooltip,
  Text,
  Button,
  Modal,
} from "@mantine/core";
import { Input } from "@mantine/core";
import { IconSearch, IconFilter } from "@tabler/icons";
import React, { useState, useEffect } from "react";
import { PaginationScrapedSearchObject } from "../pagination/PaginationNavbarScraper";
import { ScrapedPost } from "./ScrapedPostHelper";
import { showNotification } from "@mantine/notifications";
import { openConfirmationModal } from "../modal/ConfirmationModal";
import { openDenyModal } from "./modals/DenyModal";
import { ScrapedLink } from "./ScrapedLinkHelper";
import { PaginationLinksSearchObject } from "../pagination/PaginationNavbarLinks";
import { FormHeader } from "../opportunity/CreateOpportunityHelper";
import { EditLinkForm } from "./EditLinkForm";
import { useMediaQuery } from "@mantine/hooks";

interface SearchAndFilterScrapedProp {
  setSearchObjs: React.Dispatch<React.SetStateAction<PaginationLinksSearchObject>>;
  selectedRows: number[];
  onUpdateSelectedRows: (updatedRows: number[]) => void;
  onUpdate: () => void;
  rawData: ScrapedLink[];
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
  setSearchObjs: React.Dispatch<React.SetStateAction<PaginationLinksSearchObject>>,
  searchKeyword: string,
) => {
  let searchObj: PaginationLinksSearchObject = {
    keyword: searchKeyword,
  };

  // console.log(searchObj);

  setSearchObjs(searchObj);
};


export function SearchAndFilterLinks({
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
  const [displayOpportunityEditModal, setDisplayOpportunityEditModal] =
    useState(false);
  const smallerScreen = useMediaQuery("(max-width: 992px)");
  const [currentOpportunity, setCurrentOpportunity] =
    useState<ScrapedLink | null>(null);

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
  const editFunction = async (opportunity: ScrapedLink) => {
    try {
      let idpost = currentOpportunity?.linkID;
      // Delete the idposts in the opportunity such that the backend doesn't actually update the idpost column in mySQL.
      // This shouldn't be necessary to do at all but have it here just in-case the idposts here is some how different from the idposts in the url parameters and/or in mySQL
      
      delete opportunity.linkID;
      /*delete opportunity.first_name;
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
      }*/

      // console.log("formatted edit body:", opportunity);
      let temp = opportunity.expiration_date;
      opportunity.expiration_date = new Date(temp ? temp: "").getTime();
      

      let requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(opportunity),
      };

      let response = await fetch(
        `https://oyster-app-7l5vz.ondigitalocean.app/compositiontoday/links/${idpost}`,
        requestOptions
      );

      let responseJson = await response.json();

      let editedOpportunity = responseJson.listOfObjects[0];
      // console.log("edited body:" + editedOpportunity);

      return editedOpportunity;
    } catch (err) {
      // console.log(err);
    }
  };

  const handleAddButton = async (opportunity: ScrapedLink) => {
    try {
      delete opportunity.linkID;
      //delete opportunity.date_posted;
      

      // Format any keys of type number to be as type strings since the APIs only accept strings for the request body
      opportunity.expiration_date = opportunity.expiration_date?.toString();

      let editedOpportunity = await editFunction(opportunity);
      // console.log("Edited Op "+ editedOpportunity);

      /*for (let i = 0; i < rawLinksList.length; i++) {
        if (rawLinksList[i].linkID === editedOpportunity.idposts) {
          let tempArray = rawLinksList;
          tempArray[i] = editedOpportunity;
          setRawLinksList([...tempArray]);
          break;
        }
      }*/

      showNotification({
        title: "Link Added",
        message: "Your link has been added",
        color: "green",
      });
      setDisplayOpportunityEditModal(false);
    } catch (err) {
      // console.log(err);
      showNotification({
        title: "Error",
        message: "There was a problem, please try again later",
        color: "red",
      });
    }
  };

  const createNewLink = () => {
    const currentDate = new Date();
    const tenYearsFromNow = new Date(currentDate.getFullYear() + 10, currentDate.getMonth(), currentDate.getDate());

    const newOpportunity: ScrapedLink = {
      title: "",
      link: "",
      expiration_date: tenYearsFromNow, 
      hasMultiplePosts: 0,
      hasNextPage: 0,
      hasScrollForMore: 0,
      hasInfiniteScroll: 0,
      doesMorePostsUseClassName: 0,
      morePostsClassName: "",
      currentPostsClassName: "",
      currentPostsPrefixXpath: "",
      currentPostsPostfixXpath: "",
      linkID: "",
      doesCurrentPostsUseClassName: 0,
      postType: "",
      morePostsXpath: "",
      currentPostsStartIndex: 0,
    };
  
    // Set the newly created scraped link object to currentOpportunity state
    setCurrentOpportunity(newOpportunity);
  }



  return (
    <><Flex className={classes.container}>
      <Input
        icon={<ActionIcon color="dark.2">
          <IconSearch />
        </ActionIcon>}
        placeholder="Search"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchKeyword(e.target.value)}
        onKeyDown={handleEnterKeyDown}
        className={classes.search} />
      <Flex className={classes.buttonsContainer}>
        <Button onClick={() => {
          createNewLink();
          setDisplayOpportunityEditModal(true);
          
        }}
        style={{ marginRight: '20%' }}>
          Add New
        </Button>
      </Flex>

    </Flex><Modal
      opened={displayOpportunityEditModal}
      onClose={() => {
        setDisplayOpportunityEditModal(false);
      } }
      fullScreen={smallerScreen}
      size="60%"
    >
        <FormHeader>Edit Post</FormHeader>
        <EditLinkForm
          edit={true}
          opportunityType=''
          opportunity={currentOpportunity ? currentOpportunity : undefined}
          handleSubmission={handleAddButton} />
      </Modal></>
    
  );
}
