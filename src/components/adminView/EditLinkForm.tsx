import {
  TextInputFullWidth,
  OpportunityFormContainer,
  OpportunityFormContentContainer,
  MultipleInputRow,
  DescriptionInput,
  EndDateInput,
  StartEndDatePicker,
  SalaryInput,
  SubmitButtonContainer,
  DropdownCategory,
  StartTimeInput,
} from "../opportunity/OpportunityFormHelper";
import { Location } from "../filter/Location";
import { auth } from "../../Firebase";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Paper, Button, createStyles, Checkbox } from "@mantine/core";
import { DateRangePickerValue, TimeInput } from "@mantine/dates";
import { useMediaQuery } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { start } from "repl";
import { ScrapedLink } from "./ScrapedLinkHelper";
import { RadioProps, Radio } from '@mantine/core';

interface LinkFormProp {
  edit: boolean;
  opportunityType: string;
  opportunity?: ScrapedLink;
  handleSubmission: (opportunity: ScrapedLink) => void;
}

const useStyles = createStyles((theme) => ({
  noShadow: {
    boxShadow: "none",
  },

  shadow: {
    boxShadow:
      "0 1px 3px rgb(0 0 0 / 5%), rgb(0 0 0 / 5%) 0px 10px 15px -5px, rgb(0 0 0 / 4%) 0px 7px 7px -5px;",
  },
}));

