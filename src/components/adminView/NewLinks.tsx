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
    TextInput,
    Select,
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
import { useMediaQuery } from "@mantine/hooks";
import { useForm } from "@mantine/form";


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
            height: "65vh",
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
  
    scrolled: {
      // boxShadow: theme.shadows.sm,
    },
  }));

  type PostType = "news" | "competition" | "concert" | "festival" | "job";

interface FormData {
  link: string;
  postType: PostType;
  multiplePosts: boolean;
  individualPostSelector: string;
  nextPageSelector: string;
}

const initialFormData: FormData = {
  link: "",
  postType: "news",
  multiplePosts: false,
  individualPostSelector: "",
  nextPageSelector: "",
};

export function NewLinks() {
    const { classes, cx } = useStyles();

    const [formData, setFormData] = useState<FormData>(initialFormData);

    function handleInputChange(
      event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
    }
  
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
      console.log(formData);
      // You can handle form submission here, e.g., send data to backend
    }

    function handlePostTypeChange(value: string | null) {
        if (value) {
          setFormData({ ...formData, postType: value as PostType });
        }
      }
    
    return (
        <Container fluid className={classes.container}>
    
        <Paper
            withBorder
            mt={30}
            radius="lg"
            className={cx(classes.userContainer)}
            sx={{ padding: "40px 20px" }}
          >

<form onSubmit={handleSubmit}>
      <TextInput
        label="Link"
        name="link"
        placeholder="Enter link"
        value={formData.link}
        onChange={handleInputChange}
        required
      />
      <Select
        label="Post Type"
        name="postType"
        data={[
          { value: "news", label: "News" },
          { value: "competition", label: "Competition" },
          { value: "concert", label: "Concert" },
          { value: "festival", label: "Festival" },
          { value: "job", label: "Job" },
        ]}
        value={formData.postType}
        onChange={handlePostTypeChange}
        required
      />
      <Checkbox
        label="Multiple Posts"
        name="multiplePosts"
        checked={formData.multiplePosts}
        onChange={(event) =>
          setFormData({ ...formData, multiplePosts: event.currentTarget.checked })
        }
      />
      {formData.multiplePosts && (
        <>
          <TextInput
            label="Individual Post Selector"
            name="individualPostSelector"
            placeholder="Enter class name or xpath"
            value={formData.individualPostSelector}
            onChange={handleInputChange}
            required
          />
          <TextInput
            label="Next Page Selector"
            name="nextPageSelector"
            placeholder="Enter class name or xpath"
            value={formData.nextPageSelector}
            onChange={handleInputChange}
            required
          />
        </>
      )}
      <Button type="submit" variant="outline">
        Submit
      </Button>
    </form>
            
          </Paper>
        </Container>
      );
}