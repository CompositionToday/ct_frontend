import React from "react";
import { Opportunity } from "../components/opportunity/Opportunity";

export function RecentPosts() {
  return (
    <div>
      <Opportunity apiEndpoint="posts" />
    </div>
  );
}
