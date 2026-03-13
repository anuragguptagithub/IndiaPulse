# IndiaPulse

**Public Sentiment Intelligence Platform for the Indian Ecosystem**

![IndiaPulse Dashboard](./screenshot.png)

IndiaPulse is a modern web application that reimagines traditional review platforms for the Indian market. Instead of relying on vendor-solicited reviews, IndiaPulse aggregates organic user sentiment from public internet conversations across X (Twitter), Reddit, LinkedIn, Hacker News, YouTube comments, and Indian tech forums.

## Features

- **Product & Service Directory:** A searchable catalog of Indian companies, apps, and government services across categories like Fintech, SaaS, Mobility, Food Delivery, and Government Digital Services.
- **Sentiment Aggregation Dashboard:** Detailed platform pages showing a Public Sentiment Score (0–100), breakdown by social platform, 12-month trend charts, and top positive/negative mentions.
- **Category Landscape Map:** An interactive scatter plot visualizing the Indian market based on User Satisfaction (Sentiment Score) and Market Buzz (Mentions).
- **Side-by-Side Comparison:** Compare up to 3 platforms side-by-side to analyze their sentiment scores, pros, cons, and trending topics.
- **Trending & Alerts:** A homepage dashboard highlighting platforms with the biggest sentiment shifts in the last 30 days and a feed of viral conversations.

## Tech Stack

- **Frontend Framework:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Routing:** React Router v7
- **Charts:** Recharts
- **Icons:** Lucide React
- **Build Tool:** Vite

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/indiapulse.git
   cd indiapulse
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` (or the port specified in your terminal).

## Data

Currently, the application uses simulated mock data to demonstrate the concept of public sentiment intelligence for Indian companies and digital platforms. All data is stored client-side.

## License

This project is licensed under the MIT License.
