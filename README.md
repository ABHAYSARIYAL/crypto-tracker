# 🚀 Full Stack Crypto Tracker (MERN Stack)

This project is a full-stack cryptocurrency tracker built using the **MERN stack** (MongoDB, Express.js, React, Node.js). It displays the top 10 cryptocurrencies with live price updates and stores historical data every hour using a cron job.

---

## 🌟 Features

- 🔄 Fetches live data from [CoinGecko API](https://www.coingecko.com/en/api)
- 📊 Displays top 10 coins: name, symbol, price, market cap, 24h change
- 🔍 Real-time search and sorting on dashboard
- 🕒 Auto-refreshes every 30 minutes
- 🗃 Saves historical data to MongoDB every hour using cron
- ☁️ Deployed frontend (Vercel) & backend (Render)

---

## 🛠️ Tech Stack

- **Frontend**: React, Axios, CSS
- **Backend**: Node.js, Express.js, Axios, Node-Cron
- **Database**: MongoDB Atlas
- **Deployment**:
  - Frontend: [Vercel](https://vercel.com)
  - Backend: [Render](https://render.com)

---

## 📦 Folder Structure

```

crypto-tracker/
├── client/        # React frontend
├── server/        # Express backend with cron jobs and API
└── README.md

````

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/ABHAYSARIYAL/crypto-tracker.git
cd crypto-tracker
````

### 2. Backend Setup (`/server`)

```bash
cd server
npm install
```

**Create a `.env` file**:

```env
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000
```

**Start the server**:

```bash
npm run dev
```

### 3. Frontend Setup (`/client`)

```bash
cd ../client
npm install
```

**(Optional)**: Create a `.env` file if using a hosted backend:

```env
REACT_APP_BACKEND_URL=https://your-backend-url.onrender.com
```

**Run the React app**:

```bash
npm start
```

---

## 🔁 Cron Job

A cron job runs every hour and automatically stores current coin data into MongoDB.

* Implemented using `node-cron`
* Trigger: `0 * * * *` (every hour)
* Logic: Fetch top 10 coins → insert into `historydatas` collection

---

## 🧪 API Endpoints

| Method | Endpoint               | Description                   |
| ------ | ---------------------- | ----------------------------- |
| GET    | `/api/coins`           | Fetch top 10 coins            |
| POST   | `/api/history`         | Save current data to history  |
| GET    | `/api/history/:coinId` | Get history for specific coin |

---

## 🌍 Live Demo

* **Frontend (Vercel)**: [https://your-frontend.vercel.app](https://your-frontend.vercel.app)
* **Backend (Render)**: [https://your-backend.onrender.com](https://your-backend.onrender.com/api/coins)

---


## 📄 License

MIT License

---

## 🙌 Acknowledgements

* [CoinGecko](https://www.coingecko.com/en/api) for free API
* [Render](https://render.com) for backend hosting
* [Vercel](https://vercel.com) for frontend hosting

---

## 💬 Feedback & Contributions

Open to suggestions, issues, or improvements. Feel free to fork and improve!

```
