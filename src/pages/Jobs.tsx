import React, { useState, useEffect } from "react";
import { Location } from "../components/filter/Location";

export function Jobs() {
  const [city, setCity] = useState<string>();
  const [state, setState] = useState<string>();

  return (
    <div>
      <p>testyo</p>
      <Location citySetter={setCity} stateSetter={setState} />
    </div>
  );
}
