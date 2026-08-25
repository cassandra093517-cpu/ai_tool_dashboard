const overview = document.getElementById("nav-overview");
const traffic = document.getElementById("nav-traffic");
const pricingChart = document.getElementById("nav-pricing-chart");
const dataCon = document.getElementById("data_container");

async function fetchTopTraffic() {
  try {
    const response = await fetch("http://127.0.0.1:8000/top-traffic");
    const data = await response.json();
    console.log("data received:", data);
    console.log(data[0])
  } catch (error) {
    console.error("Fetch failed: ", error);
  }


}

overview.addEventListener("click", fetchTopTraffic);