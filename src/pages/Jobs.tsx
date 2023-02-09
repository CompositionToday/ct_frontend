import React, { useState, useEffect } from "react";
import { Location } from "../components/filter/Location";
import { Opportunity } from "../components/opportunity/Opportunity";

export function Jobs() {
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");

  return (
    <div>
      <Opportunity />
    </div>
  );
}
