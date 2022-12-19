import React, { useState, useRef, useEffect } from "react";
import { Autocomplete, AutocompleteItem, Loader, Select } from "@mantine/core";

export interface LocationProp {
  setCity: React.Dispatch<React.SetStateAction<string | undefined>>;
  setState: React.Dispatch<React.SetStateAction<string | undefined>>;
}

interface LocationData {
  value: string;
  city: string;
  state: string;
}

export function Location({ setCity, setState }: LocationProp) {
  const timeoutRef = useRef<number>(-1);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<LocationData[]>([]);
  const [userLocation, setUserLocation] = useState<string>("");

  const handleChange = async (val: string) => {
    console.log("I am triggered");
    setLoading(true);
    setValue(val);
    setData([]);
    setCity("");
    setState("");
  };

  const handleDropdownSelect = (item: AutocompleteItem) => {
    setCity(item.city);
    setState(item.state);
  };

  useEffect(() => {
    console.log(value);
    if (value === "") {
      setLoading(false);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      console.log(value);
      // Send Axios request here
      let locations = await fetch(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=10&countryIds=US&namePrefix=${value}`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": `${process.env.REACT_APP_GEO_API_KEY}`, // enter your rapid api key here
            "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
          },
        }
      )
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          setData(
            response.data.map((city: any) => {
              // return `${city.name}, ${city.region}`;
              return {
                value: `${city.name}, ${city.region}`,
                city: city.name,
                state: city.region,
              };
            })
          );
          console.log("data", data);
        })
        .then(() => setLoading(false))
        .catch((err) => err);
    }, 1500);

    return () => clearTimeout(delayDebounceFn);
  }, [value]);

  useEffect(() => {
    console.log("data", data);
  }, [data]);

  return (
    <div style={{ margin: "10px" }}>
      <Autocomplete
        value={value}
        data={data}
        onChange={handleChange}
        rightSection={loading ? <Loader size={16} /> : null}
        label="Location"
        placeholder="Enter a city"
        onItemSubmit={handleDropdownSelect}
        limit={10}
      />
    </div>
  );
}
