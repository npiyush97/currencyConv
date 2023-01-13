import { useEffect, useState } from "react";
import dayjs from "dayjs";
import * as currencyFormatter from "currency-formatter";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { fetchExchangeRate } from "../../api/fetchExchangeRate";
import UiAutocomplete from "./UiAutocomplete";
import {
  DesktopDatePicker,
  LocalizationProvider,
  MuiPickersAdapterContext,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function CurrencyAutocomplete() {
  const [curr1, setCurr1] = useState("INR-Indian rupee");
  const [curr2, setCurr2] = useState("USD-United States dollar");
  const [symbol, setSymbol] = useState({ curr1Symbol: "", curr2Symbol: "" });
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState(1);
  const [convertData, setConvertData] = useState("");

  useEffect(() => {
    const getData = setTimeout(() => {
      handleConversionRequest(curr1, curr2, amount, date);
    }, 500);
    return () => clearTimeout(getData);
  }, [amount]);

  async function handleConversionRequest(curr1, curr2, amount, date) {
    const getConversionRate = await fetchExchangeRate(
      curr1,
      curr2,
      amount,
      date
    );
    formatCurrency(curr1, curr2);
    setConvertData(getConversionRate);
  }
  function handleDate(date) {
    let { $D, $M, $y } = date;
    setDate(`${$y}-${$M + 1}-${$D}`);
  }
  function switchValue() {
    let temp = curr1;
    let temp2 = curr2;
    setConvertData("");
    setCurr1(temp2);
    setCurr2(temp);
  }
  function handleChange(value) {
    setConvertData("");
    const id = value.id;
    const data = value.textContent;
    if (id.includes("currencyBox1")) {
      setCurr1(data);
    } else {
      setCurr2(data);
    }
    formatCurrency(curr1,curr2)
  }
  function formatCurrency(curr1, curr2) {
    let cur1 = curr1.split("-")[0];
    let cur2 = curr2.split("-")[0];
    let symbolCurr1,symbolCurr2
    if(currencyFormatter.findCurrency(cur1)){
      symbolCurr1 = currencyFormatter.findCurrency(cur1).symbol;
    }
    if(currencyFormatter.findCurrency(cur2)){
      symbolCurr2 = currencyFormatter.findCurrency(cur2).symbol || "";
    }
     setSymbol({curr1Symbol:symbolCurr1,curr2Symbol:symbolCurr2})
  }
  return (
    <>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Typography>
          {amount} {curr1.split("-")[1]} to {curr2.split("-")[1]}
        </Typography>
        <UiAutocomplete
          currency={curr1}
          onChange={handleChange}
          identity="currencyBox1"
        />
        <Button
          onClick={switchValue}
          variant="outlined"
          sx={{ margin: "0 auto" }}
        >
          Switch
        </Button>
        <UiAutocomplete currency={curr2} onChange={handleChange} />
        <TextField
          id="standard-basic"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          label="Amount"
          variant="standard"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Typography variant="body1">
          You check historical conversion rate by choosing date on date-picker
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Date-picker"
            inputFormat="YYYY-MM-DD"
            minDate={new Date().setFullYear(2010)}
            maxDate={new Date().setDate(new Date().getDate())}
            value={date}
            onChange={(e) => handleDate(e)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        {convertData.length ? (
          <p>
            {date ?? (
              <p>
                On <span>{date}</span>
              </p>
            )}{" "}
            {symbol.curr1Symbol} {amount} {curr1} = {symbol.curr2Symbol} {convertData} {curr2}
          </p>
        ) : null}
        <Button
          variant="outlined"
          onClick={() => handleConversionRequest(curr1, curr2, amount, date)}
        >
          Convert
        </Button>
        {/* <MakeChart data={}/> */}
      </Stack>
    </>
  );
}
