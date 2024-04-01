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
import { ScrapedLink } from "./ScrapedLinkHelper";
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
import { EditLinkForm } from "./EditLinkForm";
import { SearchAndFilterLinks } from "./SearchAndFilterLinks";
import { PaginationLinksSearchObject, PaginationNavbarLinks } from "../pagination/PaginationNavbarLinks";

interface LinksTableData {
  linkID?: string;
  expirationDate?: string;
  link?: string;
  title?: string;
}
interface linkProp {
  apiEndpoint: string;
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
    textAlign: "center",

    [theme.fn.smallerThan("md")]: {
      maxHeight: "90vh",
      padding: "0px",
      textAlign: "left",
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


export function NewLinks({ apiEndpoint }: linkProp) {
  const theme = useMantineTheme();
  const { classes, cx } = useStyles();
  const [rawLinksList, setRawLinksList] = useState<ScrapedLink[]>([]);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentOpportunity, setCurrentOpportunity] =
    useState<ScrapedLink | null>(null);
  const [displayOpportunityEditModal, setDisplayOpportunityEditModal] =
    useState(false);
  const [displayOpportunityInfoModal, setDisplayOpportunityInfoModal] =
    useState(false);
  const [CurrentPage, setCurrentPage] = useState(1); // Add CurrentPage state
  const [LinksList, setLinksList] = useState<LinksTableData[]>([]);
  const [searchParams, setSearchParams] = useState<PaginationLinksSearchObject>({
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
    convertRawLinksDataToTableData();
  }, [rawLinksList, searchParams]);

  useEffect(() => {
    console.log("loading changed to:", loading);
  }, [loading]);

  const convertRawLinksDataToTableData = () => {
    let newLinksList: LinksTableData[] = [];
    rawLinksList?.forEach((LinksItem) => {
      const expirationDate = LinksItem.expiration_date ? new Date(LinksItem.expiration_date) : null;
  
      let formattedLinksData: LinksTableData = {
        linkID: LinksItem.linkID,
        expirationDate: expirationDate ? `${expirationDate.toLocaleString('en-us', { month: 'long' })} ${expirationDate.getDate()}, ${expirationDate.getFullYear()}` : "",
        title: LinksItem.title,
        link: LinksItem.link,
      };
      newLinksList.push(formattedLinksData);
    });
    setLinksList(newLinksList);
  };

  const mobileScreen = useMediaQuery("(max-width: 768px)");
  


  const editFunction = async (opportunity: ScrapedLink) => {
    try {
      let idpost = currentOpportunity?.linkID;
      // Delete the idposts in the opportunity such that the backend doesn't actually update the idpost column in mySQL.
      // This shouldn't be necessary to do at all but have it here just in-case the idposts here is some how different from the idposts in the url parameters and/or in mySQL
      
      //delete opportunity.linkID;
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

      console.log("formatted edit body:", opportunity);
      let temp = opportunity.expiration_date;
    
      //opportunity.expiration_date = new Date(temp ? temp: "").getTime();
      opportunity.expiration_date = Number(opportunity.expiration_date);
      opportunity.linkID = idpost;
      console.log(JSON.stringify(opportunity));

      let requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(opportunity),
      };

      let response = await fetch(
        `https://oyster-app-7l5vz.ondigitalocean.app/compositiontoday/links/${idpost}`,
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

  const handleEditButton = async (opportunity: ScrapedLink) => {
    try {
      //delete opportunity.linkID;
      //delete opportunity.date_posted;
      

      // Format any keys of type number to be as type strings since the APIs only accept strings for the request body
      opportunity.expiration_date = opportunity.expiration_date?.toString();

      let editedOpportunity = await editFunction(opportunity);
      console.log("Edited Op "+ editedOpportunity);

      for (let i = 0; i < rawLinksList.length; i++) {
        if (rawLinksList[i].linkID === editedOpportunity.linkID) {
          let tempArray = rawLinksList;
          tempArray[i] = editedOpportunity;
          setRawLinksList([...tempArray]);
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
  

  const rows = LinksList?.map((item, index) => (
    <tr   
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
            {item.expirationDate}
          </Text>
        )}
      </td>
      {!mobileScreen && (
        <td>
          <Container style={{ width: 200 }}>
          <a href={item.link} target='_blank'  color="dimmed" style={{ overflowWrap: 'break-word' }}>
          {item.link}
          </a>
          </Container>
        </td>
      )}
      {!mobileScreen && (
        <td>
          <Text size="sm" color="dimmed">
            {item.expirationDate}
          </Text>
        </td>
      )}
      <td>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => {
          console.log(rawLinksList[index]);
          setDisplayOpportunityEditModal(true);
          setCurrentOpportunity(rawLinksList[index]); 
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
          width="100%"
          radius="xl"
          sx={{ margin: "8px 0px" }}
        
        />
      </td>
      )}
     
    </tr>
  ));



  
  const handleSelectedRowsUpdate = (updatedSelectedRows: number[]) => {
    setSelectedRows(updatedSelectedRows);
    
  };
  const handleUpdate = () => {
    setRecall((prevRecall) => prevRecall + 1);
  }

  return (
    <Container fluid className={classes.container}>
      <SearchAndFilterLinks
        setSearchObjs={setSearchParams}
        selectedRows={selectedRows}
        onUpdateSelectedRows={handleSelectedRowsUpdate}
        onUpdate={handleUpdate}
        rawData={rawLinksList}
  />

<Paper
        withBorder
        mt={30}
        radius="lg"
        className={cx(classes.userContainer, {
          [classes.noDataContainer]: rawLinksList.length === 0,
        })}
        sx={{ padding: "40px 20px" }}
      >
        <LoadingOverlay
          visible={loading}
          overlayOpacity={0.2}
          overlayBlur={0.2}
          radius="lg"
        />
        {rawLinksList.length === 0 ? (
        
          <Text size="lg" weight={500} align="center" style={{ color: '#42A563',
    fontSize: '36px',
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",}}>
            No New Links
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
                </tr>
              </thead>
              <tbody>{loading ? loadingRows : rows}</tbody>
            </Table>
          </Container>
        </ScrollArea>
        )}

        { rawLinksList.length === 0 ? (
            <Container sx={{display: "none", justifyContent: "", alignItems: "center"}}>
            
            <PaginationNavbarLinks
              apiEndpointExtension={apiEndpoint}
              setListOfObjects={setRawLinksList}
              searchFilterObject={searchParams}
              setLoading={setLoading}
              recall={recall}
              //curPage = {CurrentPage}
            />
            </Container>
          ) : (
            <Container sx={{ display: "flex", justifyContent: "", alignItems: "center", marginTop: "30px"}}>
          
            <PaginationNavbarLinks
              apiEndpointExtension={apiEndpoint}
              setListOfObjects={setRawLinksList}
              searchFilterObject={searchParams}
              setLoading={setLoading}
              recall={recall}
              //curPage = {CurrentPage}
            />
            </Container>
        )}
        
        
        
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
        <EditLinkForm
          edit={true}
          opportunityType = ''
          opportunity={currentOpportunity ? currentOpportunity : undefined}
          handleSubmission={handleEditButton}
        />
      </Modal>
    </Container>
  );
}
