import {
  Paper,
  Menu,
  Badge,
  Table,
  Text,
  ActionIcon,
  ScrollArea,
  useMantineTheme,
  Container,
  createStyles,
  LoadingOverlay,
  Skeleton,
  Checkbox,
  Button,
  Modal,
  Flex,
} from "@mantine/core";
import { OpportunityItem } from "../opportunity/OpportunityHelper";
import { ScrapedPost } from "./ScrapedPostHelper";
import { FormHeader } from "../opportunity/CreateOpportunityHelper";
import {
  IconBan,
  IconTrash,
  IconArrowBigUpLine,
  IconCheck,
  IconArrowBigDownLine,
  IconDots,
} from "@tabler/icons";
import { auth } from "../../Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState, useRef } from "react";
import { showNotification } from "@mantine/notifications";
import { openAdminModal } from "./modals/AdminModal";
import { openDeleteModal } from "./modals/DeleteModal";
import { openBanModal } from "./modals/BanModal";
import {
  PaginationNavbar,
  PaginationSearchObject,
} from "../pagination/PaginationNavbar";
import { useMediaQuery } from "@mantine/hooks";
import { PaginationNavbarScraper } from "../pagination/PaginationNavbarScraper";
import { SearchAndFilterScraped } from "./SearchAndFilterScraped";
import { OpportunityForm } from "../opportunity/OpportunityForm";
import { ScrapedPostForm } from "./ScrapedPostForm";

interface NewsTableData {
  UID?: string;
  idposts?: number;
  title?: string;
  description?: string;
  link?: string;
  organization?: string;
  published_date?: string;
  writer?: string;
}

const typeColors: Record<string, string> = {
  regular: "blue",
  admin: "green",
  banned: "red",
};

const useStyles = createStyles((theme) => ({
  container: {
    width: "90vw",
    padding: "0px",

    [theme.fn.smallerThan("md")]: {
      width: "100%",
    },
  },

  userContainer: {
    display: "flex",
    flexWrap: "wrap",
    position: "relative",
    zIndex: 1,
    borderColor: "#939393",

    [theme.fn.smallerThan("md")]: {
      padding: "15px",
      borderRadius: "0px",
    },

    [theme.fn.largerThan("sm")]: {
      height: "90vh",
    },
  },
  noDataContainer: {
    display: "flex",
    justifyContent: "center", // Center horizontally
  alignItems: "center",
    position: "relative",
    zIndex: 1,
    borderColor: "#939393",

    

    [theme.fn.largerThan("sm")]: {
      height: "5vh",
    },
  },

  table: {
    maxWidth: "100%",
    flexBasis: "100%",

    [theme.fn.smallerThan("md")]: {
      maxHeight: "90vh",
      padding: "0px",
    },
  },

  bold: {
    fontWeight: 700,
  },

  header: {
    position: "sticky",
    top: 0,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "box-shadow 150ms ease",

    "&::after": {
      content: '""',
      position: "absolute",
      zIndex: 1,
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    },
  },
  buttonsContainer: {
    marginLeft: "auto",
  },

  scrolled: {
    // boxShadow: theme.shadows.sm,
  },
}));

