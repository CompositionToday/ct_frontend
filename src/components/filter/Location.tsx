import React, { useState, useRef, useEffect } from "react";
import { Autocomplete, Loader, Select } from "@mantine/core";

export interface LocationProp {
  citySetter: React.Dispatch<React.SetStateAction<string | undefined>>;
  stateSetter: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export function Location({ citySetter, stateSetter }: LocationProp) {
  const timeoutRef = useRef<number>(-1);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string[]>([]);
  const [userLocation, setUserLocation] = useState<string>("");

  const handleChange = async (val: string) => {
    setLoading(true);
    setValue(val);
    setData([]);
  };

  useEffect(() => {
    console.log(value);
    if (value === "") {
      setLoading(false);
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
              return `${city.name}, ${city.region}`;
            })
          );
        })
        .then(() => setLoading(false))
        .catch((err) => err);

      console.log(data);
    }, 1500);

    return () => clearTimeout(delayDebounceFn);
  }, [value]);

  return (
    <div style={{ margin: "10px" }}>
      <Autocomplete
        value={value}
        data={data}
        onChange={handleChange}
        rightSection={loading ? <Loader size={16} /> : null}
        label="Location"
        placeholder="Enter a city"
        limit={10}
      />
      <Select
        data={data}
        searchable
        label="Location"
        placeholder="Enter a city"
      />
      <p>{value}</p>
    </div>
  );
}
