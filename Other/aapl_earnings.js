const request = $.get("https://www.alphavantage.co/query?function=EARNINGS_CALENDAR&symbol=AAPL&523WQ4PCCN2R5E2B=demo");
request.done(function(data) {
  const earningsData = $.csv.toObjects(data);
  const tableBody = $("#earnings-table tbody");
  
  earningsData.forEach(function(row) {
    const tableRow = $("<tr>");
    tableRow.append($("<td>").text(row.date));
    tableRow.append($("<td>").text(row.symbol));
    tableRow.append($("<td>").text(row.reportedEPS));
    tableRow.append($("<td>").text(row.estimatedEPS));
    tableRow.append($("<td>").text(row.surprise));
    
    tableBody.append(tableRow);
  });
});

request.fail(function(error) {
  console.error("Error:", error);
});
