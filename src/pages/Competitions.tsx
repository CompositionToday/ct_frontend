import React, { useState, useEffect } from "react";
import { Grid, MediaQuery, Pagination } from "@mantine/core";

export function Competitions() {
  return (
    <div>
      <div
        style={{
          border: "2px solid red",
          padding: "10px 10px 10px 10px",
          paddingBottom: "0px",
          margin: "1% 5%",
          position: "absolute",
          width: "75vw",
          height: "75vh",
          overflow: "hidden",
        }}
      >
        <Grid
          justify="center"
          grow
          style={{ position: "relative", height: "100%", width: "100%" }}
        >
          <Grid.Col style={{ border: "1px solid blue" }} span={3}>
            <p>1</p>
            <p>testyo</p>
            <p>testyo</p>

            <Pagination total={10} />
          </Grid.Col>
          <MediaQuery smallerThan="md" styles={{ display: "none" }}>
            <Grid.Col style={{ border: "1px solid green" }} span={9}>
              2
            </Grid.Col>
          </MediaQuery>
        </Grid>
      </div>
    </div>
  );
}
