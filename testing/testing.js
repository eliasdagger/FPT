function handleweekselection(weekString) {
    console.log(weekString);
  
    let formatStockData;
  
    if (weekString === '4weeks') {
      formatStockData = function(stockData) {
            function formatStockData(stockData) {
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
            
            }
      };
  
    if (weekString === '12weeks') {
      formatStockData = function(stockData) {
            function formatStockData(stockData) {
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
            
          }
    };
  
    if (weekString === '52weeks') {
      formatStockData = function(stockData) {
        function formatStockData(stockData) {
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
      };
    }
  
    if (weekString === '260weeks') {
      formatStockData = function(stockData) {
        function formatStockData(stockData) {
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
      };
    }
  
    if (weekString === 'alltime') {
      formatStockData = function(stockData) {
        function formatStockData(stockData) {
            if (!stockData) {
              return { dates: [], prices: [] };
            }
          
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
      };
    }

    const stock_ticker = "AAPL";
    const stock_name = "Apple Inc";
    
    
    // console.log(weekString);
    // let weekString = "alltime";
    
    async function getStockData(timePeriod) {
      let apiUrl;
    
      switch (timePeriod) {
        case '1week':
          apiUrl = 'https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=AAPL&apikey=YB1KN8JFJ29G90FN';
          break;
        case '1month':
          apiUrl = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=AAPL&apikey=YB1KN8JFJ29G90FN';
          break;
        case '3months':
          apiUrl = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=AAPL&apikey=YB1KN8JFJ29G90FN';
          break;
        case '1year':
          apiUrl = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=AAPL&apikey=YB1KN8JFJ29G90FN';
          break;
        case '5years':
          apiUrl = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=AAPL&apikey=YB1KN8JFJ29G90FN';
          break;
        case 'alltime':
          apiUrl = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=AAPL&apikey=YB1KN8JFJ29G90FN';
          break;
        default:
          apiUrl = 'https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=AAPL&apikey=YB1KN8JFJ29G90FN';
      }  
    
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
    
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
        console.log('Error retrieving stock data:', error);
        return null;
      }
    }
    
    
    
    
    let weekString = '12weeks';
    
    
    
    
    
        
    
      
    
    function updateStockInfo(stockData) {
      const stockInfo = document.getElementById('stock-info');
    
      if (!stockData) {
        stockInfo.innerHTML = '<h2>Error loading stock data.</h2>';
        return;
      }
    
      const latestDate = Object.keys(stockData)[0];
      const latestClosePrice = parseFloat(stockData[latestDate]['4. close']).toFixed(2);
    
      stockInfo.innerHTML = `
        <h2>${latestDate}</h2>
        <p>$${stock_ticker} Latest Close Price: $${latestClosePrice}</p>
      `;
    }
    
    function createStockChart(dates, prices) {
      const ctx = document.getElementById('stock-chart').getContext('2d');
    
      new Chart(ctx, {
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
              beginAtZero: false,
            },
          },
        },
      });
    }
    
    async function main() {
      const timePeriodSelect = document.getElementById('time-period-select');
    
      timePeriodSelect.addEventListener('change', async () => {
        const timePeriod = timePeriodSelect.value;
        const stockData = await getStockData(timePeriod);
    
        if (!stockData) {
          console.log('Error loading stock data.');
          return;
        }
    
        const formattedData = formatStockData(stockData);
        updateStockInfo(stockData);
        createStockChart(formattedData.dates, formattedData.prices);
      });
    
      try {
        const stockData = await getStockData('1week');
    
        if (!stockData) {
          console.log('Error loading stock data.');
          return;
        }
    
        const formattedData = formatStockData(stockData);
        updateStockInfo(stockData);
        createStockChart(formattedData.dates, formattedData.prices);
      } catch (error) {
        console.log('Error:', error);
      }
    }
    
    window.addEventListener('DOMContentLoaded', main);
    
    
    
    
    // ...
    
    // Add an event listener to the time period select element
    document.getElementById('time-period-select').addEventListener('change', function(event) {
        const selectedValue = event.target.value;
      
        // Redirect to the selected time period URL
        if (selectedValue === '1week') {
          window.location.href = 'instagram.com'; // Change the URL to the desired one
        } else if (selectedValue === '1month') {
          window.location.href = '/stock/1month';
        } else if (selectedValue === '3months') {
          window.location.href = '/stock/3months';
        } else if (selectedValue === '1year') {
          window.location.href = '/stock/1year';
        } else if (selectedValue === '5years') {
          window.location.href = '/stock/5years';
        } else if (selectedValue === 'alltime') {
          window.location.href = '/stock/alltime';
        }
      });
      
      // ...
      
    
    
    


}

  
  // Example usage
handleweekselection('12weeks');
 
  
  
