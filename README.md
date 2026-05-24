# 🗺️ NusaGuide AI — Smart Indonesian Trip Planner

[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6.0.5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Express](https://img.shields.io/badge/Express-4.19.2-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![Zustand](https://img.shields.io/badge/Zustand-5.0.3-4338CA?style=for-the-badge)](https://github.com/pmndrs/zustand)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

NusaGuide AI is an intelligent, full-stack trip planner application designed to help travelers discover, schedule, and estimate budgets for trips across popular Indonesian destinations. By leveraging the power of GenAI (Google Gemini) and local data repositories, NusaGuide AI generates fully structured itineraries, route maps, real-time weather outlooks, and visual budget breakdowns instantly.

---

## ✨ Features

- **🤖 AI-Powered Itinerary Generator**: Generate highly personalized day-by-day travel schedules using Google Gemini.
- **🗺️ Interactive Route Maps**: Render planned points of interest and route paths on an interactive map using Leaflet.js and OpenStreetMap.
- **🌤️ Live Weather Outlook**: Automatically fetch current weather forecasts and guides tips for the destination city on mount.
- **💰 Smart Budget Tracker**: Monitor lodging, transportation, food, and ticketing costs with responsive visual progress bars.
- **📚 Saved Plans Library**: Archive and manage your travel itineraries locally.
- **🔄 Smooth SPA Navigation**: Fast navigation with zero viewport shifts and browser scroll jitters.
- **🎨 Glassmorphic Light Theme**: A visually stunning corporate tech theme following high-brightness light mode specs and smooth micro-animations.

---

## 🛠️ Technologies Used

### Frontend
- **React (v19)** — UI components and state integration.
- **Vite** — High-performance local development build tool.
- **Tailwind CSS (v4.0)** — Modern utility-first styling with native CSS config.
- **Zustand** — Lightweight, decoupled global state management.
- **React Router DOM (v7)** — Client-side page routing.
- **Leaflet.js** — Interactive maps (without heavy React wrapper overlays).
- **Lucide React** — Premium developer icons.

### Backend
- **Node.js & Express** — Backend API server.
- **Google Gen AI SDK (`@google/genai`)** — Integration with Gemini model endpoints.
- **Dotenv** — Environment variable injection.
- **Cors** — Cross-Origin Resource Sharing middleware.
- **Nodemon** — Automatic server reload on development mode.

---

## 📂 Project Structure

This project follows **Clean Architecture** principles decoupled from framework components, organized using the **Atomic Design Methodology**:

```text
NusaGuideAI/
├── public/                 # Static assets (images, icons)
├── src/
│   ├── domain/             # Pure Business Logic (Framework-independent)
│   │   ├── entities/       # Domain business models (TripPlan, Weather)
│   │   └── repositories/   # Interfaces for data repositories
│   │
│   ├── application/        # Application Logic / Use Cases
│   │   └── usecases/       # SendMessage, SavePlan, DeletePlan, GetWeather
│   │
│   ├── infrastructure/     # External Agents, Data Fetching & Storage
│   │   └── repositories/   # LocalStoragePlanRepository, ApiChatRepository
│   │
│   └── presentation/       # User Interface Layer (React)
│       ├── store/          # Zustand State Stores (useChatStore, usePlanStore)
│       ├── hooks/          # Custom hooks (useLeafletMap for Leaflet hooks)
│       └── components/     # Atomic Components
│           ├── atoms/      # Buttons, Badges, Inputs, Toasts
│           ├── molecules/  # ChatBubbles, BudgetProgress bars, WeatherCards
│           ├── organisms/  # Sidebar, ChatContainer, Navbar, FloatingFooter
│           └── templates/  # MainLayout skeleton
│
├── server.js               # Express API backend
├── package.json            # Scripts and dependencies
└── vite.config.js          # Vite config & API proxying setup
```

---

## 🚀 Getting Started

Follow these steps to run NusaGuide AI on your local environment:

### 1. Prerequisites
Ensure you have **Node.js** (v18.x or higher) and **npm** installed.

### 2. Clone the Repository
```bash
git clone https://github.com/adichondro/NusaGuideAI.git
cd NusaGuideAI
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Environment Setup
Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=3000

# Google Gemini API Configuration
# Get your API key from Google AI Studio: https://aistudio.google.com/
GEMINI_API_KEY=your_gemini_api_key_here
```

> ⚠️ **Important**: Do not commit your `.env` file to version control. The repository contains a `.gitignore` that automatically excludes it.

---

## 💻 Running Locally

To run the client and backend server concurrently:

```bash
npm run dev
```

This command runs both processes at the same time:
1. **Frontend Client (Vite)**: `http://localhost:5173`
2. **Backend Server (Express)**: `http://localhost:3000`

All frontend network requests sent to `/api/*` are automatically proxied to the Express backend via the configuration in `vite.config.js`.

---

## ⚙️ Available Scripts

In the project directory, you can run:

| Command | Action |
| :--- | :--- |
| `npm run dev` | Runs the client (Vite) and server (Express) concurrently for development. |
| `npm run dev:client` | Runs only the Vite client. |
| `npm run dev:server` | Runs only the Node Express backend (with nodemon). |
| `npm run build` | Builds the optimized frontend bundle for production into the `dist/` directory. |
| `npm run preview` | Runs the Vite preview server locally to test your production build. |
| `npm run lint` | Lints the React codebase using ESLint. |

---

## 🔌 API Configuration & Endpoints

The backend server exposes the following API endpoints:

- **`POST /api/chat`** — Accepts user prompts, formats instructions, queries Gemini, parses the structured response, and returns a verified JSON itinerary plan.
- **`GET /api/weather?city={city}`** — Fetches current weather and recommendation tips for a specific city.

### Assistant Config Settings (Demo Mode)
If you do not have a Gemini API key configured, the application includes a **Demo Mode**. You can toggle this on or off in the application settings modal (accessible via the sliders icon in the navbar header) to use mocked responses instead of calling the live API.

---

## 🖼️ Preview & Screenshots

<!-- [USER ACTION REQUIRED] Replace the placeholders below with actual screenshots of your application -->

| Page | View | Description |
| :--- | :--- | :--- |
| **Discover** | `[Insert Discover Page Screenshot]` | Premium dashboard showing Indonesian destination portals. |
| **Planner Workspace** | `[Insert Planner Page Screenshot]` | Chat interface generating maps, budgets, and plans. |
| **Saved Plans** | `[Insert Saved Plans Screenshot]` | Grid showing weather widgets and minimalist daily schedules. |

---

## 🌐 Deployment

### Frontend (Vite)
To deploy the frontend to static hosting services like Vercel, Netlify, or GitHub Pages:
1. Generate the static bundle:
   ```bash
   npm run build
   ```
2. Upload/Deploy the generated `dist/` directory.
3. Configure rewriting rules to direct traffic to `index.html` for React routing.

### Backend (Express)
To deploy the Express server (e.g., Render, Railway, or Heroku):
1. Configure environment variables (`PORT`, `GEMINI_API_KEY`) on the host dashboard.
2. Set the start script to launch the server:
   ```bash
   node server.js
   ```

---

## 🤝 Contribution Guidelines

Contributions are welcome! Please follow these steps:
1. **Fork** this repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Open a **Pull Request**.

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

Created by **[adichondro](https://github.com/adichondro)**

- **GitHub**: [@adichondro](https://github.com/adichondro)
- **LinkedIn**: `[Insert LinkedIn URL]` *(Optional: User Customization)*
- **Email**: `[Insert Contact Email]` *(Optional: User Customization)*