export function EditLinkForm({
  edit,
  opportunity,
  opportunityType,
  handleSubmission,
}: LinkFormProp) {
 
  const [displayLocationError, setDisplayLocationError] = useState(false);
  const [displayDateRangeError, setDisplayDateRangeError] = useState(false);
  const [displayStartTimeError, setDisplayStartTimeError] = useState(false);
  const [displayLocationInput, setDisplayLocationInput] = useState(true);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [userUID, setUserUID] = useState("");
  const [isMultiple, setIsMultiple] = useState(opportunity?.hasMultiplePosts === 1);
  const [hasNextPage, sethasNextPage] = useState(opportunity?.hasNextPage === 1);
  const [hasScrollForMore, sethasScrollForMore] = useState(opportunity?.hasScrollForMore === 1);
  const [hasInfiniteScroll, sethasInfiniteScroll] = useState(opportunity?.hasInfiniteScroll === 1);
  const [doesMorePostsUseClassName, setdoesMorePostsUseClassName] = useState(opportunity?.doesMorePostsUseClassName === 1);
  const [doesCurrentPostUseClassName, setdoesCurrentPostUseClassName] = useState(opportunity?.doesCurrentPostsUseClassName === 1);
  
  const medianScreen = useMediaQuery("(max-width: 992px)");
  const { classes } = useStyles();

  const getCurrentDate = (time = new Date().valueOf()) => {
    let tempDate: Date;

    tempDate = new Date(time);

    let day = tempDate.getDate();
    let month = tempDate.getMonth();
    let year = tempDate.getFullYear();
    let currentDate = new Date(year, month, day, 0, 0, 0, 0);

    return currentDate.valueOf();
  };

  function validateUrl(value: string) {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
      value
    );
  }

  const form = useForm({
    initialValues: {
      title: opportunity?.title || "",
      link: opportunity?.link || "",
      expiration_date: opportunity?.expiration_date
      ? new Date(opportunity?.expiration_date)
      : undefined,
      hasMultiplePosts: opportunity?.hasMultiplePosts || 0,
      hasNextPage: opportunity?.hasNextPage || 0,
      hasScrollForMore: opportunity?.hasScrollForMore || 0,
      hasInfinateScroll: opportunity?.hasInfiniteScroll || 0,
      doesMorePostsUseClassName: opportunity?.doesMorePostsUseClassName || 0,
      morePostsClassName: opportunity?.morePostsClassName || "",
      currentPostsClassName: opportunity?.currentPostsClassName || "",
      currentPostsPrefixXpath: opportunity?.currentPostsPrefixXpath || "",
      currentPostsPostfixXpath: opportunity?.currentPostsPostfixXpath || "",
      linkID: opportunity?.linkID || "",
      doesCurrenPostsUseClassName: opportunity?.doesCurrentPostsUseClassName || 0,
      postType: opportunity?.postType || "",
      morePostsXpath: opportunity?.morePostsXpath || "",
      currentPostsStartIndex: opportunity?.currentPostsStartIndex || 1,
    },
    validate: {
      title: (value) =>
        value.trim()
          ? value.trim().length <= 100
            ? null
            : "Please shorten the title"
          : "Please give a title",
      link: (value) =>
        value.trim() && validateUrl(value.trim())
          ? value.trim().length <= 250
            ? null
            : "Please shorten the link"
          : "Please give a valid URL link",
        expiration_date: (value: Date | string) => {
        
        if (value && (value.valueOf() as number) < getCurrentDate()) {
          return "Please choose today's or a future date";
        } 

        return null;
      },
    
    },
  });
  const essentialOpportunityKey = [
      "linkID",
      "expiration_date",
      "link",
      "title",
      "postType", 
      "hasMultiplePosts",
      "hasNextPage",
      "hasScrollForMore",
      "hasInfiniteScroll",
      "doesMorePostsUseClassName",
      "morePostsClassName",
      "currentPostsClassName",
      "currentPostsPrefixXpath",
      "currentPostsPostfixXpath",
      "doesCurrentPostsUseClassName",
      "morePostsXpath",
      "currentPostsStartIndex"
  ];


  // FIXME: When creating the request object, need to make sure that we use keyword
  // instead of explicitly using title and organization
  const handleFormSubmission = (values: ScrapedLink) => {
    console.log("these are the values: ", values);
    

    let opportunityKeys: string[] = [...essentialOpportunityKey];

    let req: ScrapedLink = {};

    for (let key in values) {
      let formattedKey = key as keyof ScrapedLink;
      if (!opportunityKeys.includes(key)) {
        continue;
      } else if (typeof values[formattedKey] === "string") {
        let temp = values[formattedKey] as string;
        temp = temp.trim();
        req = { ...req, [formattedKey]: temp };
      } else {
        req = { ...req, [formattedKey]: values[formattedKey] };
      }
    }

    if (!req.expiration_date) {
      const getSixMonthFromToday = () => {
        let tempDate: number | Date = getCurrentDate();
        tempDate = new Date(tempDate);
        tempDate.setMonth(tempDate.getMonth() + 6);
        return tempDate.valueOf();
      };
      req.expiration_date = getSixMonthFromToday();
      console.log(
        "getting 6 month from today",
        req.expiration_date,
        new Date(req.expiration_date)
      );
    } else {
      req.expiration_date = getCurrentDate(
        values.expiration_date instanceof Date ? values.expiration_date?.valueOf() : undefined
      );
      req.expiration_date = new Date(req.expiration_date).setHours(23, 59, 59);
    }

    req.doesCurrentPostsUseClassName = doesCurrentPostUseClassName ? 1 : 0;
    req.doesMorePostsUseClassName = doesMorePostsUseClassName ? 1 : 0;
    req.hasInfiniteScroll = hasInfiniteScroll ? 1 : 0;
    req.hasMultiplePosts = isMultiple ? 1 : 0;
    req.hasNextPage = hasNextPage ? 1 : 0;
    req.hasScrollForMore = hasScrollForMore ? 1 : 0;

    req.morePostsClassName = values.morePostsClassName === "" ? null : values.morePostsClassName;
    req.currentPostsClassName = values.currentPostsClassName === "" ? null : values.currentPostsClassName;
    req.morePostsXpath = values.morePostsXpath === "" ? null : values.morePostsXpath;
    req.currentPostsPrefixXpath = values.currentPostsPrefixXpath === "" ? null : values.currentPostsPrefixXpath;
    req.currentPostsPostfixXpath = values.currentPostsPostfixXpath === "" ? null : values.currentPostsPostfixXpath;

    handleSubmission(req);
  };

  /*const dateRangeErrorFunction = () => {
    if (displayDateRangeError) {
      if (!dateRange || !dateRange[0] || !dateRange[1]) {
        return "Please give a date range";
      } else if (
        dateRange[0].valueOf() < getCurrentDate() ||
        dateRange[1].valueOf() < getCurrentDate()
      ) {
        return "Please make sure that the dates given set to today and/or in the future";
      }
    }
    return false;
  };*/

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserUID(user.uid);
      }
    });

    console.log("Here is the opportunity passed into the form: ", opportunity);
    
  }, []);


  

  const smallerScreen = useMediaQuery("(max-width: 992px)");

  return (
    <OpportunityFormContainer>
      <Paper
        shadow="sm"
        withBorder={!edit}
        className={edit ? classes.noShadow : classes.shadow}
        radius="lg"
        sx={{ padding: smallerScreen ? "20px" : "20px 40px" }}
      >
        <OpportunityFormContentContainer>
          <form
            onSubmit={form.onSubmit((values) => handleFormSubmission(values))}
          >
            <MultipleInputRow
              justify="space-around"
              gap="md"
              display
              direction={medianScreen ? "column" : "row"}
            >
              <TextInputFullWidth
                label="Title"
                placeholder="Title"
                display
                withAsterisk
                {...form.getInputProps("title")}
              />
              <TextInputFullWidth
                label="Link"
                placeholder="Link"
                display
                withAsterisk
                {...form.getInputProps("link")}
              />
              
            </MultipleInputRow>
            <EndDateInput
                label="Expiration Date"
                placeholder="Expiration Date"
                display
                withAsterisk
                {...form.getInputProps("expiration_date")}
              />
            <DropdownCategory
              label="Post Type"
              allowDeselect
              clearable
              withAsterisk
              placeholder={`Select post type`}
              options={[
                { value: "news", label: "News" },
                { value: "jobs", label: "Jobs" },
                { value: "competitions", label: "Competitions" },
                { value: "concerts", label: "Concerts" },
                { value: "festivals", label: "Festivals" },
              ]}
              display
              data={[
                "news",
                "jobs",
                "competitions",
                "concerts",
                "festivals",
              ]}
              {...form.getInputProps("postType")}
            />
            
            
            <Checkbox
              checked={isMultiple}
              onChange={(e) => {
                setIsMultiple(e.currentTarget.checked);
                form.setFieldValue("hasMultiplePosts", 0);
              }}
              label="Multiple Posts"
              sx={{
                marginTop: "10px",
                
              }}
            />
            
            {isMultiple ? (
            <>
              <MultipleInputRow
                justify="space-around"
                gap="md"
                display
                direction={medianScreen ? "column" : "row"}
              >
                <Checkbox
                  checked={!hasScrollForMore && !hasInfiniteScroll && hasNextPage}
                  onChange={(e) => {
                    sethasNextPage(e.currentTarget.checked);
                    sethasInfiniteScroll(false);
                    sethasScrollForMore(false);
                    form.setFieldValue("hasNextPage", 0);
                  }}
                  label="Has Next Page"
                  sx={{
                    marginTop: "10px",
                  }}
                />
                <Checkbox
                  checked={!hasNextPage && !hasInfiniteScroll && hasScrollForMore}
                  onChange={(e) => {
                    sethasNextPage(false);
                    sethasInfiniteScroll(false);
                    sethasScrollForMore(e.currentTarget.checked);
                    form.setFieldValue("hasScrollForMore", 0);
                  }}
                  label="Has Scroll For More"
                  sx={{
                    marginTop: "10px",
                  }}
                />
                <Checkbox
                  checked={!hasNextPage && !hasScrollForMore && hasInfiniteScroll}
                  onChange={(e) => {
                    sethasNextPage(false);
                    sethasInfiniteScroll(e.currentTarget.checked);
                    sethasScrollForMore(false);
                    form.setFieldValue("hasInfiniteScroll", 0);
                  }}
                  label="Has Infinite Scroll"
                  sx={{
                    marginTop: "10px",
                  }}
                />
              </MultipleInputRow>

              <h3>Current Post</h3>

              <Checkbox
                checked={doesCurrentPostUseClassName}
                onChange={(e) => {
                  setdoesCurrentPostUseClassName(e.currentTarget.checked);
                  form.setFieldValue("doesCurrentPostsUseClassName", 0);
                }}
                label="Does current post use class name?"
                sx={{
                  marginTop: "10px",
                }}
              />
              {doesCurrentPostUseClassName ? (
                <>
                  <TextInputFullWidth
                    label="Class Name"
                    placeholder="Class Name"
                    display
                    withAsterisk
                    {...form.getInputProps("currentPostsClassName")}
                  />
                </>
              ) : (
                <>
                  <MultipleInputRow
                    justify="space-around"
                    gap="md"
                    display
                    direction={medianScreen ? "column" : "row"}
                  >
                    <TextInputFullWidth
                      label="Xpath Prefix"
                      placeholder="Xpath Prefix"
                      display
                      withAsterisk
                      {...form.getInputProps("currentPostsPrefixXpath")}
                    />
                    <TextInputFullWidth
                      label="Xpath Postfix"
                      placeholder="Xpath Postfix"
                      display
                      withAsterisk
                      {...form.getInputProps("currentPostsPostfixXpath")}
                    />
                    <TextInputFullWidth
                      label="Start Index"
                      placeholder="Start Index"
                      display
                      withAsterisk
                      {...form.getInputProps("currentPostsStartIndex")}
                    />
                  </MultipleInputRow>
                </>
              )}

              {hasNextPage || hasScrollForMore ? (
                <>
                  <h3>Next Posts</h3>
                  <Checkbox
                    checked={doesMorePostsUseClassName}
                    onChange={(e) => {
                      setdoesMorePostsUseClassName(e.currentTarget.checked);
                      form.setFieldValue("doesMorePostsUseClassName", 0);
                    }}
                    label="Do next posts use class names?"
                    sx={{
                      marginTop: "10px",
                    }}
                  />
                  {doesMorePostsUseClassName ? (
                    <>
                      <TextInputFullWidth
                        label="Class Name"
                        placeholder="Class Name"
                        display
                        withAsterisk
                        {...form.getInputProps("morePostsClassName")}
                      />
                    </>
                  ) : (
                    <>
                      <TextInputFullWidth
                        label="Xpath"
                        placeholder="Xpath"
                        display
                        withAsterisk
                        {...form.getInputProps("morePostsXpath")}
                      />
                    </>
                  )}
                </>
              ) : (
                <></>
              )}
            </>
          ) : (
            <>
            </>
          )}

            
            

            <SubmitButtonContainer
              justify="center"
              sx={{ marginBottom: "20px" }}
            >
              <Button
                type="submit"
                onClick={() => {
                  setDisplayDateRangeError(true);
                  setDisplayStartTimeError(true);
                  console.log(form.isValid());
                  console.log(form.isValid("title"));
                  console.log(form.isValid("organization"));
                  console.log(form.isValid("link"));
                  console.log(form.isValid("description"));
                  console.log(form.isValid("end_date"));
                  console.log(form.isValid("salary"));
                  console.log(form.isValid("job_category"));
                  console.log(form.isValid("job_type"));
                  console.log(form.isValid("job_type"));
                  console.log(form.isValid("competition_category"));
                  console.log(form.isValid("address"));

                  console.log(displayLocationError);
                  console.log(displayDateRangeError);
                }}
              >
                Submit
              </Button>
            </SubmitButtonContainer>
          </form>
        </OpportunityFormContentContainer>
      </Paper>
    </OpportunityFormContainer>
  );
}
