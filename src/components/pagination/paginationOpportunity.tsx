import React, { FC, useState, useEffect } from "react";
import { Grid, MediaQuery, Pagination } from "@mantine/core";
import { PageContainer, PageGrid, PageFlex } from "./paginationHelper";

interface exampleItem {
  id: number;
  value: string;
}

export function PaginationOpportunity() {
  const itemCount = 82;
  const [currentPage, setCurrentPage] = useState(1);
  const [exampleDB, setExampleDB] = useState<exampleItem[]>([]);
  const [currentPost, setCurrentPost] = useState<exampleItem | null>(null);
  const [paginationDisplayPost, setPaginationDisplayPost] = useState<
    exampleItem[]
  >([]);

  useEffect(() => {
    let temp: exampleItem[] = [];

    for (let i = 0; i < itemCount; i++) {
      temp.push({ id: i, value: `This is some example text with value ${i}` });
    }

    setExampleDB(temp);
    setCurrentPost(temp[0]);
  }, []);

  useEffect(() => {
    let firstElement = (currentPage - 1) * 4;
    let lastElement = currentPage * 4 - 1;

    if (lastElement > exampleDB.length - 1) {
      lastElement = exampleDB.length - 1;
    }

    let temp: exampleItem[] = [];

    for (let i = firstElement; i <= lastElement; i++) {
      temp.push(exampleDB[i]);
    }

    setPaginationDisplayPost(temp);
  }, [currentPage, exampleDB]);

  const handlePostClick = (post: exampleItem) => {
    setCurrentPost(post);
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
    <div>
      <PageContainer>
        <PageGrid justify="center" grow>
          <Grid.Col style={{ border: "1px solid blue" }} span={5}>
            <PageFlex justify="space-around" direction="column">
              {paginationDisplayPost.map((post: exampleItem) => (
                <div onClick={() => handlePostClick(post)}>
                  <h1>Number: {post.id}</h1>
                </div>
              ))}

              <Pagination
                page={currentPage}
                onChange={setCurrentPage}
                total={Math.ceil(itemCount / 4)}
                size="sm"
              />
            </PageFlex>
          </Grid.Col>
          <MediaQuery smallerThan="md" styles={{ display: "none" }}>
            <Grid.Col style={{ border: "1px solid green" }} span={7}>
              <h1>This is the current page you are on {currentPage}</h1>
              <h2>
                This is the current item number you are on {currentPost?.id}
              </h2>
              <h3>This is the value of the item: {currentPost?.value}</h3>
            </Grid.Col>
          </MediaQuery>
        </PageGrid>
      </PageContainer>
    </div>
  );
}
