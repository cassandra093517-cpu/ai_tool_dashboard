const search = document.getElementById("apply_filter_btn");
const price = document.getElementById("pricing_select")
const rating = document.getElementById("min_rating_select");
const category = document.getElementById("primary_category");
const dataDisplay = document.getElementById("data_table_container");
let currentData = [];
let sortOrder = {
  'Starting_Price_CAD': true,
  'Monthly_Traffic_Est': true,
  'User_Rating': true
};

let pricePieChart = null;
let top10BarChart = null;
let sort = "";


async function fetch_Dashboard() {
  const tool_url = `http://127.0.0.1:8000/api/tools?pricing_model=${price.value}&min_rating=${rating.value}&primary_category=${category.value}`;
  console.log(tool_url);

  search.disabled = true;
  search.textContent = 'Loading...';


  try {
    const response = await fetch(tool_url);
    currentData = await response.json();

    const toolsCountDispaly = document.getElementById("total_tools");
    const maxTrafficDisplay = document.getElementById("max_traffic");
    const avgRatingDisplay = document.getElementById("avg_rating");

    if (currentData.length === 0) {

      console.log("No data");
      dataDisplay.innerHTML = `<p>No matching tools found.</p>`;
      toolsCountDispaly.innerHTML = `<h3>Total Tools</h3><p>0</p>`;
      maxTrafficDisplay.innerHTML = `<h3>Max Traffic</h3><p>0</p>`;
      avgRatingDisplay.innerHTML = `<h3>Average Rating</h3><p>0</p>`;

      if (top10BarChart != null) {
        top10BarChart.destroy();
      }

      if (pricePieChart != null) {
        pricePieChart.destroy();
      }
      return;
    }
    console.log("data received:", currentData);

    let total_tools = 0;
    let max_traffic = 0;
    let ave_rating = 0;
    let total_rating = 0;
    let i = 0;
    render_table(currentData);

    for (i; i < currentData.length; i++) {

      if (currentData[i].Monthly_Traffic_Est > max_traffic) {
        max_traffic = currentData[i].Monthly_Traffic_Est;
      }

      total_rating += currentData[i].User_Rating;
    }

    total_tools = i;
    ave_rating = total_rating / total_tools;

    let formatMaxTraffic = new Intl.NumberFormat('en-CA').format(max_traffic);
    toolsCountDispaly.innerHTML = `<h3>Total Tools</h3><p>${total_tools}</p>`;
    maxTrafficDisplay.innerHTML = `<h3>Max Traffic</h3><p>${formatMaxTraffic}</p>`;
    avgRatingDisplay.innerHTML = `<h3>Average Rating</h3><p>${ave_rating.toFixed(2)}</p>`;


    render_bar_chart(currentData);
    render_pie_chart(currentData);




  } catch (error) {
    console.error("Fetch failed: ", error);
  }
  finally {
    search.disabled = false;
    search.textContent = 'Search';
  }

}

search.addEventListener("click", fetch_Dashboard)

async function render_table(data) {
  let priceArrow = '↕';
  let trafficArrow = '↕';
  let ratingArrow = '↕';

  if (sort === 'Starting_Price_CAD') {
    priceArrow = sortOrder['Starting_Price_CAD'] ? '▲' : '▼';
  }
  else if (sort === 'Monthly_Traffic_Est') {
    trafficArrow = sortOrder['Monthly_Traffic_Est'] ? '▲' : '▼';
  }
  else if (sort === 'User_Rating') {
    ratingArrow = sortOrder['User_Rating'] ? '▲' : '▼';
  }


  let dataHtml = `
    <table border ="1">
    <thead>
<tr>
<th>Rank</th>
<th>Tool Name</th>
<th>Primary_Category</th>
<th>Pricing Model</th>
<th onclick="sortTable('Starting_Price_CAD')">Starting Price (CAD) ${priceArrow} </th>
<th onclick="sortTable('Monthly_Traffic_Est')">Monthly Estimated Traffic ${trafficArrow} </th>
<th onclick="sortTable('User_Rating')">User Rating ${ratingArrow} </th>
</tr>
    </thead>
    <tbody>
    `;
  let i = 0

  for (i; i < data.length; i++) {

    let commaFormat = new Intl.NumberFormat('en-CA').format(data[i].Monthly_Traffic_Est);
    let currencyFormat = new Intl.NumberFormat('en-CA',
      {
        style: 'currency',
        currency: 'CAD'
      }
    ).format(data[i].Starting_Price_CAD);

    dataHtml += `<tr>
      <td>${i + 1}</td>
      <td>${data[i].Tool_Name}</td>
      <td>${data[i].Primary_Category}</td>
      <td>${data[i].Pricing_Model}</td>
      <td>${currencyFormat}</td>
      <td>${commaFormat}</td>
      <td>${data[i].User_Rating}</td>
      </tr>
      `;

  }
  dataHtml += `
</tbody>
</table>
`
  dataDisplay.innerHTML = dataHtml;
}

async function render_bar_chart(data) {
  let copiedData = [...data];
  copiedData.sort((a, b) => b.Monthly_Traffic_Est - a.Monthly_Traffic_Est);
  let top10 = copiedData.slice(0, 10);
  let Tool_Name = [];
  let Monthly_Traffic_Est = [];
  let Active_Users_Est = [];

  for (let i = 0; i < top10.length; i++) {
    Tool_Name.push(top10[i].Tool_Name);
    Monthly_Traffic_Est.push(top10[i].Monthly_Traffic_Est);
    Active_Users_Est.push(top10[i].Active_Users_Est);
  }

  console.log(Tool_Name);
  console.log(Monthly_Traffic_Est);
  console.log(Active_Users_Est);

  if (top10BarChart !== null) {
    top10BarChart.destroy()
  }

  const barChartDisplay = document.getElementById('top10_bar_chart');
  top10BarChart = new Chart(barChartDisplay,
    {
      type: 'bar',
      data: {
        labels: Tool_Name,
        datasets: [
          {
            label: 'Monthly Estimated Traffic',
            data: Monthly_Traffic_Est,
            backgroundColor: 'rgba(54, 162, 235, 0.5)'
          },
          {
            label: 'Active Users',
            data: Active_Users_Est,
            backgroundColor: 'rgba(255, 99, 132, 0.5)'
          }
        ]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Top 10 Tools by Traffic',
            color: '#000',
            font: {
              size: 20

            }

          }
        }
      }


    }

  );

}

function sortTable(colName) {
  console.log("ready to sort:", colName)

  if (sortOrder[colName]) {
    currentData.sort((a, b) => b[colName] - a[colName]);
    sortOrder[colName] = false;
  }
  else {
    currentData.sort((a, b) => a[colName] - b[colName]);
    sortOrder[colName] = true;
  }
  sort = colName;

  render_table(currentData);

}

async function render_pie_chart(data) {
  let counts = {};

  for (let i = 0; i < data.length; i++) {
    let model = data[i].Pricing_Model;

    if (counts[model]) {
      counts[model]++;
    }
    else {
      counts[model] = 1;
    }
  }

  const pieChartDisplay = document.getElementById('price_pie_chart');
  let label = Object.keys(counts);
  let value = Object.values(counts);

  if (pricePieChart !== null) {
    pricePieChart.destroy()
  }

  pricePieChart = new Chart(pieChartDisplay, {
    type: 'pie',
    data: {
      labels: label,
      datasets: [
        {
          data: value
        }
      ]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Pricing Model Distribution',
          color: '$000',
          font: {
            size: 20
          }
        }
      }
    }
  });



}
