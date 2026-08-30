const search = document.getElementById("apply_filter_btn");
const price = document.getElementById("pricing_select")
const rating = document.getElementById("min_rating_select");
const category = document.getElementById("primary_category");
const dataDisplay = document.getElementById("data_table_container");
let currentData = [];


let top10BarChart = null;


async function fetch_Dashboard() {
  const tool_url = `http://127.0.0.1:8000/api/tools?pricing_model=${price.value}&min_rating=${rating.value}&primary_category=${category.value}`;
  console.log(tool_url);




  try {
    const response = await fetch(tool_url);
    currentData = await response.json();
    console.log("data received:", data);

    const toolsCountDispaly = document.getElementById("total_tools");
    const maxTrafficDisplay = document.getElementById("max_traffic");
    const avgRatingDisplay = document.getElementById("avg_rating");

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


    toolsCountDispaly.innerHTML = `<h3>Total Tools</h3><p>${total_tools}</p>`;
    maxTrafficDisplay.innerHTML = `<h3>Max Traffic</h3><p>${max_traffic}</p>`;
    avgRatingDisplay.innerHTML = `<h3>Average Rating</h3><p>${ave_rating.toFixed(2)}</p>`;


    render_bar_chart(currentData);




  } catch (error) {
    console.error("Fetch failed: ", error);
  }

}

search.addEventListener("click", fetch_Dashboard)

async function render_table(data) {
  let dataHtml = `
    <table border ="1">
    <thead>
<tr>
<th>Rank</th>
<th>Tool Name</th>
<th>Primary_Category</th>
<th>Pricing Model</th>
<th>Starting Price (CAD)</th>
<th>Monthly Estimated Traffic</th>
<th>User Rating</th>
</tr>
    </thead>
    <tbody>
    `;
  let i = 0

  for (i; i < data.length; i++) {
    dataHtml += `<tr>
      <td>${i + 1}</td>
      <td>${data[i].Tool_Name}</td>
      <td>${data[i].Primary_Category}</td>
      <td>${data[i].Pricing_Model}</td>
      <td>${data[i].Starting_Price_CAD}</td>
      <td>${data[i].Monthly_Traffic_Est}</td>
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
  data.sort((a, b) => b.Monthly_Traffic_Est - a.Monthly_Traffic_Est);
  let top10 = data.slice(0, 10);
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
      }

    }
  );

}



// async function pricingSelect() {

//   const res = price.value;
//   const price_url = `http://127.0.0.1:8000/pricing/${res}`;
//   console.log(price_url);

//   try {
//     const response = await fetch(price_url);
//     const data = await response.json();
//     console.log("data received:", data);
//     const dataDisplay = document.getElementById("data_table_container");
//     let dataHtml = `
//     <table border ="1">
//     <thead>
// <tr>
// <th>No.</th>
// <th>Tool Name</th>
// <th>Pricing Model</th>
// <th>Starting Price (CAD)</th>
// <th>Monthly Estimated Traffic</th>
// <th>User Rating</th>
// </tr>
//     </thead>
//     <tbody>
//     `;
//     for (let i = 0; i < data.length; i++) {
//       dataHtml += `<tr>
//       <td>${i + 1}</td>
//       <td>${data[i].Tool_Name}</td>
//       <td>${data[i].Pricing_Model}</td>
//       <td>${data[i].Starting_Price_CAD}</td>
//       <td>${data[i].Monthly_Traffic_Est}</td>
//       <td>${data[i].User_Rating}</td>
//       </tr>
//       `;
//     }

//     dataHtml += `
// </tbody>
// </table>
// `
//     dataDisplay.innerHTML = dataHtml;
//   } catch (error) {
//     console.error("Fetch failed: ", error);
//   }
// }

// search.addEventListener("click", pricingSelect);

// async function draw_pie_chart() {
//   const pie_char_url = `http://127.0.0.1:8000/pricing_distribution`;
//   try {
//     const response = await fetch(pie_char_url);
//     const data = await response.json();
//     console.log("data received:", data);
//     const pieCharDisplay = document.getElementById("price_pie_chart");

//     const label = [];
//     const value = [];

//     for (let i = 0; i < data.length; i++) {
//       label.push(data[i].Pricing_Model);
//       value.push(data[i].Count);
//     }

//     new Chart(pieCharDisplay, {
//       type: 'pie',
//       data: {
//         labels: label,
//         datasets: [
//           {
//             data: value
//           }
//         ]
//       }
//     });

//   } catch (error) {
//     console.error("Fetch failed: ", error);
//   }
// }
// draw_pie_chart();

// async function draw_bar_chart() {
//   const traffic_url = `http://127.0.0.1:8000/top-traffic`;
//   try {
//     const response = await fetch(traffic_url);
//     const data = await response.json();
//     console.log("data received", data);
//     const barChartDisplay = document.getElementById('top10_bar_chart');
//     let label = [];
//     let value = [];

//     for (let i = 0; i < data.length; i++) {
//       label.push(data[i].Tool_Name);
//       value.push(data[i].Monthly_Traffic_Est);
//     }

//     new Chart(barChartDisplay, {
//       type: 'bar',
//       data: {
//         labels: label,
//         datasets: [
//           {
//             label: 'Top 10 Traffic',
//             data: value
//           }
//         ]
//       }
//     });

//   } catch (error) {
//     console.error("Fetch failed: ", error);
//   }


// }

// draw_bar_chart();

// async function display_kpi() {
//   const kpi_url = `http://127.0.0.1:8000/kpi-stats`;
//   try {
//     const response = await fetch(kpi_url);
//     const data = await response.json();
//     console.log("data received", data);
//     const tool_Display = document.getElementById('total_tools');
//     const max_traffic = document.getElementById('max_traffic');
//     const avg_rating = document.getElementById('avg_rating');

//     tool_Display.innerHTML = `
//     <h3>Total Tools</h3>
//     <p>${data.Total_Tools}</p>`

//     max_traffic.innerHTML = `
//     <h3>The Tool with the Max traffic</h3>
//     <p>${data.Highest_Traffic}</p>`

//     avg_rating.innerHTML = `
//     <h3>Average User Rating</h3>
//     <p>${data.Average_Rating.toFixed(2)}</p>`


//   }
//   catch (error) {
//     console.error("Fetch failed: ", error);
//   }
// }

// display_kpi();