import React from "react";
import { Opportunity } from "../components/opportunity/Opportunity";

export function RecentPost() {
  return (
    <div>
      <Opportunity apiEndpoint="posts" />
    </div>
  );
}
