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
    const dataDisplay = document.getElementById("data_container");
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

