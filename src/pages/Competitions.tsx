import React, { useState, useEffect } from "react";
import { Grid, MediaQuery, Pagination } from "@mantine/core";

export function Competitions() {
  return (
    <div>
      <div
        style={{
          border: "2px solid red",
          padding: "10px",
          margin: "1% 5%",
          position: "absolute",
          width: "75vw",
          height: "80vh",
          overflow: "hidden",
        }}
      >
        <Grid
          justify="center"
          grow
          style={{
            position: "relative",
            height: "100%",
            width: "100%",
            margin: "0 auto",
          }}
        >
          <Grid.Col style={{ border: "1px solid blue" }} span={5}>
            <p>1</p>
            <p>testyo</p>
            <p>testyo</p>

            <Pagination total={10} size="sm" />
          </Grid.Col>
          <MediaQuery smallerThan="md" styles={{ display: "none" }}>
            <Grid.Col style={{ border: "1px solid green" }} span={7}>
              2
            </Grid.Col>
          </MediaQuery>
        </Grid>
      </div>
    </div>
  );
}
