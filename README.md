# 2026 AI Tool Analytics Dashboard 

An interactive, full-stack business analytics dashboard exploring the top AI tools of 2026. This Minimum Viable Product (MVP) is designed to provide actionable insights into global traffic trends, pricing models, and user ratings through dynamic data visualization.

## Features
* **Single Source of Truth Architecture:** A unified data flow where a single FastAPI endpoint processes multiple query parameters, ensuring synchronized updates across all UI components.
* **Dynamic Filtering:** Users can filter datasets by Primary Category, Pricing Model, and Minimum Rating. 
* **Interactive Data Visualization:** 
  * Dual-dataset bar charts comparing estimated traffic versus active users (powered by Chart.js).
  * Pie charts visualizing the distribution of AI tool pricing models.
* **Client-Side Sorting & Formatting:** Dynamic table sorting by price, traffic, or rating, featuring localized currency and number formatting.
* **Optimized UX/UI:** Includes loading states to prevent duplicate API requests and friendly empty state handling for zero-result queries.

## Tech Stack
* **Backend:** Python, FastAPI, Pandas, SQLite
* **Frontend:** HTML5, CSS3, Vanilla JavaScript, Chart.js
* **Data Source:** [Top 100 AI Tools 2026](https://www.kaggle.com/datasets/nudratabbas/top-100-ai-tools-2026) (Kaggle)

## Project Structure
* `main.py`: FastAPI application handling routing and dynamic SQL query generation.
* `data_prep.py`: Python script utilizing Pandas for data cleaning, USD to CAD conversion, and SQLite database population.
* `ai_main.js`: Client-side logic for fetching data, DOM manipulation, KPI calculation, and Chart.js rendering.
* `ai_design.css`: Custom styling utilizing flexbox for responsive layout control.

## Getting Started

### Prerequisites
* Python 3.8+
* Uvicorn

## Installation & Setup

1. Clone the repository:

```bash
git clone https://github.com/cassandra093517-cpu/ai-tools-business-dashboard.git
cd ai-tools-business-dashboard
```

2. Install the required Python packages:

```bash
pip install fastapi uvicorn pandas
```

3. Generate the SQLite database:

```bash
python data_prep.py
```

4. Start the backend server:

```bash
uvicorn main:app --reload
```

5. Open `index.html` in your web browser to view the dashboard.

## Contact

**Cassandra Kao**
Computer Programming and Analysis Student at Seneca Polytechnic
[LinkedIn Profile](https://www.linkedin.com/in/cassandrakao/) | [GitHub Profile URL](https://github.com/cassandra093517-cpu/)
