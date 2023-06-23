// Define constants for the stock ticker and name this is to be used for when we tell the code which ticker to follow
const stock_ticker = "AAPL";
const stock_name = "Apple Inc";

// Function to retrieve stock data based on the given time period
async function getStockData(timePeriod) {
  let apiUrl;

  // Set the API URL based and the increment of time that the data will be retrieved
  switch (timePeriod) {
    case '1week':
      apiUrl = 'https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=AAPL&apikey=YB1KN8JFJ29G90FN';
      break;
  }

  try {
    // Fetch the stock data from the API
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Process the stock data based on the time period
    switch (timePeriod) {
      case '1week':
        return data['Weekly Time Series'];
      case '1month':
      case '3months':
      case '1year':
      case '5years':
      case 'alltime':
        return data['Monthly Time Series'];
      default:
        return null;
    }
  } catch (error) {
    // Handle errors during data retrieval
    console.log('Error retrieving stock data:', error);
    return null;
  }
}

// Function to format stock data based on the selected time period
function formatStockData(stockData, weekString) {
  if (!stockData) {
    return { dates: [], prices: [] };
  }

  const currentDate = new Date();
  let eightWeeksAgo = new Date();

  // if the inputted value = to the value declared go back and retrieve 4 weeks of stock data Format stock data for the "4weeks" time period
  if (weekString === "4weeks") {
    if (!stockData) {
      return { dates: [], prices: [] };
    }
    const currentDate = new Date();
    const eightWeeksAgo = new Date();
    eightWeeksAgo.setDate(eightWeeksAgo.getDate() - 4 * 7);

    const dates = Object.keys(stockData).reverse().filter((date) => {
      const dateObj = new Date(date);
      return dateObj >= eightWeeksAgo && dateObj <= currentDate;
    });

    const prices = dates.map((date) => parseFloat(stockData[date]['4. close']));

    return { dates, prices };
  }
  // if the inputted value = to the value declared go back and retrieve 12 weeks of stock data Format stock data for the "12weeks" time period
  else if (weekString === "12weeks") {
    if (!stockData) {
      return { dates: [], prices: [] };
    }

    const currentDate = new Date();
    const eightWeeksAgo = new Date();
    eightWeeksAgo.setDate(eightWeeksAgo.getDate() - 12 * 7);

    const dates = Object.keys(stockData).reverse().filter((date) => {
      const dateObj = new Date(date);
      return dateObj >= eightWeeksAgo && dateObj <= currentDate;
    });

    const prices = dates.map((date) => parseFloat(stockData[date]['4. close']));

    return { dates, prices };
  }
  // if the inputted value = to the value declared go back and retrieve 52 weeks of stock data Format stock data for the "52weeks" time period
  else if (weekString === "52weeks") {
    if (!stockData) {
      return { dates: [], prices: [] };
    }

    const currentDate = new Date();
    const eightWeeksAgo = new Date();
    eightWeeksAgo.setDate(eightWeeksAgo.getDate() - 52 * 7);

    const dates = Object.keys(stockData).reverse().filter((date) => {
      const dateObj = new Date(date);
      return dateObj >= eightWeeksAgo && dateObj <= currentDate;
    });

    const prices = dates.map((date) => parseFloat(stockData[date]['4. close']));

    return { dates, prices };
  }
  // if the inputted value = to the value declared go back and retrieve 260 weeks of stock data Format stock data for the "260weeks" time period
  else if (weekString === "260weeks") {
    if (!stockData) {
      return { dates: [], prices: [] };
    }

    const currentDate = new Date();
    const eightWeeksAgo = new Date();
    eightWeeksAgo.setDate(eightWeeksAgo.getDate() - 260 * 7); // Subtract 8 weeks

    const dates = Object.keys(stockData).reverse().filter((date) => {
      const dateObj = new Date(date);
      return dateObj >= eightWeeksAgo && dateObj <= currentDate;
    });

    const prices = dates.map((date) => parseFloat(stockData[date]['4. close']));

    return { dates, prices };
  }
  // if the inputted value = to the value declared go back and retrieve all  weeks of stock data Format stock data for the "alltime" time period
  else {
    const dates = Object.keys(stockData).reverse();
    const prices = dates.map((date) => {
      const closePrice = parseFloat(stockData[date]['4. close']);

      // Adjust the prices for stock splits
      const splitDate1987 = new Date('1987-06-16');
      const splitDate2000 = new Date('2000-06-21');
      const splitDate2005 = new Date('2005-02-28');
      const splitDate2014 = new Date('2014-06-09');
      const splitDate2020 = new Date('2020-08-31');
      const currentDate = new Date(date);

      let cumulativeSplitRatio = 1;

      if (currentDate < splitDate1987) {
        // Apply the 1987 stock split adjustment
        const splitRatio1987 = 2;
        cumulativeSplitRatio *= splitRatio1987;
      }

      if (currentDate < splitDate2000) {
        // Apply the 2000 stock split adjustment
        const splitRatio2000 = 2;
        cumulativeSplitRatio *= splitRatio2000;
      }

      if (currentDate < splitDate2005) {
        // Apply the 2005 stock split adjustment
        const splitRatio2005 = 2;
        cumulativeSplitRatio *= splitRatio2005;
      }

      if (currentDate < splitDate2014) {
        // Apply the 2014 stock split adjustment
        const splitRatio2014 = 7;
        cumulativeSplitRatio *= splitRatio2014;
      }

      if (currentDate < splitDate2020) {
        // Apply the 2020 stock split adjustment
        const splitRatio2020 = 4;
        cumulativeSplitRatio *= splitRatio2020;
      }

      return (closePrice / cumulativeSplitRatio).toFixed(2);
    });

    return { dates, prices };
  }

  const dates = Object.keys(stockData).reverse().filter((date) => {
    const dateObj = new Date(date);
    return dateObj >= eightWeeksAgo && dateObj <= currentDate;
  });

  const prices = dates.map((date) => parseFloat(stockData[date]['4. close']));

  return { dates, prices };
}

