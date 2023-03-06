import React, { useState, useRef, useEffect } from "react";
import {
  Autocomplete,
  AutocompleteItem,
  Loader,
  createStyles,
  Checkbox,
} from "@mantine/core";

export interface LocationProp {
  city: string | undefined;
  state: string | undefined;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  setState: React.Dispatch<React.SetStateAction<string>>;
  displayError?: boolean;
  setDisplayError?: React.Dispatch<React.SetStateAction<boolean>>;
  withAsterisk?: boolean;
  display: boolean;
}

interface LocationData {
  value: string;
  city: string;
  state: string;
}

export function Location({
  setCity,
  setState,
  city,
  state,
  displayError,
  setDisplayError,
  withAsterisk = false,
  display,
}: LocationProp) {
  const timeoutRef = useRef<number>(-1);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<LocationData[]>([]);
  const [userLocation, setUserLocation] = useState<string>("");
  const [remoteStatus, setRemoteStatus] = useState(
    city === "Remote" || state === "Remote"
  );

  // const useStyles = createStyles((theme) => ({
  //   input: {
  //     borderColor: value !== "" && (city === "" || state === "") ? "red" : "",
  //   },
  // }));
  // const { classes } = useStyles();

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
    if (city && state) {
      setValue(`${city}, ${state}`);
    }
  }, []);

  useEffect(() => {
    console.log("Chose a location");
    console.log("city: ", city);
    console.log("state: ", state);
    if (!city || !state) {
      setValue("");
      setRemoteStatus(false);
    }
  }, [city, state]);

  useEffect(() => {
    console.log(value);
    if (value === "") {
      setLoading(false);
      return;
    }

    if (setDisplayError) {
      setDisplayError(false);
    }

    const delayDebounceFn = setTimeout(async () => {
      try {
        console.log("value: ", value);

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
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [value]);

  useEffect(() => {
    console.log("data", data);
  }, [data]);

  useEffect(() => {
    console.log("remote status: ", remoteStatus);
    if (remoteStatus) {
      setCity("Remote");
      setState("Remote");
      setValue("");
      setData([]);
    }
  }, [remoteStatus]);

  return (
    <div style={display ? { marginTop: "10px" } : { display: "none" }}>
      <Autocomplete
        value={value}
        data={data}
        onChange={handleChange}
        rightSection={loading ? <Loader size={16} /> : null}
        label="Location"
        placeholder="City, State"
        onItemSubmit={handleDropdownSelect}
        limit={15}
        withAsterisk={withAsterisk}
        error={
          displayError && (!city || !state)
            ? "Select a location from the dropdown"
            : false
        }
        disabled={remoteStatus}
      />
      <Checkbox
        checked={remoteStatus}
        onChange={(e) => setRemoteStatus(e.currentTarget.checked)}
        label="Remote"
        sx={{ marginTop: "10px" }}
      />
    </div>
  );
}
