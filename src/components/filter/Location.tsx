import React, { useState, useRef, useEffect } from "react";
import {
  Autocomplete,
  AutocompleteItem,
  Loader,
  createStyles,
} from "@mantine/core";

export interface LocationProp {
  city?: string | undefined;
  state?: string | undefined;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

interface LocationData {
  value: string;
  city: string;
  state: string;
}

export function Location({ setCity, setState, city, state }: LocationProp) {
  const timeoutRef = useRef<number>(-1);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<LocationData[]>([]);
  const [userLocation, setUserLocation] = useState<string>("");

  const useStyles = createStyles((theme) => ({
    input: {
      borderColor: value !== "" && (city === "" || state === "") ? "red" : "",
    },
  }));
  const { classes } = useStyles();

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
    setLoading(false);
  };

  useEffect(() => {
    console.log(value);
    if (value === "") {
      setLoading(false);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      try {
        console.log(value);
        // Send Axios request here
        let temp = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?country=us&limit=10&types=place&autocomplete=true&access_token=${process.env.REACT_APP_MAPBOX_API_KEY}`
        );

        let tmp = await temp.json();
        console.log(tmp);
        setData(
          tmp.features.map((city: any) => {
            let arr = city.place_name.split(", ");
            return {
              value: `${arr[0]}, ${arr[1]}`,
              city: arr[0],
              state: arr[1],
            };
          })
        );

        // Code that got the cities using the old API
        // let locations = await fetch(
        //   `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=10&countryIds=US&minPopulation=1000&namePrefix=${value}`,
        //   {
        //     method: "GET",
        //     headers: {
        //       "X-RapidAPI-Key": `${process.env.REACT_APP_GEO_API_KEY}`, // enter your rapid api key here
        //       "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
        //     },
        //   }
        // )
        //   .then((response) => response.json())
        //   .then((response) => {
        //     console.log(response);
        //     setData(
        //       response.data.map((city: any) => {
        //         // return `${city.name}, ${city.region}`;
        //         return {
        //           value: `${city.name}, ${city.region}`,
        //           city: city.name,
        //           state: city.region,
        //         };
        //       })
        //     );
        //     console.log("data", data);
        //   })
        //   .then(() => setLoading(false))
        //   .catch((err) => err);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }, 100);

    return () => clearTimeout(delayDebounceFn);
  }, [value]);

  useEffect(() => {
    console.log("data", data);
  }, [data]);

  return (
    <div style={{ marginTop: "10px" }}>
      <Autocomplete
        value={value}
        data={data}
        onChange={handleChange}
        rightSection={loading ? <Loader size={16} /> : null}
        label="Location"
        placeholder="City, State"
        onItemSubmit={handleDropdownSelect}
        limit={15}
        classNames={{
          input: classes.input,
        }}
        withAsterisk
      />
    </div>
  );
}
