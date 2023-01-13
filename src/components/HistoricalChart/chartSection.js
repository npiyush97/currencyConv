

async function previousDay() {
    const prevDay = new Date();
    let month = prevDay.getMonth();
    let year = prevDay.getFullYear();
    let day = prevDay.getDate() - 1;
    const prevDay1 = year + "-" + month + "-" + day;
    let cur1 = curr1.split("-")[0];
    let cur2 = curr2.split("-")[0];
    let url = `https://api.getgeoapi.com/v2/currency/historical/${prevDay1}?api_key=${process.env.REACT_APP_API_KEY}&from=${cur1}&to=${cur2}&amount=${amount}`;
    let response = await fetch(url);
    let data = await response.json();
    const { rate } = data.rates[cur2];
    // setConvertData(rate);
  }