export function ScrapedNews() {
  const theme = useMantineTheme();
  const { classes, cx } = useStyles();
  const [rawNewsList, setRawNewsList] = useState<ScrapedPost[]>([]);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentOpportunity, setCurrentOpportunity] =
    useState<ScrapedPost | null>(null);
  const [selectAll, setSelectAll] = useState(false);
  const [displayOpportunityEditModal, setDisplayOpportunityEditModal] =
    useState(false);
  const [displayOpportunityInfoModal, setDisplayOpportunityInfoModal] =
    useState(false);
  const [CurrentPage, setCurrentPage] = useState(1); // Add CurrentPage state
  const [NewsList, setNewsList] = useState<NewsTableData[]>([]); // Corrected variable name
  const [searchParams, setSearchParams] = useState<PaginationSearchObject>({
    keyword: "",
  });
  const [scrolled, setScrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [recall, setRecall] = useState(0);
  const smallerScreen = useMediaQuery("(max-width: 992px)");

  const handleCurrentPageChange = (page: number) => {
    setCurrentPage(page);
  };


  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user && user.email) {
        setSearchParams({ ...searchParams,});
      }
    });
  }, []);

  useEffect(() => {
    convertRawNewsDataToTableData();
  }, [rawNewsList, searchParams]);

  useEffect(() => {
    console.log("loading changed to:", loading);
  }, [loading]);

  const convertRawNewsDataToTableData = () => {
    let newNewsList: NewsTableData[] = [];
    rawNewsList?.forEach((NewsItem) => {
      const startDate = NewsItem.published_date ? new Date(NewsItem.published_date) : null;
      const endDate = NewsItem.end_date ? new Date(NewsItem.end_date) : null;
      const deadline = NewsItem.deadline ? new Date(NewsItem.deadline) : null;
  
      let formattedNewsData: NewsTableData = {
        UID: NewsItem.UID,
        idposts: NewsItem.idposts,
        title: NewsItem.title,
        description: NewsItem.description,
        link: NewsItem.link,
        organization: NewsItem.organization,
        published_date: startDate ? `${startDate.toLocaleString('en-us', { month: 'long' })} ${startDate.getDate()}, ${startDate.getFullYear()}` : "",
        writer: NewsItem.writer,
      };
      newNewsList.push(formattedNewsData);
    });
    setNewsList(newNewsList);
  };

  const mobileScreen = useMediaQuery("(max-width: 768px)");
  const dragState = useRef({
    isDragging: false,
    startRowIndex: -1,
    endRowIndex: -1,
  });
  
  const handleMouseDown = (index: number) => {
    dragState.current.isDragging = true;
    dragState.current.startRowIndex = index;
    dragState.current.endRowIndex = index;
  };
  
  const handleMouseEnter = (index: number) => {
    if (dragState.current.isDragging) {
      dragState.current.endRowIndex = index;
      const start = Math.min(
        dragState.current.startRowIndex,
        dragState.current.endRowIndex
      );
      const end = Math.max(
        dragState.current.startRowIndex,
        dragState.current.endRowIndex
      );
      const selectedIDPosts = [...selectedRows];
      const id = rawNewsList[dragState.current.startRowIndex]?.idposts ?? -1;
    if (selectedIDPosts.includes(id)) {
      // If the startRowIndex is in the selectedRows list,
      // add new IDPosts to the selectedRows
      for (let i = start; i <= end; i++) {
        if (!selectedIDPosts.includes(rawNewsList[i]?.idposts ?? -1)) {
          selectedIDPosts.push(rawNewsList[i]?.idposts ?? -1);
        }
      }
    } else {
      // Otherwise, remove dragged elements if they are in the list
      for (let i = start; i <= end; i++) {
        const indexToRemove = selectedIDPosts.indexOf(rawNewsList[i]?.idposts ?? -1);
        if (indexToRemove !== -1) {
          selectedIDPosts.splice(indexToRemove, 1);
        }
      }
    }
    setSelectedRows(selectedIDPosts);
    }
  };
  
  const handleMouseUp = () => {
    dragState.current.isDragging = false;
  };

  const handleRowSelect = (idposts: number) => {
    setSelectedRows(prevSelectedRows => {
      if (prevSelectedRows.includes(idposts)) {
        // If UID is already selected, remove it from the selectedRows
        return prevSelectedRows.filter(row => row !== idposts);
      } else {
        // Otherwise, add it to the selectedRows
        return [...prevSelectedRows, idposts];
      }
    });
  };
  const editFunction = async (opportunity: ScrapedPost) => {
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
      }

      console.log("formatted edit body:", opportunity);
      let temp = opportunity.published_date;
      opportunity.published_date = new Date(temp ? temp: "").getTime();
      

      let requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(opportunity),
      };

      let response = await fetch(
        `https://oyster-app-7l5vz.ondigitalocean.app/compositiontoday/news/${idpost}`,
        requestOptions
      );

      let responseJson = await response.json();

      let editedOpportunity = responseJson.listOfObjects[0];
      console.log("edited body:" + editedOpportunity);

      return editedOpportunity;
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditButton = async (opportunity: ScrapedPost) => {
    try {
      //delete opportunity.UID;
      //delete opportunity.date_posted;
      

      // Format any keys of type number to be as type strings since the APIs only accept strings for the request body
      opportunity.end_date = opportunity.end_date?.toString();
      opportunity.start_date = opportunity.start_date?.toString();
      opportunity.deadline = opportunity.deadline?.toString();
      opportunity.salary = opportunity.salary?.toString();
      opportunity.fee = opportunity.fee?.toString();
      opportunity.published_date = opportunity.published_date?.toString();

      let editedOpportunity = await editFunction(opportunity);
      console.log("Edited Op "+ editedOpportunity);

      for (let i = 0; i < rawNewsList.length; i++) {
        if (rawNewsList[i].idposts === editedOpportunity.idposts) {
          let tempArray = rawNewsList;
          tempArray[i] = editedOpportunity;
          setRawNewsList([...tempArray]);
          break;
        }
      }

      showNotification({
        title: "Edits Applied",
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
  

  const rows = NewsList?.map((item, index) => (
    <tr 
      onMouseDown={() => handleMouseDown(index)}
      onMouseEnter={() => handleMouseEnter(index)}
      onMouseUp={handleMouseUp}
      
        onClick={() => handleRowSelect(item.idposts ?? -1)}
        style={{
          backgroundColor: selectedRows.includes(item.idposts ?? -1) ? "#e6f7ff" : "inherit",
          cursor: "pointer",
          
        }}
    >
      
      <td>
        <Text size="sm" weight={500}>
          {item.title}
        </Text>
        {mobileScreen && (
          <Text size="xs" color="dimmed">
            {item.link}
          </Text>
        )}
        {mobileScreen && (
          <Text size="xs" color="dimmed">
            {item.organization}
          </Text>
        )}
        {mobileScreen && (
          <Text size="xs" color="dimmed">
            {item.published_date}
          </Text>
        )}
        {mobileScreen && (
          <Text size="xs" color="dimmed">
            {item.writer}
          </Text>
        )}
      </td>
      {!mobileScreen && (
        <td>
          <Text size="sm" color="dimmed" >
            {item.organization}
          </Text>
        </td>
      )}
      {!mobileScreen && (
        <td>
          <Container style={{ width: 100 }}>
          <a href={item.link} target='_blank'  color="dimmed" style={{ overflowWrap: 'break-word' }}>
          {item.link}
          </a>
          </Container>
        </td>
      )}
      {!mobileScreen && (
        <td>
          <Text size="sm" color="dimmed">
            {item.published_date}
          </Text>
        </td>
      )}
      {!mobileScreen && (
        <td>
          <Text size="sm" color="dimmed">
            {item.writer}
          </Text>
        </td>
      )}
      <td>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => {
          setDisplayOpportunityEditModal(true);
          setCurrentOpportunity(rawNewsList[index]);
        }}
      >
        Edit
      </Button>
    </td>      
    </tr>
    
  ));

  const loadingRows = [1, 2, 3, 4, 5].map((item, index) => (
    <tr key={index}>
      <td>
        <Skeleton
          height={8}
          width="40%"
          radius="xl"
          sx={{ margin: "8px 0px" }}
        />
        {mobileScreen && (
          <Skeleton
            height={6}
            width="100%"
            radius="xl"
            sx={{ margin: "8px 0px" }}
            
          />
        )}
      </td>
      {!mobileScreen && (
        <td>
          <Skeleton
            height={16}
            width="100%"
            radius="xl"
            sx={{ margin: "8px 0px" }}
            
          />
        </td>
      )}
      {!mobileScreen && (
      <td>
        <Skeleton
          height={8}
          width="40%"
          radius="xl"
          sx={{ margin: "8px 0px" }}
        
        />
      </td>
      )}
      {!mobileScreen && (
      <td>
        <Skeleton
          height={8}
          width="15%"
          radius="xl"
          sx={{ margin: "8px 0px" }}
          
        />
      </td>
      )}
      {!mobileScreen && (
      <td>
        <Skeleton
          height={8}
          width="15%"
          radius="xl"
          sx={{ margin: "8px 0px" }}
          
        />
      </td>
      )}
    </tr>
  ));



  const handleSelectAll = () => {
    if (selectAll) {
      // If all rows are selected, deselect all
      setSelectedRows([]);
      setSelectAll(false);
    } else {
      // Otherwise, select all rows
      const allRowIDs = NewsList.map(item => item.idposts ?? -1);
      setSelectedRows(allRowIDs);
      setSelectAll(true);
    }
  };
  const handleSelectedRowsUpdate = (updatedSelectedRows: number[]) => {
    setSelectedRows(updatedSelectedRows);
    
  };
  const handleUpdate = () => {
    setRecall((prevRecall) => prevRecall + 1);
  }

  return (
    <Container fluid className={classes.container}>
      <SearchAndFilterScraped
        setSearchObjs={setSearchParams}
        selectedRows={selectedRows}
        onUpdateSelectedRows={handleSelectedRowsUpdate}
        onUpdate={handleUpdate}
        rawData={rawNewsList}
  />

<Paper
        withBorder
        mt={30}
        radius="lg"
        className={cx(classes.userContainer, {
          [classes.noDataContainer]: rawNewsList.length === 0,
        })}
        sx={{ padding: "40px 20px" }}
      >
        <LoadingOverlay
          visible={loading}
          overlayOpacity={0.2}
          overlayBlur={0.2}
          radius="lg"
        />
        {rawNewsList.length === 0 ? (
        
          <Text size="lg" weight={500} align="center" style={{ color: '#42A563',
    fontSize: '36px',
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",}}>
            No New News
          </Text>
       
        ) : (
        <ScrollArea w="100%" h="90%">
          <Container className={classes.table}>
            <Table verticalSpacing="sm">
              <thead
                className={cx(classes.header, {
                  [classes.scrolled]: scrolled,
                })}
              >
                <tr>
                {mobileScreen && (
                  <th style={{textAlign: "center"}}>
                  {loading ? (
                    <Skeleton
                      height={12}
                      width="40%"
                      radius="xl"
                      sx={{ margin: "8px 0px" }}
                      
                    />
                  ) : (
                    "Item"
                  )}
                </th>
                )}
                {!mobileScreen && (
                  <th style={{textAlign: "center"}}>
                    {loading ? (
                      <Skeleton
                        height={12}
                        width="40%"
                        radius="xl"
                        sx={{ margin: "8px 0px" }}
                        
                      />
                    ) : (
                      "Title"
                    )}
                  </th>
                  )}
                  {!mobileScreen && (
                  <th style={{textAlign: "center"}}>
                    {loading ? (
                      <Skeleton
                        height={12}
                        width="10%"
                        radius="xl"
                        sx={{ margin: "8px 0px" }}
                        
                      />
                    ) : (
                      "Organization"
                    )}
                  </th>
                  )}
                  {!mobileScreen && (
                  <th style={{textAlign: "center"}}>
                    {loading ? (
                      <Skeleton
                        height={12}
                        width="10%"
                        radius="xl"
                        sx={{ margin: "8px 0px" }}
                        
                      />
                    ) : (
                      "Link"
                    )}
                  </th>
                  )}
                  {!mobileScreen && (
                  <th style={{textAlign: "center"}}>
                    {loading ? (
                      <Skeleton
                        height={12}
                        width="10%"
                        radius="xl"
                        sx={{ margin: "8px 0px" }}
                        
                      />
                    ) : (
                      "Published Date"
                    )}
                  </th>
                  )}
                  {!mobileScreen && (
                  <th style={{textAlign: "center"}}>
                    {loading ? (
                      <Skeleton
                        height={12}
                        width="10%"
                        radius="xl"
                        sx={{ margin: "8px 0px" }}
                       
                      />
                    ) : (
                      "Writer"
                    )}
                  </th>
                  )}
                  <th></th>
                </tr>
              </thead>
              <tbody>{loading ? loadingRows : rows}</tbody>
            </Table>
          </Container>
        </ScrollArea>
        )}
        <Container sx={{ display: "flex", justifyContent: "", alignItems: "center", marginTop: "30px"}}>
          
        <PaginationNavbarScraper
          apiEndpointExtension={"news"}
          numberOfItemsPerPage={10}
          setListOfObjects={setRawNewsList}
          searchFilterObject={searchParams}
          setLoading={setLoading}
          recall={recall}
          //curPage = {CurrentPage}
        />
        </Container>
        
        
      </Paper>
      <Modal
        opened={displayOpportunityEditModal}
        onClose={() => {
          setDisplayOpportunityEditModal(false);
        }}
        fullScreen={smallerScreen}
        size="60%"
      >
        <FormHeader>Edit Post</FormHeader>
        <ScrapedPostForm
          edit={true}
          opportunityType={
            "news"
          }
          opportunity={currentOpportunity ? currentOpportunity : undefined}
          displayWinnerInput
          handleSubmission={handleEditButton}
        />
      </Modal>
    </Container>
  );
}