// Function to update the stock information displayed on the page
function updateStockInfo(stockData) {
  const stockInfo = document.getElementById('stock-info');

  if (!stockData) {
    // Display an error message if stock data is not available "Error loading stock data in the header 2"
    stockInfo.innerHTML = '<h2>Error loading stock data.</h2>';
    return;
  }

  const latestDate = Object.keys(stockData)[0];
  const latestClosePrice = parseFloat(stockData[latestDate]['4. close']).toFixed(2);
//more information retrived from the API and portrayed onto the webpage by replaceing the value with it
  stockInfo.innerHTML = `
    <h2>${latestDate}</h2>
    <p>$${stock_ticker} Latest Close Price: $${latestClosePrice}</p>
  `;

  //stock ticker is used retrived from the const above and portrayed onto the webview
}

// Function to create the stock chart using Chart.js
function createStockChart(dates, prices, num_weeks) {
  const ctx = document.getElementById('stock-chart').getContext('2d');
  num_weeks = 10;

  if (typeof chart === 'undefined') {
    // Create a new chart if it doesn't exist
    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [
          {
            label: 'Stock Price',
            data: prices,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: false
          },
          x: {
            beginAtZero: false,
            min: 0 // (1222-num_weeks)
          }
        },
      },
    });
  } else {
    // Update the minimum value of x-axis if the chart already exists
    chart.options.scales.x.min = (1222 - num_weeks);
  }
  chart.update();
  chart;
}

// Main function to initialize the application
async function main(weekString) {
  const timePeriodSelect = document.getElementById('time-period-select');

  if (weekString == 'alltime') {
    num_weeks = 1222;
  } else {
    num_weeks = parseInt(weekString.replace('week', ''));
  }

  console.log("converted " + weekString + " into " + num_weeks + ".");

  timePeriodSelect.addEventListener('change', async () => {
    const timePeriod = timePeriodSelect.value;
    const stockData = await getStockData(timePeriod);

    if (!stockData) {
      console.log('Error loading stock data.');
      return;
    }

    const formattedData = formatStockData(stockData, 'alltime');
    updateStockInfo(stockData);
    createStockChart(formattedData.dates, formattedData.prices, num_weeks);
  });

  try {
    const stockData = await getStockData('1week');

    if (!stockData) {
      console.log('Error loading stock data.');
      return;
    }

    const formattedData = formatStockData(stockData, 'alltime');
    updateStockInfo(stockData);
    createStockChart(formattedData.dates, formattedData.prices, num_weeks);
  } catch (error) {
    console.log('Error:', error);
  }
}

// Event listener to start the main function when the DOM is loaded
window.addEventListener('DOMContentLoaded', function () {
  main('52weeks')
});

// Function to handle week selection
function handleweekselection(weekString) {
  console.log(weekString);
  main(weekString);
}
