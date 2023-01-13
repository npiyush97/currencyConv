export async function fetchExchangeRate(curr1, curr2, amount, date) {
  if (!curr1 || !curr2) throw Error("Both Currency required for conversion");
  const convertFrom = curr1.split("-")[0];
  const convertTo = curr2.split("-")[0];
  let url;
  if (!date) {
    url = `${process.env.REACT_APP_URL}/convert?api_key=${process.env.REACT_APP_API_KEY}&from=${convertFrom}&to=${convertTo}&amount=${amount}`;
  } else {
    url = `${process.env.REACT_APP_URL}/historical/${date}/?api_key=${process.env.REACT_APP_API_KEY}&from=${convertFrom}&to=${convertTo}&amount=${amount}`;
  }
  let response = await fetch(url);
  if (!response.ok) {
    console.error(response.status);
  }
  let data = await response.json();
  if(data.status === 'success'){
    const newData = Object.values(data.rates)
    return newData[0].rate_for_amount;
  }
}
