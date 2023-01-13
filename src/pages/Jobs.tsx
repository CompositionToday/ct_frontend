import React, { useState, useEffect } from "react";
import { Location } from "../components/filter/Location";

export function Jobs() {
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");

  return (
    <div>
      <p>testyo</p>
      <Location
        setCity={setCity}
        setState={setState}
        city={city}
        state={state}
      />
      <p>City: {city}</p>
      <p>State: {state}</p>
    </div>
  );
}
