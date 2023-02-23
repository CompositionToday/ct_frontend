import React from "react";
import { Opportunity } from "../components/opportunity/Opportunity";

export function Festivals() {
  return (
    <div>
      <Opportunity apiEndpoint="festivals" />
    </div>
  );
}
