import React, { useState, useEffect } from "react";
import { Location } from "../components/filter/Location";
import { Opportunity } from "../components/opportunity/Opportunity";

export function Jobs() {
  return (
    <div>
      <Opportunity apiEndpoint="jobs" />
    </div>
  );
}
