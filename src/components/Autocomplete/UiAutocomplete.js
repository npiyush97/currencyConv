import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { fetchCurrencyList } from "../../api/fetchCurrencyList";

const UiAutocomplete = ({ currency, onChange, identity }) => {
  const [currencyList, setCurrencyList] = useState([]);

  useEffect(() => {
    (async () => {
      const getCurrencyList = await fetchCurrencyList();
      setCurrencyList(getCurrencyList);
    })();
  }, []);
  return (
    <Autocomplete
      value={currency}
      onChange={(e) => onChange(e.target)}
      disablePortal
      id={`combo-box-demo@${identity}@@`}
      options={currencyList.map((list)=>list.label)}
      isOptionEqualToValue={(option,value) => option === value}
      sx={{ width: "100%" }}
      renderInput={(params) => <TextField {...params} label="Currencies" />}
    />
  );
};
export default React.memo(UiAutocomplete);
