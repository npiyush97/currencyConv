export const fetchCurrencyList = async () => {
  // let options = {
  //   method: "GET",
  //   headers: {
  //     "Accept": "application/json",
  //     "Content-Type": "application/json",
  //     "apikey": process.env.REACT_APP_API_KEY,
  //   },
  // };

  let apiurl = `${process.env.REACT_APP_URL}/list?api_key=${process.env.REACT_APP_API_KEY}`;
  let response = await fetch(apiurl);
  if (!response.ok) {
    console.error(response.statusText);
  }
  let apifetchdata = await response.json();
  let {currencies} = apifetchdata
  let currencyList = [];
  for(let [key,value] of Object.entries(currencies)){
    currencyList.push({ label:`${key}-${value}`});
  }
  return currencyList;
};
