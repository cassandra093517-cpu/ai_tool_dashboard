const search = document.getElementById("apply_filter_btn");
const price = document.getElementById("pricing_select")





async function pricingSelect() {

  const res = price.value;
  const price_url = `http://127.0.0.1:8000/pricing/${res}`;
  console.log(price_url);

  try {
    const response = await fetch(price_url);
    const data = await response.json();
    console.log("data received:", data);
    const dataDisplay = document.getElementById("data_table_container");
    let dataHtml = `
    <table border ="1">
    <thead>
<tr>
<th>No.</th>
<th>Tool Name</th>
<th>Pricing Model</th>
</tr>
    </thead>
    <tbody>
    `;
    for (let i = 0; i < data.length; i++) {
      dataHtml += `<tr>
      <td>${i + 1}</td>
      <td>${data[i].Tool_Name}</td>
      <td>${data[i].Pricing_Model}</td>
      </tr>
      `;
    }

    dataHtml += `
</tbody>
</table>
`
    dataDisplay.innerHTML = dataHtml;
  } catch (error) {
    console.error("Fetch failed: ", error);
  }
}

search.addEventListener("click", pricingSelect);

async function draw_pie_chart() {
  const pie_char_url = `http://127.0.0.1:8000/pricing_distribution`;
  try {
    const response = await fetch(pie_char_url);
    const data = await response.json();
    console.log("data received:", data);
    const pieCharDisplay = document.getElementById("price_pie_chart");

    const label = [];
    const value = [];

    for (let i = 0; i < data.length; i++) {
      label.push(data[i].Pricing_Model);
      value.push(data[i].Count);
    }

    new Chart(pieCharDisplay, {
      type: 'pie',
      data: {
        labels: label,
        datasets: [
          {
            data: value
          }
        ]
      }
    });

  } catch (error) {
    console.error("Fetch failed: ", error);
  }
}
draw_pie_chart();

async function draw_bar_chart() {
  const traffic_url = `http://127.0.0.1:8000/top-traffic`;
  try {
    const response = await fetch(traffic_url);
    const data = await response.json();
    console.log("data received", data);
    const barChartDisplay = document.getElementById('top10_bar_chart');
    let label = [];
    let value = [];

    for (let i = 0; i < data.length; i++) {
      label.push(data[i].Tool_Name);
      value.push(data[i].Monthly_Traffic_Est);
    }

    new Chart(barChartDisplay, {
      type: 'bar',
      data: {
        labels: label,
        datasets: [
          {
            label: 'Top 10 Traffic',
            data: value
          }
        ]
      }
    });

  } catch (error) {
    console.error("Fetch failed: ", error);
  }


}

draw_bar_chart();